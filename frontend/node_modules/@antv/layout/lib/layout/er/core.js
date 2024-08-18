"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var d3Force = __importStar(require("d3-force"));
var forceGrid_1 = __importDefault(require("./forceGrid"));
var mysqlWorkbench_1 = __importDefault(require("./mysqlWorkbench"));
var dagre_1 = require("../dagre");
function layout(data, options) {
    var nodes = data.nodes, edges = data.edges;
    var width = options.width;
    var height = options.height;
    if (!(nodes === null || nodes === void 0 ? void 0 : nodes.length))
        return Promise.resolve();
    // 筛选非叶子节点，做Dagre布局
    var noLeafNodes = [];
    nodes.forEach(function (node) {
        var relateEdges = edges.filter(function (edge) {
            return edge.source === node.id || edge.target === node.id;
        });
        if (relateEdges.length > 1) {
            var temp = __assign({}, node);
            delete temp.size;
            noLeafNodes.push(temp);
        }
    });
    var noLeafEdge = [];
    edges.forEach(function (edge) {
        var sourceNode = noLeafNodes.find(function (node) { return node.id === edge.source; });
        var targetNode = noLeafNodes.find(function (node) { return node.id === edge.target; });
        if (sourceNode && targetNode) {
            noLeafEdge.push(edge);
        }
    });
    var graphLayout = new dagre_1.DagreLayout({
        type: 'dagre',
        ranksep: options.nodeMinGap,
        nodesep: options.nodeMinGap,
    });
    var nodesTmp = graphLayout.layout({
        nodes: noLeafNodes,
        edges: noLeafEdge,
    }).nodes;
    // 布局后，坐标同步
    nodes.forEach(function (n) {
        var found = (nodesTmp || []).find(function (temp) { return temp.id === n.id; });
        n.x = (found === null || found === void 0 ? void 0 : found.x) || width / 2;
        n.y = (found === null || found === void 0 ? void 0 : found.y) || height / 2;
    });
    var copyNodes = JSON.parse(JSON.stringify(nodes));
    var copyEdges = JSON.parse(JSON.stringify(edges));
    var simulation = d3Force.forceSimulation().nodes(copyNodes)
        .force("link", d3Force.forceLink(copyEdges).id(function (d) { return d.id; }).distance(function (d) {
        var edgeInfo = noLeafEdge.find(function (edge) { return edge.source === d.source && edge.target === d.target; });
        if (edgeInfo) {
            return 30;
        }
        return 20;
    }))
        .force("charge", d3Force.forceManyBody())
        .force("center", d3Force.forceCenter(width / 2, height / 2))
        .force("x", d3Force.forceX(width / 2))
        .force("y", d3Force.forceY(height / 2))
        .alpha(0.3)
        .alphaDecay(0.08)
        .alphaMin(0.001);
    var layoutPromise = new Promise(function (resolve) {
        simulation.on('end', function () {
            // 坐标信息同步到nodes,edges中
            nodes.forEach(function (node) {
                var nodeInfo = copyNodes.find(function (item) { return item.id === node.id; });
                if (nodeInfo) {
                    node.x = nodeInfo.x;
                    node.y = nodeInfo.y;
                }
            });
            var minX = Math.min.apply(Math, nodes.map(function (node) { return node.x; }));
            var maxX = Math.max.apply(Math, nodes.map(function (node) { return node.x; }));
            var minY = Math.min.apply(Math, nodes.map(function (node) { return node.y; }));
            var maxY = Math.max.apply(Math, nodes.map(function (node) { return node.y; }));
            var scalex = width / (maxX - minX);
            var scaley = height / (maxY - minY);
            nodes.forEach(function (node) {
                if (node.x !== undefined && scalex < 1) {
                    node.x = (node.x - minX) * scalex;
                }
                if (node.y !== undefined && scaley < 1) {
                    node.y = (node.y - minY) * scaley;
                }
            });
            // 这一步就执行缩小空间。且不考虑节点size
            nodes.forEach(function (node) {
                node.sizeTemp = node.size;
                node.size = [10, 10];
            });
            (0, mysqlWorkbench_1.default)(nodes, edges);
            nodes.forEach(function (node) {
                node.size = node.sizeTemp || [];
                delete node.sizeTemp;
            });
            // 进行网格对齐+节点大小扩增
            (0, forceGrid_1.default)({
                nodes: nodes,
                edges: edges,
            }, options);
            resolve();
        });
    });
    return layoutPromise;
}
exports.default = layout;
//# sourceMappingURL=core.js.map