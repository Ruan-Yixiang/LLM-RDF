"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.minBy = exports.notime = exports.time = exports.partition = exports.maxRank = exports.addBorderNode = exports.removeEmptyRanks = exports.normalizeRanks = exports.buildLayerMatrix = exports.intersectRect = exports.predecessorWeights = exports.successorWeights = exports.zipObject = exports.asNonCompoundGraph = exports.simplify = exports.addDummyNode = void 0;
var util_1 = require("../../../util");
var graph_1 = require("../graph");
var safeSort = function (valueA, valueB) {
    return Number(valueA) - Number(valueB);
};
/*
 * Adds a dummy node to the graph and return v.
 */
var addDummyNode = function (g, type, attrs, name) {
    var v;
    do {
        v = "".concat(name).concat(Math.random());
    } while (g.hasNode(v));
    attrs.dummy = type;
    g.setNode(v, attrs);
    return v;
};
exports.addDummyNode = addDummyNode;
/*
 * Returns a new graph with only simple edges. Handles aggregation of data
 * associated with multi-edges.
 */
var simplify = function (g) {
    var simplified = new graph_1.Graph().setGraph(g.graph());
    g.nodes().forEach(function (v) { simplified.setNode(v, g.node(v)); });
    g.edges().forEach(function (e) {
        var simpleLabel = simplified.edgeFromArgs(e.v, e.w) || { weight: 0, minlen: 1 };
        var label = g.edge(e);
        simplified.setEdge(e.v, e.w, {
            weight: simpleLabel.weight + label.weight,
            minlen: Math.max(simpleLabel.minlen, label.minlen)
        });
    });
    return simplified;
};
exports.simplify = simplify;
var asNonCompoundGraph = function (g) {
    var simplified = new graph_1.Graph({ multigraph: g.isMultigraph() }).setGraph(g.graph());
    g.nodes().forEach(function (node) {
        var _a;
        if (!((_a = g.children(node)) === null || _a === void 0 ? void 0 : _a.length)) {
            simplified.setNode(node, g.node(node));
        }
    });
    g.edges().forEach(function (edge) {
        simplified.setEdgeObj(edge, g.edge(edge));
    });
    return simplified;
};
exports.asNonCompoundGraph = asNonCompoundGraph;
var zipObject = function (keys, values) {
    return keys === null || keys === void 0 ? void 0 : keys.reduce(function (obj, key, i) {
        obj[key] = values[i];
        return obj;
    }, {});
};
exports.zipObject = zipObject;
var successorWeights = function (g) {
    var weightsMap = {};
    g.nodes().forEach(function (node) {
        var _a;
        var sucs = {};
        (_a = g.outEdges(node)) === null || _a === void 0 ? void 0 : _a.forEach(function (e) {
            var _a;
            sucs[e.w] = (sucs[e.w] || 0) + (((_a = g.edge(e)) === null || _a === void 0 ? void 0 : _a.weight) || 0);
        });
        weightsMap[node] = sucs;
    });
    return weightsMap;
};
exports.successorWeights = successorWeights;
var predecessorWeights = function (g) {
    var nodes = g.nodes();
    var weightMap = nodes.map(function (v) {
        var _a;
        var preds = {};
        (_a = g.inEdges(v)) === null || _a === void 0 ? void 0 : _a.forEach(function (e) {
            preds[e.v] = (preds[e.v] || 0) + g.edge(e).weight;
        });
        return preds;
    });
    return (0, exports.zipObject)(nodes, weightMap);
};
exports.predecessorWeights = predecessorWeights;
/*
 * Finds where a line starting at point ({x, y}) would intersect a rectangle
 * ({x, y, width, height}) if it were pointing at the rectangle's center.
 */
var intersectRect = function (rect, point) {
    var x = Number(rect.x);
    var y = Number(rect.y);
    // Rectangle intersection algorithm from:
    // http://math.stackexchange.com/questions/108113/find-edge-between-two-boxes
    var dx = Number(point.x) - x;
    var dy = Number(point.y) - y;
    var w = Number(rect.width) / 2;
    var h = Number(rect.height) / 2;
    if (!dx && !dy) {
        // completely overlapped directly, then return points its self
        return { x: 0, y: 0 };
    }
    var sx;
    var sy;
    if (Math.abs(dy) * w > Math.abs(dx) * h) {
        // Intersection is top or bottom of rect.
        if (dy < 0) {
            h = -h;
        }
        sx = (h * dx) / dy;
        sy = h;
    }
    else {
        // Intersection is left or right of rect.
        if (dx < 0) {
            w = -w;
        }
        sx = w;
        sy = (w * dy) / dx;
    }
    return { x: x + sx, y: y + sy };
};
exports.intersectRect = intersectRect;
/*
 * Given a DAG with each node assigned "rank" and "order" properties, this
 * const will produce a matrix with the ids of each node.
 */
