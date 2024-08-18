"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _hierarchy = _interopRequireDefault(require("@antv/hierarchy"));
var _util = _interopRequireDefault(require("../util"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var radialLayout = _util.default.radialLayout;
var TreeLayout = /** @class */function () {
  function TreeLayout(cfg) {
    this.type = cfg.type;
    this.radial = cfg.radial;
    this.config = cfg;
  }
  TreeLayout.prototype.init = function (data) {
    var _this = this;
    this.data = data;
    if (this.radial) {
      this.layoutMethod = function (data) {
        var layoutData = _hierarchy.default[_this.type](data, _this.config);
        radialLayout(layoutData);
        return layoutData;
      };
      return;
    }
    this.layoutMethod = function (data) {
      return _hierarchy.default[_this.type](data, _this.config);
    };
  };
  TreeLayout.prototype.execute = function () {
    return this.layoutMethod(this.data, this.config);
  };
  TreeLayout.prototype.layout = function (data) {
    this.init(data);
    return this.execute();
  };
  return TreeLayout;
}();
var _default = TreeLayout;
exports.default = _default;