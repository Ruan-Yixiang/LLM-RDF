import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import { gl } from '@antv/g-webgpu-core';
import { dataTypeMap, usageMap } from './constants';

/**
 * adaptor for regl.Buffer
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#buffers
 */
var ReglBuffer = /*#__PURE__*/function () {
  function ReglBuffer(reGl, options) {
    _classCallCheck(this, ReglBuffer);
    this.buffer = void 0;
    var data = options.data,
      usage = options.usage,
      type = options.type;
    // @ts-ignore
    this.buffer = reGl.buffer({
      data: data,
      usage: usageMap[usage || gl.STATIC_DRAW],
      type: dataTypeMap[type || gl.UNSIGNED_BYTE]
      // length: 0,
    });
  }
  _createClass(ReglBuffer, [{
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
export { ReglBuffer as default };
//# sourceMappingURL=ReglBuffer.js.map