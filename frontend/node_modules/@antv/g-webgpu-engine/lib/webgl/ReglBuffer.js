"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _gWebgpuCore = require("@antv/g-webgpu-core");
var _constants = require("./constants");
/**
 * adaptor for regl.Buffer
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#buffers
 */
var ReglBuffer = /*#__PURE__*/function () {
  function ReglBuffer(reGl, options) {
    (0, _classCallCheck2.default)(this, ReglBuffer);
    this.buffer = void 0;
    var data = options.data,
      usage = options.usage,
      type = options.type;
    // @ts-ignore
    this.buffer = reGl.buffer({
      data: data,
      usage: _constants.usageMap[usage || _gWebgpuCore.gl.STATIC_DRAW],
      type: _constants.dataTypeMap[type || _gWebgpuCore.gl.UNSIGNED_BYTE]
      // length: 0,
    });
  }
  (0, _createClass2.default)(ReglBuffer, [{
    key: "get",
    value: function get() {
      return this.buffer;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      // this.buffer.destroy();
    }
  }, {
    key: "subData",
    value: function subData(_ref) {
      var data = _ref.data,
        offset = _ref.offset;
      // @ts-ignore
      this.buffer.subdata(data, offset);
    }
  }]);
  return ReglBuffer;
}();
exports.default = ReglBuffer;
//# sourceMappingURL=ReglBuffer.js.map