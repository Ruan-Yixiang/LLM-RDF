function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * @file To get graph essencial information.
 * @file.zh-CN 获取图的基本信息
 * @module essence
 */
import Graph from '../Graph';
/**
 * @description Check if the object is a graph.
 * @description.zh-CN 检查对象是否为图。
 */

export function isGraph(obj) {
  return obj instanceof Graph;
}
/**
 * @description Check if the graph is a simple graph.
 * @description.zh-CN 检查图是否为简单图。
 */

export function isSimpleGraph(graph) {
  if (graph.isMultigraph()) {
    return false;
  }

  var edges = graph.edges();
  var edgeStack = new Map();

  for (var i = 0; i < edges.length; i++) {
    var edge = edges[i];

    if (edge.v === edge.w) {
      return false;
    }

    var _sort = [edge.v, edge.w].sort(),
        _sort2 = _slicedToArray(_sort, 2),
        v = _sort2[0],
        w = _sort2[1];

    var key = "".concat(v, "-").concat(w);

    if (edgeStack.has(key)) {
      return false;
    }

    edgeStack.set(key, true);
  }

  return true;
}
/**
 * @description Check if the graph is a null graph.
 * @description.zh-CN 检查图是否为空图。
 */

export function isNullGraph(graph) {
  return graph.nodes().length === 0;
}
/**
 * @description Check if the graph contains Self loops.
 * @description.zh-CN 检查图是否包含自环。
 */

export function hasSelfLoop(graph) {
  var edges = graph.edges();

  for (var i = 0; i < edges.length; i++) {
    var edge = edges[i];

    if (edge.v === edge.w) {
      return true;
    }
  }

  return false;
}