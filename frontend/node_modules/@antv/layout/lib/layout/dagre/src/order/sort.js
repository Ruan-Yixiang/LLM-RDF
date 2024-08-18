"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = require("../util");
var sort = function (entries, biasRight, usePrev, keepNodeOrder) {
    var parts = (0, util_1.partition)(entries, function (entry) {
        var hasFixOrder = entry.hasOwnProperty("fixorder") && !isNaN(entry.fixorder);
        if (keepNodeOrder)
            return !hasFixOrder && entry.hasOwnProperty("barycenter");
        // NOTE: 有fixorder的也可以排
        return hasFixOrder || entry.hasOwnProperty("barycenter");
    });
    var sortable = parts.lhs;
    var unsortable = parts.rhs.sort(function (a, b) { return -a.i - (-b.i); });
    var vs = [];
    var sum = 0;
    var weight = 0;
    var vsIndex = 0;
    sortable === null || sortable === void 0 ? void 0 : sortable.sort(compareWithBias(!!biasRight, !!usePrev));
    vsIndex = consumeUnsortable(vs, unsortable, vsIndex);
    sortable === null || sortable === void 0 ? void 0 : sortable.forEach(function (entry) {
        var _a;
        vsIndex += (_a = entry.vs) === null || _a === void 0 ? void 0 : _a.length;
        vs.push(entry.vs);
        sum += entry.barycenter * entry.weight;
        weight += entry.weight;
        vsIndex = consumeUnsortable(vs, unsortable, vsIndex);
    });
    var result = { vs: vs.flat() };
    if (weight) {
        result.barycenter = sum / weight;
        result.weight = weight;
    }
    return result;
};
var consumeUnsortable = function (vs, unsortable, index) {
    var iindex = index;
    var last;
    while (unsortable.length && (last = unsortable[unsortable.length - 1]).i <= iindex) {
        unsortable.pop();
        vs === null || vs === void 0 ? void 0 : vs.push(last.vs);
        iindex++;
    }
    return iindex;
};
/**
 * 配置是否考虑使用之前的布局结果
 */
var compareWithBias = function (bias, usePrev) {
    return function (entryV, entryW) {
        // 排序的时候先判断fixorder，不行再判断重心
        if (entryV.fixorder !== undefined && entryW.fixorder !== undefined) {
            return entryV.fixorder - entryW.fixorder;
        }
        if (entryV.barycenter < entryW.barycenter) {
            return -1;
        }
        if (entryV.barycenter > entryW.barycenter) {
            return 1;
        }
        // 重心相同，考虑之前排好的顺序
        if (usePrev && entryV.order !== undefined && entryW.order !== undefined) {
            if (entryV.order < entryW.order) {
                return -1;
            }
            if (entryV.order > entryW.order) {
                return 1;
            }
        }
        return !bias ? entryV.i - entryW.i : entryW.i - entryV.i;
    };
};
exports.default = sort;
//# sourceMappingURL=sort.js.map