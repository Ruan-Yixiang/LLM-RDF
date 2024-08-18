import { BaseNode, SlimGraph } from './graph';
import { graphlib } from 'dagre';
import { HierarchyParams } from '../interfaces/hierarchy';
import { GroupNode, MetaEdge, MetaNode } from '../interfaces/graph';
export declare class Hierarchy {
    graphOptions: graphlib.GraphOptions;
    private readonly index;
    root: MetaNode;
    constructor(graphOptions?: graphlib.GraphOptions);
    getNodeMap(): {
        [nodeName: string]: GroupNode | BaseNode;
    };
    node(name: string): GroupNode | BaseNode;
    setNode(name: any, node: GroupNode | BaseNode): void;
    getBridgeGraph(nodeName: string): graphlib.Graph<GroupNode | BaseNode, MetaEdge> | null;
    getChildName(nodeName: string, descendantName: string): string;
    getPredecessors(nodeName: string): MetaEdge[];
    getSuccessors(nodeName: string): MetaEdge[];
    getOneWayEdges(node: GroupNode | BaseNode, inEdges: boolean): MetaEdge[];
}
export declare function buildHierarchy(graph: SlimGraph, params: HierarchyParams): Hierarchy;
