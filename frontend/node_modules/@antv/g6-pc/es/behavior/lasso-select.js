import { __assign } from "tslib";
import Util from '../util';
var isPolygonsIntersect = Util.isPolygonsIntersect,
  pathToPoints = Util.pathToPoints;
var DEFAULT_TRIGGER = 'shift';
var ALLOW_EVENTS = ['drag', 'shift', 'ctrl', 'alt', 'control'];
var isItemIntersecPolygon = function isItemIntersecPolygon(item, polyPoints) {
  var shapePoints;
  var shape = item.getKeyShape();
  if (item.get('type') === 'path') {
    shapePoints = pathToPoints(shape.attr('path'));
  } else {
    var shapeBBox = shape.getCanvasBBox();
    shapePoints = [[shapeBBox.minX, shapeBBox.minY], [shapeBBox.maxX, shapeBBox.minY], [shapeBBox.maxX, shapeBBox.maxY], [shapeBBox.minX, shapeBBox.maxY]];
  }
  return isPolygonsIntersect(polyPoints, shapePoints);
};
export default {
  getDefaultCfg: function getDefaultCfg() {
    return {
      delegateStyle: {
        fill: '#EEF6FF',
        fillOpacity: 0.4,
        stroke: '#DDEEFE',
        lineWidth: 1
      },
      onSelect: function onSelect() {},
      onDeselect: function onDeselect() {},
      shouldDeselect: undefined,
      selectedState: 'selected',
      trigger: DEFAULT_TRIGGER,
      includeEdges: true,
      selectedEdges: [],
      selectedNodes: []
      // multiple: false,
    };
  },

  getEvents: function getEvents() {
    // 检测输入是否合法
    if (!(ALLOW_EVENTS.indexOf(this.trigger.toLowerCase()) > -1)) {
      this.trigger = DEFAULT_TRIGGER;
      console.warn("Behavior lasso-select 的 trigger 参数不合法，请输入 'drag'、'shift'、'ctrl' 或 'alt'");
    }
    if (this.trigger === 'drag') {
      return {
        dragstart: 'onDragStart',
        drag: 'onDragMove',
        dragend: 'onDragEnd',
        'canvas:click': 'clearStates'
      };
    }
    return {
      dragstart: 'onDragStart',
      drag: 'onDragMove',
      dragend: 'onDragEnd',
      keyup: 'onKeyUp',
      keydown: 'onKeyDown',
      'canvas:click': 'clearStates'
    };
  },
  onDragStart: function onDragStart(e) {
    var lasso = this.lasso;
    var item = e.item;
    // 排除在节点上拖动
    if (item) {
      return;
    }
    if (this.trigger !== 'drag' && !this.keydown) {
      return;
    }
    if (this.selectedNodes && this.selectedNodes.length !== 0) {
      this.clearStates('dragstart');
    }
    if (!lasso) {
      lasso = this.createLasso();
    }
    this.dragging = true;
    this.originPoint = {
      x: e.x,
      y: e.y
    };
    this.points.push(this.originPoint);
    lasso.show();
  },
  onDragMove: function onDragMove(e) {
    if (!this.dragging) {
      return;
    }
    if (this.trigger !== 'drag' && !this.keydown) {
      return;
    }
    this.points.push({
      x: e.x,
      y: e.y
    });
    this.updateLasso(e);
  },
  onDragEnd: function onDragEnd(e) {
    if (!this.lasso && !this.dragging) {
      return;
    }
    if (this.trigger !== 'drag' && !this.keydown) {
      return;
    }
    this.points.push(this.originPoint);
    this.getSelectedItems();
    this.lasso.remove(true);
    this.lasso = null;
    this.points = [];
    this.dragging = false;
  },
  getLassoPath: function getLassoPath() {
    var points = this.points;
    var path = [];
    if (points.length) {
      points.forEach(function (point, index) {
        if (index === 0) {
          path.push(['M', point.x, point.y]);
        } else {
          path.push(['L', point.x, point.y]);
        }
      });
      path.push(['L', points[0].x, points[0].y]);
    }
    return path;
  },
  clearStates: function clearStates(action) {
    if (action === void 0) {
      action = 'canvas:click';
    }
    var _a = this,
      graph = _a.graph,
      selectedState = _a.selectedState,
      shouldDeselect = _a.shouldDeselect;
    var nodes = graph.findAllByState('node', selectedState);
    var edges = graph.findAllByState('edge', selectedState);
    if (!shouldDeselect || shouldDeselect({
      action: action,
      nodes: nodes,
      edges: edges
    })) {
      nodes.forEach(function (node) {
        return graph.setItemState(node, selectedState, false);
      });
      edges.forEach(function (edge) {
        return graph.setItemState(edge, selectedState, false);
      });
    }
    if (this.onDeselect) {
      this.onDeselect(this.selectedNodes, this.selectedEdges);
    }
    this.selectedNodes = [];
    this.selectedEdges = [];
    graph.emit('nodeselectchange', {
      selectedItems: {
        nodes: [],
        edges: []
      },
      select: false
    });
  },
  getSelectedItems: function getSelectedItems() {
    var _this = this;
    var _a = this,
      graph = _a.graph,
      shouldUpdate = _a.shouldUpdate;
    var lassoContour = this.points.map(function (point) {
      return [graph.getCanvasByPoint(point.x, point.y).x, graph.getCanvasByPoint(point.x, point.y).y];
    });
    var state = this.selectedState;
    var selectedNodes = [];
    var selectedIds = [];
    graph.getNodes().forEach(function (node) {
      if (!node.isVisible()) return; // 隐藏节点不能被选中
      if (isItemIntersecPolygon(node, lassoContour)) {
        if (shouldUpdate(node, 'select', _this)) {
          selectedNodes.push(node);
          var model = node.getModel();
          selectedIds.push(model.id);
          graph.setItemState(node, state, true);
        }
      }
    });
    var selectedEdges = [];
    if (this.includeEdges) {
      // 选中边，边的source和target都在选中的节点中时才选中
      selectedNodes.forEach(function (node) {
        var edges = node.getOutEdges();
        edges.forEach(function (edge) {
          if (!edge.isVisible()) return; // 隐藏边不能够被选中
          var model = edge.getModel();
          var source = model.source,
            target = model.target;
          if (selectedIds.includes(source) && selectedIds.includes(target) && shouldUpdate(edge, 'select', _this)) {
            selectedEdges.push(edge);
            graph.setItemState(edge, _this.selectedState, true);
          }
        });
      });
    }
    this.selectedEdges = selectedEdges;
    this.selectedNodes = selectedNodes;
    if (this.onSelect) {
      this.onSelect(selectedNodes, selectedEdges);
    }
    graph.emit('nodeselectchange', {
      selectedItems: {
        nodes: selectedNodes,
        edges: selectedEdges
      },
      select: true
    });
  },
  createLasso: function createLasso() {
    var self = this;
    var lasso = self.graph.get('delegateGroup').addShape('path', {
      attrs: __assign({
        path: []
      }, self.delegateStyle),
      capture: false,
      name: 'lasso-shape'
    });
    this.lasso = lasso;
    this.delegate = lasso;
    this.points = [];
    return lasso;
  },
  updateLasso: function updateLasso(e) {
    var self = this;
    this.lasso.attr({
      path: self.getLassoPath()
    });
  },
  onKeyDown: function onKeyDown(e) {
    var code = e.key;
    if (!code) {
      return;
    }
    // if (this.selectedNodes && this.selectedNodes.length !== 0) {
    //   this.clearStates();
    // }
    if (code.toLowerCase() === this.trigger.toLowerCase()) {
      this.keydown = true;
    } else {
      this.keydown = false;
    }
  },
  onKeyUp: function onKeyUp() {
    if (this.lasso) {
      // 清除所有选中状态后，设置拖得动状态为false，并清除框选的lasso
      this.lasso.remove(true);
      this.lasso = null;
      this.points = [];
      this.dragging = false;
    }
    this.keydown = false;
  }
};