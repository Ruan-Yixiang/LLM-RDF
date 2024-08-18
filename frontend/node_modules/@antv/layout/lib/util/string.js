"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelize = exports.isString = void 0;
var isString = function (val) { return typeof val === 'string'; };
exports.isString = isString;
var cacheStringFunction = function (fn) {
    var cache = Object.create(null);
    return (function (str) {
        var hit = cache[str];
        return hit || (cache[str] = fn(str));
    });
};
var camelizeRE = /-(\w)/g;
exports.camelize = cacheStringFunction(function (str) {
    return str.replace(camelizeRE, function (_, c) { return (c ? c.toUpperCase() : ''); });
});
// export const capitalize = cacheStringFunction(
//   (str: string) => str.charAt(0).toUpperCase() + str.slice(1),
// )
//# sourceMappingURL=string.js.map