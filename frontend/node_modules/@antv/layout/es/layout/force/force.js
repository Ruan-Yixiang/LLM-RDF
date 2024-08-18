/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */
import * as d3Force from "d3-force";
import forceInABox from "./force-in-a-box";
import { isArray, isFunction, isNumber, isObject } from "../../util";
import { Base } from "../base";
import { LAYOUT_MESSAGE } from "../constants";
/**
 * 经典力导布局 force-directed
 */
export class ForceLayout extends Base {
    constructor(options) {
        super();
        /** 向心力作用点 */
        this.center = [0, 0];
        /** 节点作用力 */
        this.nodeStrength = null;
        /** 边的作用力, 默认为根据节点的入度出度自适应 */
        this.edgeStrength = null;
        /** 是否防止节点相互覆盖 */
        this.preventOverlap = false;
        /** 聚类节点作用力 */
        this.clusterNodeStrength = null;
        /** 聚类边作用力 */
        this.clusterEdgeStrength = null;
        /** 聚类边长度 */
        this.clusterEdgeDistance = null;
        /** 聚类节点大小 / 直径，直径越大，越分散 */
        this.clusterNodeSize = null;
        /** 用于 foci 的力 */
        this.clusterFociStrength = null;
        /** 默认边长度 */
        this.linkDistance = 50;
        /** 迭代阈值的衰减率 [0, 1]，0.028 对应最大迭代数为 300 */
        this.alphaDecay = 0.028;
        /** 停止迭代的阈值 */
        this.alphaMin = 0.001;
        /** 当前阈值 */
        this.alpha = 0.3;
        /** 防止重叠的力强度 */
        this.collideStrength = 1;
        /** 是否启用web worker。前提是在web worker里执行布局，否则无效	*/
        this.workerEnabled = false;
        this.tick = () => { };
        /** 布局完成回调 */
        this.onLayoutEnd = () => { };
        /** 是否正在布局 */
        this.ticking = undefined;
        if (options) {
            this.updateCfg(options);
        }
    }
    getDefaultCfg() {
        return {
            center: [0, 0],
            nodeStrength: null,
            edgeStrength: null,
            preventOverlap: false,
            nodeSize: undefined,
            nodeSpacing: undefined,
            linkDistance: 50,
            forceSimulation: null,
            alphaDecay: 0.028,
            alphaMin: 0.001,
            alpha: 0.3,
            collideStrength: 1,
            clustering: false,
            clusterNodeStrength: -1,
            clusterEdgeStrength: 0.1,
            clusterEdgeDistance: 100,
            clusterFociStrength: 0.8,
            clusterNodeSize: 10,
            tick() { },
            onLayoutEnd() { },
            // 是否启用web worker。前提是在web worker里执行布局，否则无效
            workerEnabled: false
        };
    }
    /**
     * 初始化
     * @param {object} data 数据
     */
    init(data) {
        const self = this;
        self.nodes = data.nodes || [];
        const edges = data.edges || [];
        self.edges = edges.map((edge) => {
            const res = {};
            const expectKeys = ["targetNode", "sourceNode", "startPoint", "endPoint"];
            Object.keys(edge).forEach((key) => {
                if (!(expectKeys.indexOf(key) > -1)) {
                    res[key] = edge[key];
                }
            });
            return res;
        });
        self.ticking = false;
    }
    /**
     * 执行布局
     */
    execute(reloadData) {
        const self = this;
        const nodes = self.nodes;
        const edges = self.edges;
        // 如果正在布局，忽略布局请求
        if (self.ticking) {
            return;
        }
        let simulation = self.forceSimulation;
        const alphaMin = self.alphaMin;
        const alphaDecay = self.alphaDecay;
        const alpha = self.alpha;
        if (!simulation) {
            try {
                // 定义节点的力
                const nodeForce = d3Force.forceManyBody();
                if (self.nodeStrength) {
                    nodeForce.strength(self.nodeStrength);
                }
                simulation = d3Force.forceSimulation().nodes(nodes);
                if (self.clustering) {
                    const clusterForce = forceInABox();
                    clusterForce
                        .centerX(self.center[0])
                        .centerY(self.center[1])
                        .template("force")
                        .strength(self.clusterFociStrength);
                    if (edges) {
                        clusterForce.links(edges);
                    }
                    if (nodes) {
                        clusterForce.nodes(nodes);
                    }
                    clusterForce
                        .forceLinkDistance(self.clusterEdgeDistance)
                        .forceLinkStrength(self.clusterEdgeStrength)
                        .forceCharge(self.clusterNodeStrength)
                        .forceNodeSize(self.clusterNodeSize);
                    self.clusterForce = clusterForce;
                    simulation.force("group", clusterForce);
                }
                simulation
                    .force("center", d3Force.forceCenter(self.center[0], self.center[1]))
                    .force("charge", nodeForce)
                    .alpha(alpha)
                    .alphaDecay(alphaDecay)
                    .alphaMin(alphaMin);
                if (self.preventOverlap) {
                    self.overlapProcess(simulation);
                }
                // 如果有边，定义边的力
                if (edges) {
                    // d3 的 forceLayout 会重新生成边的数据模型，为了避免污染源数据
                    const edgeForce = d3Force
                        .forceLink()
                        .id((d) => d.id)
                        .links(edges);
                    if (self.edgeStrength) {
                        edgeForce.strength(self.edgeStrength);
                    }
                    if (self.linkDistance) {
                        edgeForce.distance(self.linkDistance);
                    }
                    self.edgeForce = edgeForce;
                    simulation.force("link", edgeForce);
                }
                if (self.workerEnabled && !isInWorker()) {
                    // 如果不是运行在web worker里，不用web worker布局
                    self.workerEnabled = false;
                    console.warn("workerEnabled option is only supported when running in web worker.");
                }
                if (!self.workerEnabled) {
                    simulation
                        .on("tick", () => {
                        self.tick();
                    })
                        .on("end", () => {
                        self.ticking = false;
                        if (self.onLayoutEnd)
                            self.onLayoutEnd();
                    });
                    self.ticking = true;
                }
                else {
                    // worker is enabled
                    simulation.stop();
                    const totalTicks = getSimulationTicks(simulation);
                    for (let currentTick = 1; currentTick <= totalTicks; currentTick++) {
                        simulation.tick();
                        // currentTick starts from 1.
                        postMessage({
                            nodes,
                            currentTick,
                            totalTicks,
                            type: LAYOUT_MESSAGE.TICK
                        }, undefined);
                    }
                    self.ticking = false;
                }
                self.forceSimulation = simulation;
                self.ticking = true;
            }
            catch (e) {
                self.ticking = false;
                console.warn(e);
            }
        }
        else {
            if (reloadData) {
                if (self.clustering && self.clusterForce) {
                    self.clusterForce.nodes(nodes);
                    self.clusterForce.links(edges);
                }
                simulation.nodes(nodes);
                if (edges && self.edgeForce)
                    self.edgeForce.links(edges);
                else if (edges && !self.edgeForce) {
                    // d3 的 forceLayout 会重新生成边的数据模型，为了避免污染源数据
                    const edgeForce = d3Force
                        .forceLink()
                        .id((d) => d.id)
                        .links(edges);
                    if (self.edgeStrength) {
                        edgeForce.strength(self.edgeStrength);
                    }
                    if (self.linkDistance) {
                        edgeForce.distance(self.linkDistance);
                    }
                    self.edgeForce = edgeForce;
                    simulation.force("link", edgeForce);
                }
            }
            if (self.preventOverlap) {
                self.overlapProcess(simulation);
            }
            simulation.alpha(alpha).restart();
            this.ticking = true;
        }
    }
    /**
     * 防止重叠
     * @param {object} simulation 力模拟模型
     */
    overlapProcess(simulation) {
        const self = this;
        const nodeSize = self.nodeSize;
        const nodeSpacing = self.nodeSpacing;
        let nodeSizeFunc;
        let nodeSpacingFunc;
        const collideStrength = self.collideStrength;
        if (isNumber(nodeSpacing)) {
            nodeSpacingFunc = () => nodeSpacing;
        }
        else if (isFunction(nodeSpacing)) {
            nodeSpacingFunc = nodeSpacing;
        }
        else {
            nodeSpacingFunc = () => 0;
        }
        if (!nodeSize) {
            nodeSizeFunc = (d) => {
                if (d.size) {
                    if (isArray(d.size)) {
                        const res = d.size[0] > d.size[1] ? d.size[0] : d.size[1];
                        return res / 2 + nodeSpacingFunc(d);
                    }
                    if (isObject(d.size)) {
                        const res = d.size.width > d.size.height ? d.size.width : d.size.height;
                        return res / 2 + nodeSpacingFunc(d);
                    }
                    return d.size / 2 + nodeSpacingFunc(d);
                }
                return 10 + nodeSpacingFunc(d);
            };
        }
        else if (isFunction(nodeSize)) {
            nodeSizeFunc = (d) => {
                const size = nodeSize(d);
                return size + nodeSpacingFunc(d);
            };
        }
        else if (isArray(nodeSize)) {
            const larger = nodeSize[0] > nodeSize[1] ? nodeSize[0] : nodeSize[1];
            const radius = larger / 2;
            nodeSizeFunc = (d) => radius + nodeSpacingFunc(d);
        }
        else if (isNumber(nodeSize)) {
            const radius = nodeSize / 2;
            nodeSizeFunc = (d) => radius + nodeSpacingFunc(d);
        }
        else {
            nodeSizeFunc = () => 10;
        }
        // forceCollide's parameter is a radius
        simulation.force("collisionForce", d3Force.forceCollide(nodeSizeFunc).strength(collideStrength));
    }
    /**
     * 更新布局配置，但不执行布局
     * @param {object} cfg 需要更新的配置项
     */
    updateCfg(cfg) {
        const self = this;
        if (self.ticking) {
            self.forceSimulation.stop();
            self.ticking = false;
        }
        self.forceSimulation = null;
        Object.assign(self, cfg);
    }
    destroy() {
        const self = this;
        if (self.ticking) {
            self.forceSimulation.stop();
            self.ticking = false;
        }
        self.nodes = null;
        self.edges = null;
        self.destroyed = true;
    }
}
// Return total ticks of d3-force simulation
function getSimulationTicks(simulation) {
    const alphaMin = simulation.alphaMin();
    const alphaTarget = simulation.alphaTarget();
    const alpha = simulation.alpha();
    const totalTicksFloat = Math.log((alphaMin - alphaTarget) / (alpha - alphaTarget)) /
        Math.log(1 - simulation.alphaDecay());
    const totalTicks = Math.ceil(totalTicksFloat);
    return totalTicks;
}
// 判断是否运行在web worker里
function isInWorker() {
    // eslint-disable-next-line no-undef
    return (typeof WorkerGlobalScope !== "undefined" &&
        self instanceof WorkerGlobalScope);
}
//# sourceMappingURL=force.js.map