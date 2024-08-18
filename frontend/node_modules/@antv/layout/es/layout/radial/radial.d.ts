/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */
import { PointTuple, Node, OutNode, Edge, RadialLayoutOptions } from "../types";
import { Base } from "../base";
type INode = OutNode & {
    size?: number | PointTuple;
};
/**
 * 辐射状布局
 */
export declare class RadialLayout extends Base {
    /** 布局中心 */
    center: PointTuple;
    /** 停止迭代的最大迭代数 */
    maxIteration: number;
    /** 中心点，默认为数据中第一个点 */
    focusNode: string | Node | null;
    /** 每一圈半径 */
    unitRadius: number | null;
    /** 默认边长度 */
    linkDistance: number;
    /** 是否防止重叠 */
    preventOverlap: boolean;
    /** 节点直径 */
    nodeSize: number | number[] | undefined;
    /** 节点间距，防止节点重叠时节点之间的最小距离（两节点边缘最短距离） */
    nodeSpacing: number | Function | undefined;
    /** 是否必须是严格的 radial 布局，即每一层的节点严格布局在一个环上。preventOverlap 为 true 时生效 */
    strictRadial: boolean;
    /** 防止重叠步骤的最大迭代次数 */
    maxPreventOverlapIteration: number;
    sortBy: string | undefined;
    sortStrength: number;
    width: number | undefined;
    height: number | undefined;
    private focusIndex;
    private distances;
    private eIdealDistances;
    private weights;
    private radii;
    nodes: INode[];
    edges: Edge[];
    onLayoutEnd: () => void;
    constructor(options?: RadialLayoutOptions);
    getDefaultCfg(): {
        maxIteration: number;
        focusNode: null;
        unitRadius: null;
        linkDistance: number;
        preventOverlap: boolean;
        nodeSize: undefined;
        nodeSpacing: undefined;
        strictRadial: boolean;
        maxPreventOverlapIteration: number;
        sortBy: undefined;
        sortStrength: number;
    };
    /**
     * 执行布局
     */
    execute(): {
        nodes: INode[];
        edges: Edge[];
    } | undefined;
    run(): void;
    private oneIteration;
    private eIdealDisMatrix;
    private handleInfinity;
    private maxToFocus;
    getType(): string;
}
export {};
