"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGraphComplement = void 0;
var essence_1 = require("../essence");
var Graph_1 = __importDefault(require("../Graph"));
/**
 * @description Get the graph's complement
 * @description.zh-CN 获取图的补图
 */
var getGraphComplement = function (originGraph) {
    if (!(0, essence_1.isSimpleGraph)(originGraph)) {
        return null;
    }
    var nodeCount = originGraph.nodeCount();
    var complementGraph = new Graph_1.default({
        compound: originGraph.isCompound(),
        directed: originGraph.isDirected(),
        multigraph: originGraph.isMultigraph(),
    });
    var nodes = originGraph.nodes();
    for (var i = 0; i < nodeCount; i++) {
        var nodei = nodes[i];
        complementGraph.setNode(nodei, originGraph.node(nodei));
        for (var j = i + 1; j < nodeCount; j++) {
            var nodej = nodes[j];
            if (!originGraph.hasEdge(nodei, nodej)) {
                complementGraph.setEdge(nodei, nodej);
            }
        }
    }
    return complementGraph;
};
exports.getGraphComplement = getGraphComplement;
