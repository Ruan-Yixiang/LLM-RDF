"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var barycenter = function (g, movable) {
    return movable.map(function (v) {
        var inV = g.inEdges(v);
        if (!(inV === null || inV === void 0 ? void 0 : inV.length)) {
            return { v: v };
        }
        {
            var result_1 = { sum: 0, weight: 0 };
            inV === null || inV === void 0 ? void 0 : inV.forEach(function (e) {
                var edge = g.edge(e);
                var nodeU = g.node(e.v);
                result_1.sum += (edge.weight * nodeU.order);
                result_1.weight += edge.weight;
            });
            return {
                v: v,
                barycenter: result_1.sum / result_1.weight,
                weight: result_1.weight
            };
        }
    });
};
exports.default = barycenter;
//# sourceMappingURL=barycenter.js.map