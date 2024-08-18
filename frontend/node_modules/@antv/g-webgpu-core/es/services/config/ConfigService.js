import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
export var ConfigService = /*#__PURE__*/function () {
  function ConfigService() {
    _classCallCheck(this, ConfigService);
    this.config = void 0;
  }
  _createClass(ConfigService, [{
    key: "get",
    value: function get() {
      return this.config;
    }
  }, {
    key: "set",
    value: function set(config) {
      this.config = config;
    }
  }]);
  return ConfigService;
}();
//# sourceMappingURL=ConfigService.js.map