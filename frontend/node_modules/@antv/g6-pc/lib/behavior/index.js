"use strict";

var _util = require("@antv/util");
var _g6Core = require("@antv/g6-core");
var _dragCanvas = _interopRequireDefault(require("./drag-canvas"));
var _dragNode = _interopRequireDefault(require("./drag-node"));
var _activateRelations = _interopRequireDefault(require("./activate-relations"));
var _brushSelect = _interopRequireDefault(require("./brush-select"));
var _clickSelect = _interopRequireDefault(require("./click-select"));
var _zoomCanvas = _interopRequireDefault(require("./zoom-canvas"));
var _tooltip = _interopRequireDefault(require("./tooltip"));
var _edgeTooltip = _interopRequireDefault(require("./edge-tooltip"));
var _collapseExpand = _interopRequireDefault(require("./collapse-expand"));
var _dragCombo = _interopRequireDefault(require("./drag-combo"));
var _collapseExpandCombo = _interopRequireDefault(require("./collapse-expand-combo"));
var _lassoSelect = _interopRequireDefault(require("./lasso-select"));
var _createEdge = _interopRequireDefault(require("./create-edge"));
var _shortcutsCall = _interopRequireDefault(require("./shortcuts-call"));
var _scrollCanvas = _interopRequireDefault(require("./scroll-canvas"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// import Behavior from './behavior';

var behaviors = {
  'drag-canvas': _dragCanvas.default,
  'zoom-canvas': _zoomCanvas.default,
  'drag-node': _dragNode.default,
  'activate-relations': _activateRelations.default,
  'brush-select': _brushSelect.default,
  'click-select': _clickSelect.default,
  'lasso-select': _lassoSelect.default,
  tooltip: _tooltip.default,
  'edge-tooltip': _edgeTooltip.default,
  'collapse-expand': _collapseExpand.default,
  'drag-combo': _dragCombo.default,
  'collapse-expand-combo': _collapseExpandCombo.default,
  'create-edge': _createEdge.default,
  'shortcuts-call': _shortcutsCall.default,
  'scroll-canvas': _scrollCanvas.default
};
(0, _util.each)(behaviors, function (behavior, type) {
  (0, _g6Core.registerBehavior)(type, behavior);
});
// export default Behavior;