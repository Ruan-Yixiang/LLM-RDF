"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCanvas = createCanvas;
function createCanvas() {
  if (typeof document !== 'undefined') {
    return document.createElement('canvas');
  } else {
    throw new Error('Cannot create a canvas in this context');
  }
}
//# sourceMappingURL=canvas.js.map