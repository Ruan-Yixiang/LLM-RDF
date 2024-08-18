import { __assign } from "tslib";
import base from './tooltip-base';
export default __assign({
  getDefaultCfg: function getDefaultCfg() {
    return {
      item: 'edge',
      offset: 12,
      formatText: function formatText(model) {
        return "source: ".concat(model.source, " target: ").concat(model.target);
      }
    };
  },
  getEvents: function getEvents() {
    return {
      'edge:mouseenter': 'onMouseEnter',
      'edge:mouseleave': 'onMouseLeave',
      'edge:mousemove': 'onMouseMove',
      afterremoveitem: 'onMouseLeave'
    };
  }
}, base);