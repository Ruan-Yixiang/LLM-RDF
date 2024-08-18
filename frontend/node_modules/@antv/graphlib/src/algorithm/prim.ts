import Graph, { DefaultEdgeType } from '../Graph';
import PriorityQueue from './PriorityQueue';

const prim = <NodeIdType, NodeType, EdgeType>(
  graph: Graph<NodeIdType, NodeType, EdgeType>,
  weightFn: (node: DefaultEdgeType<NodeIdType, EdgeType>) => number,
) => {
  const result = new Graph<NodeIdType, NodeType, EdgeType>();
  const parents = new Map<NodeIdType, NodeIdType>();
  const pq = new PriorityQueue<NodeIdType>();
  let v: NodeIdType;

  function updateNeighbors(edge: DefaultEdgeType<NodeIdType, EdgeType>) {
    const w = edge.v === v ? edge.w : edge.v;
    const pri = pq.priority(w);
    if (pri !== undefined) {
      const edgeWeight = weightFn(edge);
      if (edgeWeight < pri) {
        parents.set(w, v);
        pq.decrease(w, edgeWeight);
      }
    }
  }

  if (graph.nodeCount() === 0) {
    return result;
  }

  graph.nodes().forEach((node) => {
    pq.add(node, Number.POSITIVE_INFINITY);
    result.setNode(node);
  });

  // Start from an arbitrary node
  pq.decrease(graph.nodes()[0], 0);

  let init = false;
  while (pq.size() > 0) {
    v = pq.removeMin()!;

    if (parents.has(v)) {
      result.setEdge(v, parents.get(v)!);
    } else if (init) {
      throw new Error('Input graph is not connected: ' + graph.graph());
    } else {
      init = true;
    }

    graph.nodeEdges(v)?.forEach(updateNeighbors);
  }

  return result;
};

export default prim;
