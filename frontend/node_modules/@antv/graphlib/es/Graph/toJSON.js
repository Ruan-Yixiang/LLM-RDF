import Graph from '.';
/**
 * @description Convert a graph's node to JSON.
 * @description.zh-CN 转换图的节点为 JSON。
 * @param graph
 * @returns
 */

var nodeToJSON = function nodeToJSON(graph) {
  return graph.nodes().map(function (n) {
    var value = graph.node(n);
    var parent = graph.parent(n);
    var node = {
      id: n,
      value: value,
      parent: parent
    };

    if (node.value === undefined) {
      delete node.value;
    }

    if (node.parent === undefined) {
      delete node.parent;
    }

    return node;
  });
};
/**
 * @description Convert all graph's edges to JSON.
 * @description.zh-CN 转换图的所有边为 JSON。
 * @param graph
 * @returns
 */


var edgeToJSON = function edgeToJSON(graph) {
  return graph.edges().map(function (edge) {
    var value = graph.edge(edge);
    var e = {
      v: edge.v,
      w: edge.w,
      value: value,
      name: edge.name
    };

    if (e.name === undefined) {
      delete e.name;
    }

    if (e.value === undefined) {
      delete e.value;
    }

    return e;
  });
};
/**
 * @description Convert a graph to JSON.
 * @description.zh-CN 转换图为 JSON。
 * @param graph
 * @returns
 */


export var write = function write(graph) {
  var json = {
    options: {
      directed: graph.isDirected(),
      multigraph: graph.isMultigraph(),
      compound: graph.isCompound()
    },
    nodes: nodeToJSON(graph),
    edges: edgeToJSON(graph),
    value: graph.graph()
  };

  if (json.value === undefined) {
    delete json.value;
  }

  return json;
};
/**
 * @description read a graph from JSON.
 * @description.zh-CN 从 JSON 读取图。
 * @param json
 * @returns
 */

export var read = function read(json) {
  var graph = new Graph(json.options);

  if (json.value !== undefined) {
    graph.setGraph(json.value);
  }

  json.nodes.forEach(function (entry) {
    graph.setNode(entry.id, entry.value);

    if (entry.parent) {
      graph.setParent(entry.id, entry.parent);
    }
  });
  json.edges.forEach(function (entry) {
    graph.setEdge(entry.v, entry.w, entry.value, entry.name);
  });
  return graph;
};