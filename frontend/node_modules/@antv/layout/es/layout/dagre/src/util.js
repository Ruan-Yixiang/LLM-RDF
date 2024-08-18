import { isNumber } from "../../../util";
import { Graph } from "../graph";
const safeSort = (valueA, valueB) => {
    return Number(valueA) - Number(valueB);
};
/*
 * Adds a dummy node to the graph and return v.
 */
export const addDummyNode = (g, type, attrs, name) => {
    let v;
    do {
        v = `${name}${Math.random()}`;
    } while (g.hasNode(v));
    attrs.dummy = type;
    g.setNode(v, attrs);
    return v;
};
/*
 * Returns a new graph with only simple edges. Handles aggregation of data
 * associated with multi-edges.
 */
export const simplify = (g) => {
    const simplified = new Graph().setGraph(g.graph());
    g.nodes().forEach((v) => { simplified.setNode(v, g.node(v)); });
    g.edges().forEach((e) => {
        const simpleLabel = simplified.edgeFromArgs(e.v, e.w) || { weight: 0, minlen: 1 };
        const label = g.edge(e);
        simplified.setEdge(e.v, e.w, {
            weight: simpleLabel.weight + label.weight,
            minlen: Math.max(simpleLabel.minlen, label.minlen)
        });
    });
    return simplified;
};
export const asNonCompoundGraph = (g) => {
    const simplified = new Graph({ multigraph: g.isMultigraph() }).setGraph(g.graph());
    g.nodes().forEach((node) => {
        var _a;
        if (!((_a = g.children(node)) === null || _a === void 0 ? void 0 : _a.length)) {
            simplified.setNode(node, g.node(node));
        }
    });
    g.edges().forEach((edge) => {
        simplified.setEdgeObj(edge, g.edge(edge));
    });
    return simplified;
};
export const zipObject = (keys, values) => {
    return keys === null || keys === void 0 ? void 0 : keys.reduce((obj, key, i) => {
        obj[key] = values[i];
        return obj;
    }, {});
};
export const successorWeights = (g) => {
    const weightsMap = {};
    g.nodes().forEach((node) => {
        var _a;
        const sucs = {};
        (_a = g.outEdges(node)) === null || _a === void 0 ? void 0 : _a.forEach((e) => {
            var _a;
            sucs[e.w] = (sucs[e.w] || 0) + (((_a = g.edge(e)) === null || _a === void 0 ? void 0 : _a.weight) || 0);
        });
        weightsMap[node] = sucs;
    });
    return weightsMap;
};
export const predecessorWeights = (g) => {
    const nodes = g.nodes();
    const weightMap = nodes.map((v) => {
        var _a;
        const preds = {};
        (_a = g.inEdges(v)) === null || _a === void 0 ? void 0 : _a.forEach((e) => {
            preds[e.v] = (preds[e.v] || 0) + g.edge(e).weight;
        });
        return preds;
    });
    return zipObject(nodes, weightMap);
};
/*
 * Finds where a line starting at point ({x, y}) would intersect a rectangle
 * ({x, y, width, height}) if it were pointing at the rectangle's center.
 */
