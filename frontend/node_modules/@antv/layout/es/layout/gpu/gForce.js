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
import { proccessToFunc, buildTextureDataWithTwoEdgeAttr, arrayToTextureData } from "../../util/gpu";
import { getDegree } from "../../util/math";
import { gForceBundle, aveMovementBundle } from "./gForceShader";
import { LAYOUT_MESSAGE } from "../constants";
/**
 * graphin 中的 force 布局
 */
export class GForceGPULayout extends Base {
    constructor(options) {
        super();
        /** 停止迭代的最大迭代数 */
        this.maxIteration = 1000;
        /** 弹簧引力系数 */
        this.edgeStrength = 200;
        /** 斥力系数 */
        this.nodeStrength = 1000;
        /** 库伦系数 */
        this.coulombDisScale = 0.005;
        /** 阻尼系数 */
        this.damping = 0.9;
        /** 最大速度 */
        this.maxSpeed = 1000;
        /** 一次迭代的平均移动距离小于该值时停止迭代 */
        this.minMovement = 0.5;
        /** 迭代中衰减 */
        this.interval = 0.02;
        /** 斥力的一个系数 */
        this.factor = 1;
        /** 理想边长 */
        this.linkDistance = 1;
        /** 重力大小 */
        this.gravity = 10;
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
            maxIteration: 2000,
            gravity: 10,
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
                    node.x = Math.random() * self.width;
                if (!isNumber(node.y))
                    node.y = Math.random() * self.height;
                nodeMap[node.id] = node;
                nodeIdxMap[node.id] = i;
            });
            self.nodeMap = nodeMap;
            self.nodeIdxMap = nodeIdxMap;
            self.nodeStrength = proccessToFunc(self.nodeStrength, 1);
            self.edgeStrength = proccessToFunc(self.edgeStrength, 1);
            // layout
            yield self.run();
        });
    }
    executeWithWorker(canvas, ctx) {
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
                node.x = Math.random() * self.width;
            if (!isNumber(node.y))
                node.y = Math.random() * self.height;
            nodeMap[node.id] = node;
            nodeIdxMap[node.id] = i;
        });
        self.nodeMap = nodeMap;
        self.nodeIdxMap = nodeIdxMap;
        self.nodeStrength = proccessToFunc(self.nodeStrength, 1);
        self.edgeStrength = proccessToFunc(self.edgeStrength, 1);
        // layout
        self.run(canvas, ctx);
    }
    run(canvas, ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const self = this;
            const nodes = self.nodes;
            const edges = self.edges;
            const maxIteration = self.maxIteration;
            if (!self.width && typeof window !== "undefined") {
                self.width = window.innerWidth;
            }
            if (!self.height && typeof window !== "undefined") {
                self.height = window.innerHeight;
            }
            const numParticles = nodes.length;
            self.linkDistance = proccessToFunc(self.linkDistance);
            self.edgeStrength = proccessToFunc(self.edgeStrength);
            const { maxEdgePerVetex, array: nodesEdgesArray } = buildTextureDataWithTwoEdgeAttr(nodes, edges, self.linkDistance, self.edgeStrength);
            // init degree for mass
            self.degrees = getDegree(nodes.length, self.nodeIdxMap, edges).map((degree) => degree.all);
            const masses = [];
            const nodeStrengths = [];
            const centerXs = [];
            const centerYs = [];
            const centerGravities = [];
            const fxs = [];
            const fys = [];
            if (!self.getMass) {
                self.getMass = (d) => {
                    return self.degrees[self.nodeIdxMap[d.id]] || 1;
                };
            }
            const gravity = self.gravity;
            const center = self.center;
            nodes.forEach((node, i) => {
                masses.push(self.getMass(node));
                nodeStrengths.push(self.nodeStrength(node));
                if (!self.degrees[i])
                    self.degrees[i] = 0;
                let nodeGravity = [center[0], center[1], gravity];
                if (self.getCenter) {
                    const customCenter = self.getCenter(node, self.degrees[i]);
                    if (customCenter &&
                        isNumber(customCenter[0]) &&
                        isNumber(customCenter[1]) &&
                        isNumber(customCenter[2])) {
                        nodeGravity = customCenter;
                    }
                }
                centerXs.push(nodeGravity[0]);
                centerYs.push(nodeGravity[1]);
                centerGravities.push(nodeGravity[2]);
                if (isNumber(node.fx) && isNumber(node.fy)) {
                    fxs.push(node.fx || 0.001);
                    fys.push(node.fy || 0.001);
                }
                else {
                    fxs.push(0);
                    fys.push(0);
                }
            });
            // 每个节点的额外属性占两个数组各一格，nodeAttributeArray1 中是：mass, degree, nodeSterngth, 0
            const nodeAttributeArray1 = arrayToTextureData([
                masses,
                self.degrees,
                nodeStrengths,
                fxs
            ]);
            // nodeAttributeArray2 中是：centerX, centerY, gravity, 0,
            const nodeAttributeArray2 = arrayToTextureData([
                centerXs,
                centerYs,
                centerGravities,
                fys
            ]);
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
            // TODO: 最终的预编译代码放入到 gForceShader.ts 中直接引入，不再需要下面三行
            // const compiler = new Compiler();
            // const gForceBundle = compiler.compileBundle(gForceCode);
            // console.log(gForceBundle.toString());
            const onLayoutEnd = self.onLayoutEnd;
            const initPreviousData = [];
            nodesEdgesArray.forEach((value) => {
                initPreviousData.push(value);
            });
            for (let i = 0; i < 4; i++) {
                initPreviousData.push(0);
            }
            const kernelGForce = world
                .createKernel(gForceBundle)
                .setDispatch([numParticles, 1, 1])
                .setBinding({
                u_Data: nodesEdgesArray,
                u_damping: self.damping,
                u_maxSpeed: self.maxSpeed,
                u_minMovement: self.minMovement,
                u_coulombDisScale: self.coulombDisScale,
                u_factor: self.factor,
                u_NodeAttributeArray1: nodeAttributeArray1,
                u_NodeAttributeArray2: nodeAttributeArray2,
                MAX_EDGE_PER_VERTEX: maxEdgePerVetex,
                VERTEX_COUNT: numParticles,
                u_AveMovement: initPreviousData,
                u_interval: self.interval // 每次迭代更新，首次设置为 interval，在 onIterationCompleted 中更新
            });
            // const aveMovementBundle = compiler.compileBundle(aveMovementCode);
            // console.log(aveMovementBundle.toString());
            const kernelAveMovement = world
                .createKernel(aveMovementBundle)
                .setDispatch([1, 1, 1])
                .setBinding({
                u_Data: nodesEdgesArray,
                VERTEX_COUNT: numParticles,
                u_AveMovement: [0, 0, 0, 0]
            });
            // 执行迭代
            // let midRes = nodesEdgesArray;
            const execute = () => __awaiter(this, void 0, void 0, function* () {
                for (let i = 0; i < maxIteration; i++) {
                    // TODO: 似乎都来自 kernelGForce 是一个引用
                    // 当前坐标作为下一次迭代的 PreviousData
                    // if (i > 0) {
                    //   kernelAveMovement.setBinding({
                    //     u_PreviousData: kernelGForce
                    //   });
                    // }
                    // eslint-disable-next-line no-await-in-loop
                    yield kernelGForce.execute();
                    // midRes = await kernelGForce.getOutput();
                    // 每次迭代完成后
                    // 计算平均位移，用于提前终止迭代
                    kernelAveMovement.setBinding({
                        u_Data: kernelGForce
                    });
                    // eslint-disable-next-line no-await-in-loop
                    yield kernelAveMovement.execute();
                    // 更新衰减函数
                    const stepInterval = Math.max(0.02, self.interval - i * 0.002);
                    kernelGForce.setBinding({
                        u_interval: stepInterval,
                        u_AveMovement: kernelAveMovement
                    });
                }
                const finalParticleData = yield kernelGForce.getOutput();
                // 所有迭代完成后
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
        return "gForce-gpu";
    }
}
//# sourceMappingURL=gForce.js.map