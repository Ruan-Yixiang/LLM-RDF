"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Graph_1 = __importDefault(require("../Graph"));
var PriorityQueue_1 = __importDefault(require("./PriorityQueue"));
var prim = function (graph, weightFn) {
    var _a;
    var result = new Graph_1.default();
    var parents = new Map();
    var pq = new PriorityQueue_1.default();
    var v;
    function updateNeighbors(edge) {
        var w = edge.v === v ? edge.w : edge.v;
        var pri = pq.priority(w);
        if (pri !== undefined) {
            var edgeWeight = weightFn(edge);
            if (edgeWeight < pri) {
                parents.set(w, v);
                pq.decrease(w, edgeWeight);
            }
        }
    }
    if (graph.nodeCount() === 0) {
        return result;
    }
    graph.nodes().forEach(function (node) {
        pq.add(node, Number.POSITIVE_INFINITY);
        result.setNode(node);
    });
    // Start from an arbitrary node
    pq.decrease(graph.nodes()[0], 0);
    var init = false;
    while (pq.size() > 0) {
        v = pq.removeMin();
        if (parents.has(v)) {
            result.setEdge(v, parents.get(v));
        }
        else if (init) {
            throw new Error('Input graph is not connected: ' + graph.graph());
        }
        else {
            init = true;
        }
        (_a = graph.nodeEdges(v)) === null || _a === void 0 ? void 0 : _a.forEach(updateNeighbors);
    }
    return result;
};
exports.default = prim;
