"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dijkstra_1 = __importDefault(require("./dijkstra"));
var dijkstraAll = function (graph, weightFn, edgeFn) {
    var map = {};
    graph.nodes().forEach(function (node) {
        map[String(node)] = (0, dijkstra_1.default)(graph, node, weightFn, edgeFn);
        return map;
    });
    return map;
};
exports.default = dijkstraAll;
