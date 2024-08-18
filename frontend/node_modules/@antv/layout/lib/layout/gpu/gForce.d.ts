/**
 * @fileOverview fruchterman layout
 * @author shiwu.wyy@antfin.com
 */
import { IndexMap, OutNode, PointTuple, Edge, GForceGPULayoutOptions } from "../types";
import { Base } from "../base";
type NodeMap = {
    [key: string]: OutNode;
};
/**
 * graphin 中的 force 布局
 */
export declare class GForceGPULayout extends Base {
    /** 布局中心 */
    center: PointTuple;
    /** 停止迭代的最大迭代数 */
    maxIteration: number;
    /** 弹簧引力系数 */
    edgeStrength: number | ((d?: any) => number) | undefined;
    /** 斥力系数 */
    nodeStrength: number | ((d?: any) => number) | undefined;
    /** 库伦系数 */
    coulombDisScale: number;
    /** 阻尼系数 */
    damping: number;
    /** 最大速度 */
    maxSpeed: number;
    /** 一次迭代的平均移动距离小于该值时停止迭代 */
    minMovement: number;
    /** 迭代中衰减 */
    interval: number;
    /** 斥力的一个系数 */
    factor: number;
    /** 每个节点质量的回调函数，若不指定，则默认使用度数作为节点质量 */
    getMass: ((d?: any) => number) | undefined;
    /** 理想边长 */
    linkDistance: number | ((d?: any) => number) | undefined;
    /** 重力大小 */
    gravity: number;
    /** 每个节点中心力的 x、y、强度的回调函数，若不指定，则没有额外中心力 */
    getCenter: ((d?: any, degree?: number) => number[]) | undefined;
    /** 是否启用web worker。前提是在web worker里执行布局，否则无效	*/
    workerEnabled: boolean;
    nodes: OutNode[];
    edges: Edge[];
    width: number;
    height: number;
    nodeMap: NodeMap;
    nodeIdxMap: IndexMap;
    onLayoutEnd: () => void;
    /** 存储节点度数 */
    private degrees;
    constructor(options?: GForceGPULayoutOptions);
    getDefaultCfg(): {
        maxIteration: number;
        gravity: number;
        clustering: boolean;
        clusterGravity: number;
    };
    /**
     * 执行布局
     */
    execute(): Promise<void>;
    executeWithWorker(canvas?: HTMLCanvasElement, ctx?: any): void;
    run(canvas?: HTMLCanvasElement, ctx?: any): Promise<void>;
    getType(): string;
}
export {};
