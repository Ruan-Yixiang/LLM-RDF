import { __assign } from "tslib";
import { isFunction } from '@antv/util';
var DEFAULT_TRIGGER = 'click';
var ALLOW_EVENTS = ['click', 'drag'];
var DEFAULT_KEY = undefined;
var ALLOW_KEYS = ['shift', 'ctrl', 'control', 'alt', 'meta', undefined];
export default {
  getDefaultCfg: function getDefaultCfg() {
    return {
      trigger: DEFAULT_TRIGGER,
      key: DEFAULT_KEY,
      edgeConfig: {},
      getEdgeConfig: undefined
    };
  },
  getEvents: function getEvents() {
    var self = this;
    // 检测输入是否合法
    if (!(ALLOW_EVENTS.indexOf(self.trigger.toLowerCase()) > -1)) {
      self.trigger = DEFAULT_TRIGGER;
      // eslint-disable-next-line no-console
      console.warn("Behavior create-edge 的 trigger 参数不合法，请输入 'click'，'drag'");
    }
    if (self.key && ALLOW_KEYS.indexOf(self.key.toLowerCase()) === -1) {
      self.trigger = DEFAULT_KEY;
      // eslint-disable-next-line no-console
      console.warn("Behavior create-edge 的 key 参数不合法，请输入 'shift'，'ctrl'，'alt'，'control'，或 undefined");
    }
    var events;
    if (self.trigger === 'drag') {
      events = {
        'node:dragstart': 'onClick',
        'combo:dragstart': 'onClick',
        drag: 'updateEndPoint',
        'node:drop': 'onClick',
        'combo:drop': 'onClick',
        dragend: 'onDragEnd'
      };
    } else if (self.trigger === 'click') {
      events = {
        'node:click': 'onClick',
        mousemove: 'updateEndPoint',
        'edge:click': 'cancelCreating',
        'canvas:click': 'cancelCreating',
        'combo:click': 'onClick'
      };
    }
    if (self.key) {
      events.keydown = 'onKeyDown';
      events.keyup = 'onKeyUp';
    }
    return events;
  },
  onDragEnd: function onDragEnd(ev) {
    var self = this;
    if (self.key && !self.keydown) return;
    var item = ev.item;
    if (!item || item.getID() === self.source || item.getType() !== 'node') self.cancelCreating({
      item: self.edge,
      x: ev.x,
      y: ev.y
    });
  },
  // 如果边的起点没有指定，则根据起点创建新边；如果起点已经指定而终点未指定，则指定终点
  onClick: function onClick(ev) {
    var self = this;
    if (self.key && !self.keydown) return;
    var node = ev.item;
    var graph = self.graph;
    var model = node.getModel();
    var getEdgeConfig = self.getEdgeConfig;
    // 如果起点已经指定而终点未指定，则指定终点
    if (self.addingEdge && self.edge) {
      if (!self.shouldEnd(ev, self)) return;
      var edgeConfig = void 0;
      if (getEdgeConfig && isFunction(getEdgeConfig)) {
        edgeConfig = getEdgeConfig({
          source: self.source,
          target: model.id
        }, self);
      } else {
        edgeConfig = self.edgeConfig;
      }
      var updateCfg = __assign({
        target: model.id
      }, edgeConfig);
      if (self.source === model.id) {
        updateCfg.type = 'loop';
      }
      graph.emit('beforecreateedge', {});
      graph.updateItem(self.edge, updateCfg, false);
      if (graph.get('enabledStack')) {
        var addedModel = __assign(__assign({}, self.edge.getModel()), {
          itemType: 'edge'
        });
        var after = {};
        after.edges = [addedModel];
        graph.pushStack('add', {
          before: {},
          after: after
        });
      }
      graph.emit('aftercreateedge', {
        edge: self.edge
      });
      // 暂时将该边的 capture 恢复为 true
      self.edge.getKeyShape().set('capture', true);
      self.edge = null;
      self.addingEdge = false;
    } else {
      // 如果边的起点没有指定，则根据起点创建新边
      if (!self.shouldBegin(ev, self)) return;
      // 获取自定义 edge 配置
      var edgeConfig = void 0;
      if (getEdgeConfig && isFunction(getEdgeConfig)) {
        edgeConfig = getEdgeConfig({
          source: model.id,
          target: model.id
        }, self);
      } else {
        edgeConfig = self.edgeConfig;
      }
      self.edge = graph.addItem('edge', __assign({
        source: model.id,
        target: model.id
      }, edgeConfig), false);
      self.source = model.id;
      self.addingEdge = true;
      // 暂时将该边的 capture 设置为 false，这样可以拾取到后面的元素
      self.edge.getKeyShape().set('capture', false);
    }
  },
  // 边的起点已经确定，边的末端跟随鼠标移动
  updateEndPoint: function updateEndPoint(ev) {
    var self = this;
    if (self.key && !self.keydown) return;
    if (self.edge && self.edge.destroyed) self.cancelCreating({
      item: self.edge
    });
    var point = {
      x: ev.x,
      y: ev.y
    };
    // 若此时 source 节点已经被移除，结束添加边
    if (!self.graph.findById(self.source)) {
      self.addingEdge = false;
      return;
    }
    if (self.addingEdge && self.edge) {
      // 更新边的终点为鼠标位置
      self.graph.updateItem(self.edge, {
        target: point
      }, false);
    }
  },
  // 取消增加边，删除该边；或指定终点
  cancelCreating: function cancelCreating(ev) {
    var _a, _b;
    var self = this;
    if (self.key && !self.keydown) return;
    var graph = self.graph;
    var currentEdge = ev.item;
    if (self.addingEdge && (self.edge === currentEdge || ((_b = (_a = ev.target) === null || _a === void 0 ? void 0 : _a.isCanvas) === null || _b === void 0 ? void 0 : _b.call(_a)))) {
      if (self.edge && !self.edge.destroyed) graph.removeItem(self.edge, false);
      self.edge = null;
      self.addingEdge = false;
      return;
    }
  },
  onKeyDown: function onKeyDown(e) {
    var self = this;
    var code = e.key;
    if (!code) {
      return;
    }
    if (code.toLowerCase() === self.key.toLowerCase()) {
      self.keydown = true;
    } else {
      self.keydown = false;
    }
  },
  onKeyUp: function onKeyUp() {
    var self = this;
    if (self.addingEdge && self.edge) {
      // 清除正在增加的边
      self.graph.removeItem(self.edge, false);
      self.addingEdge = false;
      self.edge = null;
    }
    this.keydown = false;
  }
};