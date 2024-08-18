import { max } from '@antv/util';
/*
 * Assigns an initial order value for each node by performing a DFS search
 * starting from nodes in the first rank. Nodes are assigned an order in their
 * rank as they are first visited.
 *
 * This approach comes from Gansner, et al., "A Technique for Drawing Directed
 * Graphs."
 *
 * Returns a layering matrix with an array per layer and each layer sorted by
 * the order of its nodes.
 */
const initOrder = (g) => {
    const visited = {};
    const simpleNodes = g.nodes().filter((v) => {
        var _a;
        return !((_a = g.children(v)) === null || _a === void 0 ? void 0 : _a.length);
    });
    const nodeRanks = simpleNodes.map((v) => g.node(v).rank);
    const maxRank = max(nodeRanks);
    const layers = [];
    for (let i = 0; i < maxRank + 1; i++) {
        layers.push([]);
    }
    const dfs = (v) => {
        var _a;
        if (visited.hasOwnProperty(v))
            return;
        visited[v] = true;
        const node = g.node(v);
        if (!isNaN(node.rank)) {
            layers[node.rank].push(v);
        }
        (_a = g.successors(v)) === null || _a === void 0 ? void 0 : _a.forEach((child) => dfs(child));
    };
    const orderedVs = simpleNodes.sort((a, b) => g.node(a).rank - g.node(b).rank);
    // const orderedVs = _.sortBy(simpleNodes, function(v) { return g.node(v)!.rank; });
    // 有fixOrder的，直接排序好放进去
    const beforeSort = orderedVs.filter((n) => {
        return g.node(n).fixorder !== undefined;
    });
    const fixOrderNodes = beforeSort.sort((a, b) => g.node(a).fixorder - g.node(b).fixorder);
    fixOrderNodes === null || fixOrderNodes === void 0 ? void 0 : fixOrderNodes.forEach((n) => {
        if (!isNaN(g.node(n).rank)) {
            layers[g.node(n).rank].push(n);
        }
        visited[n] = true;
    });
    orderedVs === null || orderedVs === void 0 ? void 0 : orderedVs.forEach(dfs);
    return layers;
};
export default initOrder;
//# sourceMappingURL=init-order.js.map