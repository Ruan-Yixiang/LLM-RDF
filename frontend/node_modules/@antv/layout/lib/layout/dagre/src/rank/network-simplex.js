"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exchangeEdges = exports.enterEdge = exports.leaveEdge = exports.initLowLimValues = exports.calcCutValue = exports.initCutValues = void 0;
var feasible_tree_1 = require("./feasible-tree");
var util_1 = require("./util");
var util_2 = require("../util");
var graphlib_1 = require("@antv/graphlib");
var preorder = graphlib_1.algorithm.preorder, postorder = graphlib_1.algorithm.postorder;
/*
 * The network simplex algorithm assigns ranks to each node in the input graph
 * and iteratively improves the ranking to reduce the length of edges.
 *
 * Preconditions:
 *
 *    1. The input graph must be a DAG.
 *    2. All nodes in the graph must have an object value.
 *    3. All edges in the graph must have "minlen" and "weight" attributes.
 *
 * Postconditions:
 *
 *    1. All nodes in the graph will have an assigned "rank" attribute that has
 *       been optimized by the network simplex algorithm. Ranks start at 0.
 *
 *
 * A rough sketch of the algorithm is as follows:
 *
 *    1. Assign initial ranks to each node. We use the longest path algorithm,
 *       which assigns ranks to the lowest position possible. In general this
 *       leads to very wide bottom ranks and unnecessarily long edges.
 *    2. Construct a feasible tight tree. A tight tree is one such that all
 *       edges in the tree have no slack (difference between length of edge
 *       and minlen for the edge). This by itself greatly improves the assigned
 *       rankings by shorting edges.
 *    3. Iteratively find edges that have negative cut values. Generally a
 *       negative cut value indicates that the edge could be removed and a new
 *       tree edge could be added to produce a more compact graph.
 *
 * Much of the algorithms here are derived from Gansner, et al., "A Technique
 * for Drawing Directed Graphs." The structure of the file roughly follows the
 * structure of the overall algorithm.
 */
var networkSimplex = function (og) {
    var g = (0, util_2.simplify)(og);
    (0, util_1.longestPath)(g);
    var t = (0, feasible_tree_1.feasibleTree)(g);
    (0, exports.initLowLimValues)(t);
    (0, exports.initCutValues)(t, g);
    var e;
    var f;
    while ((e = (0, exports.leaveEdge)(t))) {
        f = (0, exports.enterEdge)(t, g, e);
        (0, exports.exchangeEdges)(t, g, e, f);
    }
};
/*
 * Initializes cut values for all edges in the tree.
 */
var initCutValues = function (t, g) {
    var vs = postorder(t, t.nodes());
    vs = vs === null || vs === void 0 ? void 0 : vs.slice(0, (vs === null || vs === void 0 ? void 0 : vs.length) - 1);
    vs === null || vs === void 0 ? void 0 : vs.forEach(function (v) {
        assignCutValue(t, g, v);
    });
};
exports.initCutValues = initCutValues;
var assignCutValue = function (t, g, child) {
    var childLab = t.node(child);
    var parent = childLab.parent;
    t.edgeFromArgs(child, parent).cutvalue = (0, exports.calcCutValue)(t, g, child);
};
/*
 * Given the tight tree, its graph, and a child in the graph calculate and
 * return the cut value for the edge between the child and its parent.
 */
