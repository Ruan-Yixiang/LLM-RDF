"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Layout", {
  enumerable: true,
  get: function get() {
    return _lib.Layouts;
  }
});
Object.defineProperty(exports, "TreeLayout", {
  enumerable: true,
  get: function get() {
    return _treeLayout.default;
  }
});
exports.registerLayout = void 0;
var _lib = require("@antv/layout/lib");
var _treeLayout = _interopRequireDefault(require("./tree-layout"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _lib.registerLayout)('grid', _lib.GridLayout);
(0, _lib.registerLayout)('random', _lib.RandomLayout);
(0, _lib.registerLayout)('force', _lib.ForceLayout);
(0, _lib.registerLayout)('circular', _lib.CircularLayout);
(0, _lib.registerLayout)('dagre', _lib.DagreLayout);
(0, _lib.registerLayout)('dagreCompound', _lib.DagreCompoundLayout);
(0, _lib.registerLayout)('radial', _lib.RadialLayout);
(0, _lib.registerLayout)('concentric', _lib.ConcentricLayout);
(0, _lib.registerLayout)('mds', _lib.MDSLayout);
(0, _lib.registerLayout)('fruchterman', _lib.FruchtermanLayout);
(0, _lib.registerLayout)('fruchterman-gpu', _lib.FruchtermanGPULayout);
(0, _lib.registerLayout)('gForce', _lib.GForceLayout);
(0, _lib.registerLayout)('force2', _lib.Force2Layout);
(0, _lib.registerLayout)('gForce-gpu', _lib.GForceGPULayout);
(0, _lib.registerLayout)('comboForce', _lib.ComboForceLayout);
(0, _lib.registerLayout)('comboCombined', _lib.ComboCombinedLayout);
(0, _lib.registerLayout)('forceAtlas2', _lib.ForceAtlas2Layout);
var registerLayout = function registerLayout(name, layoutOverride) {
  layoutOverride.isCustomLayout = true;
  _lib.Layouts[name] = (0, _lib.registerLayout)(name, layoutOverride);
};
exports.registerLayout = registerLayout;