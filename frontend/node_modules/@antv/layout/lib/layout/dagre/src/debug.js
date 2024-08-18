"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graph_1 = require("../graph");
var util_1 = require("./util");
var debugOrdering = function (g) {
    var layerMatrix = (0, util_1.buildLayerMatrix)(g);
    var h = new graph_1.Graph({ compound: true, multigraph: true }).setGraph({});
    g.nodes().forEach(function (v) {
        h.setNode(v, { label: v });
        h.setParent(v, "layer".concat(g.node(v).rank));
    });
    g.edges().forEach(function (e) {
        h.setEdge(e.v, e.w, {}, e.name);
    });
    layerMatrix === null || layerMatrix === void 0 ? void 0 : layerMatrix.forEach(function (layer, i) {
        var layerV = "layer".concat(i);
        h.setNode(layerV, { rank: "same" });
        layer === null || layer === void 0 ? void 0 : layer.reduce(function (u, v) {
            h.setEdge(u, v, { style: "invis" });
            return v;
        });
    });
    return h;
};
exports.default = debugOrdering;
//# sourceMappingURL=debug.js.map