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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphWithEvent = void 0;
var _1 = __importDefault(require("."));
var GraphWithEvent = /** @class */ (function (_super) {
    __extends(GraphWithEvent, _super);
    function GraphWithEvent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * @description a pool of event listeners.
         * @description.zh-CN 事件监听器池。
         */
        _this.eventPool = {};
        return _this;
    }
    /**
     * @description Add an event listener.
     * @description.zh-CN 添加事件监听器。
     */
    GraphWithEvent.prototype.appendEvent = function (type, callback) {
        if (!this.eventPool[type]) {
            this.eventPool[type] = [];
        }
        this.eventPool[type].push(callback);
    };
    /**
     * @description remove an event listener.
     * @description.zh-CN 移除事件监听器。
     */
    GraphWithEvent.prototype.removeEvent = function (type, callback) {
        if (!this.eventPool[type]) {
            return;
        }
        var index = this.eventPool[type].indexOf(callback);
        if (index > -1) {
            this.eventPool[type].splice(index, 1);
        }
    };
    /**
     * @description trigger an event.
     * @description.zh-CN 触发事件。
     */
    GraphWithEvent.prototype.emitEvent = function (type) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this.eventPool[type]) {
            return;
        }
        this.eventPool[type].forEach(function (callback) {
            callback.apply(void 0, args);
        });
    };
    GraphWithEvent.prototype.setNode = function (node, value) {
        _super.prototype.setNode.call(this, node, value);
        this.emitEvent('nodeAdd', node, value);
        return this;
    };
    GraphWithEvent.prototype.removeNode = function (node) {
        _super.prototype.removeNode.call(this, node);
        this.emitEvent('nodeRemove', node);
        return this;
    };
    GraphWithEvent.prototype.setEdge = function (v_, w_, value, name) {
        _super.prototype.setEdge.call(this, v_, w_, value, name);
        this.emitEvent('edgeAdd', v_, w_, value, name);
        return this;
    };
    GraphWithEvent.prototype.removeEdge = function (v_, w_, name) {
        _super.prototype.removeEdge.call(this, v_, w_, name);
        this.emitEvent('edgeRemove', v_, w_, name);
        return this;
    };
    return GraphWithEvent;
}(_1.default));
exports.GraphWithEvent = GraphWithEvent;
