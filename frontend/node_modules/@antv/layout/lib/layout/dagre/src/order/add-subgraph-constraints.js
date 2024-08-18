"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var addSubgraphConstraints = function (g, cg, vs) {
    var prev = {};
    var rootPrev;
    vs === null || vs === void 0 ? void 0 : vs.forEach(function (v) {
        var child = g.parent(v);
        var parent;
        var prevChild;
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
exports.default = addSubgraphConstraints;
//# sourceMappingURL=add-subgraph-constraints.js.map