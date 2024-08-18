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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var acyclic_1 = __importDefault(require("./acyclic"));
var normalize_1 = __importDefault(require("./normalize"));
var rank_1 = __importDefault(require("./rank"));
var util_1 = require("./util");
var parent_dummy_chains_1 = __importDefault(require("./parent-dummy-chains"));
var nesting_graph_1 = __importDefault(require("./nesting-graph"));
var add_border_segments_1 = __importDefault(require("./add-border-segments"));
var coordinate_system_1 = __importDefault(require("./coordinate-system"));
var order_1 = __importDefault(require("./order"));
var position_1 = __importDefault(require("./position"));
var init_data_order_1 = __importDefault(require("./order/init-data-order"));
var graph_1 = require("../graph");
var layout = function (g, opts) {
    var time = opts && opts.debugTiming ? util_1.time : util_1.notime;
    time("layout", function () {
        // 如果在原图基础上修改，继承原图的order结果
        if (opts && !opts.keepNodeOrder && opts.prevGraph) {
            time("  inheritOrder", function () {
                inheritOrder(g, opts.prevGraph);
            });
        }
        var layoutGraph = time("  buildLayoutGraph", function () {
            return buildLayoutGraph(g);
        });
        // 控制是否为边的label留位置（这会影响是否在边中间添加dummy node）
        if (!(opts && opts.edgeLabelSpace === false)) {
            time("  makeSpaceForEdgeLabels", function () {
                makeSpaceForEdgeLabels(layoutGraph);
            });
        }
        // TODO: 暂时处理层级设置不正确时的异常报错，提示设置正确的层级
        try {
            time("  runLayout", function () {
                runLayout(layoutGraph, time, opts);
            });
        }
        catch (e) {
            if (e.message ===
                "Not possible to find intersection inside of the rectangle") {
                console.error("The following error may be caused by improper layer setting, please make sure your manual layer setting does not violate the graph's structure:\n", e);
                return;
            }
            throw e;
        }
        time("  updateInputGraph", function () {
            updateInputGraph(g, layoutGraph);
        });
    });
};
var runLayout = function (g, time, opts) {
    time("    removeSelfEdges", function () {
        removeSelfEdges(g);
    });
    time("    acyclic", function () {
        acyclic_1.default.run(g);
    });
    time("    nestingGraph.run", function () {
        nesting_graph_1.default.run(g);
    });
    time("    rank", function () {
        (0, rank_1.default)((0, util_1.asNonCompoundGraph)(g));
    });
    time("    injectEdgeLabelProxies", function () {
        injectEdgeLabelProxies(g);
    });
    time("    removeEmptyRanks", function () {
        (0, util_1.removeEmptyRanks)(g);
    });
    time("    nestingGraph.cleanup", function () {
        nesting_graph_1.default.cleanup(g);
    });
    time("    normalizeRanks", function () {
        (0, util_1.normalizeRanks)(g);
    });
    time("    assignRankMinMax", function () {
        assignRankMinMax(g);
    });
    time("    removeEdgeLabelProxies", function () {
        removeEdgeLabelProxies(g);
    });
    time("    normalize.run", function () {
        normalize_1.default.run(g);
    });
    time("    parentDummyChains", function () {
        (0, parent_dummy_chains_1.default)(g);
    });
    time("    addBorderSegments", function () {
        (0, add_border_segments_1.default)(g);
    });
    if (opts && opts.keepNodeOrder) {
        time("    initDataOrder", function () {
            (0, init_data_order_1.default)(g, opts.nodeOrder);
        });
    }
    time("    order", function () {
        (0, order_1.default)(g, opts === null || opts === void 0 ? void 0 : opts.keepNodeOrder);
    });
    time("    insertSelfEdges", function () {
        insertSelfEdges(g);
    });
    time("    adjustCoordinateSystem", function () {
        coordinate_system_1.default.adjust(g);
    });
    time("    position", function () {
        (0, position_1.default)(g);
    });
    time("    positionSelfEdges", function () {
        positionSelfEdges(g);
    });
    time("    removeBorderNodes", function () {
        removeBorderNodes(g);
    });
    time("    normalize.undo", function () {
        normalize_1.default.undo(g);
    });
    time("    fixupEdgeLabelCoords", function () {
        fixupEdgeLabelCoords(g);
    });
    time("    undoCoordinateSystem", function () {
        coordinate_system_1.default.undo(g);
    });
    time("    translateGraph", function () {
        translateGraph(g);
    });
    time("    assignNodeIntersects", function () {
        assignNodeIntersects(g);
    });
    time("    reversePoints", function () {
        reversePointsForReversedEdges(g);
    });
    time("    acyclic.undo", function () {
        acyclic_1.default.undo(g);
    });
};
/**
 * 继承上一个布局中的order，防止翻转
 * TODO: 暂时没有考虑涉及层级变动的布局，只保证原来布局层级和相对顺序不变
 */
