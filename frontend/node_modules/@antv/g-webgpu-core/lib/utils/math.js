"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createVec3 = createVec3;
exports.decodePickingColor = decodePickingColor;
exports.encodePickingColor = encodePickingColor;
exports.getAngle = getAngle;
exports.getRotationScale = getRotationScale;
var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));
var _glMatrix = require("gl-matrix");
var _isNumber = _interopRequireDefault(require("lodash/isNumber"));
function getAngle(angle) {
  if (angle === undefined) {
    return 0;
  } else if (angle > 360 || angle < -360) {
    return angle % 360;
  }
  return angle;
}
function createVec3(x, y, z) {
  if ((0, _isNumber.default)(x)) {
    return _glMatrix.vec3.fromValues(x, y, z);
  }
  if (x.length === 3) {
    return _glMatrix.vec3.clone(x);
  }
  return _glMatrix.vec3.fromValues(x[0], x[1], x[2]);
}
function getRotationScale(matrix, result) {
  result[0] = matrix[0];
  result[1] = matrix[1];
  result[2] = matrix[2];
  result[3] = matrix[4];
  result[4] = matrix[5];
  result[5] = matrix[6];
  result[6] = matrix[8];
  result[7] = matrix[9];
  result[8] = matrix[10];
  return result;
}
function decodePickingColor(color) {
  var _color = (0, _slicedToArray2.default)(color, 3),
    i1 = _color[0],
    i2 = _color[1],
    i3 = _color[2];
  // 1 was added to seperate from no selection
  var index = i1 + i2 * 256 + i3 * 65536 - 1;
  return index;
}
function encodePickingColor(featureIdx) {
  return [featureIdx + 1 & 255, featureIdx + 1 >> 8 & 255, featureIdx + 1 >> 8 >> 8 & 255];
}
//# sourceMappingURL=math.js.map