/**
 * @file Functions that used to find similar element between two graph
 * @file.zh-CN 在两个图中查找相似元素的函数
 */
import Graph from '../Graph';
/**
 * @description Check if two graphs are contains the same nodes.
 * @description.zh-CN 检查两个图是否包含相同的节点。
 */
export declare const containSameNodes: <NodeIDType = any>(aGraph: Graph<NodeIDType, Record<string, any>, Record<string, any>, string>, bGraph: Graph<NodeIDType, Record<string, any>, Record<string, any>, string>) => boolean;
/**
 * @description Check if two graphs are contains the same edges.
 * @description.zh-CN 检查两个图是否包含相同的边。
 */
export declare const containSameEdges: <NodeIDType = any>(aGraph: Graph<NodeIDType, any, any, string>, bGraph: Graph<NodeIDType, any, any, string>) => boolean;
/**
 * @description get same nodes in two graphs.
 * @description.zh-CN 获取两个图中相同的节点。
 */
export declare const getSameNodes: <NodeIDType = any>(aGraph: Graph<NodeIDType, Record<string, any>, Record<string, any>, string>, bGraph: Graph<NodeIDType, Record<string, any>, Record<string, any>, string>) => NodeIDType[];
/**
 * @description get same edges in two graphs.
 * @description.zh-CN 获取两个图中相同的边。
 */
export declare const getSameEdges: <NodeIDType = any, EdgeType = any>(aGraph: Graph<NodeIDType, any, EdgeType, any>, bGraph: Graph<NodeIDType, any, EdgeType, any>) => import("../Graph").DefaultEdgeType<NodeIDType, EdgeType>[];
/**
 * @description Check if two graphs'option are the same.
 * @description.zh-CN 检查两个图的选项是否相同。
 */
export declare const isGraphOptionSame: <NodeIDType = any, EdgeType = any>(aGraph: Graph<NodeIDType, any, EdgeType, any>, bGraph: Graph<NodeIDType, any, EdgeType, any>) => boolean;
/**
 * @description Check if a graph contains all nodes in another graph.
 * @description.zh-CN 检查一个图是否包含另一个图的所有节点。
 */
export declare const containAllSameNodes: <NodeIDType = any>(aGraph: Graph<NodeIDType, any, any, any>, bGraph: Graph<NodeIDType, any, any, any>) => boolean;
/**
 * @description Check if a graph contains all edges in another graph.
 * @description.zh-CN 检查一个图是否包含另一个图的所有边。
 */
export declare const containAllSameEdges: <NodeIDType = any, EdgeType = any>(aGraph: Graph<NodeIDType, any, EdgeType, any>, bGraph: Graph<NodeIDType, any, EdgeType, any>) => boolean;
/**
 * @description Check if two graphs are the same.
 * @description.zh-CN 检查两个图是否相同。
 */
export declare const isGraphSame: <NodeIDType = any, EdgeType = any>(aGraph: Graph<NodeIDType, any, EdgeType, any>, bGraph: Graph<NodeIDType, any, EdgeType, any>) => boolean;
/**
 * @description Check if one graph is the subgraph of another graph.
 * @description.zh-CN 检查一个图是否是另一个图的子图。
 */
export declare const isGraphContainsAnother: <NodeIDType = any, EdgeType = any>(originGraph: Graph<NodeIDType, any, EdgeType, any>, targetGraph: Graph<NodeIDType, any, EdgeType, any>) => boolean;
