/*
 * Initializes ranks for the input graph using the longest path algorithm. This
 * algorithm scales well and is fast in practice, it yields rather poor
 * solutions. Nodes are pushed to the lowest layer possible, leaving the bottom
 * ranks wide and leaving edges longer than necessary. However, due to its
 * speed, this algorithm is good for getting an initial ranking that can be fed
 * into other algorithms.
 *
 * This algorithm does not normalize layers because it will be used by other
 * algorithms in most cases. If using this algorithm directly, be sure to
 * run normalize at the end.
 *
 * Pre-conditions:
 *
 *    1. Input graph is a DAG.
 *    2. Input graph node labels can be assigned properties.
 *
 * Post-conditions:
 *
 *    1. Each node will be assign an (unnormalized) "rank" property.
 */
const longestPath = (g) => {
    var _a;
    const visited = {};
    const dfs = (v) => {
        var _a;
        const label = g.node(v);
        if (!label)
            return 0;
        if (visited[v]) {
            return label.rank;
        }
        visited[v] = true;
        let rank;
        (_a = g.outEdges(v)) === null || _a === void 0 ? void 0 : _a.forEach((edgeObj) => {
            const wRank = dfs(edgeObj.w);
            const minLen = g.edge(edgeObj).minlen;
            const r = wRank - minLen;
            if (r) {
                if (rank === undefined || r < rank) {
                    rank = r;
                }
            }
        });
        if (!rank) {
            rank = 0;
        }
        label.rank = rank;
        return rank;
    };
    (_a = g.sources()) === null || _a === void 0 ? void 0 : _a.forEach((source) => dfs(source));
};
const longestPathWithLayer = (g) => {
    var _a;
    // 用longest path，找出最深的点
    const visited = {};
    let minRank;
    const dfs = (v) => {
        var _a;
        const label = g.node(v);
        if (!label)
            return 0;
        if (visited[v]) {
            return label.rank;
        }
        visited[v] = true;
        let rank;
        (_a = g.outEdges(v)) === null || _a === void 0 ? void 0 : _a.forEach((edgeObj) => {
            const wRank = dfs(edgeObj.w);
            const minLen = g.edge(edgeObj).minlen;
            const r = wRank - minLen;
            if (r) {
                if (rank === undefined || r < rank) {
                    rank = r;
                }
            }
        });
        if (!rank) {
            rank = 0;
        }
        if (minRank === undefined || rank < minRank) {
            minRank = rank;
        }
        label.rank = rank;
        return rank;
    };
    (_a = g.sources()) === null || _a === void 0 ? void 0 : _a.forEach((source) => {
        if (g.node(source))
            dfs(source);
    });
    if (minRank === undefined) {
        minRank = 0;
    }
    // minRank += 1; // NOTE: 最小的层级是dummy root，+1
    // forward一遍，赋值层级
    const forwardVisited = {};
    const dfsForward = (v, nextRank) => {
        var _a;
        const label = g.node(v);
        const currRank = (!isNaN(label.layer) ? label.layer : nextRank);
        // 没有指定，取最大值
        if (label.rank === undefined || label.rank < currRank) {
            label.rank = currRank;
        }
        if (forwardVisited[v])
            return;
        forwardVisited[v] = true;
        // DFS遍历子节点
        (_a = g.outEdges(v)) === null || _a === void 0 ? void 0 : _a.map((e) => {
            dfsForward(e.w, currRank + g.edge(e).minlen);
        });
    };
    // 指定层级的，更新下游
    g.nodes().forEach((n) => {
        const label = g.node(n);
        if (!label)
            return;
        if (!isNaN(label.layer)) {
            dfsForward(n, label.layer); // 默认的dummy root所在层的rank是-1
        }
        else {
            label.rank -= minRank;
        }
    });
};
/*
 * Returns the amount of slack for the given edge. The slack is defined as the
 * difference between the length of the edge and its minimum length.
 */
const slack = (g, e) => {
    return (g.node(e.w).rank -
        g.node(e.v).rank -
        g.edge(e).minlen);
};
export { longestPath, longestPathWithLayer, slack };
export default {
    longestPath,
    longestPathWithLayer,
    slack,
};
//# sourceMappingURL=util.js.map