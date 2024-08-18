function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

import { edgeArgsToId, isFunction } from '../util';
import { GraphEnum } from './enum';
import { decrementOrRemoveEntry, edgeArgsToObj, edgeObjToId, incrementOrInitEntry } from '../util';
import { read, write } from './toJSON';
var defaultOption = {
  compound: false,
  multigraph: false,
  directed: true
};

var Graph = /*#__PURE__*/function () {
  // Graph option or basic props

  /**
   * @description Label for this graph itself
   * @description.zh-CN 图本身的标签（label）
   * @default undefined
   */

  /**
   * @description Number of nodes in the graph
   * @description.zh-CN 节点的数量
   * @default 0
   */

  /**
   * @description Number of edges in the graph
   * @description.zh-CN 节点的数量
   * @default 0
   */

  /**
   * @description return node label with its id
   * @description.zh-CN 返回节点的默认的标签
   */

  /**
   * @description return edge label with its id
   * @description.zh-CN 返回边的默认的标签
   */
  function Graph() {
    var _this = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Graph);

    this.directed = true;
    this.multigraph = false;
    this.compound = false;
    this.GRAPH_NODE = GraphEnum.GRAPH_NODE;
    this.label = void 0;
    this.nodeCountNum = 0;
    this.edgeCountNum = 0;

    this.defaultNodeLabelFn = function () {
      return undefined;
    };

    this.defaultEdgeLabelFn = function () {
      return undefined;
    };

    this.parentMap = void 0;
    this.childrenMap = void 0;
    this.nodesLabelMap = new Map();
    this.inEdgesMap = new Map();
    this.outEdgesMap = new Map();
    this.predecessorsMap = new Map();
    this.successorsMap = new Map();
    this.edgesMap = new Map();
    this.edgesLabelsMap = new Map();

    this.isDirected = function () {
      return _this.directed;
    };

    this.isMultigraph = function () {
      return _this.multigraph;
    };

    this.isCompound = function () {
      return _this.compound;
    };

    this.setGraph = function (label) {
      _this.label = label;
      return _this;
    };

    this.graph = function () {
      return _this.label;
    };

    this.setDefaultNodeLabel = function (newDefault) {
      if (isFunction(newDefault)) {
        _this.defaultNodeLabelFn = newDefault;
      } else {
        _this.defaultNodeLabelFn = function () {
          return newDefault;
        };
      }

      return _this;
    };

    this.nodeCount = function () {
      return _this.nodeCountNum;
    };

    this.node = function (n) {
      return _this.nodesLabelMap.get(n);
    };

    this.nodes = function () {
      return Array.from(_this.nodesLabelMap.keys());
    };

    this.sources = function () {
      return _this.nodes().filter(function (n) {
        var _this$inEdgesMap$get;

        return !((_this$inEdgesMap$get = _this.inEdgesMap.get(n)) === null || _this$inEdgesMap$get === void 0 ? void 0 : _this$inEdgesMap$get.size);
      });
    };

    this.sinks = function () {
      return _this.nodes().filter(function (n) {
        var _this$outEdgesMap$get;

        return !((_this$outEdgesMap$get = _this.outEdgesMap.get(n)) === null || _this$outEdgesMap$get === void 0 ? void 0 : _this$outEdgesMap$get.size);
      });
    };

    this.setNodes = function (nodes, value) {
      nodes.map(function (node) {
        return _this.setNode(node, value);
      });
      return _this;
    };

    this.hasNode = function (node) {
      return _this.nodesLabelMap.has(node);
    };

    this.checkCompound = function () {
      if (!_this.isCompound()) {
        throw new Error('Cannot construct parent-children relations in a non-compound graph');
      }
    };

    this.parent = function (node) {
      if (_this.isCompound()) {
        var _this$parentMap;

        var parent = (_this$parentMap = _this.parentMap) === null || _this$parentMap === void 0 ? void 0 : _this$parentMap.get(node);

        if (parent !== _this.GRAPH_NODE) {
          return parent;
        }
      }
    };

    this.removeFromParentsChildList = function (node) {
      var targetParent = _this.parentMap.get(node);

      _this.childrenMap.get(targetParent).delete(node);
    };

    this.setParent = function (node, parent) {
      var _this$parentMap2, _this$childrenMap;

      _this.checkCompound();

      var realParent = parent === undefined ? _this.GRAPH_NODE : parent;

      var checkNode = _this.parent(realParent);

      while (checkNode) {
        if (node === checkNode) {
          throw new Error('Setting ' + parent + ' as parent of ' + node + ' would create a cycle');
        }

        checkNode = _this.parent(checkNode);
      }

      if (parent) {
        _this.setNode(parent);
      }

      _this.setNode(node);

      _this.removeFromParentsChildList(node);

      (_this$parentMap2 = _this.parentMap) === null || _this$parentMap2 === void 0 ? void 0 : _this$parentMap2.set(node, realParent);

      var realParentChilren = _this.childrenMap.get(realParent);

      realParentChilren.set(node, true);
      (_this$childrenMap = _this.childrenMap) === null || _this$childrenMap === void 0 ? void 0 : _this$childrenMap.set(realParent, realParentChilren);
      return _this;
    };

    this.children = function (node) {
      var targetNode = node === undefined ? _this.GRAPH_NODE : node;

      if (_this.isCompound()) {
        var _this$childrenMap2;

        var target = (_this$childrenMap2 = _this.childrenMap) === null || _this$childrenMap2 === void 0 ? void 0 : _this$childrenMap2.get(targetNode);

        if (target) {
          return Array.from(target.keys());
        }

        return undefined;
      }

      if (targetNode === _this.GRAPH_NODE) {
        return _this.nodes();
      }

      if (node && _this.hasNode(node)) {
        return [];
      }
    };

    this.predecessors = function (node) {
      var preds = _this.predecessorsMap.get(node);

      return preds ? Array.from(preds.keys()) : undefined;
    };

    this.successors = function (node) {
      var succs = _this.successorsMap.get(node);

      return succs ? Array.from(succs.keys()) : undefined;
    };

    this.neighbors = function (node) {
      var _this$predecessors;

      if (!_this.hasNode(node)) {
        return undefined;
      }

      return Array.from(new Set((_this$predecessors = _this.predecessors(node)) === null || _this$predecessors === void 0 ? void 0 : _this$predecessors.concat(_this.successors(node))));
    };

    this.isLeaf = function (node) {
      var _this$neighbors;

      if (_this.isDirected()) {
        var _this$successors;

        return !((_this$successors = _this.successors(node)) === null || _this$successors === void 0 ? void 0 : _this$successors.length);
      }

      return !((_this$neighbors = _this.neighbors(node)) === null || _this$neighbors === void 0 ? void 0 : _this$neighbors.length);
    };

    this.filterNodes = function (filter) {
      var directed = _this.directed,
          multigraph = _this.multigraph,
          compound = _this.compound;
      var copyGraph = new Graph({
        directed: directed,
        multigraph: multigraph,
        compound: compound
      });
      copyGraph.setGraph(_this.graph());

      _this.nodes().forEach(function (n) {
        if (filter(n)) {
          copyGraph.setNode(n, _this.node(n));
        }
      });

      _this.edges().forEach(function (edgeObj) {
        if (copyGraph.hasNode(edgeObj.v) && copyGraph.hasNode(edgeObj.w)) {
          copyGraph.setEdgeObj(edgeObj, _this.edge(edgeObj));
        }
      });

      if (compound) {
        var findParent = function findParent(node) {
          var parent = _this.parent(node);

          while (parent !== undefined && !copyGraph.hasNode(parent)) {
            parent = _this.parent(parent);
          }

          return parent;
        };

        copyGraph.nodes().forEach(function (node) {
          copyGraph.setParent(node, findParent(node));
        });
      }

      return copyGraph;
    };

    this.setDefaultEdgeLabel = function (newDefault) {
      if (isFunction(newDefault)) {
        _this.defaultEdgeLabelFn = newDefault;
      } else {
        _this.defaultEdgeLabelFn = function () {
          return newDefault;
        };
      }

      return _this;
    };

    this.edgeCount = function () {
      return _this.edgeCountNum;
    };

    this.setEdgeObj = function (edgeObj, value) {
      return _this.setEdge(edgeObj.v, edgeObj.w, value, edgeObj.name);
    };

    this.setPath = function (edges, value) {
      edges.reduce(function (v, w) {
        _this.setEdge(v, w, value);

        return w;
      });
      return _this;
    };

    this.edgeFromArgs = function (v, w, name) {
      return _this.edge({
        v: v,
        w: w,
        name: name
      });
    };

    this.edge = function (edgeObj) {
      return _this.edgesLabelsMap.get(edgeObjToId(_this.isDirected(), edgeObj));
    };

    this.hasEdge = function (v, w, name) {
      return _this.edgesLabelsMap.has(edgeObjToId(_this.isDirected(), {
        v: v,
        w: w,
        name: name
      }));
    };

    this.removeEdgeObj = function (_ref) {
      var v = _ref.v,
          w = _ref.w,
          name = _ref.name;
      return _this.removeEdge(v, w, name);
    };

    this.edges = function () {
      return Array.from(_this.edgesMap.values());
    };

    this.inEdges = function (v, u) {
      var inV = _this.inEdgesMap.get(v);

      if (inV) {
        return Array.from(inV.values()).filter(function (e) {
          return !u || e.v === u;
        });
      }

      return undefined;
    };

    this.outEdges = function (w, u) {
      var outW = _this.outEdgesMap.get(w);

      if (outW) {
        return Array.from(outW.values()).filter(function (e) {
          return !u || e.w === u;
        });
      }

      return undefined;
    };

    this.nodeEdges = function (v, w) {
      var _this$inEdges;

      if (!_this.hasNode(v)) {
        return undefined;
      }

      return (_this$inEdges = _this.inEdges(v, w)) === null || _this$inEdges === void 0 ? void 0 : _this$inEdges.concat(_this.outEdges(v, w));
    };

    this.toJSON = function () {
      return write(_this);
    };

    this.nodeInDegree = function (node) {
      var inEdges = _this.inEdgesMap.get(node);

      if (inEdges) {
        return inEdges.size;
      }

      return 0;
    };

    this.nodeOutDegree = function (node) {
      var outEdges = _this.outEdgesMap.get(node);

      if (outEdges) {
        return outEdges.size;
      }

      return 0;
    };

    this.nodeDegree = function (node) {
      return _this.nodeInDegree(node) + _this.nodeOutDegree(node);
    };

    this.source = function (edge) {
      return edge.v;
    };

    this.target = function (edge) {
      return edge.w;
    };

    var resultOptions = _objectSpread(_objectSpread({}, defaultOption), options);

    this.compound = resultOptions.compound;
    this.directed = resultOptions.directed;
    this.multigraph = resultOptions.multigraph;

    if (this.compound) {
      this.parentMap = new Map();
      this.childrenMap = new Map();
    }
  } // Map for graph

  /**
   * @description Map for parent relationship
   * @description.zh-CN 父子关系的映射
   */


  _createClass(Graph, [{
    key: "setNode",
    value:
    /**
     * @description Set Node label in graph if node not in graph then create it
     * @description.zh-CN 设置节点的label，如果这个节点不在图中，则在图中创建这个节点
     * @param node
     * @param value
     * @returns
     */
    function setNode(node, value) {
      var nodesLabelMap = this.nodesLabelMap,
          defaultNodeLabelFn = this.defaultNodeLabelFn,
          isCompound = this.isCompound,
          parentMap = this.parentMap,
          childrenMap = this.childrenMap,
          inEdgesMap = this.inEdgesMap,
          outEdgesMap = this.outEdgesMap,
          predecessorsMap = this.predecessorsMap,
          successorsMap = this.successorsMap; // 如果节点不在图中，则创建节点

      if (nodesLabelMap.has(node)) {
        if (value !== undefined) {
          nodesLabelMap.set(node, value);
        }

        return this;
      }

      nodesLabelMap.set(node, value || defaultNodeLabelFn(node)); // 如果是复合图，则创建节点的子节点

      if (isCompound()) {
        var _childrenMap$get;

        parentMap === null || parentMap === void 0 ? void 0 : parentMap.set(node, this.GRAPH_NODE);
        childrenMap === null || childrenMap === void 0 ? void 0 : childrenMap.set(node, new Map());

        if (!(childrenMap === null || childrenMap === void 0 ? void 0 : childrenMap.has(this.GRAPH_NODE))) {
          childrenMap === null || childrenMap === void 0 ? void 0 : childrenMap.set(this.GRAPH_NODE, new Map());
        }

        childrenMap === null || childrenMap === void 0 ? void 0 : (_childrenMap$get = childrenMap.get(this.GRAPH_NODE)) === null || _childrenMap$get === void 0 ? void 0 : _childrenMap$get.set(node, true);
      }

      [inEdgesMap, outEdgesMap, predecessorsMap, successorsMap].forEach(function (map) {
        return map.set(node, new Map());
      });
      this.nodeCountNum += 1;
      return this;
    }
    /**
     * @description Set nodes or add nodes in batch
     * @description.zh-CN 批量设置或者创建节点
     * @param nodes
     * @param value
     * @returns
     */

  }, {
    key: "removeNode",
    value:
    /**
     * @description Remove node from graph
     * @description.zh-CN 将节点从图中移除
     * @param node
     * @returns
     */
    function removeNode(node) {
      var _this2 = this;

      if (this.hasNode(node)) {
        var cleanEdge = function cleanEdge(edgeObj) {
          _this2.removeEdge(edgeObj.v, edgeObj.w, edgeObj.name);
        };

        var inEdgesMap = this.inEdgesMap,
            outEdgesMap = this.outEdgesMap,
            predecessorsMap = this.predecessorsMap,
            successorsMap = this.successorsMap,
            nodesLabelMap = this.nodesLabelMap;

        if (this.isCompound()) {
          var _this$parentMap3, _this$children, _this$childrenMap3;

          this.removeFromParentsChildList(node);
          (_this$parentMap3 = this.parentMap) === null || _this$parentMap3 === void 0 ? void 0 : _this$parentMap3.delete(node);
          (_this$children = this.children(node)) === null || _this$children === void 0 ? void 0 : _this$children.forEach(function (n) {
            return _this2.setParent(n);
          });
          (_this$childrenMap3 = this.childrenMap) === null || _this$childrenMap3 === void 0 ? void 0 : _this$childrenMap3.delete(node);
        }

        var inE = inEdgesMap.get(node);
        var outE = outEdgesMap.get(node);
        Array.from(inE.values()).forEach(function (edge) {
          return cleanEdge(edge);
        });
        Array.from(outE.values()).forEach(function (edge) {
          return cleanEdge(edge);
        });
        nodesLabelMap.delete(node);
        inEdgesMap.delete(node);
        outEdgesMap.delete(node);
        predecessorsMap.delete(node);
        successorsMap.delete(node);
        this.nodeCountNum -= 1;
      }

      return this;
    }
    /**
     * @description Set function that generate default label for edge, if param is non-function value then default label will always be this value;
     * @description.zh-CN 设置默认获取边Label的方法，如果传入不是函数的，那么默认label 的值只会是传入值
     * @param newDefault
     * @returns
     */

  }, {
    key: "setEdge",
    value:
    /**
     * @description set edge value, if nodes or edges not exsit then add to graph
     * @description.zh-CN 设置边的属性，如果边或节点不存在，那么将他们加入这个图
     * @param v
     * @param w
     * @param value
     * @param name
     * @returns
     */
    function setEdge(v_, w_, value, name) {
      var _this$inEdgesMap$get2, _this$outEdgesMap$get2;

      var edgeObj = edgeArgsToObj(this.isDirected(), v_, w_, name);
      var edgeId = edgeObjToId(this.isDirected(), edgeObj);
      var v = edgeObj.v,
          w = edgeObj.w;

      if (this.edgesLabelsMap.has(edgeId)) {
        this.edgesLabelsMap.set(edgeId, value);
        return this;
      }

      if (name !== undefined && !this.isMultigraph()) {
        throw new Error('Cannot set a named edge when isMultigraph = false');
      }

      this.setNode(v);
      this.setNode(w);
      this.edgesLabelsMap.set(edgeId, value || this.defaultEdgeLabelFn(v, w, name));
      Object.freeze(edgeObj);
      this.edgesMap.set(edgeId, edgeObj);
      var preds = this.predecessorsMap.get(w);
      var succs = this.successorsMap.get(v);
      incrementOrInitEntry(preds, v);
      incrementOrInitEntry(succs, w);
      (_this$inEdgesMap$get2 = this.inEdgesMap.get(w)) === null || _this$inEdgesMap$get2 === void 0 ? void 0 : _this$inEdgesMap$get2.set(edgeId, edgeObj);
      (_this$outEdgesMap$get2 = this.outEdgesMap.get(v)) === null || _this$outEdgesMap$get2 === void 0 ? void 0 : _this$outEdgesMap$get2.set(edgeId, edgeObj);
      this.edgeCountNum += 1;
      return this;
    }
  }, {
    key: "removeEdge",
    value:
    /**
     * @description remove a specific edge
     * @description.zh-CN 删除一条边
     * @param v
     * @param w
     * @param name
     * @returns
     */
    function removeEdge(v_, w_, name) {
      var edgeId = edgeArgsToId(this.isDirected(), v_, w_, name);
      var edgeObj = this.edgesMap.get(edgeId);

      if (edgeObj) {
        var _edgeArgsToObj = edgeArgsToObj(this.isDirected(), v_, w_, name),
            v = _edgeArgsToObj.v,
            w = _edgeArgsToObj.w;

        this.edgesLabelsMap.delete(edgeId);
        this.edgesMap.delete(edgeId);
        var preds = this.predecessorsMap.get(w);
        var succs = this.successorsMap.get(v);
        decrementOrRemoveEntry(preds, v);
        decrementOrRemoveEntry(succs, w);
        this.inEdgesMap.get(w).delete(edgeId);
        this.outEdgesMap.get(v).delete(edgeId);
        this.edgeCountNum -= 1;
      }

      return this;
    }
    /**
     * @description remove a specific edge by edge object
     * @description.zh-CN 删除一条边
     */

  }]);

  return Graph;
}();

Graph.fromJSON = read;
export { Graph as default };