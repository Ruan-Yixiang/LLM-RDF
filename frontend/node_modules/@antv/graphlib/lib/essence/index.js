"use strict";
/**
 * @file To get graph essencial information.
 * @file.zh-CN 获取图的基本信息
 * @module essence
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasSelfLoop = exports.isNullGraph = exports.isSimpleGraph = exports.isGraph = void 0;
var Graph_1 = __importDefault(require("../Graph"));
/**
 * @description Check if the object is a graph.
 * @description.zh-CN 检查对象是否为图。
 */
function isGraph(obj) {
    return obj instanceof Graph_1.default;
}
exports.isGraph = isGraph;
/**
 * @description Check if the graph is a simple graph.
 * @description.zh-CN 检查图是否为简单图。
 */
function isSimpleGraph(graph) {
    if (graph.isMultigraph()) {
        return false;
    }
    var edges = graph.edges();
    var edgeStack = new Map();
    for (var i = 0; i < edges.length; i++) {
        var edge = edges[i];
        if (edge.v === edge.w) {
            return false;
        }
        var _a = [edge.v, edge.w].sort(), v = _a[0], w = _a[1];
        var key = "".concat(v, "-").concat(w);
        if (edgeStack.has(key)) {
            return false;
        }
        edgeStack.set(key, true);
    }
    return true;
}
exports.isSimpleGraph = isSimpleGraph;
/**
 * @description Check if the graph is a null graph.
 * @description.zh-CN 检查图是否为空图。
 */
function isNullGraph(graph) {
    return graph.nodes().length === 0;
}
exports.isNullGraph = isNullGraph;
/**
 * @description Check if the graph contains Self loops.
 * @description.zh-CN 检查图是否包含自环。
 */
function hasSelfLoop(graph) {
    var edges = graph.edges();
    for (var i = 0; i < edges.length; i++) {
        var edge = edges[i];
        if (edge.v === edge.w) {
            return true;
        }
    }
    return false;
}
exports.hasSelfLoop = hasSelfLoop;
