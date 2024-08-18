"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("./util");
/*
 * A nesting graph creates dummy nodes for the tops and bottoms of subgraphs,
 * adds appropriate edges to ensure that all cluster nodes are placed between
 * these boundries, and ensures that the graph is connected.
 *
 * In addition we ensure, through the use of the minlen property, that nodes
 * and subgraph border nodes to not end up on the same rank.
 *
 * Preconditions:
 *
 *    1. Input graph is a DAG
 *    2. Nodes in the input graph has a minlen attribute
 *
 * Postconditions:
 *
 *    1. Input graph is connected.
 *    2. Dummy nodes are added for the tops and bottoms of subgraphs.
 *    3. The minlen attribute for nodes is adjusted to ensure nodes do not
 *       get placed on the same rank as subgraph border nodes.
 *
 * The nesting graph idea comes from Sander, "Layout of Compound Directed
 * Graphs."
 */
var run = function (g) {
    var _a;
    var root = (0, util_1.addDummyNode)(g, "root", {}, "_root");
    var depths = treeDepths(g);
    var maxDepth = Math.max.apply(Math, Object.values(depths));
    if (Math.abs(maxDepth) === Infinity) {
        maxDepth = 1;
    }
    var height = maxDepth - 1; // Note: depths is an Object not an array
    var nodeSep = 2 * height + 1;
    g.graph().nestingRoot = root;
    // Multiply minlen by nodeSep to align nodes on non-border ranks.
    g.edges().forEach(function (e) {
        g.edge(e).minlen *= nodeSep;
    });
    // Calculate a weight that is sufficient to keep subgraphs vertically compact
    var weight = sumWeights(g) + 1;
    // Create border nodes and link them up
    (_a = g.children()) === null || _a === void 0 ? void 0 : _a.forEach(function (child) {
        dfs(g, root, nodeSep, weight, height, depths, child);
    });
    // Save the multiplier for node layers for later removal of empty border
    // layers.
    g.graph().nodeRankFactor = nodeSep;
};
var dfs = function (g, root, nodeSep, weight, height, depths, v) {
    var children = g.children(v);
    if (!(children === null || children === void 0 ? void 0 : children.length)) {
        if (v !== root) {
            g.setEdge(root, v, { weight: 0, minlen: nodeSep });
        }
        return;
    }
    var top = (0, util_1.addBorderNode)(g, "_bt");
    var bottom = (0, util_1.addBorderNode)(g, "_bb");
    var label = g.node(v);
    g.setParent(top, v);
    label.borderTop = top;
    g.setParent(bottom, v);
    label.borderBottom = bottom;
    children === null || children === void 0 ? void 0 : children.forEach(function (child) {
        dfs(g, root, nodeSep, weight, height, depths, child);
        var childNode = g.node(child);
        var childTop = childNode.borderTop ? childNode.borderTop : child;
        var childBottom = childNode.borderBottom ? childNode.borderBottom : child;
        var thisWeight = childNode.borderTop ? weight : 2 * weight;
        var minlen = childTop !== childBottom ? 1 : height - depths[v] + 1;
        g.setEdge(top, childTop, {
            minlen: minlen,
            weight: thisWeight,
            nestingEdge: true,
        });
        g.setEdge(childBottom, bottom, {
            minlen: minlen,
            weight: thisWeight,
            nestingEdge: true,
        });
    });
    if (!g.parent(v)) {
        g.setEdge(root, top, { weight: 0, minlen: height + depths[v] });
    }
};
var treeDepths = function (g) {
    var _a;
    var depths = {};
    var dfs = function (v, depth) {
        var children = g.children(v);
        children === null || children === void 0 ? void 0 : children.forEach(function (child) { return dfs(child, depth + 1); });
        depths[v] = depth;
    };
    (_a = g.children()) === null || _a === void 0 ? void 0 : _a.forEach(function (v) { return dfs(v, 1); });
    return depths;
};
var sumWeights = function (g) {
    var result = 0;
    g.edges().forEach(function (e) {
        result += g.edge(e).weight;
    });
    return result;
};
var cleanup = function (g) {
    var graphLabel = g.graph();
    graphLabel.nestingRoot && g.removeNode(graphLabel.nestingRoot);
    delete graphLabel.nestingRoot;
    g.edges().forEach(function (e) {
        var edge = g.edge(e);
        if (edge.nestingEdge) {
            g.removeEdgeObj(e);
        }
    });
};
exports.default = { run: run, cleanup: cleanup };
//# sourceMappingURL=nesting-graph.js.map