var buildLayerMatrix = function (g) {
    var layeringNodes = [];
    var rankMax = (0, exports.maxRank)(g) + 1;
    for (var i = 0; i < rankMax; i++) {
        layeringNodes.push([]);
    }
    // const layering = _.map(_.range(maxRank(g) + 1), function() { return []; });
    g.nodes().forEach(function (v) {
        var node = g.node(v);
        if (!node)
            return;
        var rank = node.rank;
        if (rank !== undefined && layeringNodes[rank]) {
            layeringNodes[rank].push(v);
        }
    });
    for (var i = 0; i < rankMax; i++) {
        layeringNodes[i] = layeringNodes[i].sort(function (va, vb) { var _a, _b; return safeSort((_a = g.node(va)) === null || _a === void 0 ? void 0 : _a.order, (_b = g.node(vb)) === null || _b === void 0 ? void 0 : _b.order); });
    }
    return layeringNodes;
};
exports.buildLayerMatrix = buildLayerMatrix;
/*
 * Adjusts the ranks for all nodes in the graph such that all nodes v have
 * rank(v) >= 0 and at least one node w has rank(w) = 0.
 */
var normalizeRanks = function (g) {
    var nodeRanks = g
        .nodes()
        .filter(function (v) { var _a; return ((_a = g.node(v)) === null || _a === void 0 ? void 0 : _a.rank) !== undefined; })
        .map(function (v) { return g.node(v).rank; });
    var min = Math.min.apply(Math, nodeRanks);
    g.nodes().forEach(function (v) {
        var node = g.node(v);
        if (node.hasOwnProperty("rank") && min !== Infinity) {
            node.rank -= min;
        }
    });
};
exports.normalizeRanks = normalizeRanks;
var removeEmptyRanks = function (g) {
    // Ranks may not start at 0, so we need to offset them
    var nodes = g.nodes();
    var nodeRanks = nodes
        .filter(function (v) { var _a; return ((_a = g.node(v)) === null || _a === void 0 ? void 0 : _a.rank) !== undefined; })
        .map(function (v) { return g.node(v).rank; });
    var offset = Math.min.apply(Math, nodeRanks);
    var layers = [];
    nodes.forEach(function (v) {
        var _a;
        var rank = (((_a = g.node(v)) === null || _a === void 0 ? void 0 : _a.rank) || 0) - offset;
        if (!layers[rank]) {
            layers[rank] = [];
        }
        layers[rank].push(v);
    });
    var delta = 0;
    var nodeRankFactor = g.graph().nodeRankFactor || 0;
    for (var i = 0; i < layers.length; i++) {
        var vs = layers[i];
        if (vs === undefined) {
            if (i % nodeRankFactor !== 0) {
                delta -= 1;
            }
        }
        else if (delta) {
            vs === null || vs === void 0 ? void 0 : vs.forEach(function (v) {
                var node = g.node(v);
                if (node) {
                    node.rank = node.rank || 0;
                    node.rank += delta;
                }
            });
        }
    }
};
exports.removeEmptyRanks = removeEmptyRanks;
var addBorderNode = function (g, prefix, rank, order) {
    var node = {
        width: 0,
        height: 0
    };
    if ((0, util_1.isNumber)(rank) && (0, util_1.isNumber)(order)) {
        node.rank = rank;
        node.order = order;
    }
    return (0, exports.addDummyNode)(g, "border", node, prefix);
};
exports.addBorderNode = addBorderNode;
var maxRank = function (g) {
    var maxRank;
    g.nodes().forEach(function (v) {
        var _a;
        var rank = (_a = g.node(v)) === null || _a === void 0 ? void 0 : _a.rank;
        if (rank !== undefined) {
            if (maxRank === undefined || rank > maxRank) {
                maxRank = rank;
            }
        }
    });
    if (!maxRank) {
        maxRank = 0;
    }
    return maxRank;
};
exports.maxRank = maxRank;
/*
 * Partition a collection into two groups: `lhs` and `rhs`. If the supplied
 * const returns true for an entry it goes into `lhs`. Otherwise it goes
 * into `rhs.
 */
var partition = function (collection, fn) {
    var result = { lhs: [], rhs: [] };
    collection === null || collection === void 0 ? void 0 : collection.forEach(function (value) {
        if (fn(value)) {
            result.lhs.push(value);
        }
        else {
            result.rhs.push(value);
        }
    });
    return result;
};
exports.partition = partition;
/*
 * Returns a new const that wraps `fn` with a timer. The wrapper logs the
 * time it takes to execute the function.
 */
var time = function (name, fn) {
    var start = Date.now();
    try {
        return fn();
    }
    finally {
        console.log("".concat(name, " time: ").concat(Date.now() - start, "ms"));
    }
};
exports.time = time;
var notime = function (name, fn) {
    return fn();
};
exports.notime = notime;
var minBy = function (array, func) {
    return array.reduce(function (a, b) {
        var valA = func(a);
        var valB = func(b);
        return valA > valB ? b : a;
    });
};
exports.minBy = minBy;
//# sourceMappingURL=util.js.map