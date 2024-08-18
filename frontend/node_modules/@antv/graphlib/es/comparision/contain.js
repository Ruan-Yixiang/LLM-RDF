/**
 * @file Functions that used to find similar element between two graph
 * @file.zh-CN 在两个图中查找相似元素的函数
 */

/**
 * @description Check if two graphs are contains the same nodes.
 * @description.zh-CN 检查两个图是否包含相同的节点。
 */
export var containSameNodes = function containSameNodes(aGraph, bGraph) {
  var aNodes = aGraph.nodes();

  for (var i = 0; i < aNodes.length; i++) {
    var aNode = aNodes[i];

    if (bGraph.hasNode(aNode)) {
      return true;
    }
  }

  return false;
};
/**
 * @description Check if two graphs are contains the same edges.
 * @description.zh-CN 检查两个图是否包含相同的边。
 */

export var containSameEdges = function containSameEdges(aGraph, bGraph) {
  var aEdges = aGraph.edges();

  for (var i = 0; i < aEdges.length; i++) {
    var aEdge = aEdges[i];

    if (bGraph.hasEdge(aEdge.v, aEdge.w, aEdge.name)) {
      return true;
    }
  }

  return false;
};
/**
 * @description get same nodes in two graphs.
 * @description.zh-CN 获取两个图中相同的节点。
 */

export var getSameNodes = function getSameNodes(aGraph, bGraph) {
  var aNodes = aGraph.nodes();
  var sameNodes = aNodes.filter(function (aNode) {
    return bGraph.hasNode(aNode);
  });
  return sameNodes;
};
/**
 * @description get same edges in two graphs.
 * @description.zh-CN 获取两个图中相同的边。
 */

export var getSameEdges = function getSameEdges(aGraph, bGraph) {
  var aEdges = aGraph.edges();
  var sameEdges = aEdges.filter(function (aEdge) {
    return bGraph.hasEdge(aEdge.v, aEdge.w, aEdge.name);
  });
  return sameEdges;
};
/**
 * @description Check if two graphs'option are the same.
 * @description.zh-CN 检查两个图的选项是否相同。
 */

export var isGraphOptionSame = function isGraphOptionSame(aGraph, bGraph) {
  return aGraph.isCompound() === bGraph.isCompound() && aGraph.isDirected() === bGraph.isDirected() && aGraph.isMultigraph() === bGraph.isMultigraph();
};
/**
 * @description Check if a graph contains all nodes in another graph.
 * @description.zh-CN 检查一个图是否包含另一个图的所有节点。
 */

export var containAllSameNodes = function containAllSameNodes(aGraph, bGraph) {
  var sameNodes = getSameNodes(aGraph, bGraph);
  return sameNodes.length === aGraph.nodes().length;
};
/**
 * @description Check if a graph contains all edges in another graph.
 * @description.zh-CN 检查一个图是否包含另一个图的所有边。
 */

export var containAllSameEdges = function containAllSameEdges(aGraph, bGraph) {
  var sameEdges = getSameEdges(aGraph, bGraph);
  return sameEdges.length === aGraph.edges().length;
};
/**
 * @description Check if two graphs are the same.
 * @description.zh-CN 检查两个图是否相同。
 */

export var isGraphSame = function isGraphSame(aGraph, bGraph) {
  return isGraphOptionSame(aGraph, bGraph) && aGraph.nodeCount() === bGraph.nodeCount() && containAllSameNodes(aGraph, bGraph) && aGraph.edgeCount() === bGraph.edgeCount() && containAllSameEdges(aGraph, bGraph);
};
/**
 * @description Check if one graph is the subgraph of another graph.
 * @description.zh-CN 检查一个图是否是另一个图的子图。
 */

export var isGraphContainsAnother = function isGraphContainsAnother(originGraph, targetGraph) {
  return containAllSameNodes(originGraph, targetGraph) && containAllSameEdges(originGraph, targetGraph);
};