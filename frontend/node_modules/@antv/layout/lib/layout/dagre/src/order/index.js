"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var init_order_1 = __importDefault(require("./init-order"));
var cross_count_1 = __importDefault(require("./cross-count"));
var build_layer_graph_1 = __importDefault(require("./build-layer-graph"));
var add_subgraph_constraints_1 = __importDefault(require("./add-subgraph-constraints"));
var sort_subgraph_1 = __importDefault(require("./sort-subgraph"));
var util_1 = require("../../../../util");
var graph_1 = require("../../graph");
var util_2 = require("../util");
/*
 * Applies heuristics to minimize edge crossings in the graph and sets the best
 * order solution as an order attribute on each node.
 *
 * Pre-conditions:
 *
 *    1. Graph must be DAG
 *    2. Graph nodes must be objects with a "rank" attribute
 *    3. Graph edges must have the "weight" attribute
 *
 * Post-conditions:
 *
 *    1. Graph nodes will have an "order" attribute based on the results of the
 *       algorithm.
 */
var order = function (g, keepNodeOrder) {
    var mxRank = (0, util_2.maxRank)(g);
    var range1 = [];
    var range2 = [];
    for (var i = 1; i < mxRank + 1; i++)
        range1.push(i);
    for (var i = mxRank - 1; i > -1; i--)
        range2.push(i);
    var downLayerGraphs = buildLayerGraphs(g, range1, "inEdges");
    var upLayerGraphs = buildLayerGraphs(g, range2, "outEdges");
    var layering = (0, init_order_1.default)(g);
    assignOrder(g, layering);
    var bestCC = Number.POSITIVE_INFINITY;
    var best;
    for (var i = 0, lastBest = 0; lastBest < 4; ++i, ++lastBest) {
        sweepLayerGraphs(i % 2 ? downLayerGraphs : upLayerGraphs, i % 4 >= 2, false, keepNodeOrder);
        layering = (0, util_2.buildLayerMatrix)(g);
        var cc = (0, cross_count_1.default)(g, layering);
        if (cc < bestCC) {
            lastBest = 0;
            best = (0, util_1.clone)(layering);
            bestCC = cc;
        }
    }
    // consider use previous result, maybe somewhat reduendant
    layering = (0, init_order_1.default)(g);
    assignOrder(g, layering);
    for (var i = 0, lastBest = 0; lastBest < 4; ++i, ++lastBest) {
        sweepLayerGraphs(i % 2 ? downLayerGraphs : upLayerGraphs, i % 4 >= 2, true, keepNodeOrder);
        layering = (0, util_2.buildLayerMatrix)(g);
        var cc = (0, cross_count_1.default)(g, layering);
        if (cc < bestCC) {
            lastBest = 0;
            best = (0, util_1.clone)(layering);
            bestCC = cc;
        }
    }
    assignOrder(g, best);
};
var buildLayerGraphs = function (g, ranks, relationship) {
    return ranks.map(function (rank) {
        return (0, build_layer_graph_1.default)(g, rank, relationship);
    });
};
var sweepLayerGraphs = function (layerGraphs, biasRight, usePrev, keepNodeOrder) {
    var cg = new graph_1.Graph();
    layerGraphs === null || layerGraphs === void 0 ? void 0 : layerGraphs.forEach(function (lg) {
        var _a;
        var root = lg.graph().root;
        var sorted = (0, sort_subgraph_1.default)(lg, root, cg, biasRight, usePrev, keepNodeOrder);
        for (var i = 0; i < ((_a = sorted.vs) === null || _a === void 0 ? void 0 : _a.length) || 0; i++) {
            var lnode = lg.node(sorted.vs[i]);
            if (lnode) {
                lnode.order = i;
            }
        }
        (0, add_subgraph_constraints_1.default)(lg, cg, sorted.vs);
    });
};
var assignOrder = function (g, layering) {
    layering === null || layering === void 0 ? void 0 : layering.forEach(function (layer) {
        layer === null || layer === void 0 ? void 0 : layer.forEach(function (v, i) {
            g.node(v).order = i;
        });
    });
};
exports.default = order;
//# sourceMappingURL=index.js.map