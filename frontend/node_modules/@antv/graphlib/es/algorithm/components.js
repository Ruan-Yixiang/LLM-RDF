var components = function components(graph) {
  var visited = new Set();
  var resultComponents = [];
  var nodes = graph.nodes();
  nodes.forEach(function (n) {
    var componentsArr = [];
    var waitingList = [n];

    while (waitingList.length > 0) {
      var node = waitingList.pop();

      if (!visited.has(node)) {
        var _graph$successors, _graph$predecessors;

        visited.add(node);
        componentsArr.push(node);
        (_graph$successors = graph.successors(node)) === null || _graph$successors === void 0 ? void 0 : _graph$successors.forEach(function (n) {
          return waitingList.push(n);
        });
        (_graph$predecessors = graph.predecessors(node)) === null || _graph$predecessors === void 0 ? void 0 : _graph$predecessors.forEach(function (n) {
          return waitingList.push(n);
        });
      }
    }

    if (componentsArr.length) {
      resultComponents.push(componentsArr);
    }
  });
  return resultComponents;
};

export default components;