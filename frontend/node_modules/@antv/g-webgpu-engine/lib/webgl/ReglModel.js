"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _gWebgpuCore = require("@antv/g-webgpu-core");
var _uniform = require("../utils/uniform");
var _constants = require("./constants");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/**
 * adaptor for regl.DrawCommand
 */
var ReglModel = /*#__PURE__*/function () {
  function ReglModel(reGl, options) {
    (0, _classCallCheck2.default)(this, ReglModel);
    this.reGl = void 0;
    this.drawCommand = void 0;
    this.uniforms = {};
    this.reGl = reGl;
    var vs = options.vs,
      fs = options.fs,
      defines = options.defines,
      attributes = options.attributes,
      uniforms = options.uniforms,
      primitive = options.primitive,
      count = options.count,
      elements = options.elements,
      depth = options.depth,
      blend = options.blend,
      stencil = options.stencil,
      cull = options.cull,
      instances = options.instances,
      scissor = options.scissor,
      viewport = options.viewport;
    var reglUniforms = {};
    if (uniforms) {
      this.uniforms = (0, _uniform.extractUniforms)(uniforms);
      Object.keys(uniforms).forEach(function (uniformName) {
        // use regl prop API
        // @ts-ignore
        reglUniforms[uniformName] = reGl.prop(uniformName);
      });
    }
    var reglAttributes = {};
    Object.keys(attributes).forEach(function (name) {
      reglAttributes[name] = attributes[name].get();
    });
    var defineStmts = defines && this.generateDefines(defines) || '';
    var drawParams = {
      attributes: reglAttributes,
      frag: "#ifdef GL_FRAGMENT_PRECISION_HIGH\n  precision highp float;\n#else\n  precision mediump float;\n#endif\n".concat(defineStmts, "\n").concat(fs),
      uniforms: reglUniforms,
      vert: "\n".concat(defineStmts, "\n").concat(vs),
      primitive: _constants.primitiveMap[primitive === undefined ? _gWebgpuCore.gl.TRIANGLES : primitive]
    };
    if (instances) {
      drawParams.instances = instances;
    }

    // elements 中可能包含 count，此时不应传入
    if (count) {
      drawParams.count = count;
    }
    if (elements) {
      drawParams.elements = elements.get();
    }
    if (scissor) {
      drawParams.scissor = scissor;
    }
    if (viewport) {
      drawParams.viewport = viewport;
    }
    this.initDepthDrawParams({
      depth: depth
    }, drawParams);
    this.initBlendDrawParams({
      blend: blend
    }, drawParams);
    this.initStencilDrawParams({
      stencil: stencil
    }, drawParams);
    this.initCullDrawParams({
      cull: cull
    }, drawParams);
    this.drawCommand = reGl(drawParams);
  }
  (0, _createClass2.default)(ReglModel, [{
    key: "addUniforms",
    value: function addUniforms(uniforms) {
      this.uniforms = _objectSpread(_objectSpread({}, this.uniforms), (0, _uniform.extractUniforms)(uniforms));
    }
  }, {
    key: "draw",
    value: function draw(options) {
      var uniforms = _objectSpread(_objectSpread({}, this.uniforms), (0, _uniform.extractUniforms)(options.uniforms || {}));
      var reglDrawProps = {};
      Object.keys(uniforms).forEach(function (uniformName) {
        var type = (0, _typeof2.default)(uniforms[uniformName]);
        if (type === 'boolean' || type === 'number' || Array.isArray(uniforms[uniformName]) ||
        // @ts-ignore
        uniforms[uniformName].BYTES_PER_ELEMENT) {
          reglDrawProps[uniformName] = uniforms[uniformName];
        } else if (type === 'string') {
          // TODO: image url
        } else {
          reglDrawProps[uniformName] = uniforms[uniformName].get();
        }
      });
      this.drawCommand(reglDrawProps);
    }
  }, {
    key: "destroy",
    value: function destroy() {
      // don't need do anything since we will call `rendererService.cleanup()`
    }

    /**
     * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#depth-buffer
     */
  }, {
    key: "initDepthDrawParams",
    value: function initDepthDrawParams(_ref, drawParams) {
      var depth = _ref.depth;
      if (depth) {
        drawParams.depth = {
          enable: depth.enable === undefined ? true : !!depth.enable,
          mask: depth.mask === undefined ? true : !!depth.mask,
          func: _constants.depthFuncMap[depth.func || _gWebgpuCore.gl.LESS],
          range: depth.range || [0, 1]
        };
      }
    }

    /**
     * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#blending
     */
  }, {
    key: "initBlendDrawParams",
    value: function initBlendDrawParams(_ref2, drawParams) {
      var blend = _ref2.blend;
      if (blend) {
        var enable = blend.enable,
          func = blend.func,
          equation = blend.equation,
          _blend$color = blend.color,
          color = _blend$color === void 0 ? [0, 0, 0, 0] : _blend$color;
        // @ts-ignore
        drawParams.blend = {
          enable: !!enable,
          func: {
            srcRGB: _constants.blendFuncMap[func && func.srcRGB || _gWebgpuCore.gl.SRC_ALPHA],
            srcAlpha: _constants.blendFuncMap[func && func.srcAlpha || _gWebgpuCore.gl.SRC_ALPHA],
            dstRGB: _constants.blendFuncMap[func && func.dstRGB || _gWebgpuCore.gl.ONE_MINUS_SRC_ALPHA],
            dstAlpha: _constants.blendFuncMap[func && func.dstAlpha || _gWebgpuCore.gl.ONE_MINUS_SRC_ALPHA]
          },
          equation: {
            rgb: _constants.blendEquationMap[equation && equation.rgb || _gWebgpuCore.gl.FUNC_ADD],
            alpha: _constants.blendEquationMap[equation && equation.alpha || _gWebgpuCore.gl.FUNC_ADD]
          },
          color: color
        };
      }
    }

    /**
     * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#stencil
     */
  }, {
    key: "initStencilDrawParams",
    value: function initStencilDrawParams(_ref3, drawParams) {
      var stencil = _ref3.stencil;
      if (stencil) {
        var enable = stencil.enable,
          _stencil$mask = stencil.mask,
          mask = _stencil$mask === void 0 ? -1 : _stencil$mask,
          _stencil$func = stencil.func,
          func = _stencil$func === void 0 ? {
            cmp: _gWebgpuCore.gl.ALWAYS,
            ref: 0,
            mask: -1
          } : _stencil$func,
          _stencil$opFront = stencil.opFront,
          opFront = _stencil$opFront === void 0 ? {
            fail: _gWebgpuCore.gl.KEEP,
            zfail: _gWebgpuCore.gl.KEEP,
            zpass: _gWebgpuCore.gl.KEEP
          } : _stencil$opFront,
          _stencil$opBack = stencil.opBack,
          opBack = _stencil$opBack === void 0 ? {
            fail: _gWebgpuCore.gl.KEEP,
            zfail: _gWebgpuCore.gl.KEEP,
            zpass: _gWebgpuCore.gl.KEEP
          } : _stencil$opBack;
        drawParams.stencil = {
          enable: !!enable,
          mask: mask,
          func: _objectSpread(_objectSpread({}, func), {}, {
            cmp: _constants.stencilFuncMap[func.cmp]
          }),
          opFront: {
            fail: _constants.stencilOpMap[opFront.fail],
            zfail: _constants.stencilOpMap[opFront.zfail],
            zpass: _constants.stencilOpMap[opFront.zpass]
          },
          opBack: {
            fail: _constants.stencilOpMap[opBack.fail],
            zfail: _constants.stencilOpMap[opBack.zfail],
            zpass: _constants.stencilOpMap[opBack.zpass]
          }
        };
      }
    }

    /**
     * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#culling
     */
  }, {
    key: "initCullDrawParams",
    value: function initCullDrawParams(_ref4, drawParams) {
      var cull = _ref4.cull;
      if (cull) {
        var enable = cull.enable,
          _cull$face = cull.face,
          face = _cull$face === void 0 ? _gWebgpuCore.gl.BACK : _cull$face;
        drawParams.cull = {
          enable: !!enable,
          face: _constants.cullFaceMap[face]
        };
      }
    }
  }, {
    key: "generateDefines",
    value: function generateDefines(defines) {
      return Object.keys(defines).map(function (name) {
        return "#define ".concat(name, " ").concat(Number(defines[name]));
      }).join('\n');
    }
  }]);
  return ReglModel;
}();
exports.default = ReglModel;
//# sourceMappingURL=ReglModel.js.map