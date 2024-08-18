"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var list_1 = __importDefault(require("./data/list"));
var graphlib_1 = require("@antv/graphlib");
var List = /** @class */ (function (_super) {
    __extends(List, _super);
    function List() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return List;
}(list_1.default));
var StateGraph = /** @class */ (function (_super) {
    __extends(StateGraph, _super);
    function StateGraph() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return StateGraph;
}(graphlib_1.Graph));
/*
 * A greedy heuristic for finding a feedback arc set for a graph. A feedback
 * arc set is a set of edges that can be removed to make a graph acyclic.
 * The algorithm comes from: P. Eades, X. Lin, and W. F. Smyth, "A fast and
 * effective heuristic for the feedback arc set problem." This implementation
 * adjusts that from the paper to allow for weighted edges.
 */
var DEFAULT_WEIGHT_FN = function () { return 1; };
var greedyFAS = function (g, weightFn) {
    var _a;
    if (g.nodeCount() <= 1)
        return [];
    var state = buildState(g, weightFn || DEFAULT_WEIGHT_FN);
    var results = doGreedyFAS(state.graph, state.buckets, state.zeroIdx);
    return (_a = results.map(function (e) { return g.outEdges(e.v, e.w); })) === null || _a === void 0 ? void 0 : _a.flat();
};
var doGreedyFAS = function (g, buckets, zeroIdx) {
    var results = [];
    var sources = buckets[buckets.length - 1];
    var sinks = buckets[0];
    var entry;
    while (g.nodeCount()) {
        while ((entry = sinks.dequeue())) {
            removeNode(g, buckets, zeroIdx, entry);
        }
        while ((entry = sources.dequeue())) {
            removeNode(g, buckets, zeroIdx, entry);
        }
        if (g.nodeCount()) {
            for (var i = buckets.length - 2; i > 0; --i) {
                entry = buckets[i].dequeue();
                if (entry) {
                    results = results.concat(removeNode(g, buckets, zeroIdx, entry, true));
                    break;
                }
            }
        }
    }
    return results;
};
var removeNode = function (g, buckets, zeroIdx, entry, collectPredecessors) {
    var _a, _b;
    var results = [];
    (_a = g.inEdges(entry.v)) === null || _a === void 0 ? void 0 : _a.forEach(function (edge) {
        var weight = g.edge(edge);
        var uEntry = g.node(edge.v);
        if (collectPredecessors) {
            // this result not really care about in or out
            results.push({ v: edge.v, w: edge.w, in: 0, out: 0 });
        }
        if (uEntry.out === undefined)
            uEntry.out = 0;
        uEntry.out -= weight;
        assignBucket(buckets, zeroIdx, uEntry);
    });
    (_b = g.outEdges(entry.v)) === null || _b === void 0 ? void 0 : _b.forEach(function (edge) {
        var weight = g.edge(edge);
        var w = edge.w;
        var wEntry = g.node(w);
        if (wEntry.in === undefined)
            wEntry.in = 0;
        wEntry.in -= weight;
        assignBucket(buckets, zeroIdx, wEntry);
    });
    g.removeNode(entry.v);
    return collectPredecessors ? results : undefined;
};
var buildState = function (g, weightFn) {
    var fasGraph = new StateGraph();
    var maxIn = 0;
    var maxOut = 0;
    g.nodes().forEach(function (v) {
        fasGraph.setNode(v, { v: v, in: 0, out: 0 });
    });
    // Aggregate weights on nodes, but also sum the weights across multi-edges
    // into a single edge for the fasGraph.
    g.edges().forEach(function (e) {
        var prevWeight = fasGraph.edge(e) || 0;
        var weight = (weightFn === null || weightFn === void 0 ? void 0 : weightFn(e)) || 1;
        var edgeWeight = prevWeight + weight;
        fasGraph.setEdge(e.v, e.w, edgeWeight);
        maxOut = Math.max(maxOut, (fasGraph.node(e.v).out += weight));
        maxIn = Math.max(maxIn, (fasGraph.node(e.w).in += weight));
    });
    var buckets = [];
    var rangeMax = maxOut + maxIn + 3;
    for (var i = 0; i < rangeMax; i++) {
        buckets.push(new List());
    }
    var zeroIdx = maxIn + 1;
    fasGraph.nodes().forEach(function (v) {
        assignBucket(buckets, zeroIdx, fasGraph.node(v));
    });
    return { buckets: buckets, zeroIdx: zeroIdx, graph: fasGraph };
};
var assignBucket = function (buckets, zeroIdx, entry) {
    if (!entry.out) {
        buckets[0].enqueue(entry);
    }
    else if (!entry["in"]) {
        buckets[buckets.length - 1].enqueue(entry);
    }
    else {
        buckets[entry.out - entry["in"] + zeroIdx].enqueue(entry);
    }
};
exports.default = greedyFAS;
//# sourceMappingURL=greedy-fas.js.map