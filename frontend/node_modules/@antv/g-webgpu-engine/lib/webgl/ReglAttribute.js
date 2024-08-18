"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
/**
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#attributes
 */
var ReglAttribute = /*#__PURE__*/function () {
  function ReglAttribute(gl, options) {
    (0, _classCallCheck2.default)(this, ReglAttribute);
    this.attribute = void 0;
    this.buffer = void 0;
    var buffer = options.buffer,
      offset = options.offset,
      stride = options.stride,
      normalized = options.normalized,
      size = options.size,
      divisor = options.divisor;
    this.buffer = buffer;
    this.attribute = {
      buffer: buffer.get(),
      offset: offset || 0,
      stride: stride || 0,
      normalized: normalized || false,
      divisor: divisor || 0
    };
    if (size) {
      this.attribute.size = size;
    }
  }
  (0, _createClass2.default)(ReglAttribute, [{
    key: "get",
    value: function get() {
      return this.attribute;
    }
  }, {
    key: "updateBuffer",
    value: function updateBuffer(options) {
      this.buffer.subData(options);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.buffer.destroy();
    }
  }]);
  return ReglAttribute;
}();
exports.default = ReglAttribute;
//# sourceMappingURL=ReglAttribute.js.map