import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import { ConfigService, createEntity as _createEntity } from '@antv/g-webgpu-core';
import { WebGLEngine } from '@antv/g-webgpu-engine';
import { Kernel } from './Kernel';
export var World = /*#__PURE__*/function () {
  function World() {
    _classCallCheck(this, World);
    this.engine = void 0;
    this.configService = new ConfigService();
  }
  _createClass(World, [{
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
      return _createEntity();
    }
  }, {
    key: "createKernel",
    value: function createKernel(precompiledBundle) {
      var kernel = new Kernel(this.engine, this.configService);
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
      world.setEngine(new WebGLEngine());
      return world;
    }
  }]);
  return World;
}();
//# sourceMappingURL=World.js.map