var DEFAULT_WEIGHT_FUNC = function DEFAULT_WEIGHT_FUNC() {
  return 1;
};

export function floydWarshall(graph, weightFn, edgeFn) {
  return runFloydWarshall(graph, weightFn || DEFAULT_WEIGHT_FUNC, edgeFn || function (v) {
    return graph.outEdges(v);
  });
}

function runFloydWarshall(graph, weightFn, edgeFn) {
  var results = {};
  var nodes = graph.nodes();
  nodes.forEach(function (node) {
    var v = String(node);
    results[v] = {};
    results[v][v] = {
      distance: 0
    };
    nodes.forEach(function (w) {
      if (node !== w) {
        results[v][String(w)] = {
          distance: Number.POSITIVE_INFINITY
        };
      }
    });
    edgeFn(node).forEach(function (edge) {
      var w = edge.v === node ? edge.w : edge.v;
      var d = weightFn(edge);
      results[v][String(w)] = {
        distance: d,
        predecessor: node
      };
    });
  });
  nodes.forEach(function (nodek) {
    var k = String(nodek);
    var rowK = results[k];
    nodes.forEach(function (nodei) {
      var i = String(nodei);
      var rowI = results[i];
      nodes.forEach(function (nodej) {
        var j = String(nodej);
        var ik = rowI[k];
        var kj = rowK[j];
        var ij = rowI[j];
        var altDistance = ik.distance + kj.distance;

        if (altDistance < ij.distance) {
          ij.distance = altDistance;
          ij.predecessor = kj.predecessor;
        }
      });
    });
  });
  return results;
}

export default floydWarshall;