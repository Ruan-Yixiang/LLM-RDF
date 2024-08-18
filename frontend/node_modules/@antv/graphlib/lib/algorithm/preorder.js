"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dfs_1 = __importDefault(require("./dfs"));
var preorder = function (graph, nodes) {
    return (0, dfs_1.default)(graph, nodes, 'pre');
};
exports.default = preorder;
