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
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#elements
 */
var ReglElements = /*#__PURE__*/function () {
  function ReglElements(reGl, options) {
    (0, _classCallCheck2.default)(this, ReglElements);
    this.elements = void 0;
    var data = options.data,
      usage = options.usage,
      type = options.type,
      count = options.count;
    this.elements = reGl.elements({
      data: data,
      usage: _constants.usageMap[usage || _gWebgpuCore.gl.STATIC_DRAW],
      type: _constants.dataTypeMap[type || _gWebgpuCore.gl.UNSIGNED_BYTE],
      count: count
    });
  }
  (0, _createClass2.default)(ReglElements, [{
    key: "get",
    value: function get() {
      return this.elements;
    }
  }, {
    key: "subData",
    value: function subData(_ref) {
      var data = _ref.data;
      this.elements.subdata(data);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.elements.destroy();
    }
  }]);
  return ReglElements;
}();
exports.default = ReglElements;
//# sourceMappingURL=ReglElements.js.map