"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WebGLEngine = void 0;
var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));
var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _gWebgpuCore = require("@antv/g-webgpu-core");
var _regl = _interopRequireDefault(require("regl"));
var _ReglAttribute = _interopRequireDefault(require("./ReglAttribute"));
var _ReglBuffer = _interopRequireDefault(require("./ReglBuffer"));
var _ReglComputeModel = _interopRequireDefault(require("./ReglComputeModel"));
var _ReglElements = _interopRequireDefault(require("./ReglElements"));
var _ReglFramebuffer = _interopRequireDefault(require("./ReglFramebuffer"));
var _ReglModel = _interopRequireDefault(require("./ReglModel"));
var _ReglTexture2D = _interopRequireDefault(require("./ReglTexture2D"));
/**
 * render w/ regl
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md
 */
/**
 * regl renderer
 */
var WebGLEngine = /*#__PURE__*/function () {
  function WebGLEngine() {
    var _this = this;
    (0, _classCallCheck2.default)(this, WebGLEngine);
    this.supportWebGPU = false;
    this.useWGSL = false;
    this.$canvas = void 0;
    this.gl = void 0;
    this.inited = void 0;
    this.createModel = /*#__PURE__*/function () {
      var _ref = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee2(options) {
        return _regenerator.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!options.uniforms) {
                  _context2.next = 3;
                  break;
                }
                _context2.next = 3;
                return Promise.all(Object.keys(options.uniforms).map( /*#__PURE__*/function () {
                  var _ref2 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee(name) {
                    var texture;
                    return _regenerator.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            if (!(options.uniforms[name] &&
                            // @ts-ignore
                            options.uniforms[name].load !== undefined)) {
                              _context.next = 5;
                              break;
                            }
                            _context.next = 3;
                            return options.uniforms[name].load();
                          case 3:
                            texture = _context.sent;
                            // @ts-ignore
                            options.uniforms[name] = texture;
                          case 5:
                          case "end":
                            return _context.stop();
                        }
                      }
                    }, _callee);
                  }));
                  return function (_x2) {
                    return _ref2.apply(this, arguments);
                  };
                }()));
              case 3:
                return _context2.abrupt("return", new _ReglModel.default(_this.gl, options));
              case 4:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));
      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
    this.createAttribute = function (options) {
      return new _ReglAttribute.default(_this.gl, options);
    };
    this.createBuffer = function (options) {
      return new _ReglBuffer.default(_this.gl, options);
    };
    this.createElements = function (options) {
      return new _ReglElements.default(_this.gl, options);
    };
    this.createTexture2D = function (options) {
      return new _ReglTexture2D.default(_this.gl, options);
    };
    this.createFramebuffer = function (options) {
      return new _ReglFramebuffer.default(_this.gl, options);
    };
    this.useFramebuffer = function (framebuffer, drawCommands) {
      _this.gl({
        framebuffer: framebuffer ? framebuffer.get() : null
      })(drawCommands);
    };
    this.createComputeModel = /*#__PURE__*/function () {
      var _ref3 = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee3(context) {
        return _regenerator.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                return _context3.abrupt("return", new _ReglComputeModel.default(_this.gl, context));
              case 1:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));
      return function (_x3) {
        return _ref3.apply(this, arguments);
      };
    }();
    this.clear = function (options) {
      // @see https://github.com/regl-project/regl/blob/gh-pages/API.md#clear-the-draw-buffer
      var color = options.color,
        depth = options.depth,
        stencil = options.stencil,
        _options$framebuffer = options.framebuffer,
        framebuffer = _options$framebuffer === void 0 ? null : _options$framebuffer;
      var reglClearOptions = {
        color: color,
        depth: depth,
        stencil: stencil
      };
      reglClearOptions.framebuffer = framebuffer === null ? framebuffer : framebuffer.get();
      _this.gl.clear(reglClearOptions);
    };
    this.setScissor = function (scissor) {
      if (_this.gl && _this.gl._gl) {
        // https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/scissor
        if (scissor.enable && scissor.box) {
          // console.log(scissor.box);
          _this.gl._gl.enable(_gWebgpuCore.gl.SCISSOR_TEST);
          _this.gl._gl.scissor(scissor.box.x, scissor.box.y, scissor.box.width, scissor.box.height);
        } else {
          _this.gl._gl.disable(_gWebgpuCore.gl.SCISSOR_TEST);
        }
        _this.gl._refresh();
      }
    };
    this.viewport = function (_ref4) {
      var x = _ref4.x,
        y = _ref4.y,
        width = _ref4.width,
        height = _ref4.height;
      if (_this.gl && _this.gl._gl) {
        // use WebGL context directly
        // @see https://github.com/regl-project/regl/blob/gh-pages/API.md#unsafe-escape-hatch
        _this.gl._gl.viewport(x, y, width, height);
        _this.gl._refresh();
      }
    };
    this.readPixels = function (options) {
      var framebuffer = options.framebuffer,
        x = options.x,
        y = options.y,
        width = options.width,
        height = options.height;
      var readPixelsOptions = {
        x: x,
        y: y,
        width: width,
        height: height
      };
      if (framebuffer) {
        readPixelsOptions.framebuffer = framebuffer.get();
      }
      return _this.gl.read(readPixelsOptions);
    };
    this.getCanvas = function () {
      return _this.$canvas;
    };
    this.getGLContext = function () {
      return _this.gl._gl;
    };
    this.destroy = function () {
      if (_this.gl) {
        // @see https://github.com/regl-project/regl/blob/gh-pages/API.md#clean-up
        _this.gl.destroy();
        _this.inited = false;
      }
    };
  }
  (0, _createClass2.default)(WebGLEngine, [{
    key: "init",
    value: function () {
      var _init = (0, _asyncToGenerator2.default)( /*#__PURE__*/_regenerator.default.mark(function _callee4(cfg) {
        return _regenerator.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!this.inited) {
                  _context4.next = 2;
                  break;
                }
                return _context4.abrupt("return");
              case 2:
                this.$canvas = cfg.canvas;
                // tslint:disable-next-line:typedef
                _context4.next = 5;
                return new Promise(function (resolve, reject) {
                  (0, _regl.default)({
                    canvas: cfg.canvas,
                    attributes: {
                      alpha: true,
                      // use TAA instead of MSAA
                      // @see https://www.khronos.org/registry/webgl/specs/1.0/#5.2.1
                      antialias: cfg.antialias,
                      premultipliedAlpha: true
                      // preserveDrawingBuffer: false,
                    },

                    pixelRatio: 1,
                    // TODO: use extensions
                    extensions: ['OES_element_index_uint', 'OES_texture_float', 'OES_standard_derivatives',
                    // wireframe
                    'angle_instanced_arrays' // VSM shadow map
                    ],

                    optionalExtensions: ['EXT_texture_filter_anisotropic', 'EXT_blend_minmax', 'WEBGL_depth_texture'],
                    profile: true,
                    onDone: function onDone(err, r) {
                      if (err || !r) {
                        reject(err);
                      }
                      // @ts-ignore
                      resolve(r);
                    }
                  });
                });
              case 5:
                this.gl = _context4.sent;
                this.inited = true;
              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));
      function init(_x4) {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "isFloatSupported",
    value: function isFloatSupported() {
      // @see https://github.com/antvis/GWebGPUEngine/issues/26
      // @ts-ignore
      return this.gl.limits.readFloat;
    }
  }, {
    key: "beginFrame",
    value: function beginFrame() {
      //
    }
  }, {
    key: "endFrame",
    value: function endFrame() {
      //
    }
  }]);
  return WebGLEngine;
}();
exports.WebGLEngine = WebGLEngine;
//# sourceMappingURL=index.js.map