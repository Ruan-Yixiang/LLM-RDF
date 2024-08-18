"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extractUniforms = extractUniforms;
var _isTypedArray2 = _interopRequireDefault(require("lodash/isTypedArray"));
var _isPlainObject2 = _interopRequireDefault(require("lodash/isPlainObject"));
/**
 * 考虑结构体命名, eg:
 * a: { b: 1 }  ->  'a.b'
 * a: [ { b: 1 } ] -> 'a[0].b'
 */
function extractUniforms(uniforms) {
  var extractedUniforms = {};
  Object.keys(uniforms).forEach(function (uniformName) {
    extractUniformsRecursively(uniformName, uniforms[uniformName], extractedUniforms, '');
  });
  return extractedUniforms;
}
function extractUniformsRecursively(uniformName, uniformValue, uniforms, prefix) {
  if (uniformValue === null || typeof uniformValue === 'number' ||
  // u_A: 1
  typeof uniformValue === 'boolean' ||
  // u_A: false
  Array.isArray(uniformValue) && typeof uniformValue[0] === 'number' ||
  // u_A: [1, 2, 3]
  (0, _isTypedArray2.default)(uniformValue) ||
  // u_A: Float32Array
  // @ts-ignore
  uniformValue === '' ||
  // @ts-ignore
  uniformValue.resize !== undefined) {
    uniforms["".concat(prefix && prefix + '.').concat(uniformName)] = uniformValue;
    return;
  }

  // u_Struct.a.b.c
  if ((0, _isPlainObject2.default)(uniformValue)) {
    Object.keys(uniformValue).forEach(function (childName) {
      extractUniformsRecursively(childName,
      // @ts-ignore
      uniformValue[childName], uniforms, "".concat(prefix && prefix + '.').concat(uniformName));
    });
  }

  // u_Struct[0].a
  if (Array.isArray(uniformValue)) {
    // @ts-ignore
    uniformValue.forEach(function (child, idx) {
      Object.keys(child).forEach(function (childName) {
        extractUniformsRecursively(childName,
        // @ts-ignore
        child[childName], uniforms, "".concat(prefix && prefix + '.').concat(uniformName, "[").concat(idx, "]"));
      });
    });
  }
}
//# sourceMappingURL=uniform.js.map