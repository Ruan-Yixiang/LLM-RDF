"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var adjust = function (g) {
    var _a;
    var rankDir = (_a = g.graph().rankdir) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (rankDir === "lr" || rankDir === "rl") {
        swapWidthHeight(g);
    }
};
var undo = function (g) {
    var _a;
    var rankDir = (_a = g.graph().rankdir) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (rankDir === "bt" || rankDir === "rl") {
        reverseY(g);
    }
    if (rankDir === "lr" || rankDir === "rl") {
        swapXY(g);
        swapWidthHeight(g);
    }
};
var swapWidthHeight = function (g) {
    g.nodes().forEach(function (v) {
        swapWidthHeightOne(g.node(v));
    });
    g.edges().forEach(function (e) {
        swapWidthHeightOne(g.edge(e));
    });
};
var swapWidthHeightOne = function (attrs) {
    var w = attrs.width;
    attrs.width = attrs.height;
    attrs.height = w;
};
var reverseY = function (g) {
    g.nodes().forEach(function (v) {
        reverseYOne(g.node(v));
    });
    g.edges().forEach(function (e) {
        var _a;
        var edge = g.edge(e);
        (_a = edge.points) === null || _a === void 0 ? void 0 : _a.forEach(function (point) { return reverseYOne(point); });
        if (edge.hasOwnProperty("y")) {
            reverseYOne(edge);
        }
    });
};
var reverseYOne = function (attrs) {
    if (attrs === null || attrs === void 0 ? void 0 : attrs.y) {
        attrs.y = -attrs.y;
    }
};
var swapXY = function (g) {
    g.nodes().forEach(function (v) {
        swapXYOne(g.node(v));
    });
    g.edges().forEach(function (e) {
        var _a;
        var edge = g.edge(e);
        (_a = edge.points) === null || _a === void 0 ? void 0 : _a.forEach(function (point) { return swapXYOne(point); });
        if (edge.hasOwnProperty("x")) {
            swapXYOne(edge);
        }
    });
};
var swapXYOne = function (attrs) {
    var x = attrs.x;
    attrs.x = attrs.y;
    attrs.y = x;
};
exports.default = { adjust: adjust, undo: undo };
//# sourceMappingURL=coordinate-system.js.map