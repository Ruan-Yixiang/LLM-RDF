"use strict";
/**
 * @fileOverview Force Layout Grid Align layout
 * @author wenyanqi
 */
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERLayout = void 0;
var base_1 = require("../base");
var core_1 = __importDefault(require("./core"));
var ERLayout = /** @class */ (function (_super) {
    __extends(ERLayout, _super);
    function ERLayout(options) {
        var _this = _super.call(this) || this;
        _this.width = 300;
        _this.height = 300;
        _this.nodeMinGap = 50;
        /** 迭代结束的回调函数 */
        _this.onLayoutEnd = function () { };
        if (options) {
            _this.updateCfg(options);
        }
        return _this;
    }
    ERLayout.prototype.getDefaultCfg = function () {
        return {
            width: 300,
            height: 300,
            nodeMinGap: 50,
        };
    };
    /**
     * 执行布局
     */
    ERLayout.prototype.execute = function () {
        var self = this;
        var nodes = self.nodes;
        var edges = self.edges;
        // 节点初始化，size初始化
        nodes === null || nodes === void 0 ? void 0 : nodes.forEach(function (node) {
            if (!node.size) {
                node.size = [50, 50];
            }
        });
        return (0, core_1.default)({
            nodes: nodes,
            edges: edges,
        }, {
            width: this.width,
            height: this.height,
            nodeMinGap: this.nodeMinGap,
        }).then(function () {
            if (self.onLayoutEnd)
                self.onLayoutEnd();
        });
    };
    ERLayout.prototype.getType = function () {
        return "er";
    };
    return ERLayout;
}(base_1.Base));
exports.ERLayout = ERLayout;
//# sourceMappingURL=index.js.map