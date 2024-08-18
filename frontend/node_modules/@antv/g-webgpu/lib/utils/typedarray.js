"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.merge = merge;
function merge(a, b) {
  // Checks for truthy values on both arrays
  if (!a && !b) {
    throw new Error('Please specify valid arguments for parameters a and b.');
  }

  // Checks for truthy values or empty arrays on each argument
  // to avoid the unnecessary construction of a new array and
  // the type comparison
  if (!b || b.length === 0) {
    return a;
  }
  if (!a || a.length === 0) {
    return b;
  }

  // Make sure that both typed arrays are of the same type
  if (Object.prototype.toString.call(a) !== Object.prototype.toString.call(b)) {
    throw new Error('The types of the two arguments passed for parameters a and b do not match.');
  }

  // @ts-ignore
  var c = new a.constructor(a.length + b.length);
  c.set(a);
  c.set(b, a.length);
  return c;
}
//# sourceMappingURL=typedarray.js.map