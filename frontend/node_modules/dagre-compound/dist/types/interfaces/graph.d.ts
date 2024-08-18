import { BaseNode } from '../core/graph';
import { graphlib } from 'dagre';
import { Hierarchy } from '../core/hierarchy';
export declare enum NodeType {
    META = 0,
    NODE = 1,
    BRIDGE = 2
}
export declare enum InclusionType {
    INCLUDE = 0,
    EXCLUDE = 1,
    UNSPECIFIED = 2
}
export declare enum GraphType {
    META = 0,
    CORE = 1,
    BRIDGE = 2
}
export interface GraphDef {
    nodes: NodeDef[];
}
export interface NodeDef {
    name: any;
    inputs: NodeInputDef[];
    path: any[];
    attr?: AttrDef;
    width?: number;
    height?: number;
}
export interface NodeInputDef {
    name: any;
    attr?: AttrDef;
}
export interface AttrDef {
    [key: string]: any;
}
export interface BaseEdge {
    w: any;
    v: any;
    name?: string;
}
export interface BridgeNode extends Node {
    inbound: boolean;
}
export interface Node {
    name: any;
    path?: any[];
    type: NodeType;
    isGroupNode: boolean;
    cardinality: number;
    parentNode: Node;
    include: InclusionType;
    attr: AttrDef;
    width?: number;
    height?: number;
}
export interface MetaNode extends GroupNode {
    depth: number;
    path: any[];
    getFirstChild(): GroupNode | Node;
    getChildren(): Array<GroupNode | BaseNode>;
    leaves(): any[];
}
export interface MetaEdge extends graphlib.EdgeObject {
    baseEdgeList: BaseEdge[];
    inbound?: boolean;
    addBaseEdge(edge: BaseEdge, h: Hierarchy): void;
}
export interface GroupNode extends Node {
    metaGraph: graphlib.Graph<GroupNode | BaseNode, MetaEdge>;
    bridgeGraph: graphlib.Graph<GroupNode | BaseNode, MetaEdge>;
}
