import Graph from '../Graph';
/**
 * @description Tarjan's algorithm for finding the strongly connected components of a graph.
 * @description https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm
 * @description.zh-CN Tarjan 算法用于找到图的强连通子图。
 * @param graph
 * @returns
 */
declare const tarjan: <NodeIDType>(graph: Graph<NodeIDType, Record<string, any>, Record<string, any>, string>) => NodeIDType[][];
export default tarjan;
