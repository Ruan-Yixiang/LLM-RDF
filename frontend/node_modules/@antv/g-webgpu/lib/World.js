"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.World = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _gWebgpuCore = require("@antv/g-webgpu-core");
var _gWebgpuEngine = require("@antv/g-webgpu-engine");
var _Kernel = require("./Kernel");
var World = /*#__PURE__*/function () {
  function World() {
    (0, _classCallCheck2.default)(this, World);
    this.engine = void 0;
    this.configService = new _gWebgpuCore.ConfigService();
  }
  (0, _createClass2.default)(World, [{
    key: "setConfig",
    value: function setConfig(config) {
      this.configService.set(config);
    }
  }, {
    key: "setEngine",
    value: function setEngine(engine) {
      this.engine = engine;
    }
  }, {
    key: "createEntity",
    value: function createEntity() {
      return (0, _gWebgpuCore.createEntity)();
    }
  }, {
    key: "createKernel",
    value: function createKernel(precompiledBundle) {
      var kernel = new _Kernel.Kernel(this.engine, this.configService);
      if (typeof precompiledBundle === 'string') {
        kernel.setBundle(JSON.parse(precompiledBundle));
      } else {
        kernel.setBundle(precompiledBundle);
      }
      kernel.init();
      return kernel;
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.engine.destroy();
    }
  }], [{
    key: "create",
    value: function create() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var world = new World();
      world.setConfig(config);
      world.setEngine(new _gWebgpuEngine.WebGLEngine());
      return world;
    }
  }]);
  return World;
}();
exports.World = World;
//# sourceMappingURL=World.js.map