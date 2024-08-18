import Graph, { DefaultEdgeType } from '../Graph';
import dijkstra from './dijkstra';

const dijkstraAll = <NodeType, EdgeType>(
  graph: Graph<NodeType, any, EdgeType>,
  weightFn?: (node: DefaultEdgeType<NodeType, EdgeType>) => number,
  edgeFn?: (node: NodeType) => DefaultEdgeType<NodeType, EdgeType>[],
) => {
  const map: Record<any, ReturnType<typeof dijkstra>> = {};
  graph.nodes().forEach((node) => {
    map[String(node)] = dijkstra(graph, node, weightFn, edgeFn);
    return map;
  });
  return map;
};

export default dijkstraAll;
