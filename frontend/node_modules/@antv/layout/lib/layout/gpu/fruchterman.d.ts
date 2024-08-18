/**
 * @fileOverview fruchterman layout
 * @author shiwu.wyy@antfin.com
 */
import { OutNode, Edge, PointTuple, IndexMap, FruchtermanGPULayoutOptions } from "../types";
import { Base } from "../base";
type INode = OutNode & {
    cluster: string | number;
};
type NodeMap = {
    [key: string]: INode;
};
/**
 * fruchterman 布局
 */
export declare class FruchtermanGPULayout extends Base {
    /** 布局中心 */
    center: PointTuple;
    /** 停止迭代的最大迭代数 */
    maxIteration: number;
    /** 重力大小，影响图的紧凑程度 */
    gravity: number;
    /** 速度 */
    speed: number;
    /** 是否产生聚类力 */
    clustering: boolean;
    /** 根据哪个字段聚类 */
    clusterField: string;
    /** 聚类力大小 */
    clusterGravity: number;
    /** 是否启用web worker。前提是在web worker里执行布局，否则无效	*/
    workerEnabled: boolean;
    nodes: INode[];
    edges: Edge[];
    width: number;
    height: number;
    nodeMap: NodeMap;
    nodeIdxMap: IndexMap;
    canvasEl: HTMLCanvasElement;
    onLayoutEnd: () => void;
    constructor(options?: FruchtermanGPULayoutOptions);
    getDefaultCfg(): {
        maxIteration: number;
        gravity: number;
        speed: number;
        clustering: boolean;
        clusterGravity: number;
    };
    /**
     * 执行布局
     */
    execute(): Promise<void>;
    executeWithWorker(canvas?: HTMLCanvasElement, ctx?: any): Promise<void>;
    run(canvas?: HTMLCanvasElement, ctx?: any): Promise<void>;
    getType(): string;
}
export {};
