"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
/**
 * adaptor for regl.Framebuffer
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#framebuffers
 */
var ReglFramebuffer = /*#__PURE__*/function () {
  function ReglFramebuffer(reGl, options) {
    (0, _classCallCheck2.default)(this, ReglFramebuffer);
    this.framebuffer = void 0;
    var width = options.width,
      height = options.height,
      color = options.color,
      colors = options.colors,
      depth = options.depth,
      stencil = options.stencil;
    var framebufferOptions = {
      width: width,
      height: height
    };
    if (Array.isArray(colors)) {
      framebufferOptions.colors = colors.map(function (c) {
        return c.get();
      });
    }
    if (color && typeof color !== 'boolean') {
      framebufferOptions.color = color.get();
    }

    // TODO: depth & stencil

    this.framebuffer = reGl.framebuffer(framebufferOptions);
  }
  (0, _createClass2.default)(ReglFramebuffer, [{
    key: "get",
    value: function get() {
      return this.framebuffer;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.framebuffer.destroy();
    }
  }, {
    key: "resize",
    value: function resize(_ref) {
      var width = _ref.width,
        height = _ref.height;
      this.framebuffer.resize(width, height);
    }
  }]);
  return ReglFramebuffer;
}();
exports.default = ReglFramebuffer;
//# sourceMappingURL=ReglFramebuffer.js.map