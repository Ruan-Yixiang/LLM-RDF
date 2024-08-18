"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Minimap: true,
  Grid: true,
  Bundling: true,
  Menu: true,
  Fisheye: true,
  Algorithm: true,
  ToolBar: true,
  Tooltip: true,
  TimeBar: true,
  ImageMinimap: true,
  EdgeFilterLens: true,
  SnapLine: true,
  Legend: true,
  Annotation: true,
  Arrow: true,
  Marker: true,
  Shape: true,
  Graph: true,
  TreeGraph: true,
  TreeLayout: true,
  Layout: true,
  registerLayout: true,
  Global: true,
  Util: true
};
exports.Annotation = exports.Algorithm = void 0;
Object.defineProperty(exports, "Arrow", {
  enumerable: true,
  get: function get() {
    return _g6Core.Arrow;
  }
});
exports.Fisheye = exports.EdgeFilterLens = exports.Bundling = void 0;
Object.defineProperty(exports, "Global", {
  enumerable: true,
  get: function get() {
    return _global.default;
  }
});
Object.defineProperty(exports, "Graph", {
  enumerable: true,
  get: function get() {
    return _graph.default;
  }
});
exports.ImageMinimap = exports.Grid = void 0;
Object.defineProperty(exports, "Layout", {
  enumerable: true,
  get: function get() {
    return _layout.Layout;
  }
});
exports.Legend = void 0;
Object.defineProperty(exports, "Marker", {
  enumerable: true,
  get: function get() {
    return _g6Core.Marker;
  }
});
exports.Minimap = exports.Menu = void 0;
Object.defineProperty(exports, "Shape", {
  enumerable: true,
  get: function get() {
    return _g6Core.Shape;
  }
});
exports.Tooltip = exports.ToolBar = exports.TimeBar = exports.SnapLine = void 0;
Object.defineProperty(exports, "TreeGraph", {
  enumerable: true,
  get: function get() {
    return _treeGraph.default;
  }
});
Object.defineProperty(exports, "TreeLayout", {
  enumerable: true,
  get: function get() {
    return _layout.TreeLayout;
  }
});
Object.defineProperty(exports, "Util", {
  enumerable: true,
  get: function get() {
    return _util.default;
  }
});
exports.default = void 0;
Object.defineProperty(exports, "registerLayout", {
  enumerable: true,
  get: function get() {
    return _layout.registerLayout;
  }
});
var _tslib = require("tslib");
var _g6Core = require("@antv/g6-core");
Object.keys(_g6Core).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _g6Core[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _g6Core[key];
    }
  });
});
var AlgorithmSync = _interopRequireWildcard(require("@antv/algorithm"));
var AlgorithmAsync = _interopRequireWildcard(require("@antv/algorithm/lib/asyncIndex"));
var _graph = _interopRequireDefault(require("./graph/graph"));
var _treeGraph = _interopRequireDefault(require("./graph/tree-graph"));
var _layout = require("./layout");
var _global = _interopRequireDefault(require("./global"));
var _util = _interopRequireDefault(require("./util"));
var _plugin = _interopRequireDefault(require("./plugin"));
require("./element");
require("./behavior");
var _types = require("./types");
Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _types[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});
var _graph2 = require("./interface/graph");
Object.keys(_graph2).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _graph2[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _graph2[key];
    }
  });
});
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var Algorithm = (0, _tslib.__assign)((0, _tslib.__assign)({}, AlgorithmSync), AlgorithmAsync);
exports.Algorithm = Algorithm;
var Grid = _plugin.default.Grid;
exports.Grid = Grid;
var Minimap = _plugin.default.Minimap;
exports.Minimap = Minimap;
var Bundling = _plugin.default.Bundling;
exports.Bundling = Bundling;
var Menu = _plugin.default.Menu;
exports.Menu = Menu;
var Fisheye = _plugin.default.Fisheye;
exports.Fisheye = Fisheye;
var ToolBar = _plugin.default.ToolBar;
exports.ToolBar = ToolBar;
var Tooltip = _plugin.default.Tooltip;
exports.Tooltip = Tooltip;
var TimeBar = _plugin.default.TimeBar;
exports.TimeBar = TimeBar;
var ImageMinimap = _plugin.default.ImageMinimap;
exports.ImageMinimap = ImageMinimap;
var EdgeFilterLens = _plugin.default.EdgeFilterLens;
exports.EdgeFilterLens = EdgeFilterLens;
var SnapLine = _plugin.default.SnapLine;
exports.SnapLine = SnapLine;
var Legend = _plugin.default.Legend;
exports.Legend = Legend;
var Annotation = _plugin.default.Annotation;
exports.Annotation = Annotation;
var _default = {
  version: _global.default.version,
  Graph: _graph.default,
  TreeGraph: _treeGraph.default,
  Util: _util.default,
  Layout: _layout.Layout,
  TreeLayout: _layout.TreeLayout,
  registerLayout: _layout.registerLayout,
  Global: _global.default,
  registerBehavior: _g6Core.registerBehavior,
  registerCombo: _g6Core.registerCombo,
  registerEdge: _g6Core.registerEdge,
  registerNode: _g6Core.registerNode,
  Minimap: _plugin.default.Minimap,
  Grid: _plugin.default.Grid,
  Bundling: _plugin.default.Bundling,
  Menu: _plugin.default.Menu,
  ToolBar: _plugin.default.ToolBar,
  Tooltip: _plugin.default.Tooltip,
  Legend: _plugin.default.Legend,
  TimeBar: TimeBar,
  SnapLine: SnapLine,
  Fisheye: Fisheye,
  ImageMinimap: ImageMinimap,
  EdgeFilterLens: EdgeFilterLens,
  Annotation: Annotation,
  Algorithm: Algorithm,
  Arrow: _g6Core.Arrow,
  Marker: _g6Core.Marker,
  Shape: _g6Core.Shape
};
exports.default = _default;