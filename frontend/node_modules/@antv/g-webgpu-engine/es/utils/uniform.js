import _isTypedArray from "lodash/isTypedArray";
import _isPlainObject from "lodash/isPlainObject";
/**
 * 考虑结构体命名, eg:
 * a: { b: 1 }  ->  'a.b'
 * a: [ { b: 1 } ] -> 'a[0].b'
 */
export function extractUniforms(uniforms) {
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
  _isTypedArray(uniformValue) ||
  // u_A: Float32Array
  // @ts-ignore
  uniformValue === '' ||
  // @ts-ignore
  uniformValue.resize !== undefined) {
    uniforms["".concat(prefix && prefix + '.').concat(uniformName)] = uniformValue;
    return;
  }

  // u_Struct.a.b.c
  if (_isPlainObject(uniformValue)) {
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