"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 按照数据中的结果设置fixorder
 */
var initDataOrder = function (g, nodeOrder) {
    var simpleNodes = g.nodes().filter(function (v) {
        var _a;
        return !((_a = g.children(v)) === null || _a === void 0 ? void 0 : _a.length);
    });
    var ranks = simpleNodes.map(function (v) { return g.node(v).rank; });
    var maxRank = Math.max.apply(Math, ranks);
    var layers = [];
    for (var i = 0; i < maxRank + 1; i++) {
        layers[i] = [];
    }
    nodeOrder === null || nodeOrder === void 0 ? void 0 : nodeOrder.forEach(function (n) {
        var node = g.node(n);
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
exports.default = initDataOrder;
//# sourceMappingURL=init-data-order.js.map