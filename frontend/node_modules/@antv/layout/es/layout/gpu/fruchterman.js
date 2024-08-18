// @ts-nocheck
/**
 * @fileOverview fruchterman layout
 * @author shiwu.wyy@antfin.com
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Base } from "../base";
import { isNumber } from "../../util";
// @ts-ignore
import { World } from "@antv/g-webgpu";
// compile at runtime in dev mode
import { buildTextureData, attributesToTextureData } from "../../util/gpu";
// use compiled bundle in prod mode
import { fruchtermanBundle, clusterBundle } from "./fruchtermanShader";
import { LAYOUT_MESSAGE } from "../constants";
/**
 * fruchterman 布局
 */
export class FruchtermanGPULayout extends Base {
    constructor(options) {
        super();
        /** 停止迭代的最大迭代数 */
        this.maxIteration = 1000;
        /** 重力大小，影响图的紧凑程度 */
        this.gravity = 10;
        /** 速度 */
        this.speed = 1;
        /** 是否产生聚类力 */
        this.clustering = false;
        /** 根据哪个字段聚类 */
        this.clusterField = "cluster";
        /** 聚类力大小 */
        this.clusterGravity = 10;
        /** 是否启用web worker。前提是在web worker里执行布局，否则无效	*/
        this.workerEnabled = false;
        this.nodes = [];
        this.edges = [];
        this.width = 300;
        this.height = 300;
        this.nodeMap = {};
        this.nodeIdxMap = {};
        this.updateCfg(options);
    }
    getDefaultCfg() {
        return {
            maxIteration: 1000,
            gravity: 10,
            speed: 1,
            clustering: false,
            clusterGravity: 10
        };
    }
    /**
     * 执行布局
     */
    execute() {
        return __awaiter(this, void 0, void 0, function* () {
            const self = this;
            const nodes = self.nodes;
            if (!nodes || nodes.length === 0) {
                if (self.onLayoutEnd)
                    self.onLayoutEnd();
                return;
            }
            if (!self.width && typeof window !== "undefined") {
                self.width = window.innerWidth;
            }
            if (!self.height && typeof window !== "undefined") {
                self.height = window.innerHeight;
            }
            if (!self.center) {
                self.center = [self.width / 2, self.height / 2];
            }
            const center = self.center;
            if (nodes.length === 1) {
                nodes[0].x = center[0];
                nodes[0].y = center[1];
                if (self.onLayoutEnd)
                    self.onLayoutEnd();
                return;
            }
            const nodeMap = {};
            const nodeIdxMap = {};
            nodes.forEach((node, i) => {
                if (!isNumber(node.x))
                    node.x = Math.random() * this.width;
                if (!isNumber(node.y))
                    node.y = Math.random() * this.height;
                nodeMap[node.id] = node;
                nodeIdxMap[node.id] = i;
            });
            self.nodeMap = nodeMap;
            self.nodeIdxMap = nodeIdxMap;
            // layout
            yield self.run();
        });
    }
    executeWithWorker(canvas, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const self = this;
            const nodes = self.nodes;
            const center = self.center;
            if (!nodes || nodes.length === 0) {
                return;
            }
            if (nodes.length === 1) {
                nodes[0].x = center[0];
                nodes[0].y = center[1];
                return;
            }
            const nodeMap = {};
            const nodeIdxMap = {};
            nodes.forEach((node, i) => {
                if (!isNumber(node.x))
                    node.x = Math.random() * this.width;
                if (!isNumber(node.y))
                    node.y = Math.random() * this.height;
                nodeMap[node.id] = node;
                nodeIdxMap[node.id] = i;
            });
            self.nodeMap = nodeMap;
            self.nodeIdxMap = nodeIdxMap;
            // layout
            yield self.run(canvas, ctx);
        });
    }
    run(canvas, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const self = this;
            const nodes = self.nodes;
            const edges = self.edges;
            const maxIteration = self.maxIteration;
            const center = self.center;
            const area = self.height * self.width;
            let maxDisplace = Math.sqrt(area) / 10;
            const k2 = area / (nodes.length + 1);
            const k = Math.sqrt(k2);
            const speed = self.speed;
            const clustering = self.clustering;
            const { array: attributeArray, count: clusterCount } = attributesToTextureData([self.clusterField], nodes);
            // pushing the fx and fy
            nodes.forEach((node, i) => {
                let fx = 0;
                let fy = 0;
                if (isNumber(node.fx) && isNumber(node.fy)) {
                    fx = node.fx || 0.001;
                    fy = node.fy || 0.001;
                }
                attributeArray[4 * i + 1] = fx;
                attributeArray[4 * i + 2] = fy;
            });
            const numParticles = nodes.length;
            const { maxEdgePerVetex, array: nodesEdgesArray } = buildTextureData(nodes, edges);
            const workerEnabled = self.workerEnabled;
            let world;
            if (workerEnabled) {
                world = World.create({
                    canvas,
                    engineOptions: {
                        supportCompute: true
                    }
                });
            }
            else {
                world = World.create({
                    engineOptions: {
                        supportCompute: true
                    }
                });
            }
            // compile at runtime in dev mode
            // const compiler = new Compiler()
            // const fruchtermanBundle = compiler.compileBundle(fruchtermanCode)
            // const clusterBundle = compiler.compileBundle(clusterCode)
            // use compiled bundle in prod mode
            // console.log(fruchtermanBundle.toString())
            // console.log(clusterBundle.toString())
            const onLayoutEnd = self.onLayoutEnd;
            const clusterCenters = [];
            for (let i = 0; i < clusterCount; i++) {
                clusterCenters.push(0, 0, 0, 0);
            }
            const kernelFruchterman = world
                .createKernel(fruchtermanBundle)
                .setDispatch([numParticles, 1, 1])
                .setBinding({
                u_Data: nodesEdgesArray,
                u_K: k,
                u_K2: k2,
                u_Gravity: self.gravity,
                u_ClusterGravity: self.clusterGravity || self.gravity || 1,
                u_Speed: speed,
                u_MaxDisplace: maxDisplace,
                u_Clustering: clustering ? 1 : 0,
                u_Center: center,
                u_AttributeArray: attributeArray,
                u_ClusterCenters: clusterCenters,
                MAX_EDGE_PER_VERTEX: maxEdgePerVetex,
                VERTEX_COUNT: numParticles
            });
            let kernelCluster;
            if (clustering) {
                kernelCluster = world
                    .createKernel(clusterBundle)
                    .setDispatch([clusterCount, 1, 1])
                    .setBinding({
                    u_Data: nodesEdgesArray,
                    u_NodeAttributes: attributeArray,
                    u_ClusterCenters: clusterCenters,
                    VERTEX_COUNT: numParticles,
                    CLUSTER_COUNT: clusterCount
                });
            }
            const execute = () => __awaiter(this, void 0, void 0, function* () {
                for (let i = 0; i < maxIteration; i++) {
                    // eslint-disable-next-line no-await-in-loop
                    yield kernelFruchterman.execute();
                    if (clustering) {
                        kernelCluster.setBinding({
                            u_Data: kernelFruchterman
                        });
                        // eslint-disable-next-line no-await-in-loop
                        yield kernelCluster.execute();
                        kernelFruchterman.setBinding({
                            u_ClusterCenters: kernelCluster
                        });
                    }
                    kernelFruchterman.setBinding({
                        u_MaxDisplace: maxDisplace *= 0.99
                    });
                }
                const finalParticleData = yield kernelFruchterman.getOutput();
                if (canvas) {
                    // 传递数据给主线程
                    ctx.postMessage({
                        type: LAYOUT_MESSAGE.GPUEND,
                        vertexEdgeData: finalParticleData
                        // edgeIndexBufferData,
                    });
                }
                else {
                    nodes.forEach((node, i) => {
                        const x = finalParticleData[4 * i];
                        const y = finalParticleData[4 * i + 1];
                        node.x = x;
                        node.y = y;
                    });
                }
                if (onLayoutEnd)
                    onLayoutEnd();
            });
            yield execute();
        });
    }
    getType() {
        return "fruchterman-gpu";
    }
}
//# sourceMappingURL=fruchterman.js.map