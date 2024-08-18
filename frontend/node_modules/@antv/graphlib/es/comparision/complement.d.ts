import Graph from '../Graph';
/**
 * @description Check if one graph is the complement of another graph.
 * @description.zh-CN 检查一个图是否是另一个图的补图。
 */
export declare const isGraphComplement: <NodeIDType = any, EdgeType = any>(originGraph: Graph<NodeIDType, any, EdgeType, any>, targetGraph: Graph<NodeIDType, any, EdgeType, any>) => boolean;
