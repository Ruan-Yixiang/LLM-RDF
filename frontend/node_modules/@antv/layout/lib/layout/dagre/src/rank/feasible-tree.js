"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feasibleTreeWithLayer = exports.feasibleTree = void 0;
var util_1 = require("./util");
var util_2 = require("../util");
var graph_1 = require("../../graph");
/*
 * Constructs a spanning tree with tight edges and adjusted the input node's
 * ranks to achieve this. A tight edge is one that is has a length that matches
 * its "minlen" attribute.
 *
 * The basic structure for this function is derived from Gansner, et al., "A
 * Technique for Drawing Directed Graphs."
 *
 * Pre-conditions:
 *
 *    1. Graph must be a DAG.
 *    2. Graph must be connected.
 *    3. Graph must have at least one node.
 *    5. Graph nodes must have been previously assigned a "rank" property that
 *       respects the "minlen" property of incident edges.
 *    6. Graph edges must have a "minlen" property.
 *
 * Post-conditions:
 *
 *    - Graph nodes will have their rank adjusted to ensure that all edges are
 *      tight.
 *
 * Returns a tree (undirected graph) that is constructed using only "tight"
 * edges.
 */
var feasibleTree = function (g) {
    var t = new graph_1.Graph({ directed: false });
    // Choose arbitrary node from which to start our tree
    var start = g.nodes()[0];
    var size = g.nodeCount();
    t.setNode(start, {});
    var edge;
    var delta;
    while (tightTree(t, g) < size) {
        edge = findMinSlackEdge(t, g);
        delta = t.hasNode(edge.v) ? (0, util_1.slack)(g, edge) : -(0, util_1.slack)(g, edge);
        shiftRanks(t, g, delta);
    }
    return t;
};
exports.feasibleTree = feasibleTree;
/*
 * Finds a maximal tree of tight edges and returns the number of nodes in the
 * tree.
 */
var tightTree = function (t, g) {
    var dfs = function (v) {
        g.nodeEdges(v).forEach(function (e) {
            var edgeV = e.v;
            var w = (v === edgeV) ? e.w : edgeV;
            if (!t.hasNode(w) && !(0, util_1.slack)(g, e)) {
                t.setNode(w, {});
                t.setEdge(v, w, {});
                dfs(w);
            }
        });
    };
    t.nodes().forEach(dfs);
    return t.nodeCount();
};
/*
 * Constructs a spanning tree with tight edges and adjusted the input node's
 * ranks to achieve this. A tight edge is one that is has a length that matches
 * its "minlen" attribute.
 *
 * The basic structure for this function is derived from Gansner, et al., "A
 * Technique for Drawing Directed Graphs."
 *
 * Pre-conditions:
 *
 *    1. Graph must be a DAG.
 *    2. Graph must be connected.
 *    3. Graph must have at least one node.
 *    5. Graph nodes must have been previously assigned a "rank" property that
 *       respects the "minlen" property of incident edges.
 *    6. Graph edges must have a "minlen" property.
 *
 * Post-conditions:
 *
 *    - Graph nodes will have their rank adjusted to ensure that all edges are
 *      tight.
 *
 * Returns a tree (undirected graph) that is constructed using only "tight"
 * edges.
 */
var feasibleTreeWithLayer = function (g) {
    var t = new graph_1.Graph({ directed: false });
    // Choose arbitrary node from which to start our tree
    var start = g.nodes()[0];
    var size = g.nodes().filter(function (n) { return !!g.node(n); }).length;
    t.setNode(start, {});
    var edge;
    var delta;
    while (tightTreeWithLayer(t, g) < size) {
        edge = findMinSlackEdge(t, g);
        delta = t.hasNode(edge.v) ? (0, util_1.slack)(g, edge) : -(0, util_1.slack)(g, edge);
        shiftRanks(t, g, delta);
    }
    return t;
};
exports.feasibleTreeWithLayer = feasibleTreeWithLayer;
/*
 * Finds a maximal tree of tight edges and returns the number of nodes in the
 * tree.
 */
var tightTreeWithLayer = function (t, g) {
    var dfs = function (v) {
        var _a;
        (_a = g.nodeEdges(v)) === null || _a === void 0 ? void 0 : _a.forEach(function (e) {
            var edgeV = e.v;
            var w = (v === edgeV) ? e.w : edgeV;
            // 对于指定layer的，直接加入tight-tree，不参与调整
            if (!t.hasNode(w) && (g.node(w).layer !== undefined || !(0, util_1.slack)(g, e))) {
                t.setNode(w, {});
                t.setEdge(v, w, {});
                dfs(w);
            }
        });
    };
    t.nodes().forEach(dfs);
    return t.nodeCount();
};
/*
 * Finds the edge with the smallest slack that is incident on tree and returns
 * it.
 */
var findMinSlackEdge = function (t, g) {
    return (0, util_2.minBy)(g.edges(), function (e) {
        if (t.hasNode(e.v) !== t.hasNode(e.w)) {
            return (0, util_1.slack)(g, e);
        }
        return Infinity;
    });
};
var shiftRanks = function (t, g, delta) {
    t.nodes().forEach(function (v) {
        if (!g.node(v).rank)
            g.node(v).rank = 0;
        g.node(v).rank += delta;
    });
};
exports.default = {
    feasibleTree: feasibleTree,
    feasibleTreeWithLayer: feasibleTreeWithLayer
};
//# sourceMappingURL=feasible-tree.js.map