import Graph from '../Graph';
import PriorityQueue from './PriorityQueue';

var prim = function prim(graph, weightFn) {
  var result = new Graph();
  var parents = new Map();
  var pq = new PriorityQueue();
  var v;

  function updateNeighbors(edge) {
    var w = edge.v === v ? edge.w : edge.v;
    var pri = pq.priority(w);

    if (pri !== undefined) {
      var edgeWeight = weightFn(edge);

      if (edgeWeight < pri) {
        parents.set(w, v);
        pq.decrease(w, edgeWeight);
      }
    }
  }

  if (graph.nodeCount() === 0) {
    return result;
  }

  graph.nodes().forEach(function (node) {
    pq.add(node, Number.POSITIVE_INFINITY);
    result.setNode(node);
  }); // Start from an arbitrary node

  pq.decrease(graph.nodes()[0], 0);
  var init = false;

  while (pq.size() > 0) {
    var _graph$nodeEdges;

    v = pq.removeMin();

    if (parents.has(v)) {
      result.setEdge(v, parents.get(v));
    } else if (init) {
      throw new Error('Input graph is not connected: ' + graph.graph());
    } else {
      init = true;
    }

    (_graph$nodeEdges = graph.nodeEdges(v)) === null || _graph$nodeEdges === void 0 ? void 0 : _graph$nodeEdges.forEach(updateNeighbors);
  }

  return result;
};

export default prim;