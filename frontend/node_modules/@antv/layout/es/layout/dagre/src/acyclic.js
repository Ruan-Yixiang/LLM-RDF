import greedyFAS from "./greedy-fas";
const run = (g) => {
    const weightFn = (g) => {
        return (e) => { var _a; return ((_a = g.edge(e)) === null || _a === void 0 ? void 0 : _a.weight) || 1; };
    };
    const fas = g.graph().acyclicer === "greedy" ? greedyFAS(g, weightFn(g)) : dfsFAS(g);
    fas === null || fas === void 0 ? void 0 : fas.forEach((e) => {
        const label = g.edge(e);
        g.removeEdgeObj(e);
        label.forwardName = e.name;
        label.reversed = true;
        g.setEdge(e.w, e.v, label, `rev-${Math.random()}`);
    });
};
const dfsFAS = (g) => {
    const fas = [];
    const stack = {};
    const visited = {};
    const dfs = (v) => {
        var _a;
        if (visited[v]) {
            return;
        }
        visited[v] = true;
        stack[v] = true;
        (_a = g.outEdges(v)) === null || _a === void 0 ? void 0 : _a.forEach((e) => {
            if (stack[e.w]) {
                fas.push(e);
            }
            else {
                dfs(e.w);
            }
        });
        delete stack[v];
    };
    g.nodes().forEach(dfs);
    return fas;
};
const undo = (g) => {
    g.edges().forEach((e) => {
        const label = g.edge(e);
        if (label.reversed) {
            g.removeEdgeObj(e);
            const forwardName = label.forwardName;
            delete label.reversed;
            delete label.forwardName;
            g.setEdge(e.w, e.v, label, forwardName);
        }
    });
};
export default { run, undo };
//# sourceMappingURL=acyclic.js.map