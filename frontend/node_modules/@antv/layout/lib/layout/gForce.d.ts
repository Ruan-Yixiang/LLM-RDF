/**
 * @fileOverview fruchterman layout
 * @author shiwu.wyy@antfin.com
 */
import { OutNode, Edge, PointTuple, IndexMap, GForceLayoutOptions } from "./types";
import { Base } from "./base";
type INode = OutNode & {
    size: number | PointTuple;
};
type NodeMap = {
    [key: string]: INode;
};
/**
 * graphin 中的 force 布局
 */
export declare class GForceLayout extends Base {
    /** 布局中心 */
    center: PointTuple;
    /** 停止迭代的最大迭代数 */
    maxIteration: number;
    /** 是否启动 worker */
    workerEnabled: boolean;
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
    /** 每个节点中心力的 x、y、强度的回调函数，若不指定，则没有额外中心力 */
    getCenter: ((d?: any, degree?: number) => number[]) | undefined;
    /** 理想边长 */
    linkDistance: number | ((edge?: any, source?: any, target?: any) => number) | undefined;
    /** 重力大小 */
    gravity: number;
    /** 是否防止重叠 */
    preventOverlap: boolean;
    /** 防止重叠时的节点大小，默认从节点数据中取 size */
    nodeSize: number | number[] | ((d?: any) => number) | undefined;
    /** 防止重叠的力大小参数 */
    collideStrength: number;
    /** 防止重叠时的节点之间最小间距 */
    nodeSpacing: number | number[] | ((d?: any) => number) | undefined;
    /** 每次迭代结束的回调函数 */
    tick: (() => void) | null;
    /** 是否允许每次迭代结束调用回调函数 */
    enableTick: boolean;
    nodes: INode[] | null;
    edges: Edge[] | null;
    width: number;
    height: number;
    nodeMap: NodeMap;
    nodeIdxMap: IndexMap;
    canvasEl: HTMLCanvasElement;
    onLayoutEnd: () => void;
    /** 是否使用 window.setInterval 运行迭代 */
    animate: Boolean;
    /** 存储节点度数 */
    private degrees;
    /** 迭代中的标识 */
    private timeInterval;
    constructor(options?: GForceLayoutOptions);
    getDefaultCfg(): {
        maxIteration: number;
        gravity: number;
        enableTick: boolean;
        animate: boolean;
    };
    /**
     * 执行布局
     */
    execute(): void;
    run(): void;
    private reachMoveThreshold;
    private runOneStep;
    calRepulsive(accArray: number[], nodes: INode[]): void;
    calAttractive(accArray: number[], edges: Edge[]): void;
    calGravity(accArray: number[], nodes: INode[]): void;
    updateVelocity(accArray: number[], velArray: number[], stepInterval: number, nodes: INode[]): void;
    updatePosition(velArray: number[], stepInterval: number, nodes: INode[]): void;
    stop(): void;
    destroy(): void;
    getType(): string;
}
export {};
