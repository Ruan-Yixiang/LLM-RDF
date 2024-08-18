import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import { gl } from '@antv/g-webgpu-core';
import { dataTypeMap, usageMap } from './constants';

/**
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#elements
 */
var ReglElements = /*#__PURE__*/function () {
  function ReglElements(reGl, options) {
    _classCallCheck(this, ReglElements);
    this.elements = void 0;
    var data = options.data,
      usage = options.usage,
      type = options.type,
      count = options.count;
    this.elements = reGl.elements({
      data: data,
      usage: usageMap[usage || gl.STATIC_DRAW],
      type: dataTypeMap[type || gl.UNSIGNED_BYTE],
      count: count
    });
  }
  _createClass(ReglElements, [{
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
export { ReglElements as default };
//# sourceMappingURL=ReglElements.js.map