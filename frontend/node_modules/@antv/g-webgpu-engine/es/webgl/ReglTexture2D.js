import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import { gl } from '@antv/g-webgpu-core';
import { colorSpaceMap, dataTypeMap, filterMap, formatMap, mipmapMap, wrapModeMap } from './constants';

/**
 * adaptor for regl.Buffer
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#buffers
 */
var ReglTexture2D = /*#__PURE__*/function () {
  function ReglTexture2D(reGl, options) {
    _classCallCheck(this, ReglTexture2D);
    this.texture = void 0;
    this.width = void 0;
    this.height = void 0;
    var data = options.data,
      _options$type = options.type,
      type = _options$type === void 0 ? gl.UNSIGNED_BYTE : _options$type,
      width = options.width,
      height = options.height,
      _options$flipY = options.flipY,
      flipY = _options$flipY === void 0 ? false : _options$flipY,
      _options$format = options.format,
      format = _options$format === void 0 ? gl.RGBA : _options$format,
      _options$mipmap = options.mipmap,
      mipmap = _options$mipmap === void 0 ? false : _options$mipmap,
      _options$wrapS = options.wrapS,
      wrapS = _options$wrapS === void 0 ? gl.CLAMP_TO_EDGE : _options$wrapS,
      _options$wrapT = options.wrapT,
      wrapT = _options$wrapT === void 0 ? gl.CLAMP_TO_EDGE : _options$wrapT,
      _options$aniso = options.aniso,
      aniso = _options$aniso === void 0 ? 0 : _options$aniso,
      _options$alignment = options.alignment,
      alignment = _options$alignment === void 0 ? 1 : _options$alignment,
      _options$premultiplyA = options.premultiplyAlpha,
      premultiplyAlpha = _options$premultiplyA === void 0 ? false : _options$premultiplyA,
      _options$mag = options.mag,
      mag = _options$mag === void 0 ? gl.NEAREST : _options$mag,
      _options$min = options.min,
      min = _options$min === void 0 ? gl.NEAREST : _options$min,
      _options$colorSpace = options.colorSpace,
      colorSpace = _options$colorSpace === void 0 ? gl.BROWSER_DEFAULT_WEBGL : _options$colorSpace;
    this.width = width;
    this.height = height;
    var textureOptions = {
      width: width,
      height: height,
      // @ts-ignore
      type: dataTypeMap[type],
      format: formatMap[format],
      wrapS: wrapModeMap[wrapS],
      wrapT: wrapModeMap[wrapT],
      // @ts-ignore
      mag: filterMap[mag],
      min: filterMap[min],
      alignment: alignment,
      flipY: flipY,
      colorSpace: colorSpaceMap[colorSpace],
      premultiplyAlpha: premultiplyAlpha,
      aniso: aniso
    };
    if (data) {
      textureOptions.data = data;
    }
    if (typeof mipmap === 'number') {
      textureOptions.mipmap = mipmapMap[mipmap];
    } else if (typeof mipmap === 'boolean') {
      textureOptions.mipmap = mipmap;
    }
    this.texture = reGl.texture(textureOptions);
  }
  _createClass(ReglTexture2D, [{
    key: "get",
    value: function get() {
      return this.texture;
    }
  }, {
    key: "update",
    value: function update() {
      // @ts-ignore
      this.texture._texture.bind();
    }
  }, {
    key: "resize",
    value: function resize(_ref) {
      var width = _ref.width,
        height = _ref.height;
      this.texture.resize(width, height);
      this.width = width;
      this.height = height;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.texture.destroy();
    }
  }]);
  return ReglTexture2D;
}();
export { ReglTexture2D as default };
//# sourceMappingURL=ReglTexture2D.js.map