var inheritOrder = function (currG, prevG) {
    currG.nodes().forEach(function (n) {
        var node = currG.node(n);
        var prevNode = prevG.node(n);
        if (prevNode !== undefined) {
            node.fixorder = prevNode._order;
            delete prevNode._order;
        }
        else {
            delete node.fixorder;
        }
    });
};
/*
 * Copies final layout information from the layout graph back to the input
 * graph. This process only copies whitelisted attributes from the layout graph
 * to the input graph, so it serves as a good place to determine what
 * attributes can influence layout.
 */
var updateInputGraph = function (inputGraph, layoutGraph) {
    inputGraph.nodes().forEach(function (v) {
        var _a;
        var inputLabel = inputGraph.node(v);
        if (inputLabel) {
            var layoutLabel = layoutGraph.node(v);
            inputLabel.x = layoutLabel.x;
            inputLabel.y = layoutLabel.y;
            inputLabel._order = layoutLabel.order;
            inputLabel._rank = layoutLabel.rank;
            if ((_a = layoutGraph.children(v)) === null || _a === void 0 ? void 0 : _a.length) {
                inputLabel.width = layoutLabel.width;
                inputLabel.height = layoutLabel.height;
            }
        }
    });
    inputGraph.edges().forEach(function (e) {
        var inputLabel = inputGraph.edge(e);
        var layoutLabel = layoutGraph.edge(e);
        inputLabel.points = layoutLabel ? layoutLabel.points : [];
        if (layoutLabel && layoutLabel.hasOwnProperty("x")) {
            inputLabel.x = layoutLabel.x;
            inputLabel.y = layoutLabel.y;
        }
    });
    inputGraph.graph().width = layoutGraph.graph().width;
    inputGraph.graph().height = layoutGraph.graph().height;
};
var graphNumAttrs = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"];
var graphDefaults = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" };
var graphAttrs = ["acyclicer", "ranker", "rankdir", "align"];
var nodeNumAttrs = ["width", "height", "layer", "fixorder"]; // 需要传入layer, fixOrder作为参数参考
var nodeDefaults = { width: 0, height: 0 };
var edgeNumAttrs = ["minlen", "weight", "width", "height", "labeloffset"];
var edgeDefaults = {
    minlen: 1,
    weight: 1,
    width: 0,
    height: 0,
    labeloffset: 10,
    labelpos: "r",
};
var edgeAttrs = ["labelpos"];
/*
 * Constructs a new graph from the input graph, which can be used for layout.
 * This process copies only whitelisted attributes from the input graph to the
 * layout graph. Thus this function serves as a good place to determine what
 * attributes can influence layout.
 */
var buildLayoutGraph = function (inputGraph) {
    var g = new graph_1.Graph({ multigraph: true, compound: true });
    var graph = canonicalize(inputGraph.graph());
    var pickedProperties = {};
    graphAttrs === null || graphAttrs === void 0 ? void 0 : graphAttrs.forEach(function (key) {
        if (graph[key] !== undefined)
            pickedProperties[key] = graph[key];
    });
    g.setGraph(Object.assign({}, graphDefaults, selectNumberAttrs(graph, graphNumAttrs), pickedProperties));
    inputGraph.nodes().forEach(function (v) {
        var node = canonicalize(inputGraph.node(v));
        var defaultNode = __assign(__assign({}, nodeDefaults), node);
        var defaultAttrs = selectNumberAttrs(defaultNode, nodeNumAttrs);
        g.setNode(v, defaultAttrs);
        g.setParent(v, inputGraph.parent(v));
    });
    inputGraph.edges().forEach(function (e) {
        var edge = canonicalize(inputGraph.edge(e));
        var pickedProperties = {};
        edgeAttrs === null || edgeAttrs === void 0 ? void 0 : edgeAttrs.forEach(function (key) {
            if (edge[key] !== undefined)
                pickedProperties[key] = edge[key];
        });
        g.setEdgeObj(e, Object.assign({}, edgeDefaults, selectNumberAttrs(edge, edgeNumAttrs), pickedProperties));
    });
    return g;
};
/*
 * This idea comes from the Gansner paper: to account for edge labels in our
 * layout we split each rank in half by doubling minlen and halving ranksep.
 * Then we can place labels at these mid-points between nodes.
 *
 * We also add some minimal padding to the width to push the label for the edge
 * away from the edge itself a bit.
 */
