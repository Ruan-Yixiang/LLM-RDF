"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFuncByUnknownType = exports.getFunc = exports.isFunction = void 0;
var _1 = require(".");
var number_1 = require("./number");
var isFunction = function (val) {
    return typeof val === 'function';
};
exports.isFunction = isFunction;
var getFunc = function (value, defaultValue, func) {
    var resultFunc;
    if (func) {
        resultFunc = func;
    }
    else if ((0, number_1.isNumber)(value)) {
        resultFunc = function () { return value; };
    }
    else {
        resultFunc = function () { return defaultValue; };
    }
    return resultFunc;
};
exports.getFunc = getFunc;
var getFuncByUnknownType = function (defaultValue, value, resultIsNumber) {
    if (resultIsNumber === void 0) { resultIsNumber = true; }
    if (!value && value !== 0) {
        return function (d) {
            if (d.size) {
                if ((0, _1.isArray)(d.size))
                    return d.size[0] > d.size[1] ? d.size[0] : d.size[1];
                if ((0, _1.isObject)(d.size))
                    return d.size.width > d.size.height ? d.size.width : d.size.height;
                return d.size;
            }
            return defaultValue;
        };
    }
    if ((0, exports.isFunction)(value)) {
        return value;
    }
    if ((0, number_1.isNumber)(value)) {
        return function () { return value; };
    }
    if ((0, _1.isArray)(value)) {
        return function () {
            if (resultIsNumber) {
                var max = Math.max.apply(Math, value);
                return isNaN(max) ? defaultValue : max;
            }
            return value;
        };
    }
    if ((0, _1.isObject)(value)) {
        return function () {
            if (resultIsNumber) {
                var max = Math.max(value.width, value.height);
                return isNaN(max) ? defaultValue : max;
            }
            return [value.width, value.height];
        };
    }
    return function () { return defaultValue; };
};
exports.getFuncByUnknownType = getFuncByUnknownType;
//# sourceMappingURL=function.js.map