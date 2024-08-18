/**
 * @fileOverview Combo force layout
 * @author shiwu.wyy@antfin.com
 */
import { Edge, Combo, OutNode, PointTuple, ComboTree, ComboCombinedLayoutOptions } from './types';
import { Base } from './base';
import { CircularLayout, ConcentricLayout, GridLayout, RadialLayout } from '.';
type Node = OutNode & {
    depth?: number;
    itemType?: string;
    comboId?: string;
    fx?: number;
    fy?: number;
    mass?: number;
};
/**
 * combined two layouts (inner and outer) for graph with combos
 */
export declare class ComboCombinedLayout extends Base {
    /** 布局中心 */
    center: PointTuple;
    /** 内部计算参数 */
    nodes: Node[];
    edges: Edge[];
    combos: Combo[];
    comboEdges: Edge[];
    /** 节点大小，用于防止节点之间的重叠 */
    nodeSize: number | number[] | ((d?: unknown) => number) | undefined;
    /** 节点/combo最小间距，防止重叠时的间隙 */
    spacing: ((d?: unknown) => number) | number | undefined;
    /** 最外层的布局算法，需要使用同步的布局算法，默认为 forceAtlas2 */
    outerLayout: any;
    /** combo 内部的布局算法，默认为 concentric */
    innerLayout: ConcentricLayout | CircularLayout | GridLayout | RadialLayout;
    /** Combo 内部的 padding */
    comboPadding: ((d?: unknown) => number) | number | number[] | undefined;
    comboTrees: ComboTree[];
    constructor(options?: ComboCombinedLayoutOptions);
    getDefaultCfg(): {};
    /**
     * 执行布局
     */
    execute(): void;
    run(): {
        nodes: Node[];
        edges: Edge[];
        combos: Combo[];
        comboEdges: Edge[];
    };
    private getInnerGraphs;
    private initVals;
    getType(): string;
}
export {};