export const intersectRect = (rect, point) => {
    const x = Number(rect.x);
    const y = Number(rect.y);
    // Rectangle intersection algorithm from:
    // http://math.stackexchange.com/questions/108113/find-edge-between-two-boxes
    const dx = Number(point.x) - x;
    const dy = Number(point.y) - y;
    let w = Number(rect.width) / 2;
    let h = Number(rect.height) / 2;
    if (!dx && !dy) {
        // completely overlapped directly, then return points its self
        return { x: 0, y: 0 };
    }
    let sx;
    let sy;
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
/*
 * Given a DAG with each node assigned "rank" and "order" properties, this
 * const will produce a matrix with the ids of each node.
 */
export const buildLayerMatrix = (g) => {
    const layeringNodes = [];
    const rankMax = maxRank(g) + 1;
    for (let i = 0; i < rankMax; i++) {
        layeringNodes.push([]);
    }
    // const layering = _.map(_.range(maxRank(g) + 1), function() { return []; });
    g.nodes().forEach((v) => {
        const node = g.node(v);
        if (!node)
            return;
        const rank = node.rank;
        if (rank !== undefined && layeringNodes[rank]) {
            layeringNodes[rank].push(v);
        }
    });
    for (let i = 0; i < rankMax; i++) {
        layeringNodes[i] = layeringNodes[i].sort((va, vb) => { var _a, _b; return safeSort((_a = g.node(va)) === null || _a === void 0 ? void 0 : _a.order, (_b = g.node(vb)) === null || _b === void 0 ? void 0 : _b.order); });
    }
    return layeringNodes;
};
/*
 * Adjusts the ranks for all nodes in the graph such that all nodes v have
 * rank(v) >= 0 and at least one node w has rank(w) = 0.
 */
export const normalizeRanks = (g) => {
    const nodeRanks = g
        .nodes()
        .filter((v) => { var _a; return ((_a = g.node(v)) === null || _a === void 0 ? void 0 : _a.rank) !== undefined; })
        .map((v) => g.node(v).rank);
    const min = Math.min(...nodeRanks);
    g.nodes().forEach((v) => {
        const node = g.node(v);
        if (node.hasOwnProperty("rank") && min !== Infinity) {
            node.rank -= min;
        }
    });
};
export const removeEmptyRanks = (g) => {
    // Ranks may not start at 0, so we need to offset them
    const nodes = g.nodes();
    const nodeRanks = nodes
        .filter((v) => { var _a; return ((_a = g.node(v)) === null || _a === void 0 ? void 0 : _a.rank) !== undefined; })
        .map((v) => g.node(v).rank);
    const offset = Math.min(...nodeRanks);
    const layers = [];
    nodes.forEach((v) => {
        var _a;
        const rank = (((_a = g.node(v)) === null || _a === void 0 ? void 0 : _a.rank) || 0) - offset;
        if (!layers[rank]) {
            layers[rank] = [];
        }
        layers[rank].push(v);
    });
    let delta = 0;
    const nodeRankFactor = g.graph().nodeRankFactor || 0;
    for (let i = 0; i < layers.length; i++) {
        const vs = layers[i];
        if (vs === undefined) {
            if (i % nodeRankFactor !== 0) {
                delta -= 1;
            }
        }
        else if (delta) {
            vs === null || vs === void 0 ? void 0 : vs.forEach((v) => {
                const node = g.node(v);
                if (node) {
                    node.rank = node.rank || 0;
                    node.rank += delta;
                }
            });
        }
    }
};
export const addBorderNode = (g, prefix, rank, order) => {
    const node = {
        width: 0,
        height: 0
    };
    if (isNumber(rank) && isNumber(order)) {
        node.rank = rank;
        node.order = order;
    }
    return addDummyNode(g, "border", node, prefix);
};
export const maxRank = (g) => {
    let maxRank;
    g.nodes().forEach((v) => {
        var _a;
        const rank = (_a = g.node(v)) === null || _a === void 0 ? void 0 : _a.rank;
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
/*
 * Partition a collection into two groups: `lhs` and `rhs`. If the supplied
 * const returns true for an entry it goes into `lhs`. Otherwise it goes
 * into `rhs.
 */
export const partition = (collection, fn) => {
    const result = { lhs: [], rhs: [] };
    collection === null || collection === void 0 ? void 0 : collection.forEach((value) => {
        if (fn(value)) {
            result.lhs.push(value);
        }
        else {
            result.rhs.push(value);
        }
    });
    return result;
};
/*
 * Returns a new const that wraps `fn` with a timer. The wrapper logs the
 * time it takes to execute the function.
 */
export const time = (name, fn) => {
    const start = Date.now();
    try {
        return fn();
    }
    finally {
        console.log(`${name} time: ${Date.now() - start}ms`);
    }
};
export const notime = (name, fn) => {
    return fn();
};
export const minBy = (array, func) => {
    return array.reduce((a, b) => {
        const valA = func(a);
        const valB = func(b);
        return valA > valB ? b : a;
    });
};
//# sourceMappingURL=util.js.map