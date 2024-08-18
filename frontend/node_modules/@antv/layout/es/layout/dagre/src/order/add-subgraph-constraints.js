const addSubgraphConstraints = (g, cg, vs) => {
    const prev = {};
    let rootPrev;
    vs === null || vs === void 0 ? void 0 : vs.forEach((v) => {
        let child = g.parent(v);
        let parent;
        let prevChild;
        while (child) {
            parent = g.parent(child);
            if (parent) {
                prevChild = prev[parent];
                prev[parent] = child;
            }
            else {
                prevChild = rootPrev;
                rootPrev = child;
            }
            if (prevChild && prevChild !== child) {
                cg.setEdge(prevChild, child);
                return;
            }
            child = parent;
        }
    });
};
export default addSubgraphConstraints;
//# sourceMappingURL=add-subgraph-constraints.js.map