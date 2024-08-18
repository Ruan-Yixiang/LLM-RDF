"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clone = exports.isObject = void 0;
var isObject = function (val) {
    return val !== null && typeof val === 'object';
};
exports.isObject = isObject;
var clone = function (target) {
    if (target === null) {
        return target;
    }
    if (target instanceof Date) {
        return new Date(target.getTime());
    }
    if (target instanceof Array) {
        var cp_1 = [];
        target.forEach(function (v) {
            cp_1.push(v);
        });
        return cp_1.map(function (n) { return (0, exports.clone)(n); });
    }
    if (typeof target === 'object' && Object.keys(target).length) {
        var cp_2 = __assign({}, target);
        Object.keys(cp_2).forEach(function (k) {
            cp_2[k] = (0, exports.clone)(cp_2[k]);
        });
        return cp_2;
    }
    return target;
};
exports.clone = clone;
//# sourceMappingURL=object.js.map