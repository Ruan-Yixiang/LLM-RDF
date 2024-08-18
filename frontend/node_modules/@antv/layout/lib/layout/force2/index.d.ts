/**
 * @fileOverview fruchterman layout
 * @author shiwu.wyy@antfin.com
 */
import { OutNode, Edge, PointTuple, IndexMap, GForceLayoutOptions, NodeMap, CentripetalOptions } from '../types';
import { Base } from '../base';
type INode = OutNode & {
    size: number | PointTuple;
};
/**
 * graphin 中的 force 布局
 */
export declare class Force2Layout extends Base {
    /** 布局中心 */
    center: PointTuple;
    /** 停止迭代的最大迭代数 */
    maxIteration: number;
    /** 是否启动 worker */
    workerEnabled: boolean;
    /** 弹簧引力系数 */
    edgeStrength: number | ((d?: any) => number) | undefined;
    /** 斥力系数 */
    nodeStrength: number | ((d?: any, edges?: any[]) => number) | undefined;
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
    /** 计算画布上下两侧对节点吸引力大小  */
    defSideCoe?: (node: Node, edges: Edge[]) => number;
    /** 理想边长 */
    linkDistance: number | ((edge?: any, source?: any, target?: any) => number) | undefined;
    /** 理想边长，兼容 graphin-force */
    defSpringLen: number | ((edge?: any, source?: any, target?: any) => number) | undefined;
    /** 重力大小 */
    gravity: number;
    /** 向心力 */
    centripetalOptions: CentripetalOptions;
    /** 是否需要叶子节点聚类 */
    leafCluster: boolean;
    /** 是否需要全部节点聚类 */
    clustering: boolean;
    /** 节点聚类的映射字段 */
    nodeClusterBy: string;
    /** 节点聚类作用力系数 */
    clusterNodeStrength: number | ((node: Node) => number);
    /** 是否防止重叠 */
    preventOverlap: boolean;
    /** 防止重叠时的节点大小，默认从节点数据中取 size */
    nodeSize: number | number[] | ((d?: any) => number) | undefined;
    /** 防止重叠时的节点之间最小间距 */
    nodeSpacing: number | number[] | ((d?: any) => number) | undefined;
    /** 阈值的使用条件，mean 代表平均移动距离小于 minMovement 时停止迭代，max 代表最大移动距离大时 minMovement 时停时迭代。默认为 mean */
    distanceThresholdMode: 'mean' | 'max' | 'min';
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
    /** 监控信息，不配置则不计算 */
    monitor: (params: {
        energy: number;
        nodes: INode[];
        edge: Edge[];
        iterations: number;
    }) => void;
    /** 存储节点度数 */
    private degreesMap;
    /** 迭代中的标识 */
    private timeInterval;
    /** 与 minMovement 进行对比的判断停止迭代节点移动距离 */
    private judgingDistance;
    /** 缓存一个节点的相关边数据 */
    private relatedEdges;
    /** 缓存当前迭代中最小和最大的 y 值，用于计算上下引力 */
    private currentMinY;
    private currentMaxY;
    constructor(options?: GForceLayoutOptions);
    getCentripetalOptions(): void;
    updateCfg(cfg: any): void;
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
    private runOneStep;
    private calTotalEnergy;
    calRepulsive(accArray: number[]): void;
    calAttractive(accArray: number[]): void;
    calGravity(accArray: number[]): void;
    /**
     * Attract forces to the top and bottom.
     * @param accArray
     * @returns
     */
    attractToSide(accArray: number[]): void;
    updateVelocity(accArray: number[], velArray: number[], stepInterval: number): void;
    updatePosition(velArray: number[], stepInterval: number): void;
    stop(): void;
    destroy(): void;
    getType(): string;
    private getSameTypeLeafMap;
}
export {};
