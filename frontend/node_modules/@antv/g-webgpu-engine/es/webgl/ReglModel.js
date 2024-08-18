import _typeof from "@babel/runtime/helpers/typeof";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
import { gl } from '@antv/g-webgpu-core';
import { extractUniforms } from '../utils/uniform';
import { blendEquationMap, blendFuncMap, cullFaceMap, depthFuncMap, primitiveMap, stencilFuncMap, stencilOpMap } from './constants';
/**
 * adaptor for regl.DrawCommand
 */
var ReglModel = /*#__PURE__*/function () {
  function ReglModel(reGl, options) {
    _classCallCheck(this, ReglModel);
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
      this.uniforms = extractUniforms(uniforms);
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
      primitive: primitiveMap[primitive === undefined ? gl.TRIANGLES : primitive]
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
  _createClass(ReglModel, [{
    key: "addUniforms",
    value: function addUniforms(uniforms) {
      this.uniforms = _objectSpread(_objectSpread({}, this.uniforms), extractUniforms(uniforms));
    }
  }, {
    key: "draw",
    value: function draw(options) {
      var uniforms = _objectSpread(_objectSpread({}, this.uniforms), extractUniforms(options.uniforms || {}));
      var reglDrawProps = {};
      Object.keys(uniforms).forEach(function (uniformName) {
        var type = _typeof(uniforms[uniformName]);
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
          func: depthFuncMap[depth.func || gl.LESS],
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
            srcRGB: blendFuncMap[func && func.srcRGB || gl.SRC_ALPHA],
            srcAlpha: blendFuncMap[func && func.srcAlpha || gl.SRC_ALPHA],
            dstRGB: blendFuncMap[func && func.dstRGB || gl.ONE_MINUS_SRC_ALPHA],
            dstAlpha: blendFuncMap[func && func.dstAlpha || gl.ONE_MINUS_SRC_ALPHA]
          },
          equation: {
            rgb: blendEquationMap[equation && equation.rgb || gl.FUNC_ADD],
            alpha: blendEquationMap[equation && equation.alpha || gl.FUNC_ADD]
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
            cmp: gl.ALWAYS,
            ref: 0,
            mask: -1
          } : _stencil$func,
          _stencil$opFront = stencil.opFront,
          opFront = _stencil$opFront === void 0 ? {
            fail: gl.KEEP,
            zfail: gl.KEEP,
            zpass: gl.KEEP
          } : _stencil$opFront,
          _stencil$opBack = stencil.opBack,
          opBack = _stencil$opBack === void 0 ? {
            fail: gl.KEEP,
            zfail: gl.KEEP,
            zpass: gl.KEEP
          } : _stencil$opBack;
        drawParams.stencil = {
          enable: !!enable,
          mask: mask,
          func: _objectSpread(_objectSpread({}, func), {}, {
            cmp: stencilFuncMap[func.cmp]
          }),
          opFront: {
            fail: stencilOpMap[opFront.fail],
            zfail: stencilOpMap[opFront.zfail],
            zpass: stencilOpMap[opFront.zpass]
          },
          opBack: {
            fail: stencilOpMap[opBack.fail],
            zfail: stencilOpMap[opBack.zfail],
            zpass: stencilOpMap[opBack.zpass]
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
          face = _cull$face === void 0 ? gl.BACK : _cull$face;
        drawParams.cull = {
          enable: !!enable,
          face: cullFaceMap[face]
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
export { ReglModel as default };
//# sourceMappingURL=ReglModel.js.map