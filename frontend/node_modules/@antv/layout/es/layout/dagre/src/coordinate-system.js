const adjust = (g) => {
    var _a;
    const rankDir = (_a = g.graph().rankdir) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (rankDir === "lr" || rankDir === "rl") {
        swapWidthHeight(g);
    }
};
const undo = (g) => {
    var _a;
    const rankDir = (_a = g.graph().rankdir) === null || _a === void 0 ? void 0 : _a.toLowerCase();
    if (rankDir === "bt" || rankDir === "rl") {
        reverseY(g);
    }
    if (rankDir === "lr" || rankDir === "rl") {
        swapXY(g);
        swapWidthHeight(g);
    }
};
const swapWidthHeight = (g) => {
    g.nodes().forEach((v) => {
        swapWidthHeightOne(g.node(v));
    });
    g.edges().forEach((e) => {
        swapWidthHeightOne(g.edge(e));
    });
};
const swapWidthHeightOne = (attrs) => {
    const w = attrs.width;
    attrs.width = attrs.height;
    attrs.height = w;
};
const reverseY = (g) => {
    g.nodes().forEach((v) => {
        reverseYOne(g.node(v));
    });
    g.edges().forEach((e) => {
        var _a;
        const edge = g.edge(e);
        (_a = edge.points) === null || _a === void 0 ? void 0 : _a.forEach((point) => reverseYOne(point));
        if (edge.hasOwnProperty("y")) {
            reverseYOne(edge);
        }
    });
};
const reverseYOne = (attrs) => {
    if (attrs === null || attrs === void 0 ? void 0 : attrs.y) {
        attrs.y = -attrs.y;
    }
};
const swapXY = (g) => {
    g.nodes().forEach((v) => {
        swapXYOne(g.node(v));
    });
    g.edges().forEach((e) => {
        var _a;
        const edge = g.edge(e);
        (_a = edge.points) === null || _a === void 0 ? void 0 : _a.forEach((point) => swapXYOne(point));
        if (edge.hasOwnProperty("x")) {
            swapXYOne(edge);
        }
    });
};
const swapXYOne = (attrs) => {
    const x = attrs.x;
    attrs.x = attrs.y;
    attrs.y = x;
};
export default { adjust, undo };
//# sourceMappingURL=coordinate-system.js.map