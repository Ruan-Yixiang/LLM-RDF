import { __assign } from "tslib";
import base from './tooltip-base';
export default __assign({
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
}, base);