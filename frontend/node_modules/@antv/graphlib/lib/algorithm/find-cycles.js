"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tarjan_1 = __importDefault(require("./tarjan"));
var findCycles = function (graph) {
    return (0, tarjan_1.default)(graph).filter(function (cmpt) { return cmpt.length > 1 || (cmpt.length === 1 && graph.hasEdge(cmpt[0], cmpt[0])); });
};
exports.default = findCycles;
