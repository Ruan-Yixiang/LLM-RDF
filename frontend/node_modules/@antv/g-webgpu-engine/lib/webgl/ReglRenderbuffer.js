"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _constants = require("./constants");
/**
 * adaptor for regl.Renderbuffer
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#renderbuffers
 */
var ReglRenderbuffer = /*#__PURE__*/function () {
  function ReglRenderbuffer(reGl, options) {
    (0, _classCallCheck2.default)(this, ReglRenderbuffer);
    this.renderbuffer = void 0;
    var width = options.width,
      height = options.height,
      format = options.format;
    this.renderbuffer = reGl.renderbuffer({
      width: width,
      height: height,
      format: _constants.formatMap[format]
    });
  }
  (0, _createClass2.default)(ReglRenderbuffer, [{
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
exports.default = ReglRenderbuffer;
//# sourceMappingURL=ReglRenderbuffer.js.map