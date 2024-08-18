"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var components = function (graph) {
    var visited = new Set();
    var resultComponents = [];
    var nodes = graph.nodes();
    nodes.forEach(function (n) {
        var _a, _b;
        var componentsArr = [];
        var waitingList = [n];
        while (waitingList.length > 0) {
            var node = waitingList.pop();
            if (!visited.has(node)) {
                visited.add(node);
                componentsArr.push(node);
                (_a = graph.successors(node)) === null || _a === void 0 ? void 0 : _a.forEach(function (n) { return waitingList.push(n); });
                (_b = graph.predecessors(node)) === null || _b === void 0 ? void 0 : _b.forEach(function (n) { return waitingList.push(n); });
            }
        }
        if (componentsArr.length) {
            resultComponents.push(componentsArr);
        }
    });
    return resultComponents;
};
exports.default = components;
