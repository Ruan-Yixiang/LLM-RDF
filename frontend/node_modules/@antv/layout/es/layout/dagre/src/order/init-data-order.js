/**
 * 按照数据中的结果设置fixorder
 */
const initDataOrder = (g, nodeOrder) => {
    const simpleNodes = g.nodes().filter((v) => {
        var _a;
        return !((_a = g.children(v)) === null || _a === void 0 ? void 0 : _a.length);
    });
    const ranks = simpleNodes.map((v) => g.node(v).rank);
    const maxRank = Math.max(...ranks);
    const layers = [];
    for (let i = 0; i < maxRank + 1; i++) {
        layers[i] = [];
    }
    nodeOrder === null || nodeOrder === void 0 ? void 0 : nodeOrder.forEach((n) => {
        const node = g.node(n);
        // 只考虑原有节点，dummy节点需要按照后续算法排出
        if (!node || (node === null || node === void 0 ? void 0 : node.dummy)) {
            return;
        }
        if (!isNaN(node.rank)) {
            node.fixorder = layers[node.rank].length; // 设置fixorder为当层的顺序
            layers[node.rank].push(n);
        }
    });
};
export default initDataOrder;
//# sourceMappingURL=init-data-order.js.map