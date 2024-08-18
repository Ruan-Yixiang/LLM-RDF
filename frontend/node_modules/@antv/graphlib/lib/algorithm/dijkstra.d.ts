import Graph, { DefaultEdgeType } from '../Graph';
/**
 * @description Dijkstra's algorithm for single-source shortest paths.
 * @description https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
 * @description.zh-CN Dijkstra 算法用于单源最短路径。
 */
declare const dijkstra: <NodeIDType, EdgeType>(graph: Graph<NodeIDType, any, EdgeType, string>, source: NodeIDType, weightFn?: ((node: DefaultEdgeType<NodeIDType, EdgeType>) => number) | undefined, edgeFn?: ((node: NodeIDType) => DefaultEdgeType<NodeIDType, EdgeType>[]) | undefined) => Record<string, Entry<NodeIDType>>;
declare type Entry<NodeIDType> = {
    distance: number;
    predecessor?: NodeIDType;
};
export default dijkstra;
