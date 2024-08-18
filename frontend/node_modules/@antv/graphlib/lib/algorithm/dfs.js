"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @description DFS traversal.
 * @description.zh-CN DFS 遍历。
 */
var doDFS = function (graph, node, postorder, visited, navigator, result) {
    if (!visited.includes(node)) {
        visited.push(node);
        if (!postorder) {
            result.push(node);
        }
        navigator(node).forEach(function (n) {
            return doDFS(graph, n, postorder, visited, navigator, result);
        });
        if (postorder) {
            result.push(node);
        }
    }
};
/**
 * @description DFS traversal.
 * @description.zh-CN DFS 遍历。
 */
var dfs = function (graph, node, order) {
    var nodes = Array.isArray(node) ? node : [node];
    var navigator = function (n) {
        return (graph.isDirected() ? graph.successors(n) : graph.neighbors(n));
    };
    var results = [];
    var visited = [];
    nodes.forEach(function (node) {
        if (!graph.hasNode(node)) {
            throw new Error('Graph does not have node: ' + node);
        }
        else {
            doDFS(graph, node, order === 'post', visited, navigator, results);
        }
    });
    return results;
};
exports.default = dfs;
