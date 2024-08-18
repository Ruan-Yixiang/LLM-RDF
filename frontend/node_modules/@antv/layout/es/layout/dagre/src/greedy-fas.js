import RawList from "./data/list";
import { Graph as RawGraph } from "@antv/graphlib";
class List extends RawList {
}
class StateGraph extends RawGraph {
}
/*
 * A greedy heuristic for finding a feedback arc set for a graph. A feedback
 * arc set is a set of edges that can be removed to make a graph acyclic.
 * The algorithm comes from: P. Eades, X. Lin, and W. F. Smyth, "A fast and
 * effective heuristic for the feedback arc set problem." This implementation
 * adjusts that from the paper to allow for weighted edges.
 */
const DEFAULT_WEIGHT_FN = () => 1;
const greedyFAS = (g, weightFn) => {
    var _a;
    if (g.nodeCount() <= 1)
        return [];
    const state = buildState(g, weightFn || DEFAULT_WEIGHT_FN);
    const results = doGreedyFAS(state.graph, state.buckets, state.zeroIdx);
    return (_a = results.map((e) => g.outEdges(e.v, e.w))) === null || _a === void 0 ? void 0 : _a.flat();
};
const doGreedyFAS = (g, buckets, zeroIdx) => {
    let results = [];
    const sources = buckets[buckets.length - 1];
    const sinks = buckets[0];
    let entry;
    while (g.nodeCount()) {
        while ((entry = sinks.dequeue())) {
            removeNode(g, buckets, zeroIdx, entry);
        }
        while ((entry = sources.dequeue())) {
            removeNode(g, buckets, zeroIdx, entry);
        }
        if (g.nodeCount()) {
            for (let i = buckets.length - 2; i > 0; --i) {
                entry = buckets[i].dequeue();
                if (entry) {
                    results = results.concat(removeNode(g, buckets, zeroIdx, entry, true));
                    break;
                }
            }
        }
    }
    return results;
};
const removeNode = (g, buckets, zeroIdx, entry, collectPredecessors) => {
    var _a, _b;
    const results = [];
    (_a = g.inEdges(entry.v)) === null || _a === void 0 ? void 0 : _a.forEach((edge) => {
        const weight = g.edge(edge);
        const uEntry = g.node(edge.v);
        if (collectPredecessors) {
            // this result not really care about in or out
            results.push({ v: edge.v, w: edge.w, in: 0, out: 0 });
        }
        if (uEntry.out === undefined)
            uEntry.out = 0;
        uEntry.out -= weight;
        assignBucket(buckets, zeroIdx, uEntry);
    });
    (_b = g.outEdges(entry.v)) === null || _b === void 0 ? void 0 : _b.forEach((edge) => {
        const weight = g.edge(edge);
        const w = edge.w;
        const wEntry = g.node(w);
        if (wEntry.in === undefined)
            wEntry.in = 0;
        wEntry.in -= weight;
        assignBucket(buckets, zeroIdx, wEntry);
    });
    g.removeNode(entry.v);
    return collectPredecessors ? results : undefined;
};
const buildState = (g, weightFn) => {
    const fasGraph = new StateGraph();
    let maxIn = 0;
    let maxOut = 0;
    g.nodes().forEach((v) => {
        fasGraph.setNode(v, { v, in: 0, out: 0 });
    });
    // Aggregate weights on nodes, but also sum the weights across multi-edges
    // into a single edge for the fasGraph.
    g.edges().forEach((e) => {
        const prevWeight = fasGraph.edge(e) || 0;
        const weight = (weightFn === null || weightFn === void 0 ? void 0 : weightFn(e)) || 1;
        const edgeWeight = prevWeight + weight;
        fasGraph.setEdge(e.v, e.w, edgeWeight);
        maxOut = Math.max(maxOut, (fasGraph.node(e.v).out += weight));
        maxIn = Math.max(maxIn, (fasGraph.node(e.w).in += weight));
    });
    const buckets = [];
    const rangeMax = maxOut + maxIn + 3;
    for (let i = 0; i < rangeMax; i++) {
        buckets.push(new List());
    }
    const zeroIdx = maxIn + 1;
    fasGraph.nodes().forEach((v) => {
        assignBucket(buckets, zeroIdx, fasGraph.node(v));
    });
    return { buckets, zeroIdx, graph: fasGraph };
};
const assignBucket = (buckets, zeroIdx, entry) => {
    if (!entry.out) {
        buckets[0].enqueue(entry);
    }
    else if (!entry["in"]) {
        buckets[buckets.length - 1].enqueue(entry);
    }
    else {
        buckets[entry.out - entry["in"] + zeroIdx].enqueue(entry);
    }
};
export default greedyFAS;
//# sourceMappingURL=greedy-fas.js.map