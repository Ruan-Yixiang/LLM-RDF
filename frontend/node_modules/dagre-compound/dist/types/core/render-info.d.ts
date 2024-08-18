import { Hierarchy } from './hierarchy';
import { graphlib } from 'dagre';
import { Node, GroupNode, AttrDef, MetaEdge } from '../interfaces/graph';
import { Point } from '../interfaces/layout';
export declare class RenderGraphInfo {
    hierarchy: Hierarchy;
    private readonly index;
    private readonly hasSubHierarchy;
    root: RenderGroupNodeInfo;
    constructor(hierarchy: Hierarchy);
    getRenderInfoNodes(): RenderNodeInfo[];
    getSubHierarchy(): {
        [nodeName: string]: boolean;
    };
    buildSubHierarchy(nodeName: string): void;
    getOrCreateRenderNodeByName(nodeName: string): RenderNodeInfo;
    getRenderNodeByName(nodeName: string): RenderNodeInfo;
    getNodeByName(nodeName: string): Node;
}
export declare class RenderNodeInfo<T extends Node = Node> {
    node: T;
    expanded: boolean;
    x: number;
    y: number;
    width: number;
    height: number;
    coreBox: {
        width: number;
        height: number;
    };
    outboxWidth: number;
    labelOffset: number;
    radius: number;
    labelHeight: number;
    paddingTop: number;
    paddingLeft: number;
    paddingRight: number;
    paddingBottom: number;
    displayName: any;
    attr: AttrDef;
    constructor(node: T);
}
export declare class RenderMetaEdgeInfo {
    metaEdge: MetaEdge;
    adjoiningMetaEdge: RenderMetaEdgeInfo;
    weight: number;
    points: Point[];
    constructor(metaEdge: MetaEdge);
}
export declare class RenderGroupNodeInfo extends RenderNodeInfo<GroupNode> {
    coreGraph: graphlib.Graph<RenderNodeInfo, RenderMetaEdgeInfo>;
    constructor(groupNode: GroupNode, graphOptions: graphlib.GraphOptions);
}
export declare function buildRenderInfo(graphHierarchy: Hierarchy): RenderGraphInfo;