var calcCutValue = function (t, g, child) {
    var _a;
    var childLab = t.node(child);
    var parent = childLab.parent;
    // True if the child is on the tail end of the edge in the directed graph
    var childIsTail = true;
    // The graph's view of the tree edge we're inspecting
    var graphEdge = g.edgeFromArgs(child, parent);
    // The accumulated cut value for the edge between this node and its parent
    var cutValue = 0;
    if (!graphEdge) {
        childIsTail = false;
        graphEdge = g.edgeFromArgs(parent, child);
    }
    cutValue = graphEdge.weight;
    (_a = g.nodeEdges(child)) === null || _a === void 0 ? void 0 : _a.forEach(function (e) {
        var isOutEdge = e.v === child;
        var other = isOutEdge ? e.w : e.v;
        if (other !== parent) {
            var pointsToHead = isOutEdge === childIsTail;
            var otherWeight = g.edge(e).weight;
            cutValue += pointsToHead ? otherWeight : -otherWeight;
            if (isTreeEdge(t, child, other)) {
                var otherCutValue = t.edgeFromArgs(child, other).cutvalue;
                cutValue += pointsToHead ? -otherCutValue : otherCutValue;
            }
        }
    });
    return cutValue;
};
exports.calcCutValue = calcCutValue;
var initLowLimValues = function (tree, root) {
    if (root === void 0) { root = tree.nodes()[0]; }
    dfsAssignLowLim(tree, {}, 1, root);
};
exports.initLowLimValues = initLowLimValues;
var dfsAssignLowLim = function (tree, visited, nextLim, v, parent) {
    var _a;
    var low = nextLim;
    var useNextLim = nextLim;
    var label = tree.node(v);
    visited[v] = true;
    (_a = tree.neighbors(v)) === null || _a === void 0 ? void 0 : _a.forEach(function (w) {
        if (!visited[w]) {
            useNextLim = dfsAssignLowLim(tree, visited, useNextLim, w, v);
        }
    });
    label.low = low;
    label.lim = useNextLim++;
    if (parent) {
        label.parent = parent;
    }
    else {
        // TODO should be able to remove this when we incrementally update low lim
        delete label.parent;
    }
    return useNextLim;
};
var leaveEdge = function (tree) {
    return tree.edges().find(function (e) {
        return tree.edge(e).cutvalue < 0;
    });
};
exports.leaveEdge = leaveEdge;
var enterEdge = function (t, g, edge) {
    var v = edge.v;
    var w = edge.w;
    // For the rest of this function we assume that v is the tail and w is the
    // head, so if we don't have this edge in the graph we should flip it to
    // match the correct orientation.
    if (!g.hasEdge(v, w)) {
        v = edge.w;
        w = edge.v;
    }
    var vLabel = t.node(v);
    var wLabel = t.node(w);
    var tailLabel = vLabel;
    var flip = false;
    // If the root is in the tail of the edge then we need to flip the logic that
    // checks for the head and tail nodes in the candidates function below.
    if (vLabel.lim > wLabel.lim) {
        tailLabel = wLabel;
        flip = true;
    }
    var candidates = g.edges().filter(function (edge) {
        return flip === isDescendant(t, t.node(edge.v), tailLabel) &&
            flip !== isDescendant(t, t.node(edge.w), tailLabel);
    });
    return (0, util_2.minBy)(candidates, function (edge) { return (0, util_1.slack)(g, edge); });
};
exports.enterEdge = enterEdge;
var exchangeEdges = function (t, g, e, f) {
    var v = e.v;
    var w = e.w;
    t.removeEdge(v, w);
    t.setEdge(f.v, f.w, {});
    (0, exports.initLowLimValues)(t);
    (0, exports.initCutValues)(t, g);
    updateRanks(t, g);
};
exports.exchangeEdges = exchangeEdges;
var updateRanks = function (t, g) {
    var root = t.nodes().find(function (v) { var _a; return !((_a = g.node(v)) === null || _a === void 0 ? void 0 : _a.parent); });
    var vs = preorder(t, root);
    vs = vs === null || vs === void 0 ? void 0 : vs.slice(1);
    vs === null || vs === void 0 ? void 0 : vs.forEach(function (v) {
        var parent = t.node(v).parent;
        var edge = g.edgeFromArgs(v, parent);
        var flipped = false;
        if (!edge) {
            edge = g.edgeFromArgs(parent, v);
            flipped = true;
        }
        g.node(v).rank = g.node(parent).rank + (flipped ? edge.minlen : -edge.minlen);
    });
};
/*
 * Returns true if the edge is in the tree.
 */
var isTreeEdge = function (tree, u, v) {
    return tree.hasEdge(u, v);
};
/*
 * Returns true if the specified node is descendant of the root node per the
 * assigned low and lim attributes in the tree.
 */
var isDescendant = function (tree, vLabel, rootLabel) {
    return rootLabel.low <= vLabel.lim && vLabel.lim <= rootLabel.lim;
};
exports.default = networkSimplex;
//# sourceMappingURL=network-simplex.js.map