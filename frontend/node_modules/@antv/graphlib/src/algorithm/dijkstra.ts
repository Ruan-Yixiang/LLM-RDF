import Graph, { DefaultEdgeType } from '../Graph';
import PriorityQueue from './PriorityQueue';

const DEFAULT_WEIGHT_FUNC = () => 1;

/**
 * @description Dijkstra's algorithm for single-source shortest paths.
 * @description https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
 * @description.zh-CN Dijkstra 算法用于单源最短路径。
 */
const dijkstra = <NodeIDType, EdgeType>(
  graph: Graph<NodeIDType, any, EdgeType>,
  source: NodeIDType,
  weightFn?: (node: DefaultEdgeType<NodeIDType, EdgeType>) => number,
  edgeFn?: (node: NodeIDType) => DefaultEdgeType<NodeIDType, EdgeType>[],
) => {
  return runDijkstra<NodeIDType, EdgeType>(
    graph,
    source,
    weightFn || DEFAULT_WEIGHT_FUNC,
    edgeFn ||
      function (v: NodeIDType) {
        return graph.outEdges(v)!;
      },
  );
};

type Entry<NodeIDType> = {
  distance: number;
  predecessor?: NodeIDType;
};

/**
 * @description Dijkstra's algorithm for single-source shortest paths.
 * @description https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
 * @description.zh-CN Dijkstra 算法用于单源最短路径。
 */
const runDijkstra = <NodeIDType, EdgeType>(
  graph: Graph<NodeIDType, any, EdgeType>,
  source: NodeIDType,
  weightFn: (node: DefaultEdgeType<NodeIDType, EdgeType>) => number,
  edgeFn: (node: NodeIDType) => DefaultEdgeType<NodeIDType, EdgeType>[],
) => {
  const results: Map<NodeIDType, Entry<NodeIDType>> = new Map();
  const pq = new PriorityQueue<NodeIDType>();
  let v: NodeIDType | undefined;
  let vEntry: Entry<NodeIDType> | undefined;

  const updateNeighbors = (edge: DefaultEdgeType<NodeIDType, EdgeType>) => {
    const w = edge.v !== v ? edge.v : edge.w;
    const wEntry = results.get(w)!;
    const weight = weightFn(edge);

    const distance = vEntry!.distance + weight;

    if (weight < 0) {
      throw new Error(
        'dijkstra does not allow negative edge weights. ' +
          'Bad edge: ' +
          edge +
          ' Weight: ' +
          weight,
      );
    }

    // If there is already a shorter path to w, ignore this edge.
    if (distance < wEntry.distance) {
      wEntry.distance = distance;
      wEntry.predecessor = v;
      pq.decrease(w, distance);
    }
  };

  graph.nodes().forEach((v) => {
    const distance = v === source ? 0 : Number.POSITIVE_INFINITY;
    results.set(v, { distance });
    pq.add(v, distance);
  });

  while (pq.size() > 0) {
    v = pq.removeMin()!;
    vEntry = results.get(v);
    if (vEntry && vEntry.distance === Number.POSITIVE_INFINITY) {
      break;
    }
    edgeFn(v).forEach(updateNeighbors);
  }

  const obj = {} as Record<string, Entry<NodeIDType>>;
  Array.from(results.entries()).forEach(([node, e]) => {
    obj[String(node)] = e;
    return obj;
  });
  return obj;
};

export default dijkstra;
