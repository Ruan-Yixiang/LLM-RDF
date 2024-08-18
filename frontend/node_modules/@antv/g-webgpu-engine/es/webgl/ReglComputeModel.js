import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _isTypedArray from "lodash/isTypedArray";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
import _regeneratorRuntime from "@babel/runtime/regenerator";
import { AST_TOKEN_TYPES, createEntity, STORAGE_CLASS } from '@antv/g-webgpu-core';
/* babel-plugin-inline-import './shaders/quad.vert.glsl' */
var quadVert = "attribute vec3 a_Position;\nattribute vec2 a_TexCoord;\n\nvarying vec2 v_TexCoord;\n\nvoid main() {\n  gl_Position = vec4(a_Position, 1.0);\n  v_TexCoord = a_TexCoord;\n}";
var textureId = 0;
var debug = false;

/**
 * adaptor for regl.DrawCommand
 */
var ReglComputeModel = /*#__PURE__*/function () {
  function ReglComputeModel(reGl, context) {
    var _this = this;
    _classCallCheck(this, ReglComputeModel);
    this.reGl = reGl;
    this.context = context;
    this.entity = createEntity();
    this.texFBO = void 0;
    this.computeCommand = void 0;
    this.textureCache = {};
    this.outputTextureName = void 0;
    this.swapOutputTextureName = void 0;
    this.compiledPingpong = void 0;
    this.dynamicPingpong = void 0;
    var uniforms = {};
    this.context.uniforms.forEach(function (uniform) {
      var name = uniform.name,
        type = uniform.type,
        data = uniform.data,
        isReferer = uniform.isReferer,
        storageClass = uniform.storageClass;
      // store data with a 2D texture
      if (storageClass === STORAGE_CLASS.StorageBuffer) {
        if (!isReferer) {
          _this.textureCache[name] = _this.calcDataTexture(name, type, data);
          var _this$textureCache$na = _this.textureCache[name],
            width = _this$textureCache$na.textureWidth,
            isOutput = _this$textureCache$na.isOutput;
          uniforms["".concat(name, "Size")] = [width, width];
          if (isOutput) {
            _this.outputTextureName = name;
            if (_this.context.needPingpong) {
              _this.outputTextureName = "".concat(name, "Output");
              _this.textureCache[_this.outputTextureName] = _this.calcDataTexture(name, type, data);
            }
          }
        } else {
          // @ts-ignore
          _this.textureCache[name] = {
            data: undefined
          };
          // refer to another kernel's output,
          // the referred kernel may not have been initialized, so we use dynamic way here
          uniforms["".concat(name, "Size")] = function () {
            return (
              // @ts-ignore
              data.compiledBundle.context.output.textureSize
            );
          };
        }
        uniforms[name] = function () {
          if (debug) {
            console.log("[".concat(_this.entity, "]: ").concat(name, " ").concat(_this.textureCache[name].id));
          }
          return _this.textureCache[name].texture;
        };
      } else if (storageClass === STORAGE_CLASS.Uniform) {
        if (data && (Array.isArray(data) || _isTypedArray(data)) && data.length > 16) {
          // up to mat4 which includes 16 elements
          throw new Error("invalid data type ".concat(type));
        }
        // get uniform dynamically
        uniforms[name] = function () {
          return uniform.data;
        };
      }
    });
    var _this$getOuputDataTex = this.getOuputDataTexture(),
      textureWidth = _this$getOuputDataTex.textureWidth,
      texelCount = _this$getOuputDataTex.texelCount;

    // 传入 output 纹理尺寸和数据长度，便于多余的 texel 提前退出
    uniforms.u_OutputTextureSize = [textureWidth, textureWidth];
    uniforms.u_OutputTexelCount = texelCount;

    // 保存在 Kernel 的上下文中，供其他 Kernel 引用
    this.context.output.textureSize = [textureWidth, textureWidth];
    var drawParams = {
      attributes: {
        a_Position: [[-1, 1, 0], [-1, -1, 0], [1, 1, 0], [1, -1, 0]],
        a_TexCoord: [[0, 1], [0, 0], [1, 1], [1, 0]]
      },
      frag: "#ifdef GL_FRAGMENT_PRECISION_HIGH\n  precision highp float;\n#else\n  precision mediump float;\n#endif\n".concat(this.context.shader),
      uniforms: uniforms,
      vert: quadVert,
      // TODO: use a fullscreen triangle instead.
      primitive: 'triangle strip',
      count: 4
    };
    this.computeCommand = this.reGl(drawParams);
  }
  _createClass(ReglComputeModel, [{
    key: "run",
    value: function run() {
      var _this2 = this;
      if (this.context.maxIteration > 1 && this.context.needPingpong) {
        this.compiledPingpong = true;
      }
      // need pingpong when (@in@out and execute(10)) or use `setBinding('out', self)`
      // this.needPingpong =
      //   !!(this.context.maxIteration > 1 && this.context.needPingpong);

      // if (this.relativeOutputTextureNames.length) {
      //   const { id, texture } = this.getOuputDataTexture();
      //   this.relativeOutputTextureNames.forEach((name) => {
      //     this.textureCache[name].id = id;
      //     this.textureCache[name].texture = texture;
      //   });
      //   this.swap();
      // }

      if (this.compiledPingpong || this.dynamicPingpong) {
        this.swap();
      }
      this.texFBO = this.reGl.framebuffer({
        color: this.getOuputDataTexture().texture
      });
      this.texFBO.use(function () {
        _this2.computeCommand();
      });
      if (debug) {
        console.log("[".concat(this.entity, "]: output ").concat(this.getOuputDataTexture().id));
      }
    }
  }, {
    key: "readData",
    value: function () {
      var _readData = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var _this3 = this;
        var pixels, _this$getOuputDataTex2, originalDataLength, elementsPerTexel, _this$getOuputDataTex3, typedArrayConstructor, formattedPixels, i;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                this.reGl({
                  framebuffer: this.texFBO
                })(function () {
                  pixels = _this3.reGl.read();
                });

                // @ts-ignore
                if (!pixels) {
                  _context.next = 6;
                  break;
                }
                _this$getOuputDataTex2 = this.getOuputDataTexture(), originalDataLength = _this$getOuputDataTex2.originalDataLength, elementsPerTexel = _this$getOuputDataTex2.elementsPerTexel, _this$getOuputDataTex3 = _this$getOuputDataTex2.typedArrayConstructor, typedArrayConstructor = _this$getOuputDataTex3 === void 0 ? Float32Array : _this$getOuputDataTex3;
                formattedPixels = [];
                if (elementsPerTexel !== 4) {
                  for (i = 0; i < pixels.length; i += 4) {
                    if (elementsPerTexel === 1) {
                      formattedPixels.push(pixels[i]);
                    } else if (elementsPerTexel === 2) {
                      formattedPixels.push(pixels[i], pixels[i + 1]);
                    } else {
                      formattedPixels.push(pixels[i], pixels[i + 1], pixels[i + 2]);
                    }
                  }
                } else {
                  // @ts-ignore
                  formattedPixels = pixels;
                }

                // 截取多余的部分
                // @ts-ignore
                return _context.abrupt("return", new typedArrayConstructor(formattedPixels.slice(0, originalDataLength)));
              case 6:
                return _context.abrupt("return", new Float32Array());
              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function readData() {
        return _readData.apply(this, arguments);
      }
      return readData;
    }()
  }, {
    key: "confirmInput",
    value: function confirmInput(model, inputName) {
      var inputModel;
      // refer to self, same as pingpong
      if (this.entity === model.entity) {
        this.dynamicPingpong = true;
        inputModel = this;
      } else {
        inputModel = model;
      }
      this.textureCache[inputName].id = inputModel.getOuputDataTexture().id;
      this.textureCache[inputName].texture = inputModel.getOuputDataTexture().texture;
      if (debug) {
        console.log("[".concat(this.entity, "]: confirm input ").concat(inputName, " from model ").concat(inputModel.entity, ", ").concat(inputModel.getOuputDataTexture().id));
      }
    }
  }, {
    key: "updateUniform",
    value: function updateUniform() {
      // already get uniform's data dynamically when created, do nothing here
    }
  }, {
    key: "updateBuffer",
    value: function updateBuffer(bufferName, data) {
      var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      // regenerate data texture
      var buffer = this.context.uniforms.find(function (_ref) {
        var name = _ref.name;
        return name === bufferName;
      });
      if (buffer) {
        var _this$calcDataTexture = this.calcDataTexture(bufferName, buffer.type, data),
          texture = _this$calcDataTexture.texture,
          paddingData = _this$calcDataTexture.data;

        // TODO: destroy outdated texture
        this.textureCache[bufferName].data = paddingData;
        this.textureCache[bufferName].texture = texture;
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      // regl will destroy all resources
    }
  }, {
    key: "swap",
    value: function swap() {
      if (!this.swapOutputTextureName) {
        this.createSwapOutputDataTexture();
      }
      if (this.compiledPingpong) {
        var outputTextureUniformName = this.context.output.name;
        this.textureCache[outputTextureUniformName].id = this.getOuputDataTexture().id;
        this.textureCache[outputTextureUniformName].texture = this.getOuputDataTexture().texture;
      }
      var tmp = this.outputTextureName;
      this.outputTextureName = this.swapOutputTextureName;
      this.swapOutputTextureName = tmp;
      if (debug) {
        console.log("[".concat(this.entity, "]: after swap, output ").concat(this.getOuputDataTexture().id));
      }
    }
  }, {
    key: "getOuputDataTexture",
    value: function getOuputDataTexture() {
      return this.textureCache[this.outputTextureName];
    }
  }, {
    key: "createSwapOutputDataTexture",
    value: function createSwapOutputDataTexture() {
      var texture = this.cloneDataTexture(this.getOuputDataTexture());
      this.swapOutputTextureName = "".concat(this.entity, "-swap");
      this.textureCache[this.swapOutputTextureName] = texture;
    }
  }, {
    key: "cloneDataTexture",
    value: function cloneDataTexture(texture) {
      var data = texture.data,
        textureWidth = texture.textureWidth;
      return _objectSpread(_objectSpread({}, texture), {}, {
        id: textureId++,
        // @ts-ignore
        texture: this.reGl.texture({
          width: textureWidth,
          height: textureWidth,
          data: data,
          type: 'float'
        })
      });
    }
  }, {
    key: "calcDataTexture",
    value: function calcDataTexture(name, type, data) {
      var elementsPerTexel = 1;
      if (type === AST_TOKEN_TYPES.Vector4FloatArray) {
        elementsPerTexel = 4;
      }

      // 用 0 补全不足 vec4 的部分
      var paddingData = [];
      for (var i = 0; i < data.length; i += elementsPerTexel) {
        if (elementsPerTexel === 1) {
          paddingData.push(data[i], 0, 0, 0);
        } else if (elementsPerTexel === 2) {
          paddingData.push(data[i], data[i + 1], 0, 0);
        } else if (elementsPerTexel === 3) {
          paddingData.push(data[i], data[i + 1], data[i + 2], 0);
        } else if (elementsPerTexel === 4) {
          paddingData.push(data[i], data[i + 1], data[i + 2], data[i + 3]);
        }
      }

      // 使用纹理存储，例如 Array(8) 使用 3 * 3 纹理，末尾空白使用 0 填充
      var originalDataLength = data.length;
      var texelCount = Math.ceil(originalDataLength / elementsPerTexel);
      var width = Math.ceil(Math.sqrt(texelCount));
      var paddingTexelCount = width * width;
      if (texelCount < paddingTexelCount) {
        paddingData.push.apply(paddingData, _toConsumableArray(new Array((paddingTexelCount - texelCount) * 4).fill(0)));
      }
      var texture = this.reGl.texture({
        width: width,
        height: width,
        data: paddingData,
        type: 'float'
      });
      return {
        id: textureId++,
        data: paddingData,
        originalDataLength: originalDataLength,
        typedArrayConstructor: _isTypedArray(data) ? data.constructor : undefined,
        textureWidth: width,
        texture: texture,
        texelCount: texelCount,
        elementsPerTexel: elementsPerTexel,
        isOutput: name === this.context.output.name
      };
    }
  }]);
  return ReglComputeModel;
}();
export { ReglComputeModel as default };
//# sourceMappingURL=ReglComputeModel.js.map