import { isBoolean, isObject } from '@antv/util';
import Util from '../util';
var cloneEvent = Util.cloneEvent,
  isNaN = Util.isNaN;
var abs = Math.abs;
var DRAG_OFFSET = 10;
var ALLOW_EVENTS = ['shift', 'ctrl', 'alt', 'control'];
export default {
  getDefaultCfg: function getDefaultCfg() {
    return {
      direction: 'both',
      enableOptimize: false,
      // drag-canvas 可拖动的扩展范围，默认为 0，即最多可以拖动一屏的位置
      // 当设置的值大于 0 时，即拖动可以超过一屏
      // 当设置的值小于 0 时，相当于缩小了可拖动范围
      // 具体实例可参考：https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IFfoS67_HssAAAAAAAAAAAAAARQnAQ
      scalableRange: 0,
      allowDragOnItem: false
    };
  },
  getEvents: function getEvents() {
    return {
      'mousedown': 'onMouseDown',
      'drag': 'onDragMove',
      'dragend': 'onMouseUp',
      'canvas:click': 'onMouseUp',
      'keyup': 'onKeyUp',
      'focus': 'onKeyUp',
      'keydown': 'onKeyDown',
      'touchstart': 'onTouchStart',
      'touchmove': 'onTouchMove',
      'touchend': 'onMouseUp'
    };
  },
  updateViewport: function updateViewport(e) {
    var origin = this.origin;
    var clientX = +e.clientX;
    var clientY = +e.clientY;
    if (isNaN(clientX) || isNaN(clientY)) {
      return;
    }
    var dx = clientX - origin.x;
    var dy = clientY - origin.y;
    if (this.get('direction') === 'x') {
      dy = 0;
    } else if (this.get('direction') === 'y') {
      dx = 0;
    }
    this.origin = {
      x: clientX,
      y: clientY
    };
    var width = this.graph.get('width');
    var height = this.graph.get('height');
    var graphCanvasBBox = this.graph.get('canvas').getCanvasBBox();
    var expandWidth = this.scalableRange;
    var expandHeight = this.scalableRange;
    // 若 scalableRange 是 0~1 的小数，则作为比例考虑
    if (expandWidth < 1 && expandWidth > -1) {
      expandWidth = width * expandWidth;
      expandHeight = height * expandHeight;
    }
    if (graphCanvasBBox.minX <= width + expandWidth && graphCanvasBBox.minX + dx > width + expandWidth || graphCanvasBBox.maxX + expandWidth >= 0 && graphCanvasBBox.maxX + expandWidth + dx < 0) {
      dx = 0;
    }
    if (graphCanvasBBox.minY <= height + expandHeight && graphCanvasBBox.minY + dy > height + expandHeight || graphCanvasBBox.maxY + expandHeight >= 0 && graphCanvasBBox.maxY + expandHeight + dy < 0) {
      dy = 0;
    }
    this.graph.translate(dx, dy);
  },
  onTouchStart: function onTouchStart(e) {
    var self = this;
    var touches = e.originalEvent.touches;
    var event1 = touches[0];
    var event2 = touches[1];
    // 如果是双指操作，不允许拖拽画布
    if (event1 && event2) {
      return;
    }
    e.preventDefault();
    this.mousedown = true;
    self.onDragStart(e);
  },
  onMouseDown: function onMouseDown(e) {
    this.mousedown = true;
  },
  onDragMove: function onDragMove(evt) {
    if (!this.mousedown) return;
    if (!this.dragstart) {
      // dragstart
      this.dragstart = true;
      this.onDragStart(evt);
    } else {
      // drag
      this.onDrag(evt);
    }
  },
  onDragStart: function onDragStart(e) {
    var self = this;
    var event = e.originalEvent;
    // TODO: 'name' doesn't exist on `IG6GraphEvent`, we should consider typing it so users get autocomplete and other benefits
    if (event && e.name !== 'touchstart' && event.button !== 0) {
      return;
    }
    if (e.name !== 'touchstart' && typeof window !== 'undefined' && window.event && !window.event.buttons && !window.event.button) {
      return;
    }
    if (!this.shouldBegin(e, this)) {
      return;
    }
    if (self.keydown) return;
    if (!this.allowDrag(e)) return;
    self.origin = {
      x: e.clientX,
      y: e.clientY
    };
    self.dragging = false;
    if (this.enableOptimize) {
      // 拖动 canvas 过程中隐藏所有的边及label
      var graph = this.graph;
      var edges = graph.getEdges();
      for (var i = 0, len = edges.length; i < len; i++) {
        var shapes = edges[i].get('group').get('children');
        if (!shapes) continue;
        shapes.forEach(function (shape) {
          shape.set('ori-visibility', shape.get('ori-visibility') || shape.get('visible'));
          shape.hide();
        });
      }
      var nodes = graph.getNodes();
      for (var j = 0, nodeLen = nodes.length; j < nodeLen; j++) {
        var container = nodes[j].getContainer();
        var children = container.get('children');
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
          var child = children_1[_i];
          var isKeyShape = child.get('isKeyShape');
          if (!isKeyShape) {
            child.set('ori-visibility', child.get('ori-visibility') || child.get('visible'));
            child.hide();
          }
        }
      }
    }
    // 绑定浏览器右键监听，触发拖拽结束，结束拖拽时移除
    if (typeof window !== 'undefined') {
      var self_1 = this;
      this.handleDOMContextMenu = function (e) {
        return self_1.onMouseUp(e);
      };
      document.body.addEventListener('contextmenu', this.handleDOMContextMenu);
    }
  },
  onTouchMove: function onTouchMove(e) {
    var self = this;
    var touches = e.originalEvent.touches;
    var event1 = touches[0];
    var event2 = touches[1];
    // 如果是双指操作，不允许拖拽画布，结束拖拽
    if (event1 && event2) {
      this.onMouseUp(e);
      return;
    }
    e.preventDefault();
    self.onDrag(e);
  },
  onDrag: function onDrag(e) {
    if (!this.mousedown) return;
    var graph = this.graph;
    if (this.keydown) return;
    if (!this.allowDrag(e)) return;
    e = cloneEvent(e);
    if (!this.origin) {
      return;
    }
    if (!this.dragging) {
      if (abs(this.origin.x - e.clientX) + abs(this.origin.y - e.clientY) < DRAG_OFFSET) {
        return;
      }
      if (this.shouldBegin(e, this)) {
        e.type = 'dragstart';
        graph.emit('canvas:dragstart', e);
        this.originPosition = {
          x: e.clientX,
          y: e.clientY
        };
        this.dragging = true;
      }
    } else {
      e.type = 'drag';
      graph.emit('canvas:drag', e);
    }
    if (this.shouldUpdate(e, this)) {
      this.updateViewport(e);
    }
  },
  onMouseUp: function onMouseUp(e) {
    var _a, _b;
    this.mousedown = false;
    this.dragstart = false;
    var graph = this.graph;
    if (this.keydown) return;
    var currentZoom = graph.getZoom();
    var modeController = graph.get('modeController');
    var zoomCanvas = (_b = (_a = modeController === null || modeController === void 0 ? void 0 : modeController.modes[modeController.mode]) === null || _a === void 0 ? void 0 : _a.filter(function (behavior) {
      return behavior.type === 'zoom-canvas';
    })) === null || _b === void 0 ? void 0 : _b[0];
    var optimizeZoom = zoomCanvas ? zoomCanvas.optimizeZoom || 0.1 : 0;
    if (this.enableOptimize) {
      // 拖动结束后显示所有的边
      var edges = graph.getEdges();
      for (var i = 0, len = edges.length; i < len; i++) {
        var shapes = edges[i].get('group').get('children');
        if (!shapes) continue;
        shapes.forEach(function (shape) {
          var oriVis = shape.get('ori-visibility');
          shape.set('ori-visibility', undefined);
          if (oriVis) shape.show();
        });
      }
      if (currentZoom > optimizeZoom) {
        var nodes = graph.getNodes();
        for (var j = 0, nodeLen = nodes.length; j < nodeLen; j++) {
          var container = nodes[j].getContainer();
          var children = container.get('children');
          for (var _i = 0, children_2 = children; _i < children_2.length; _i++) {
            var child = children_2[_i];
            var isKeyShape = child.get('isKeyShape');
            if (!isKeyShape) {
              var oriVis = child.get('ori-visibility');
              child.set('ori-visibility', undefined);
              if (oriVis) child.show();
            }
          }
        }
      }
    }
    if (!this.dragging) {
      this.origin = null;
      return;
    }
    e = cloneEvent(e);
    if (this.shouldEnd(e, this)) {
      this.updateViewport(e);
    }
    e.type = 'dragend';
    e.dx = e.clientX - this.originPosition.x;
    e.dy = e.clientY - this.originPosition.y;
    graph.emit('canvas:dragend', e);
    this.endDrag();
    // 结束拖拽时移除浏览器右键监听
    if (typeof window !== 'undefined') {
      document.body.removeEventListener('contextmenu', this.handleDOMContextMenu);
    }
  },
  endDrag: function endDrag() {
    this.origin = null;
    this.dragging = false;
    this.dragbegin = false;
    this.mousedown = false;
    this.dragstart = false;
  },
  onKeyDown: function onKeyDown(e) {
    var self = this;
    var code = e.key;
    if (!code) {
      return;
    }
    if (ALLOW_EVENTS.indexOf(code.toLowerCase()) > -1) {
      self.keydown = true;
    } else {
      self.keydown = false;
    }
  },
  onKeyUp: function onKeyUp() {
    this.keydown = false;
    this.origin = null;
    this.dragging = false;
    this.dragbegin = false;
  },
  allowDrag: function allowDrag(evt) {
    var _a, _b;
    var target = evt.target;
    var targetIsCanvas = target && target.isCanvas && target.isCanvas();
    if (isBoolean(this.allowDragOnItem) && !this.allowDragOnItem && !targetIsCanvas) return false;
    if (isObject(this.allowDragOnItem)) {
      var _c = this.allowDragOnItem,
        node = _c.node,
        edge = _c.edge,
        combo = _c.combo;
      var itemType = (_b = (_a = evt.item) === null || _a === void 0 ? void 0 : _a.getType) === null || _b === void 0 ? void 0 : _b.call(_a);
      if (!node && itemType === 'node') return false;
      if (!edge && itemType === 'edge') return false;
      if (!combo && itemType === 'combo') return false;
    }
    return true;
  }
};