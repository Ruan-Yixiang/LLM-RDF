"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var greedy_fas_1 = __importDefault(require("./greedy-fas"));
var run = function (g) {
    var weightFn = function (g) {
        return function (e) { var _a; return ((_a = g.edge(e)) === null || _a === void 0 ? void 0 : _a.weight) || 1; };
    };
    var fas = g.graph().acyclicer === "greedy" ? (0, greedy_fas_1.default)(g, weightFn(g)) : dfsFAS(g);
    fas === null || fas === void 0 ? void 0 : fas.forEach(function (e) {
        var label = g.edge(e);
        g.removeEdgeObj(e);
        label.forwardName = e.name;
        label.reversed = true;
        g.setEdge(e.w, e.v, label, "rev-".concat(Math.random()));
    });
};
var dfsFAS = function (g) {
    var fas = [];
    var stack = {};
    var visited = {};
    var dfs = function (v) {
        var _a;
        if (visited[v]) {
            return;
        }
        visited[v] = true;
        stack[v] = true;
        (_a = g.outEdges(v)) === null || _a === void 0 ? void 0 : _a.forEach(function (e) {
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
var undo = function (g) {
    g.edges().forEach(function (e) {
        var label = g.edge(e);
        if (label.reversed) {
            g.removeEdgeObj(e);
            var forwardName = label.forwardName;
            delete label.reversed;
            delete label.forwardName;
            g.setEdge(e.w, e.v, label, forwardName);
        }
    });
};
exports.default = { run: run, undo: undo };
//# sourceMappingURL=acyclic.js.map