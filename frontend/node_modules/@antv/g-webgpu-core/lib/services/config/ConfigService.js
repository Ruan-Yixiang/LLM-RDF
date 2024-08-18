"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConfigService = void 0;
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var ConfigService = /*#__PURE__*/function () {
  function ConfigService() {
    (0, _classCallCheck2.default)(this, ConfigService);
    this.config = void 0;
  }
  (0, _createClass2.default)(ConfigService, [{
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
exports.ConfigService = ConfigService;
//# sourceMappingURL=ConfigService.js.map