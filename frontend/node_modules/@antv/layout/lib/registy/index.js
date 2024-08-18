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
exports.getLayoutByName = exports.unRegisterLayout = exports.registerLayout = void 0;
var base_1 = require("../layout/base");
var util_1 = require("../util");
var map = new Map();
var registerLayout = function (name, layoutOverride) {
    if (map.get(name)) {
        console.warn("The layout with the name ".concat(name, " exists already, it will be overridden"));
    }
    if ((0, util_1.isObject)(layoutOverride)) {
        // tslint:disable-next-line: max-classes-per-file
        var GLayout = /** @class */ (function (_super) {
            __extends(GLayout, _super);
            function GLayout(cfg) {
                var _this = this;
                var _a;
                _this = _super.call(this) || this;
                var self = _this;
                var props = {};
                var defaultCfg = Object.assign({}, self.getDefaultCfg(), ((_a = layoutOverride.getDefaultCfg) === null || _a === void 0 ? void 0 : _a.call(layoutOverride)) || {});
                Object.assign(props, defaultCfg, layoutOverride, cfg);
                Object.keys(props).forEach(function (key) {
                    var value = props[key];
                    self[key] = value;
                });
                return _this;
            }
            return GLayout;
        }(base_1.Base));
        map.set(name, GLayout);
    }
    else {
        map.set(name, layoutOverride);
    }
    return map.get(name);
};
exports.registerLayout = registerLayout;
var unRegisterLayout = function (name) {
    if (map.has(name)) {
        map.delete(name);
    }
};
exports.unRegisterLayout = unRegisterLayout;
var getLayoutByName = function (name) {
    if (map.has(name)) {
        return map.get(name);
    }
    return null;
};
exports.getLayoutByName = getLayoutByName;
//# sourceMappingURL=index.js.map