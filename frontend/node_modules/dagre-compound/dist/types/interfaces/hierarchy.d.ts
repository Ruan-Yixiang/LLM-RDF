import { Align, RankDir } from './common';
import { AttrDef, BaseEdge } from './graph';
export declare enum HierarchyNodeType {
    META = 0,
    OP = 1,
    SERIES = 2
}
export interface HierarchyGraphOption {
    rankDirection?: RankDir;
    expanded?: string[];
}
export interface HierarchyParams {
    rankDirection: RankDir;
    align?: Align;
}
export interface HierarchyGraphNodeDef {
    id: any;
    width?: number;
    height?: number;
    [key: string]: any;
}
export interface HierarchyGraphEdgeDef {
    v: any;
    w: any;
    weight?: number;
    [key: string]: any;
}
export interface HierarchyGraphCompoundDef {
    [parent: string]: any[];
}
export interface HierarchyGraphDef {
    nodes: HierarchyGraphNodeDef[];
    edges: HierarchyGraphEdgeDef[];
    compound?: HierarchyGraphCompoundDef;
}
export interface HierarchyBaseNodeInfo {
    id: any;
    name: string;
    type: HierarchyNodeType | number;
    cardinality: number;
    attr: AttrDef;
    parentNodeName: string | null;
    coreBox: {
        width: number;
        height: number;
    };
    x: number;
    y: number;
    width: number;
    height: number;
    radius: number;
    labelHeight: number;
    labelOffset: number;
    outboxWidth: number;
    paddingTop: number;
    paddingLeft: number;
    paddingRight: number;
    paddingBottom: number;
    path?: any[];
    [key: string]: any;
}
export interface HierarchyBaseEdgeInfo {
    v: string;
    w: string;
    weight: number;
    inbound?: boolean;
    points: Array<{
        x: number;
        y: number;
    }>;
    adjoiningEdge: {
        w: string;
        v: string;
    } | null;
    baseEdgeList: BaseEdge[];
    parentNodeName?: string | null;
    [key: string]: any;
}
export interface HierarchyGraphNodeInfo extends HierarchyBaseNodeInfo {
    expanded: boolean;
    nodes: Array<HierarchyBaseNodeInfo | HierarchyGraphNodeInfo>;
    edges: HierarchyBaseEdgeInfo[];
}
export interface HierarchyFlattenedGraphInfo {
    nodes: Array<HierarchyBaseNodeInfo | HierarchyGraphNodeInfo>;
    edges: HierarchyBaseEdgeInfo[];
}
