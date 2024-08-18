/**
 * @fileOverview fruchterman layout
 * @author shiwu.wyy@antfin.com
 */
import { OutNode, Edge, PointTuple, IndexMap, FruchtermanLayoutOptions } from "./types";
import { Base } from "./base";
type NodeMap = {
    [key: string]: INode;
};
type INode = OutNode & {
    cluster: string;
};
/**
 * fruchterman 布局
 */
export declare class FruchtermanLayout extends Base {
    /** 布局中心 */
    center: PointTuple;
    /** 停止迭代的最大迭代数 */
    maxIteration: number;
    /** 是否启动 worker */
    workerEnabled: boolean;
    /** 重力大小，影响图的紧凑程度 */
    gravity: number;
    /** 速度 */
    speed: number;
    /** 是否产生聚类力 */
    clustering: boolean;
    /** 聚类力大小 */
    clusterGravity: number;
    nodes: INode[] | null;
    edges: Edge[] | null;
    width: number;
    height: number;
    nodeMap: NodeMap;
    nodeIdxMap: IndexMap;
    /** 迭代结束的回调函数 */
    onLayoutEnd: () => void;
    /** 每次迭代结束的回调函数 */
    tick: (() => void) | null;
    /** 是否使用 window.setInterval 运行迭代 */
    animate: boolean;
    /** 迭代中的标识 */
    private timeInterval;
    constructor(options?: FruchtermanLayoutOptions);
    getDefaultCfg(): {
        maxIteration: number;
        gravity: number;
        speed: number;
        clustering: boolean;
        clusterGravity: number;
        animate: boolean;
    };
    /**
     * 执行布局
     */
    execute(): {
        nodes: INode[];
        edges: Edge[] | null;
    } | undefined;
    run(): {
        nodes: INode[];
        edges: Edge[] | null;
    } | undefined;
    private runOneStep;
    private applyCalculate;
    private calRepulsive;
    private calAttractive;
    stop(): void;
    destroy(): void;
    getType(): string;
}
export {};
