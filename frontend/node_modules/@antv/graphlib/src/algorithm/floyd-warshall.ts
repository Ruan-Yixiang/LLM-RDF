import Graph, { DefaultEdgeType } from '../Graph';

const DEFAULT_WEIGHT_FUNC = () => 1;

export function floydWarshall<NodeIDType, EdgeType>(
  graph: Graph<NodeIDType, any, EdgeType>,
  weightFn?: (node: DefaultEdgeType<NodeIDType, EdgeType>) => number,
  edgeFn?: (node: NodeIDType) => DefaultEdgeType<NodeIDType, EdgeType>[],
) {
  return runFloydWarshall(
    graph,
    weightFn || DEFAULT_WEIGHT_FUNC,
    edgeFn ||
      function (v: NodeIDType) {
        return graph.outEdges(v)!;
      },
  );
}

type Entry<NodeIDType> = {
  distance?: number;
  predecessor?: NodeIDType;
};

function runFloydWarshall<NodeIDType, EdgeType>(
  graph: Graph<NodeIDType, any, EdgeType>,
  weightFn: (node: DefaultEdgeType<NodeIDType, EdgeType>) => number,
  edgeFn: (node: NodeIDType) => DefaultEdgeType<NodeIDType, EdgeType>[],
) {
  var results: Record<string, Record<string, Entry<NodeIDType>>> = {};
  var nodes = graph.nodes();

  nodes.forEach(function (node) {
    const v = String(node);
    results[v] = {};
    results[v][v] = { distance: 0 };
    nodes.forEach(function (w) {
      if (node !== w) {
        results[v][String(w)] = { distance: Number.POSITIVE_INFINITY };
      }
    });
    edgeFn(node).forEach(function (edge) {
      const w = edge.v === node ? edge.w : edge.v;
      let d = weightFn(edge);
      results[v][String(w)] = { distance: d, predecessor: node };
    });
  });

  nodes.forEach(function (nodek) {
    const k = String(nodek);
    var rowK = results[k];
    nodes.forEach(function (nodei) {
      const i = String(nodei);
      var rowI = results[i];
      nodes.forEach(function (nodej) {
        const j = String(nodej);
        var ik = rowI[k];
        var kj = rowK[j];
        var ij = rowI[j];
        var altDistance = ik.distance! + kj.distance!;
        if (altDistance < ij.distance!) {
          ij.distance = altDistance;
          ij.predecessor = kj.predecessor;
        }
      });
    });
  });

  return results;
}

export default floydWarshall;
