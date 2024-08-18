/**
 * @fileOverview MDS layout
 * @author shiwu.wyy@antfin.com
 */
import { PointTuple, OutNode, Edge, Matrix, MDSLayoutOptions } from "./types";
import { Base } from "./base";
/**
 * mds 布局
 */
export declare class MDSLayout extends Base {
    /** 布局中心 */
    center: PointTuple;
    /** 边长度 */
    linkDistance: number;
    private scaledDistances;
    nodes: OutNode[];
    edges: Edge[];
    /** 迭代结束的回调函数 */
    onLayoutEnd: () => void;
    constructor(options?: MDSLayoutOptions);
    getDefaultCfg(): {
        center: number[];
        linkDistance: number;
    };
    /**
     * 执行布局
     */
    execute(): {
        nodes: OutNode[];
        edges: Edge[];
    } | undefined;
    /**
     * mds 算法
     * @return {array} positions 计算后的节点位置数组
     */
    runMDS(): PointTuple[];
    handleInfinity(distances: Matrix[]): void;
    getType(): string;
}
