function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

import PriorityQueue from './PriorityQueue';

var DEFAULT_WEIGHT_FUNC = function DEFAULT_WEIGHT_FUNC() {
  return 1;
};
/**
 * @description Dijkstra's algorithm for single-source shortest paths.
 * @description https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
 * @description.zh-CN Dijkstra 算法用于单源最短路径。
 */


var dijkstra = function dijkstra(graph, source, weightFn, edgeFn) {
  return runDijkstra(graph, source, weightFn || DEFAULT_WEIGHT_FUNC, edgeFn || function (v) {
    return graph.outEdges(v);
  });
};
/**
 * @description Dijkstra's algorithm for single-source shortest paths.
 * @description https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
 * @description.zh-CN Dijkstra 算法用于单源最短路径。
 */


var runDijkstra = function runDijkstra(graph, source, weightFn, edgeFn) {
  var results = new Map();
  var pq = new PriorityQueue();
  var v;
  var vEntry;

  var updateNeighbors = function updateNeighbors(edge) {
    var w = edge.v !== v ? edge.v : edge.w;
    var wEntry = results.get(w);
    var weight = weightFn(edge);
    var distance = vEntry.distance + weight;

    if (weight < 0) {
      throw new Error('dijkstra does not allow negative edge weights. ' + 'Bad edge: ' + edge + ' Weight: ' + weight);
    } // If there is already a shorter path to w, ignore this edge.


    if (distance < wEntry.distance) {
      wEntry.distance = distance;
      wEntry.predecessor = v;
      pq.decrease(w, distance);
    }
  };

  graph.nodes().forEach(function (v) {
    var distance = v === source ? 0 : Number.POSITIVE_INFINITY;
    results.set(v, {
      distance: distance
    });
    pq.add(v, distance);
  });

  while (pq.size() > 0) {
    v = pq.removeMin();
    vEntry = results.get(v);

    if (vEntry && vEntry.distance === Number.POSITIVE_INFINITY) {
      break;
    }

    edgeFn(v).forEach(updateNeighbors);
  }

  var obj = {};
  Array.from(results.entries()).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        node = _ref2[0],
        e = _ref2[1];

    obj[String(node)] = e;
    return obj;
  });
  return obj;
};

export default dijkstra;