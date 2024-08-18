"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filterOutLinks = function (k, v) {
    if (k !== "next" && k !== "prev") {
        return v;
    }
};
var unlink = function (entry) {
    entry.prev.next = entry.next;
    entry.next.prev = entry.prev;
    delete entry.next;
    delete entry.prev;
};
var List = /** @class */ (function () {
    function List() {
        var shortcut = {};
        shortcut.prev = shortcut;
        shortcut.next = shortcut.prev;
        this.shortcut = shortcut;
    }
    List.prototype.dequeue = function () {
        var shortcut = this.shortcut;
        var entry = shortcut.prev;
        if (entry && entry !== shortcut) {
            unlink(entry);
            return entry;
        }
    };
    List.prototype.enqueue = function (entry) {
        var shortcut = this.shortcut;
        if (entry.prev && entry.next) {
            unlink(entry);
        }
        entry.next = shortcut.next;
        shortcut.next.prev = entry;
        shortcut.next = entry;
        entry.prev = shortcut;
    };
    List.prototype.toString = function () {
        var strs = [];
        var sentinel = this.shortcut;
        var curr = sentinel.prev;
        while (curr !== sentinel) {
            strs.push(JSON.stringify(curr, filterOutLinks));
            curr = curr === null || curr === void 0 ? void 0 : curr.prev;
        }
        return "[".concat(strs.join(", "), "]");
    };
    return List;
}());
exports.default = List;
//# sourceMappingURL=list.js.map