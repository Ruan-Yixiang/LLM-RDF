"use strict";
/*
 * A function that takes a layering (an array of layers, each with an array of
 * ordererd nodes) and a graph and returns a weighted crossing count.
 *
 * Pre-conditions:
 *
 *    1. Input graph must be simple (not a multigraph), directed, and include
 *       only simple edges.
 *    2. Edges in the input graph must have assigned weights.
 *
 * Post-conditions:
 *
 *    1. The graph and layering matrix are left unchanged.
 *
 * This algorithm is derived from Barth, et al., "Bilayer Cross Counting."
 */
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
var twoLayerCrossCount = function (g, northLayer, southLayer) {
    // Sort all of the edges between the north and south layers by their position
    // in the north layer and then the south. Map these edges to the position of
    // their head in the south layer.
    var southPos = (0, util_1.zipObject)(southLayer, southLayer.map(function (v, i) { return i; }));
    var unflat = northLayer.map(function (v) {
        var _a;
        var unsort = (_a = g.outEdges(v)) === null || _a === void 0 ? void 0 : _a.map(function (e) {
            return { pos: southPos[e.w] || 0, weight: g.edge(e).weight };
        });
        return unsort === null || unsort === void 0 ? void 0 : unsort.sort(function (a, b) { return a.pos - b.pos; });
    });
    var southEntries = unflat.flat().filter(function (entry) { return entry !== undefined; });
    // Build the accumulator tree
    var firstIndex = 1;
    while (firstIndex < southLayer.length)
        firstIndex <<= 1;
    var treeSize = 2 * firstIndex - 1;
    firstIndex -= 1;
    var tree = Array(treeSize).fill(0, 0, treeSize);
    // Calculate the weighted crossings
    var cc = 0;
    southEntries === null || southEntries === void 0 ? void 0 : southEntries.forEach(function (entry) {
        if (entry) {
            var index = entry.pos + firstIndex;
            tree[index] += entry.weight;
            var weightSum = 0;
            while (index > 0) {
                if (index % 2) {
                    weightSum += tree[index + 1];
                }
                index = (index - 1) >> 1;
                tree[index] += entry.weight;
            }
            cc += entry.weight * weightSum;
        }
    });
    return cc;
};
var crossCount = function (g, layering) {
    var cc = 0;
    for (var i = 1; i < (layering === null || layering === void 0 ? void 0 : layering.length); i += 1) {
        cc += twoLayerCrossCount(g, layering[i - 1], layering[i]);
    }
    return cc;
};
exports.default = crossCount;
//# sourceMappingURL=cross-count.js.map