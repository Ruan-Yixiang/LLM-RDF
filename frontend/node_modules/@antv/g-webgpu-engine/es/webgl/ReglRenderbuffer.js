import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import { formatMap } from './constants';

/**
 * adaptor for regl.Renderbuffer
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#renderbuffers
 */
var ReglRenderbuffer = /*#__PURE__*/function () {
  function ReglRenderbuffer(reGl, options) {
    _classCallCheck(this, ReglRenderbuffer);
    this.renderbuffer = void 0;
    var width = options.width,
      height = options.height,
      format = options.format;
    this.renderbuffer = reGl.renderbuffer({
      width: width,
      height: height,
      format: formatMap[format]
    });
  }
  _createClass(ReglRenderbuffer, [{
    key: "get",
    value: function get() {
      return this.renderbuffer;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.renderbuffer.destroy();
    }
  }, {
    key: "resize",
    value: function resize(_ref) {
      var width = _ref.width,
        height = _ref.height;
      this.renderbuffer.resize(width, height);
    }
  }]);
  return ReglRenderbuffer;
}();
export { ReglRenderbuffer as default };
//# sourceMappingURL=ReglRenderbuffer.js.map