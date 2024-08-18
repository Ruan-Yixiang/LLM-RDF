"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLayoutByName = exports.unRegisterLayout = exports.registerLayout = void 0;
var registy_1 = require("./registy");
Object.defineProperty(exports, "registerLayout", { enumerable: true, get: function () { return registy_1.registerLayout; } });
Object.defineProperty(exports, "unRegisterLayout", { enumerable: true, get: function () { return registy_1.unRegisterLayout; } });
Object.defineProperty(exports, "getLayoutByName", { enumerable: true, get: function () { return registy_1.getLayoutByName; } });
// layout, layout types file, worker
__exportStar(require("./layout"), exports);
//# sourceMappingURL=index.js.map