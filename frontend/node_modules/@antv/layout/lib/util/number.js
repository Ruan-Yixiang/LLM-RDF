"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNumber = exports.isNaN = exports.isNumber = void 0;
var isNumber = function (val) { return typeof val === 'number'; };
exports.isNumber = isNumber;
var isNaN = function (num) { return Number.isNaN(Number(num)); };
exports.isNaN = isNaN;
var toNumber = function (val) {
    var n = parseFloat(val);
    return (0, exports.isNaN)(n) ? val : n;
};
exports.toNumber = toNumber;
//# sourceMappingURL=number.js.map