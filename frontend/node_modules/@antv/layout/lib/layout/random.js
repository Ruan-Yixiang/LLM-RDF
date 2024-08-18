"use strict";
/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomLayout = void 0;
var base_1 = require("./base");
/**
 * 随机布局
 */
var RandomLayout = /** @class */ (function (_super) {
    __extends(RandomLayout, _super);
    function RandomLayout(options) {
        var _this = _super.call(this) || this;
        /** 布局中心 */
        _this.center = [0, 0];
        /** 宽度 */
        _this.width = 300;
        /** 高度 */
        _this.height = 300;
        _this.nodes = [];
        _this.edges = [];
        /** 迭代结束的回调函数 */
        _this.onLayoutEnd = function () { };
        _this.updateCfg(options);
        return _this;
    }
    RandomLayout.prototype.getDefaultCfg = function () {
        return {
            center: [0, 0],
            width: 300,
            height: 300
        };
    };
    /**
     * 执行布局
     */
    RandomLayout.prototype.execute = function () {
        var self = this;
        var nodes = self.nodes;
        var layoutScale = 0.9;
        var center = self.center;
        if (!self.width && typeof window !== "undefined") {
            self.width = window.innerWidth;
        }
        if (!self.height && typeof window !== "undefined") {
            self.height = window.innerHeight;
        }
        if (nodes) {
            nodes.forEach(function (node) {
                node.x = (Math.random() - 0.5) * layoutScale * self.width + center[0];
                node.y = (Math.random() - 0.5) * layoutScale * self.height + center[1];
            });
        }
        if (self.onLayoutEnd)
            self.onLayoutEnd();
        return {
            nodes: nodes,
            edges: this.edges
        };
    };
    RandomLayout.prototype.getType = function () {
        return "random";
    };
    return RandomLayout;
}(base_1.Base));
exports.RandomLayout = RandomLayout;
//# sourceMappingURL=random.js.map