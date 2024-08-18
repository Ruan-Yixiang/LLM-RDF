/// <reference path="types/dagre.d.ts" />
import { DeepPartial } from './core/util';
import { HierarchyBaseEdgeInfo, HierarchyBaseNodeInfo, HierarchyFlattenedGraphInfo, HierarchyGraphDef, HierarchyGraphEdgeDef, HierarchyGraphNodeInfo, HierarchyGraphOption } from './interfaces/hierarchy';
import { LayoutConfig } from './interfaces/layout';
export declare function buildGraph(graphDef: HierarchyGraphDef, option?: HierarchyGraphOption, setting?: DeepPartial<LayoutConfig>): HierarchyGraphNodeInfo;
export declare function flatGraph(renderInfo: HierarchyGraphNodeInfo, abs?: boolean): HierarchyFlattenedGraphInfo;
export declare function getEdges(source: string, target: string, flattenedNodes: Array<HierarchyBaseNodeInfo | HierarchyGraphNodeInfo>, sourceEdge?: HierarchyGraphEdgeDef): HierarchyBaseEdgeInfo[];
