"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("@antv/util");
/*
 * Assigns an initial order value for each node by performing a DFS search
 * starting from nodes in the first rank. Nodes are assigned an order in their
 * rank as they are first visited.
 *
 * This approach comes from Gansner, et al., "A Technique for Drawing Directed
 * Graphs."
 *
 * Returns a layering matrix with an array per layer and each layer sorted by
 * the order of its nodes.
 */
var initOrder = function (g) {
    var visited = {};
    var simpleNodes = g.nodes().filter(function (v) {
        var _a;
        return !((_a = g.children(v)) === null || _a === void 0 ? void 0 : _a.length);
    });
    var nodeRanks = simpleNodes.map(function (v) { return g.node(v).rank; });
    var maxRank = (0, util_1.max)(nodeRanks);
    var layers = [];
    for (var i = 0; i < maxRank + 1; i++) {
        layers.push([]);
    }
    var dfs = function (v) {
        var _a;
        if (visited.hasOwnProperty(v))
            return;
        visited[v] = true;
        var node = g.node(v);
        if (!isNaN(node.rank)) {
            layers[node.rank].push(v);
        }
        (_a = g.successors(v)) === null || _a === void 0 ? void 0 : _a.forEach(function (child) { return dfs(child); });
    };
    var orderedVs = simpleNodes.sort(function (a, b) { return g.node(a).rank - g.node(b).rank; });
    // const orderedVs = _.sortBy(simpleNodes, function(v) { return g.node(v)!.rank; });
    // 有fixOrder的，直接排序好放进去
    var beforeSort = orderedVs.filter(function (n) {
        return g.node(n).fixorder !== undefined;
    });
    var fixOrderNodes = beforeSort.sort(function (a, b) { return g.node(a).fixorder - g.node(b).fixorder; });
    fixOrderNodes === null || fixOrderNodes === void 0 ? void 0 : fixOrderNodes.forEach(function (n) {
        if (!isNaN(g.node(n).rank)) {
            layers[g.node(n).rank].push(n);
        }
        visited[n] = true;
    });
    orderedVs === null || orderedVs === void 0 ? void 0 : orderedVs.forEach(dfs);
    return layers;
};
exports.default = initOrder;
//# sourceMappingURL=init-order.js.map