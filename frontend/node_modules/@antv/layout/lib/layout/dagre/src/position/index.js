"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
var bk_1 = require("./bk");
var positionY = function (g) {
    var layering = (0, util_1.buildLayerMatrix)(g);
    var rankSep = g.graph().ranksep;
    var prevY = 0;
    layering === null || layering === void 0 ? void 0 : layering.forEach(function (layer) {
        var heights = layer.map(function (v) { return g.node(v).height; });
        var maxHeight = Math.max.apply(Math, __spreadArray(__spreadArray([], heights, false), [0], false));
        layer === null || layer === void 0 ? void 0 : layer.forEach(function (v) {
            g.node(v).y = prevY + maxHeight / 2;
        });
        prevY += maxHeight + rankSep;
    });
};
var positionX = function (g) {
    var layering = (0, util_1.buildLayerMatrix)(g);
    var conflicts = Object.assign((0, bk_1.findType1Conflicts)(g, layering), (0, bk_1.findType2Conflicts)(g, layering));
    var xss = {};
    var adjustedLayering = [];
    ["u", "d"].forEach(function (vert) {
        adjustedLayering =
            vert === "u" ? layering : Object.values(layering).reverse();
        ["l", "r"].forEach(function (horiz) {
            if (horiz === "r") {
                adjustedLayering = adjustedLayering.map(function (inner) {
                    return Object.values(inner).reverse();
                });
            }
            var neighborFn = (vert === "u" ? g.predecessors : g.successors).bind(g);
            var align = (0, bk_1.verticalAlignment)(g, adjustedLayering, conflicts, neighborFn);
            var xs = (0, bk_1.horizontalCompaction)(g, adjustedLayering, align.root, align.align, horiz === "r");
            if (horiz === "r") {
                Object.keys(xs).forEach(function (xsKey) { return (xs[xsKey] = -xs[xsKey]); });
            }
            xss[vert + horiz] = xs;
        });
    });
    var smallestWidth = (0, bk_1.findSmallestWidthAlignment)(g, xss);
    smallestWidth && (0, bk_1.alignCoordinates)(xss, smallestWidth);
    return (0, bk_1.balance)(xss, g.graph().align);
};
var position = function (g) {
    var _a;
    var ng = (0, util_1.asNonCompoundGraph)(g);
    positionY(ng);
    var xs = positionX(ng);
    (_a = Object.keys(xs)) === null || _a === void 0 ? void 0 : _a.forEach(function (key) {
        ng.node(key).x = xs[key];
    });
};
exports.default = position;
//# sourceMappingURL=index.js.map