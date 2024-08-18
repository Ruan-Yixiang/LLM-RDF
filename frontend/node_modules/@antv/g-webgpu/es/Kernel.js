import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _defineProperty from "@babel/runtime/helpers/defineProperty";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _isTypedArray from "lodash/isTypedArray";
import _isNumber from "lodash/isNumber";
import _isArray from "lodash/isArray";
import _regeneratorRuntime from "@babel/runtime/regenerator";
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
import { AST_TOKEN_TYPES, DefineValuePlaceholder, STORAGE_CLASS, Target } from '@antv/g-webgpu-core';
import { createCanvas } from './utils/canvas';
export var Kernel = /*#__PURE__*/function () {
  function Kernel(engine, configService) {
    _classCallCheck(this, Kernel);
    this.engine = engine;
    this.configService = configService;
    this.model = void 0;
    this.dirty = true;
    this.compiledBundle = void 0;
    this.initPromise = void 0;
  }
  _createClass(Kernel, [{
    key: "init",
    value: function init() {
      var _this$configService$g = this.configService.get(),
        canvas = _this$configService$g.canvas,
        engineOptions = _this$configService$g.engineOptions;
      this.initPromise = this.engine.init(_objectSpread({
        canvas: canvas || createCanvas(),
        // swapChainFormat: WebGPUConstants.TextureFormat.BGRA8Unorm,
        antialiasing: false
      }, engineOptions));
    }
  }, {
    key: "setBundle",
    value: function setBundle(bundle) {
      // deep clone
      this.compiledBundle = JSON.parse(JSON.stringify(bundle));
    }
  }, {
    key: "setDispatch",
    value: function setDispatch(dispatch) {
      if (this.compiledBundle.context) {
        this.compiledBundle.context.dispatch = dispatch;
      }
      return this;
    }
  }, {
    key: "setMaxIteration",
    value: function setMaxIteration(maxIteration) {
      if (this.compiledBundle.context) {
        this.compiledBundle.context.maxIteration = maxIteration;
      }
      return this;
    }
  }, {
    key: "setBinding",
    value: function setBinding(name, data) {
      var _this = this;
      if (typeof name === 'string') {
        var isNumberLikeData = _isNumber(data) || _isTypedArray(data) || _isArray(data);
        if (this.compiledBundle && this.compiledBundle.context) {
          // set define, eg. setBinding('MAX_LENGTH', 10)
          var existedDefine = this.compiledBundle.context.defines.find(function (b) {
            return b.name === name;
          });
          if (existedDefine) {
            existedDefine.value = data;
            return this;
          }

          // set uniform
          var existedBinding = this.compiledBundle.context.uniforms.find(function (b) {
            return b.name === name;
          });
          if (existedBinding) {
            // update uniform or buffer
            if (isNumberLikeData) {
              // @ts-ignore
              existedBinding.data = data;
              existedBinding.isReferer = false;
              if (existedBinding.storageClass === STORAGE_CLASS.Uniform) {
                if (this.model) {
                  // @ts-ignore
                  this.model.updateUniform(name, data);
                }
              } else {
                if (this.model) {
                  // @ts-ignore
                  this.model.updateBuffer(name, data);
                }
              }
            } else {
              // update with another kernel
              existedBinding.isReferer = true;
              // @ts-ignore
              existedBinding.data = data;
            }
          }
        }
      } else {
        Object.keys(name).forEach(function (key) {
          _this.setBinding(key, name[key]);
        });
      }
      return this;
    }
  }, {
    key: "execute",
    value: function () {
      var _execute = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee() {
        var _this2 = this;
        var iteration,
          i,
          _args = arguments;
        return _regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                iteration = _args.length > 0 && _args[0] !== undefined ? _args[0] : 1;
                if (!this.dirty) {
                  _context.next = 6;
                  break;
                }
                if (this.compiledBundle.context) {
                  if (iteration > 1) {
                    this.compiledBundle.context.maxIteration = iteration;
                  } else {
                    this.compiledBundle.context.maxIteration++;
                  }
                }
                _context.next = 5;
                return this.compile();
              case 5:
                this.dirty = false;
              case 6:
                this.engine.beginFrame();

                // 首先开启当前 frame 的 compute pass
                this.engine.clear({});
                if (this.compiledBundle.context) {
                  this.compiledBundle.context.uniforms.filter(function (_ref) {
                    var isReferer = _ref.isReferer;
                    return isReferer;
                  }).forEach(function (_ref2) {
                    var data = _ref2.data,
                      name = _ref2.name;
                    // @ts-ignore
                    _this2.model.confirmInput(data.model, name);
                  });
                }
                for (i = 0; i < iteration; i++) {
                  this.model.run();
                }
                this.engine.endFrame();
                return _context.abrupt("return", this);
              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));
      function execute() {
        return _execute.apply(this, arguments);
      }
      return execute;
    }()
    /**
     * read output from GPUBuffer
     */
  }, {
    key: "getOutput",
    value: function () {
      var _getOutput = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee2() {
        return _regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt("return", this.model.readData());
              case 1:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));
      function getOutput() {
        return _getOutput.apply(this, arguments);
      }
      return getOutput;
    }()
  }, {
    key: "compile",
    value: function () {
      var _compile = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee3() {
        var context, target, shader;
        return _regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return this.initPromise;
              case 2:
                context = _objectSpread({}, this.compiledBundle.context);
                target = this.engine.supportWebGPU ? this.engine.useWGSL ? Target.WGSL : Target.GLSL450 : Target.GLSL100;
                shader = this.compiledBundle.shaders[target]; // this.bindings?.forEach(({ name, data }) => {
                //   if (name === name.toUpperCase()) {
                //     const define = context.defines.find((d) => d.name === name);
                //     if (define) {
                //       // @ts-ignore
                //       define.value = data;
                //     }
                //   }
                // });
                // 生成运行时 define
                context.defines.filter(function (define) {
                  return define.runtime;
                }).forEach(function (define) {
                  var valuePlaceHolder = "".concat(DefineValuePlaceholder).concat(define.name);
                  shader = shader.replace(valuePlaceHolder, "".concat(define.value));
                });
                context.shader = shader;

                // 添加 uniform 绑定的数据
                context.uniforms.forEach(function (uniform) {
                  // const binding = this.bindings.find((b) => b.name === uniform.name);
                  // if (binding) {
                  //   // @ts-ignore
                  //   uniform.data = binding.referer || binding.data;
                  //   // @ts-ignore
                  //   uniform.isReferer = !!binding.referer;
                  // }

                  // 未指定数据，尝试根据 uniform 类型初始化
                  if (!uniform.data) {
                    if (uniform.storageClass === STORAGE_CLASS.StorageBuffer) {
                      var sizePerElement = 1;
                      if (uniform.type === AST_TOKEN_TYPES.FloatArray) {
                        sizePerElement = 1;
                      } else if (uniform.type === AST_TOKEN_TYPES.Vector4FloatArray) {
                        sizePerElement = 4;
                      }
                      uniform.data = new Float32Array(context.output.length * sizePerElement).fill(0);
                    }
                  }
                });
                // } else if (uniform.type === 'image2D') {
                //   // @ts-ignore
                //   buffer.data = new Uint8ClampedArray(context.output.length!).fill(0);
                // }

                this.compiledBundle.context = context;
                _context3.next = 11;
                return this.engine.createComputeModel(this.compiledBundle.context);
              case 11:
                this.model = _context3.sent;
              case 12:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));
      function compile() {
        return _compile.apply(this, arguments);
      }
      return compile;
    }()
  }]);
  return Kernel;
}();
//# sourceMappingURL=Kernel.js.map