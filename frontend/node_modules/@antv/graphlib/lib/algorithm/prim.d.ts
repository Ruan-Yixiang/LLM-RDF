import Graph, { DefaultEdgeType } from '../Graph';
declare const prim: <NodeIdType, NodeType, EdgeType>(graph: Graph<NodeIdType, NodeType, EdgeType, string>, weightFn: (node: DefaultEdgeType<NodeIdType, EdgeType>) => number) => Graph<NodeIdType, NodeType, EdgeType, string>;
export default prim;
