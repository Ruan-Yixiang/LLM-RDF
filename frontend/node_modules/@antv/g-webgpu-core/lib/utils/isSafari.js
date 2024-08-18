"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSafari = void 0;
var isSafari = typeof navigator !== 'undefined' && /Version\/[\d\.]+.*Safari/.test(navigator.userAgent);
exports.isSafari = isSafari;
//# sourceMappingURL=isSafari.js.map