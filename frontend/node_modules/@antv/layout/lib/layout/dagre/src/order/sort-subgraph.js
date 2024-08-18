"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var barycenter_1 = __importDefault(require("./barycenter"));
var resolve_conflicts_1 = __importDefault(require("./resolve-conflicts"));
var sort_1 = __importDefault(require("./sort"));
var sortSubgraph = function (g, v, cg, biasRight, usePrev, keepNodeOrder) {
    var _a, _b, _c, _d;
    var movable = g.children(v);
    // fixorder的点不参与排序（这个方案不合适，只排了新增节点，和原来的分离）
    var node = g.node(v);
    var bl = node ? node.borderLeft : undefined;
    var br = node ? node.borderRight : undefined;
    var subgraphs = {};
    if (bl) {
        movable = movable === null || movable === void 0 ? void 0 : movable.filter(function (w) {
            return w !== bl && w !== br;
        });
    }
    var barycenters = (0, barycenter_1.default)(g, movable || []);
    barycenters === null || barycenters === void 0 ? void 0 : barycenters.forEach(function (entry) {
        var _a;
        if ((_a = g.children(entry.v)) === null || _a === void 0 ? void 0 : _a.length) {
            var subgraphResult = sortSubgraph(g, entry.v, cg, biasRight, keepNodeOrder);
            subgraphs[entry.v] = subgraphResult;
            if (subgraphResult.hasOwnProperty("barycenter")) {
                mergeBarycenters(entry, subgraphResult);
            }
        }
    });
    var entries = (0, resolve_conflicts_1.default)(barycenters, cg);
    expandSubgraphs(entries, subgraphs);
    // 添加fixorder信息到entries里边
    // TODO: 不考虑复合情况，只用第一个点的fixorder信息，后续考虑更完备的实现
    (_a = entries
        .filter(function (e) { return e.vs.length > 0; })) === null || _a === void 0 ? void 0 : _a.forEach(function (e) {
        var node = g.node(e.vs[0]);
        if (node) {
            e.fixorder = node.fixorder;
            e.order = node.order;
        }
    });
    var result = (0, sort_1.default)(entries, biasRight, usePrev, keepNodeOrder);
    if (bl) {
        result.vs = [bl, result.vs, br].flat();
        if ((_b = g.predecessors(bl)) === null || _b === void 0 ? void 0 : _b.length) {
            var blPred = g.node(((_c = g.predecessors(bl)) === null || _c === void 0 ? void 0 : _c[0]) || "");
            var brPred = g.node(((_d = g.predecessors(br)) === null || _d === void 0 ? void 0 : _d[0]) || "");
            if (!result.hasOwnProperty("barycenter")) {
                result.barycenter = 0;
                result.weight = 0;
            }
            result.barycenter =
                (result.barycenter * result.weight +
                    blPred.order +
                    brPred.order) /
                    (result.weight + 2);
            result.weight += 2;
        }
    }
    return result;
};
var expandSubgraphs = function (entries, subgraphs) {
    entries === null || entries === void 0 ? void 0 : entries.forEach(function (entry) {
        var _a;
        var vss = (_a = entry.vs) === null || _a === void 0 ? void 0 : _a.map(function (v) {
            if (subgraphs[v]) {
                return subgraphs[v].vs;
            }
            return v;
        });
        entry.vs = vss.flat();
    });
};
var mergeBarycenters = function (target, other) {
    if (target.barycenter !== undefined) {
        target.barycenter =
            (target.barycenter * target.weight + other.barycenter * other.weight) /
                (target.weight + other.weight);
        target.weight += other.weight;
    }
    else {
        target.barycenter = other.barycenter;
        target.weight = other.weight;
    }
};
exports.default = sortSubgraph;
//# sourceMappingURL=sort-subgraph.js.map