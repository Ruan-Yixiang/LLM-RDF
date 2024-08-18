import Graph from '../Graph';
/**
 * @description Get the graph's complement
 * @description.zh-CN 获取图的补图
 */
export declare const getGraphComplement: <NodeIDType = any, EdgeType = any>(originGraph: Graph<NodeIDType, any, EdgeType, any>) => Graph<NodeIDType, any, EdgeType, any> | null;
