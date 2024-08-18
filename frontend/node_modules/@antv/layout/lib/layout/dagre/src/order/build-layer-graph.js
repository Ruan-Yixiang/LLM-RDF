"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graph_1 = require("../../graph");
/*
 * Constructs a graph that can be used to sort a layer of nodes. The graph will
 * contain all base and subgraph nodes from the request layer in their original
 * hierarchy and any edges that are incident on these nodes and are of the type
 * requested by the "relationship" parameter.
 *
 * Nodes from the requested rank that do not have parents are assigned a root
 * node in the output graph, which is set in the root graph attribute. This
 * makes it easy to walk the hierarchy of movable nodes during ordering.
 *
 * Pre-conditions:
 *
 *    1. Input graph is a DAG
 *    2. Base nodes in the input graph have a rank attribute
 *    3. Subgraph nodes in the input graph has minRank and maxRank attributes
 *    4. Edges have an assigned weight
 *
 * Post-conditions:
 *
 *    1. Output graph has all nodes in the movable rank with preserved
 *       hierarchy.
 *    2. Root nodes in the movable layer are made children of the node
 *       indicated by the root attribute of the graph.
 *    3. Non-movable nodes incident on movable nodes, selected by the
 *       relationship parameter, are included in the graph (without hierarchy).
 *    4. Edges incident on movable nodes, selected by the relationship
 *       parameter, are added to the output graph.
 *    5. The weights for copied edges are aggregated as need, since the output
 *       graph is not a multi-graph.
 */
var buildLayerGraph = function (g, rank, relationship) {
    var root = createRootNode(g);
    var result = new graph_1.Graph({ compound: true })
        .setGraph({ root: root })
        .setDefaultNodeLabel(function (v) {
        return g.node(v);
    });
    g.nodes().forEach(function (v) {
        var _a;
        var node = g.node(v);
        var parent = g.parent(v);
        if (node.rank === rank ||
            (node.minRank <= rank && rank <= node.maxRank)) {
            result.setNode(v);
            result.setParent(v, parent || root);
            // This assumes we have only short edges!
            (_a = g[relationship](v)) === null || _a === void 0 ? void 0 : _a.forEach(function (e) {
                var u = e.v === v ? e.w : e.v;
                var edge = result.edgeFromArgs(u, v);
                var weight = edge !== undefined ? edge.weight : 0;
                result.setEdge(u, v, { weight: g.edge(e).weight + weight });
            });
            if (node.hasOwnProperty("minRank")) {
                result.setNode(v, {
                    borderLeft: node.borderLeft[rank],
                    borderRight: node.borderRight[rank],
                });
            }
        }
    });
    return result;
};
var createRootNode = function (g) {
    var v;
    while (g.hasNode((v = "_root".concat(Math.random()))))
        ;
    return v;
};
exports.default = buildLayerGraph;
//# sourceMappingURL=build-layer-graph.js.map