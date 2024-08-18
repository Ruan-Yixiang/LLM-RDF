"use strict";
// "use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// var rankUtil = require("./util");
// var longestPath = rankUtil.longestPathWithLayer;
// var feasibleTree = require("./feasible-tree").feasibleTreeWithLayer;
// var networkSimplex = require("./network-simplex");
var util_1 = require("./util");
var feasible_tree_1 = require("./feasible-tree");
var network_simplex_1 = __importDefault(require("./network-simplex"));
/*
 * Assigns a rank to each node in the input graph that respects the "minlen"
 * constraint specified on edges between nodes.
 *
 * This basic structure is derived from Gansner, et al., "A Technique for
 * Drawing Directed Graphs."
 *
 * Pre-conditions:
 *
 *    1. Graph must be a connected DAG
 *    2. Graph nodes must be objects
 *    3. Graph edges must have "weight" and "minlen" attributes
 *
 * Post-conditions:
 *
 *    1. Graph nodes will have a "rank" attribute based on the results of the
 *       algorithm. Ranks can start at any index (including negative), we'll
 *       fix them up later.
 */
var rank = function (g) {
    switch (g.graph().ranker) {
        case "network-simplex":
            networkSimplexRanker(g);
            break;
        case "tight-tree":
            tightTreeRanker(g);
            break;
        case "longest-path":
            longestPathRanker(g);
            break;
        // default: networkSimplexRanker(g);
        default: tightTreeRanker(g);
    }
};
// A fast and simple ranker, but results are far from optimal.
var longestPathRanker = util_1.longestPath;
var tightTreeRanker = function (g) {
    (0, util_1.longestPathWithLayer)(g);
    (0, feasible_tree_1.feasibleTreeWithLayer)(g);
};
var networkSimplexRanker = function (g) {
    (0, network_simplex_1.default)(g);
};
exports.default = rank;
//# sourceMappingURL=index.js.map