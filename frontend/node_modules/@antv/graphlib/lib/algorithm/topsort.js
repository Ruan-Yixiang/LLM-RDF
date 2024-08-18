"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CycleException = void 0;
var CycleException = /** @class */ (function (_super) {
    __extends(CycleException, _super);
    function CycleException() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CycleException;
}(Error));
exports.CycleException = CycleException;
function topsort(graph) {
    var visited = new Set();
    var stack = new Set();
    var results = [];
    function visit(node) {
        var _a;
        if (stack.has(node)) {
            throw new CycleException();
        }
        if (!visited.has(node)) {
            stack.add(node);
            visited.add(node);
            (_a = graph.predecessors(node)) === null || _a === void 0 ? void 0 : _a.forEach(visit);
            stack.delete(node);
            results.push(node);
        }
    }
    graph.sinks().forEach(visit);
    if (visited.size !== graph.nodeCount()) {
        throw new CycleException();
    }
    return results;
}
exports.default = topsort;
