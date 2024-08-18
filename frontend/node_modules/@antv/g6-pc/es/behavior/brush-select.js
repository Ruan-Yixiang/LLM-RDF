var min = Math.min,
  max = Math.max,
  abs = Math.abs;
var DEFAULT_TRIGGER = 'shift';
var ALLOW_EVENTS = ['drag', 'shift', 'ctrl', 'alt', 'control'];
export default {
  getDefaultCfg: function getDefaultCfg() {
    return {
      brushStyle: {
        fill: '#EEF6FF',
        fillOpacity: 0.4,
        stroke: '#DDEEFE',
        lineWidth: 1
      },
      onSelect: function onSelect() {},
      onDeselect: function onDeselect() {},
      selectedState: 'selected',
      trigger: DEFAULT_TRIGGER,
      includeEdges: true,
      includeCombos: false,
      selectedEdges: [],
      selectedNodes: [],
      selectedCombos: []
    };
  },
  getEvents: function getEvents() {
    // 检测输入是否合法
    if (!(ALLOW_EVENTS.indexOf(this.trigger.toLowerCase()) > -1)) {
      this.trigger = DEFAULT_TRIGGER;
      console.warn("Behavior brush-select 的 trigger 参数不合法，请输入 'drag'、'shift'、'ctrl' 或 'alt'");
    }
    if (this.trigger === 'drag') {
      return {
        'dragstart': 'onMouseDown',
        'drag': 'onMouseMove',
        'dragend': 'onMouseUp',
        'canvas:click': 'clearStates'
      };
    }
    return {
      'dragstart': 'onMouseDown',
      'drag': 'onMouseMove',
      'dragend': 'onMouseUp',
      'canvas:click': 'clearStates',
      'keyup': 'onKeyUp',
      'keydown': 'onKeyDown'
    };
  },
  onMouseDown: function onMouseDown(e) {
    // 按在node上面拖动时候不应该是框选
    var item = e.item;
    var brush = this.brush;
    if (item) {
      return;
    }
    if (this.trigger !== 'drag' && !this.keydown) {
      return;
    }
    if (this.selectedNodes && this.selectedNodes.length !== 0) {
      this.clearStates();
    }
    if (!brush) {
      brush = this.createBrush();
    }
    this.originPoint = {
      x: e.canvasX,
      y: e.canvasY
    };
    brush.attr({
      width: 0,
      height: 0
    });
    brush.show();
    this.dragging = true;
  },
  onMouseMove: function onMouseMove(e) {
    if (!this.dragging) {
      return;
    }
    if (this.trigger !== 'drag' && !this.keydown) {
      return;
    }
    this.updateBrush(e);
  },
  onMouseUp: function onMouseUp(e) {
    var graph = this.graph;
    // TODO: 触发了 canvas:click 导致 clearStates
    if (!this.brush && !this.dragging) {
      return;
    }
    if (this.trigger !== 'drag' && !this.keydown) {
      return;
    }
    this.brush.remove(true); // remove and destroy
    this.brush = null;
    this.getSelectedNodes(e);
    this.dragging = false;
  },
  clearStates: function clearStates() {
    var _a = this,
      graph = _a.graph,
      selectedState = _a.selectedState;
    var nodes = graph.findAllByState('node', selectedState);
    var edges = graph.findAllByState('edge', selectedState);
    var combos = graph.findAllByState('combo', selectedState);
    nodes.forEach(function (node) {
      return graph.setItemState(node, selectedState, false);
    });
    edges.forEach(function (edge) {
      return graph.setItemState(edge, selectedState, false);
    });
    combos.forEach(function (combo) {
      return graph.setItemState(combo, selectedState, false);
    });
    this.selectedNodes = [];
    this.selectedEdges = [];
    this.selectedCombos = [];
    if (this.onDeselect) {
      this.onDeselect(this.selectedNodes, this.selectedEdges, this.selectedCombos);
    }
    graph.emit('nodeselectchange', {
      selectedItems: {
        nodes: [],
        edges: [],
        combos: []
      },
      select: false
    });
  },
  isBBoxCenterInRect: function isBBoxCenterInRect(item, left, right, top, bottom) {
    var bbox = item.getBBox();
    return bbox.centerX >= left && bbox.centerX <= right && bbox.centerY >= top && bbox.centerY <= bottom;
  },
  getSelectedNodes: function getSelectedNodes(e) {
    var _this = this;
    var _a = this,
      graph = _a.graph,
      originPoint = _a.originPoint,
      shouldUpdate = _a.shouldUpdate,
      isBBoxCenterInRect = _a.isBBoxCenterInRect;
    var state = this.selectedState;
    var p1 = {
      x: e.x,
      y: e.y
    };
    var p2 = graph.getPointByCanvas(originPoint.x, originPoint.y);
    var left = min(p1.x, p2.x);
    var right = max(p1.x, p2.x);
    var top = min(p1.y, p2.y);
    var bottom = max(p1.y, p2.y);
    var selectedNodes = [];
    var selectedIds = [];
    graph.getNodes().forEach(function (node) {
      if (node.isVisible() &&
      // 隐藏节点不能被选中
      isBBoxCenterInRect(node, left, right, top, bottom) && shouldUpdate(node, 'select', _this)) {
        selectedNodes.push(node);
        var model = node.getModel();
        selectedIds.push(model.id);
        graph.setItemState(node, state, true);
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
    var selectedCombos = [];
    if (this.includeCombos) {
      graph.getCombos().forEach(function (combo) {
        if (combo.isVisible() &&
        // 隐藏节点不能被选中
        isBBoxCenterInRect(combo, left, right, top, bottom) && shouldUpdate(combo, 'select', _this)) {
          selectedCombos.push(combo);
          var model = combo.getModel();
          selectedIds.push(model.id);
          graph.setItemState(combo, state, true);
        }
      });
    }
    this.selectedEdges = selectedEdges;
    this.selectedNodes = selectedNodes;
    this.selectedCombos = selectedCombos;
    if (this.onSelect) {
      this.onSelect(selectedNodes, selectedEdges, selectedCombos);
    }
    graph.emit('nodeselectchange', {
      selectedItems: {
        nodes: selectedNodes,
        edges: selectedEdges,
        combos: selectedCombos
      },
      select: true
    });
  },
  createBrush: function createBrush() {
    var self = this;
    var brush = self.graph.get('canvas').addShape('rect', {
      attrs: self.brushStyle,
      capture: false,
      name: 'brush-shape'
    });
    this.brush = brush;
    this.delegate = brush;
    return brush;
  },
  updateBrush: function updateBrush(e) {
    var originPoint = this.originPoint;
    this.brush.attr({
      width: abs(e.canvasX - originPoint.x),
      height: abs(e.canvasY - originPoint.y),
      x: min(e.canvasX, originPoint.x),
      y: min(e.canvasY, originPoint.y)
    });
  },
  onKeyDown: function onKeyDown(e) {
    var code = e.key;
    if (!code) {
      return;
    }
    var triggerLowerCase = this.trigger.toLowerCase();
    var codeLowerCase = code.toLowerCase();
    // 按住 control 键时，允许用户设置 trigger 为 ctrl
    if (codeLowerCase === triggerLowerCase || codeLowerCase === 'control' && triggerLowerCase === 'ctrl' || codeLowerCase === 'ctrl' && triggerLowerCase === 'control') {
      this.keydown = true;
    } else {
      this.keydown = false;
    }
  },
  onKeyUp: function onKeyUp() {
    if (this.brush) {
      // 清除所有选中状态后，设置拖得动状态为false，并清除框选的brush
      this.brush.remove(true);
      this.brush = null;
      this.dragging = false;
    }
    this.keydown = false;
  }
};