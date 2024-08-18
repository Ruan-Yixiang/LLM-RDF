"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tslib = require("tslib");
var _tooltipBase = _interopRequireDefault(require("./tooltip-base"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var _default = (0, _tslib.__assign)({
  getDefaultCfg: function getDefaultCfg() {
    return {
      item: 'node',
      offset: 12,
      formatText: function formatText(model) {
        return model.label;
      }
    };
  },
  getEvents: function getEvents() {
    return {
      'node:mouseenter': 'onMouseEnter',
      'node:mouseleave': 'onMouseLeave',
      'node:mousemove': 'onMouseMove',
      afterremoveitem: 'onMouseLeave'
    };
  }
}, _tooltipBase.default);
exports.default = _default;