import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
/**
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#attributes
 */
var ReglAttribute = /*#__PURE__*/function () {
  function ReglAttribute(gl, options) {
    _classCallCheck(this, ReglAttribute);
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
  _createClass(ReglAttribute, [{
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
export { ReglAttribute as default };
//# sourceMappingURL=ReglAttribute.js.map