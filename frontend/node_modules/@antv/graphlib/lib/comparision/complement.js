"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isGraphComplement = void 0;
var essence_1 = require("../essence");
var contain_1 = require("./contain");
/**
 * @description Check if one graph is the complement of another graph.
 * @description.zh-CN 检查一个图是否是另一个图的补图。
 */
var isGraphComplement = function (originGraph, targetGraph) {
    if (!(0, essence_1.isSimpleGraph)(originGraph) || !(0, essence_1.isSimpleGraph)(targetGraph)) {
        return false;
    }
    if (!(0, contain_1.containAllSameNodes)(originGraph, targetGraph)) {
        return false;
    }
    if ((0, contain_1.containSameEdges)(originGraph, targetGraph)) {
        return false;
    }
    var nodeCount = originGraph.nodeCount();
    return originGraph.edgeCount() + targetGraph.edgeCount() === (nodeCount * (nodeCount - 1)) / 2;
};
exports.isGraphComplement = isGraphComplement;