var makeSpaceForEdgeLabels = function (g) {
    var graph = g.graph();
    if (!graph.ranksep)
        graph.ranksep = 0;
    graph.ranksep /= 2;
    g.nodes().forEach(function (n) {
        var node = g.node(n);
        if (!isNaN(node.layer)) {
            if (!node.layer)
                node.layer = 0;
        }
    });
    g.edges().forEach(function (e) {
        var _a;
        var edge = g.edge(e);
        edge.minlen *= 2;
        if (((_a = edge.labelpos) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== "c") {
            if (graph.rankdir === "TB" || graph.rankdir === "BT") {
                edge.width += edge.labeloffset;
            }
            else {
                edge.height += edge.labeloffset;
            }
        }
    });
};
/*
 * Creates temporary dummy nodes that capture the rank in which each edge's
 * label is going to, if it has one of non-zero width and height. We do this
 * so that we can safely remove empty ranks while preserving balance for the
 * label's position.
 */
var injectEdgeLabelProxies = function (g) {
    g.edges().forEach(function (e) {
        var edge = g.edge(e);
        if (edge.width && edge.height) {
            var v = g.node(e.v);
            var w = g.node(e.w);
            var label = {
                e: e,
                rank: (w.rank - v.rank) / 2 + v.rank,
            };
            (0, util_1.addDummyNode)(g, "edge-proxy", label, "_ep");
        }
    });
};
var assignRankMinMax = function (g) {
    var maxRank = 0;
    g.nodes().forEach(function (v) {
        var _a, _b;
        var node = g.node(v);
        if (node.borderTop) {
            node.minRank = (_a = g.node(node.borderTop)) === null || _a === void 0 ? void 0 : _a.rank;
            node.maxRank = (_b = g.node(node.borderBottom)) === null || _b === void 0 ? void 0 : _b.rank;
            maxRank = Math.max(maxRank, node.maxRank || -Infinity);
        }
    });
    g.graph().maxRank = maxRank;
};
var removeEdgeLabelProxies = function (g) {
    g.nodes().forEach(function (v) {
        var node = g.node(v);
        if (node.dummy === "edge-proxy") {
            g.edge(node.e).labelRank = node.rank;
            g.removeNode(v);
        }
    });
};
var translateGraph = function (g) {
    var minX;
    var maxX = 0;
    var minY;
    var maxY = 0;
    var graphLabel = g.graph();
    var marginX = graphLabel.marginx || 0;
    var marginY = graphLabel.marginy || 0;
    var getExtremes = function (attrs) {
        if (!attrs)
            return;
        var x = attrs.x;
        var y = attrs.y;
        var w = attrs.width;
        var h = attrs.height;
        if (!isNaN(x) && !isNaN(w)) {
            if (minX === undefined) {
                minX = x - w / 2;
            }
            minX = Math.min(minX, x - w / 2);
            maxX = Math.max(maxX, x + w / 2);
        }
        if (!isNaN(y) && !isNaN(h)) {
            if (minY === undefined) {
                minY = y - h / 2;
            }
            minY = Math.min(minY, y - h / 2);
            maxY = Math.max(maxY, y + h / 2);
        }
    };
    g.nodes().forEach(function (v) {
        getExtremes(g.node(v));
    });
    g.edges().forEach(function (e) {
        var edge = g.edge(e);
        if (edge === null || edge === void 0 ? void 0 : edge.hasOwnProperty("x")) {
            getExtremes(edge);
        }
    });
    minX -= marginX;
    minY -= marginY;
    g.nodes().forEach(function (v) {
        var node = g.node(v);
        if (node) {
            node.x -= minX;
            node.y -= minY;
        }
    });
    g.edges().forEach(function (e) {
        var _a;
        var edge = g.edge(e);
        (_a = edge.points) === null || _a === void 0 ? void 0 : _a.forEach(function (p) {
            p.x -= minX;
            p.y -= minY;
        });
        if (edge.hasOwnProperty("x")) {
            edge.x -= minX;
        }
        if (edge.hasOwnProperty("y")) {
            edge.y -= minY;
        }
    });
    graphLabel.width = maxX - minX + marginX;
    graphLabel.height = maxY - minY + marginY;
};
var assignNodeIntersects = function (g) {
    g.edges().forEach(function (e) {
        var edge = g.edge(e);
        var nodeV = g.node(e.v);
        var nodeW = g.node(e.w);
        var p1;
        var p2;
        if (!edge.points) {
            edge.points = [];
            p1 = nodeW;
            p2 = nodeV;
        }
        else {
            p1 = edge.points[0];
            p2 = edge.points[edge.points.length - 1];
        }
        edge.points.unshift((0, util_1.intersectRect)(nodeV, p1));
        edge.points.push((0, util_1.intersectRect)(nodeW, p2));
    });
};
var fixupEdgeLabelCoords = function (g) {
    g.edges().forEach(function (e) {
        var edge = g.edge(e);
        if (edge === null || edge === void 0 ? void 0 : edge.hasOwnProperty("x")) {
            if (edge.labelpos === "l" || edge.labelpos === "r") {
                edge.width -= edge.labeloffset;
            }
            switch (edge.labelpos) {
                case "l":
                    edge.x -= edge.width / 2 + edge.labeloffset;
                    break;
                case "r":
                    edge.x += edge.width / 2 + edge.labeloffset;
                    break;
            }
        }
    });
};
var reversePointsForReversedEdges = function (g) {
    g.edges().forEach(function (e) {
        var _a;
        var edge = g.edge(e);
        if (edge.reversed) {
            (_a = edge.points) === null || _a === void 0 ? void 0 : _a.reverse();
        }
    });
};
var removeBorderNodes = function (g) {
    g.nodes().forEach(function (v) {
        var _a, _b, _c;
        if ((_a = g.children(v)) === null || _a === void 0 ? void 0 : _a.length) {
            var node = g.node(v);
            var t = g.node(node.borderTop);
            var b = g.node(node.borderBottom);
            var l = g.node(node.borderLeft[((_b = node.borderLeft) === null || _b === void 0 ? void 0 : _b.length) - 1]);
            var r = g.node(node.borderRight[((_c = node.borderRight) === null || _c === void 0 ? void 0 : _c.length) - 1]);
            node.width = Math.abs((r === null || r === void 0 ? void 0 : r.x) - (l === null || l === void 0 ? void 0 : l.x)) || 10;
            node.height = Math.abs((b === null || b === void 0 ? void 0 : b.y) - (t === null || t === void 0 ? void 0 : t.y)) || 10;
            node.x = ((l === null || l === void 0 ? void 0 : l.x) || 0) + node.width / 2;
            node.y = ((t === null || t === void 0 ? void 0 : t.y) || 0) + node.height / 2;
        }
    });
    g.nodes().forEach(function (v) {
        var _a;
        if (((_a = g.node(v)) === null || _a === void 0 ? void 0 : _a.dummy) === "border") {
            g.removeNode(v);
        }
    });
};
var removeSelfEdges = function (g) {
    g.edges().forEach(function (e) {
        if (e.v === e.w) {
            var node = g.node(e.v);
            if (!node.selfEdges) {
                node.selfEdges = [];
            }
            node.selfEdges.push({ e: e, label: g.edge(e) });
            g.removeEdgeObj(e);
        }
    });
};
var insertSelfEdges = function (g) {
    var layers = (0, util_1.buildLayerMatrix)(g);
    layers === null || layers === void 0 ? void 0 : layers.forEach(function (layer) {
        var orderShift = 0;
        layer === null || layer === void 0 ? void 0 : layer.forEach(function (v, i) {
            var _a;
            var node = g.node(v);
            node.order = i + orderShift;
            (_a = node.selfEdges) === null || _a === void 0 ? void 0 : _a.forEach(function (selfEdge) {
                (0, util_1.addDummyNode)(g, "selfedge", {
                    width: selfEdge.label.width,
                    height: selfEdge.label.height,
                    rank: node.rank,
                    order: i + ++orderShift,
                    e: selfEdge.e,
                    label: selfEdge.label,
                }, "_se");
            });
            delete node.selfEdges;
        });
    });
};
var positionSelfEdges = function (g) {
    g.nodes().forEach(function (v) {
        var node = g.node(v);
        if (node.dummy === "selfedge") {
            var selfNode = g.node(node.e.v);
            var x = selfNode.x + selfNode.width / 2;
            var y = selfNode.y;
            var dx = node.x - x;
            var dy = selfNode.height / 2;
            g.setEdgeObj(node.e, node.label);
            g.removeNode(v);
            node.label.points = [
                { x: x + (2 * dx) / 3, y: y - dy },
                { x: x + (5 * dx) / 6, y: y - dy },
                { y: y, x: x + dx },
                { x: x + (5 * dx) / 6, y: y + dy },
                { x: x + (2 * dx) / 3, y: y + dy },
            ];
            node.label.x = node.x;
            node.label.y = node.y;
        }
    });
};
var selectNumberAttrs = function (obj, attrs) {
    var pickedProperties = {};
    attrs === null || attrs === void 0 ? void 0 : attrs.forEach(function (key) {
        if (obj[key] === undefined)
            return;
        pickedProperties[key] = (+obj[key]);
    });
    return pickedProperties;
};
var canonicalize = function (attrs) {
    if (attrs === void 0) { attrs = {}; }
    var newAttrs = {};
    Object.keys(attrs).forEach(function (k) {
        newAttrs[k.toLowerCase()] = attrs[k];
    });
    return newAttrs;
};
exports.default = layout;
//# sourceMappingURL=layout.js.map