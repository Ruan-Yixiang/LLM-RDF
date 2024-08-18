import dijkstra from './dijkstra';

var dijkstraAll = function dijkstraAll(graph, weightFn, edgeFn) {
  var map = {};
  graph.nodes().forEach(function (node) {
    map[String(node)] = dijkstra(graph, node, weightFn, edgeFn);
    return map;
  });
  return map;
};

export default dijkstraAll;