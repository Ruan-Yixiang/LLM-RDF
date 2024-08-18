import { isBoolean, isObject } from '@antv/util';
var ALLOW_EVENTS = ['shift', 'ctrl', 'alt', 'control', 'meta'];
export default {
  getDefaultCfg: function getDefaultCfg() {
    return {
      direction: 'both',
      enableOptimize: false,
      zoomKey: 'ctrl',
      // scroll-canvas 可滚动的扩展范围，默认为 0，即最多可以滚动一屏的位置
      // 当设置的值大于 0 时，即滚动可以超过一屏
      // 当设置的值小于 0 时，相当于缩小了可滚动范围
      // 具体实例可参考：https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*IFfoS67_HssAAAAAAAAAAAAAARQnAQ
      scalableRange: 0,
      allowDragOnItem: true
    };
  },
  getEvents: function getEvents() {
    if (!this.zoomKey || ALLOW_EVENTS.indexOf(this.zoomKey) === -1) this.zoomKey = 'ctrl';
    return {
      wheel: 'onWheel'
    };
  },
  onWheel: function onWheel(ev) {
    var _this = this;
    if (!this.allowDrag(ev)) return;
    var graph = this.graph;
    var zoomKeys = Array.isArray(this.zoomKey) ? [].concat(this.zoomKey) : [this.zoomKey];
    if (zoomKeys.includes('control')) zoomKeys.push('ctrl');
    var keyDown = zoomKeys.some(function (ele) {
      return ev["".concat(ele, "Key")];
    });
    if (keyDown) {
      var canvas = graph.get('canvas');
      var point = canvas.getPointByClient(ev.clientX, ev.clientY);
      var ratio = graph.getZoom();
      if (ev.wheelDelta > 0) {
        ratio = ratio + ratio * 0.05;
      } else {
        ratio = ratio - ratio * 0.05;
      }
      graph.zoomTo(ratio, {
        x: point.x,
        y: point.y
      });
    } else {
      var dx = ev.deltaX || ev.movementX;
      var dy = ev.deltaY || ev.movementY;
      if (!dy && navigator.userAgent.indexOf('Firefox') > -1) dy = -ev.wheelDelta * 125 / 3;
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
      var minX = graphCanvasBBox.minX,
        maxX = graphCanvasBBox.maxX,
        minY = graphCanvasBBox.minY,
        maxY = graphCanvasBBox.maxY;
      if (dx > 0) {
        if (maxX < -expandWidth) {
          dx = 0;
        } else if (maxX - dx < -expandWidth) {
          dx = maxX + expandWidth;
        }
      } else if (dx < 0) {
        if (minX > width + expandWidth) {
          dx = 0;
        } else if (minX - dx > width + expandWidth) {
          dx = minX - (width + expandWidth);
        }
      }
      if (dy > 0) {
        if (maxY < -expandHeight) {
          dy = 0;
        } else if (maxY - dy < -expandHeight) {
          dy = maxY + expandHeight;
        }
      } else if (dy < 0) {
        if (minY > height + expandHeight) {
          dy = 0;
        } else if (minY - dy > height + expandHeight) {
          dy = minY - (height + expandHeight);
        }
      }
      if (this.get('direction') === 'x') {
        dy = 0;
      } else if (this.get('direction') === 'y') {
        dx = 0;
      }
      graph.translate(-dx, -dy);
    }
    ev.preventDefault();
    // hide the shapes when the zoom ratio is smaller than optimizeZoom
    // hide the shapes when zoomming
    var enableOptimize = this.get('enableOptimize');
    if (enableOptimize) {
      var optimizeZoom_1 = this.get('optimizeZoom');
      var optimized = this.get('optimized');
      var nodes_1 = graph.getNodes();
      var edges_1 = graph.getEdges();
      var nodesLength_1 = nodes_1.length;
      var edgesLength_1 = edges_1.length;
      // hiding
      if (!optimized) {
        for (var n = 0; n < nodesLength_1; n++) {
          var node = nodes_1[n];
          if (!node.destroyed) {
            var children = node.get('group').get('children');
            var childrenLength = children.length;
            for (var c = 0; c < childrenLength; c++) {
              var shape = children[c];
              if (!shape.destoryed && !shape.get('isKeyShape')) {
                shape.set('ori-visibility', shape.get('ori-visibility') || shape.get('visible'));
                shape.hide();
              }
            }
          }
        }
        for (var edgeIndex = 0; edgeIndex < edgesLength_1; edgeIndex++) {
          var edge = edges_1[edgeIndex];
          var children = edge.get('group').get('children');
          var childrenLength = children.length;
          for (var c = 0; c < childrenLength; c++) {
            var shape = children[c];
            shape.set('ori-visibility', shape.get('ori-visibility') || shape.get('visible'));
            shape.hide();
          }
        }
        this.set('optimized', true);
      }
      // showing after 100ms
      clearTimeout(this.get('timeout'));
      var timeout = setTimeout(function () {
        var currentZoom = graph.getZoom();
        var curOptimized = _this.get('optimized');
        if (curOptimized) {
          _this.set('optimized', false);
          for (var n = 0; n < nodesLength_1; n++) {
            var node = nodes_1[n];
            var children = node.get('group').get('children');
            var childrenLength = children.length;
            if (currentZoom < optimizeZoom_1) {
              var keyShape = node.getKeyShape();
              var oriVis = keyShape.get('ori-visibility');
              if (oriVis) keyShape.show();
            } else {
              for (var c = 0; c < childrenLength; c++) {
                var shape = children[c];
                var oriVis = shape.get('ori-visibility');
                if (!shape.get('visible') && oriVis) {
                  if (oriVis) shape.show();
                }
              }
            }
          }
          for (var edgeIndex = 0; edgeIndex < edgesLength_1; edgeIndex++) {
            var edge = edges_1[edgeIndex];
            var children = edge.get('group').get('children');
            var childrenLength = children.length;
            if (currentZoom < optimizeZoom_1) {
              var keyShape = edge.getKeyShape();
              var oriVis = keyShape.get('ori-visibility');
              if (oriVis) keyShape.show();
            } else {
              for (var c = 0; c < childrenLength; c++) {
                var shape = children[c];
                if (!shape.get('visible')) {
                  var oriVis = shape.get('ori-visibility');
                  if (oriVis) shape.show();
                }
              }
            }
          }
        }
      }, 100);
      this.set('timeout', timeout);
    }
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