const barycenter = (g, movable) => {
    return movable.map((v) => {
        const inV = g.inEdges(v);
        if (!(inV === null || inV === void 0 ? void 0 : inV.length)) {
            return { v };
        }
        {
            const result = { sum: 0, weight: 0 };
            inV === null || inV === void 0 ? void 0 : inV.forEach((e) => {
                const edge = g.edge(e);
                const nodeU = g.node(e.v);
                result.sum += (edge.weight * nodeU.order);
                result.weight += edge.weight;
            });
            return {
                v,
                barycenter: result.sum / result.weight,
                weight: result.weight
            };
        }
    });
};
export default barycenter;
//# sourceMappingURL=barycenter.js.map