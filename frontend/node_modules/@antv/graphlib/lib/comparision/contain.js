"use strict";
/**
 * @file Functions that used to find similar element between two graph
 * @file.zh-CN 在两个图中查找相似元素的函数
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGraphContainsAnother = exports.isGraphSame = exports.containAllSameEdges = exports.containAllSameNodes = exports.isGraphOptionSame = exports.getSameEdges = exports.getSameNodes = exports.containSameEdges = exports.containSameNodes = void 0;
/**
 * @description Check if two graphs are contains the same nodes.
 * @description.zh-CN 检查两个图是否包含相同的节点。
 */
var containSameNodes = function (aGraph, bGraph) {
    var aNodes = aGraph.nodes();
    for (var i = 0; i < aNodes.length; i++) {
        var aNode = aNodes[i];
        if (bGraph.hasNode(aNode)) {
            return true;
        }
    }
    return false;
};
exports.containSameNodes = containSameNodes;
/**
 * @description Check if two graphs are contains the same edges.
 * @description.zh-CN 检查两个图是否包含相同的边。
 */
var containSameEdges = function (aGraph, bGraph) {
    var aEdges = aGraph.edges();
    for (var i = 0; i < aEdges.length; i++) {
        var aEdge = aEdges[i];
        if (bGraph.hasEdge(aEdge.v, aEdge.w, aEdge.name)) {
            return true;
        }
    }
    return false;
};
exports.containSameEdges = containSameEdges;
/**
 * @description get same nodes in two graphs.
 * @description.zh-CN 获取两个图中相同的节点。
 */
var getSameNodes = function (aGraph, bGraph) {
    var aNodes = aGraph.nodes();
    var sameNodes = aNodes.filter(function (aNode) { return bGraph.hasNode(aNode); });
    return sameNodes;
};
exports.getSameNodes = getSameNodes;
/**
 * @description get same edges in two graphs.
 * @description.zh-CN 获取两个图中相同的边。
 */
var getSameEdges = function (aGraph, bGraph) {
    var aEdges = aGraph.edges();
    var sameEdges = aEdges.filter(function (aEdge) { return bGraph.hasEdge(aEdge.v, aEdge.w, aEdge.name); });
    return sameEdges;
};
exports.getSameEdges = getSameEdges;
/**
 * @description Check if two graphs'option are the same.
 * @description.zh-CN 检查两个图的选项是否相同。
 */
var isGraphOptionSame = function (aGraph, bGraph) {
    return (aGraph.isCompound() === bGraph.isCompound() &&
        aGraph.isDirected() === bGraph.isDirected() &&
        aGraph.isMultigraph() === bGraph.isMultigraph());
};
exports.isGraphOptionSame = isGraphOptionSame;
/**
 * @description Check if a graph contains all nodes in another graph.
 * @description.zh-CN 检查一个图是否包含另一个图的所有节点。
 */
var containAllSameNodes = function (aGraph, bGraph) {
    var sameNodes = (0, exports.getSameNodes)(aGraph, bGraph);
    return sameNodes.length === aGraph.nodes().length;
};
exports.containAllSameNodes = containAllSameNodes;
/**
 * @description Check if a graph contains all edges in another graph.
 * @description.zh-CN 检查一个图是否包含另一个图的所有边。
 */
var containAllSameEdges = function (aGraph, bGraph) {
    var sameEdges = (0, exports.getSameEdges)(aGraph, bGraph);
    return sameEdges.length === aGraph.edges().length;
};
exports.containAllSameEdges = containAllSameEdges;
/**
 * @description Check if two graphs are the same.
 * @description.zh-CN 检查两个图是否相同。
 */
var isGraphSame = function (aGraph, bGraph) {
    return ((0, exports.isGraphOptionSame)(aGraph, bGraph) &&
        aGraph.nodeCount() === bGraph.nodeCount() &&
        (0, exports.containAllSameNodes)(aGraph, bGraph) &&
        aGraph.edgeCount() === bGraph.edgeCount() &&
        (0, exports.containAllSameEdges)(aGraph, bGraph));
};
exports.isGraphSame = isGraphSame;
/**
 * @description Check if one graph is the subgraph of another graph.
 * @description.zh-CN 检查一个图是否是另一个图的子图。
 */
var isGraphContainsAnother = function (originGraph, targetGraph) {
    return ((0, exports.containAllSameNodes)(originGraph, targetGraph) &&
        (0, exports.containAllSameEdges)(originGraph, targetGraph));
};
exports.isGraphContainsAnother = isGraphContainsAnother;
