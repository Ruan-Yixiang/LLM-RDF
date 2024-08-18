import { __extends } from "tslib";
import { addEventListener } from '@antv/dom-util';
import { each, isNil, wrapBehavior } from '@antv/util';
import { AbstractEvent, Util } from '@antv/g6-core';
var cloneEvent = Util.cloneEvent,
  isViewportChanged = Util.isViewportChanged;
var EventController = /** @class */function (_super) {
  __extends(EventController, _super);
  function EventController(graph) {
    var _this = _super.call(this, graph) || this;
    _this.extendEvents = [];
    _this.dragging = false;
    _this.mousedown = false;
    _this.preItem = null;
    _this.destroy();
    _this.graph = graph;
    _this.destroyed = false;
    _this.initEvents();
    return _this;
  }
  // 初始化 G6 中的事件
  EventController.prototype.initEvents = function () {
    var _a = this,
      graph = _a.graph,
      _b = _a.extendEvents,
      extendEvents = _b === void 0 ? [] : _b;
    var canvas = graph.get('canvas');
    // canvas.set('draggable', true);
    var el = canvas.get('el');
    var canvasHandler = wrapBehavior(this, 'onCanvasEvents');
    var originHandler = wrapBehavior(this, 'onExtendEvents');
    var wheelHandler = wrapBehavior(this, 'onWheelEvent');
    // each(EVENTS, event => {
    //   canvas.off(event).on(event, canvasHandler);
    // });
    canvas.off('*').on('*', canvasHandler);
    this.canvasHandler = canvasHandler;
    extendEvents.push(addEventListener(el, 'wheel', wheelHandler));
    if (typeof window !== 'undefined') {
      extendEvents.push(addEventListener(window, 'keydown', originHandler));
      extendEvents.push(addEventListener(window, 'keyup', originHandler));
      extendEvents.push(addEventListener(window, 'focus', originHandler));
    }
    // 数据变更，重置一些状态
    if (this.resetHandler) graph.off('afterchangedata', this.resetHandler);
    this.resetHandler = wrapBehavior(this, 'resetStatus');
    graph.on('afterchangedata', this.resetHandler);
  };
  // 获取 shape 的 item 对象
  EventController.getItemRoot = function (shape) {
    while (shape && !shape.get('item')) {
      shape = shape.get('parent');
    }
    return shape;
  };
  /**
   * 处理 canvas 事件
   * @param evt 事件句柄
   */
  EventController.prototype.onCanvasEvents = function (evt) {
    var _this = this;
    var graph = this.graph;
    var canvas = graph.get('canvas');
    var target = evt.target;
    var eventType = evt.type;
    switch (eventType) {
      // solve G's problem: mousemove and mosueup are not triggered with drag and dragend
      case 'drag':
        this.onCanvasEvents(Object.assign({}, evt, {
          type: 'mousemove'
        }));
        break;
      case 'dragend':
        this.onCanvasEvents(Object.assign({}, evt, {
          type: 'mouseup'
        }));
        break;
      // solve G's problem: mousedown on other DOMs, mouseup on canvas, click event is triggered unexpectly
      case 'mousedown':
        this.mousedown = true;
        break;
      case 'dragend':
      case 'mouseup':
        // mouseup happend before click, so setTimeout to reset the tag for reference in click event
        setTimeout(function () {
          return _this.mousedown = false;
        });
        break;
      case 'click':
        // the mousedown is not happend, the click is invalid
        if (!this.mousedown) return;
        break;
      default:
        break;
    }
    /**
     * (clientX, clientY): 相对于页面的坐标；
     * (canvasX, canvasY): 相对于 <canvas> 左上角的坐标；
     * (x, y): 相对于整个画布的坐标, 与 model 的 x, y 是同一维度的。
     */
    evt.canvasX = evt.x;
    evt.canvasY = evt.y;
    var point = {
      x: evt.canvasX,
      y: evt.canvasY
    };
    var group = graph.get('group');
    var matrix = group.getMatrix();
    if (!matrix) {
      matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    }
    if (isViewportChanged(matrix)) {
      point = graph.getPointByClient(evt.clientX, evt.clientY);
    }
    evt.x = point.x;
    evt.y = point.y;
    evt.currentTarget = graph;
    if (target === canvas) {
      if (eventType === 'mousemove' || eventType === 'mouseleave') {
        this.handleMouseMove(evt, 'canvas');
      }
      evt.target = canvas;
      evt.item = null;
      graph.emit(eventType, evt);
      graph.emit("canvas:".concat(eventType), evt);
      return;
    }
    var itemShape = EventController.getItemRoot(target);
    if (!itemShape) {
      graph.emit(eventType, evt);
      return;
    }
    var item = itemShape.get('item');
    if (item.destroyed) {
      return;
    }
    var type = item.getType();
    // 事件target是触发事件的Shape实例，item是触发事件的item实例
    evt.target = target;
    evt.item = item;
    if (evt.canvasX === evt.x && evt.canvasY === evt.y) {
      var canvasPoint = graph.getCanvasByPoint(evt.x, evt.y);
      evt.canvasX = canvasPoint.x;
      evt.canvasY = canvasPoint.y;
    }
    if (evt.name && !evt.name.includes(':')) {
      graph.emit("".concat(type, ":").concat(eventType), evt); // emit('node:click', evt)
      graph.emit(eventType, evt); // emit('click', evt);
    } else if (evt.name) {
      graph.emit(evt.name, evt); // emit('text-shape:click', evt)
    }

    if (eventType === 'dragstart') {
      this.dragging = true;
    }
    if (eventType === 'dragend') {
      this.dragging = false;
    }
    if (eventType === 'mousemove') {
      this.handleMouseMove(evt, type);
    }
  };
  /**
   * 处理扩展事件
   * @param evt 事件句柄
   */
  EventController.prototype.onExtendEvents = function (evt) {
    this.graph.emit(evt.type, evt);
  };
  /**
   * 处理滚轮事件
   * @param evt 事件句柄
   */
  EventController.prototype.onWheelEvent = function (evt) {
    if (isNil(evt.wheelDelta)) {
      evt.wheelDelta = -evt.detail;
    }
    this.graph.emit('wheel', evt);
  };
  /**
   * 处理鼠标移动的事件
   * @param evt 事件句柄
   * @param type item 类型
   */
  EventController.prototype.handleMouseMove = function (evt, type) {
    var _a = this,
      graph = _a.graph,
      preItem = _a.preItem;
    var canvas = graph.get('canvas');
    var item = evt.target === canvas ? null : evt.item;
    evt = cloneEvent(evt);
    // 从前一个item直接移动到当前item，触发前一个item的leave事件
    if (preItem && preItem !== item && !preItem.destroyed) {
      evt.item = preItem;
      this.emitCustomEvent(preItem.getType(), 'mouseleave', evt);
      if (this.dragging) {
        this.emitCustomEvent(preItem.getType(), 'dragleave', evt);
      }
    }
    // 从一个item或canvas移动到当前item，触发当前item的enter事件
    if (item && preItem !== item) {
      evt.item = item;
      this.emitCustomEvent(type, 'mouseenter', evt);
      if (this.dragging) {
        this.emitCustomEvent(type, 'dragenter', evt);
      }
    }
    this.preItem = item;
  };
  /**
   * 在 graph 上面 emit 事件
   * @param itemType item 类型
   * @param eventType 事件类型
   * @param evt 事件句柄
   */
  EventController.prototype.emitCustomEvent = function (itemType, eventType, evt) {
    evt.type = eventType;
    this.graph.emit("".concat(itemType, ":").concat(eventType), evt);
  };
  EventController.prototype.resetStatus = function () {
    this.mousedown = false;
    this.dragging = false;
    this.preItem = null;
  };
  EventController.prototype.destroy = function () {
    var _a = this,
      graph = _a.graph,
      canvasHandler = _a.canvasHandler,
      extendEvents = _a.extendEvents;
    var canvas = graph.get('canvas');
    // each(EVENTS, event => {
    //   canvas.off(event, canvasHandler);
    // });
    canvas.off('*', canvasHandler);
    each(extendEvents, function (event) {
      event.remove();
    });
    this.resetStatus();
    this.extendEvents.length = 0;
    this.canvasHandler = null;
    this.resetHandler = null;
    this.destroyed = true;
  };
  return EventController;
}(AbstractEvent);
export default EventController;