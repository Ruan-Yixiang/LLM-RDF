"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var PriorityQueue_1 = __importDefault(require("./PriorityQueue"));
var DEFAULT_WEIGHT_FUNC = function () { return 1; };
/**
 * @description Dijkstra's algorithm for single-source shortest paths.
 * @description https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
 * @description.zh-CN Dijkstra 算法用于单源最短路径。
 */
var dijkstra = function (graph, source, weightFn, edgeFn) {
    return runDijkstra(graph, source, weightFn || DEFAULT_WEIGHT_FUNC, edgeFn ||
        function (v) {
            return graph.outEdges(v);
        });
};
/**
 * @description Dijkstra's algorithm for single-source shortest paths.
 * @description https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
 * @description.zh-CN Dijkstra 算法用于单源最短路径。
 */
var runDijkstra = function (graph, source, weightFn, edgeFn) {
    var results = new Map();
    var pq = new PriorityQueue_1.default();
    var v;
    var vEntry;
    var updateNeighbors = function (edge) {
        var w = edge.v !== v ? edge.v : edge.w;
        var wEntry = results.get(w);
        var weight = weightFn(edge);
        var distance = vEntry.distance + weight;
        if (weight < 0) {
            throw new Error('dijkstra does not allow negative edge weights. ' +
                'Bad edge: ' +
                edge +
                ' Weight: ' +
                weight);
        }
        // If there is already a shorter path to w, ignore this edge.
        if (distance < wEntry.distance) {
            wEntry.distance = distance;
            wEntry.predecessor = v;
            pq.decrease(w, distance);
        }
    };
    graph.nodes().forEach(function (v) {
        var distance = v === source ? 0 : Number.POSITIVE_INFINITY;
        results.set(v, { distance: distance });
        pq.add(v, distance);
    });
    while (pq.size() > 0) {
        v = pq.removeMin();
        vEntry = results.get(v);
        if (vEntry && vEntry.distance === Number.POSITIVE_INFINITY) {
            break;
        }
        edgeFn(v).forEach(updateNeighbors);
    }
    var obj = {};
    Array.from(results.entries()).forEach(function (_a) {
        var node = _a[0], e = _a[1];
        obj[String(node)] = e;
        return obj;
    });
    return obj;
};
exports.default = dijkstra;
