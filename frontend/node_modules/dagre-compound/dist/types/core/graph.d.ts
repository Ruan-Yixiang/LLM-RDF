import { graphlib } from 'dagre';
import { Hierarchy } from './hierarchy';
import { AttrDef, InclusionType, NodeDef, NodeInputDef, NodeType, Node, BaseEdge, GraphDef, MetaNode, GroupNode, MetaEdge } from '../interfaces/graph';
export declare class BaseNode implements NodeDef, Node {
    attr: AttrDef;
    inputs: NodeInputDef[];
    name: any;
    cardinality: number;
    include: InclusionType;
    isGroupNode: boolean;
    parentNode: Node;
    type: NodeType;
    path: any[];
    width?: number;
    height?: number;
    constructor(rawNode: NodeDef);
}
export declare class SlimGraph {
    nodes: {
        [nodeName: string]: BaseNode;
    };
    edges: BaseEdge[];
    constructor();
}
export declare function addEdgeToGraph(graph: SlimGraph, outputNode: BaseNode, input: NodeInputDef): void;
export declare function buildDef(graphDef: GraphDef): SlimGraph;
export declare class MetaNodeImpl implements MetaNode {
    attr: AttrDef;
    bridgeGraph: graphlib.Graph<GroupNode | BaseNode, MetaEdge>;
    cardinality: number;
    depth: number;
    include: InclusionType;
    isGroupNode: boolean;
    metaGraph: graphlib.Graph<GroupNode | BaseNode, MetaEdge>;
    name: string;
    parentNode: Node;
    type: NodeType;
    path: any[];
    constructor(name: string, opt?: {});
    getFirstChild(): GroupNode | BaseNode;
    getChildren(): Array<GroupNode | BaseNode>;
    leaves(): any[];
}
export declare class MetaEdgeImpl implements MetaEdge {
    v: string;
    w: string;
    baseEdgeList: BaseEdge[];
    inbound: boolean;
    name: string;
    constructor(v: string, w: string);
    addBaseEdge(edge: BaseEdge, _h: Hierarchy): void;
}
export declare function createMetaNode(name: string, opt?: {}): MetaNode;
export declare function createMetaEdge(v: string, w: string): MetaEdge;
export declare function createGraph<N, E>(name: string, type: string | number, opt?: graphlib.GraphOptions): graphlib.Graph<N, E>;
