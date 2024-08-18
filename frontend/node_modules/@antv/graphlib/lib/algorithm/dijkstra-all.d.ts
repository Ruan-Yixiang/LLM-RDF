import Graph, { DefaultEdgeType } from '../Graph';
declare const dijkstraAll: <NodeType, EdgeType>(graph: Graph<NodeType, any, EdgeType, string>, weightFn?: ((node: DefaultEdgeType<NodeType, EdgeType>) => number) | undefined, edgeFn?: ((node: NodeType) => DefaultEdgeType<NodeType, EdgeType>[]) | undefined) => Record<any, Record<string, {
    distance: number;
    predecessor?: unknown;
}>>;
export default dijkstraAll;
