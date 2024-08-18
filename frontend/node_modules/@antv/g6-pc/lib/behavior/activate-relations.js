"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _util = require("@antv/util");
var _default = {
  getDefaultCfg: function getDefaultCfg() {
    return {
      // 可选 mouseenter || click
      // 选择 click 会监听 touch，mouseenter 不会监听
      trigger: 'mouseenter',
      activeState: 'active',
      inactiveState: 'inactive',
      resetSelected: false,
      shouldUpdate: function shouldUpdate() {
        return true;
      }
    };
  },
  getEvents: function getEvents() {
    if (this.get('trigger') === 'mouseenter') {
      return {
        'node:mouseenter': 'setAllItemStates',
        'combo:mouseenter': 'setAllItemStates',
        'node:mouseleave': 'clearActiveState',
        'combo:mouseleave': 'clearActiveState'
      };
    }
    return {
      'node:click': 'setAllItemStates',
      'combo:click': 'setAllItemStates',
      'canvas:click': 'clearActiveState',
      'node:touchstart': 'setOnTouchStart',
      'combo:touchstart': 'setOnTouchStart',
      'canvas:touchstart': 'clearOnTouchStart'
    };
  },
  setOnTouchStart: function setOnTouchStart(e) {
    var self = this;
    try {
      var touches = e.originalEvent.touches;
      var event1 = touches[0];
      var event2 = touches[1];
      if (event1 && event2) {
        return;
      }
      e.preventDefault();
    } catch (e) {
      console.warn('Touch original event not exist!');
    }
    self.setAllItemStates(e);
  },
  clearOnTouchStart: function clearOnTouchStart(e) {
    var self = this;
    try {
      var touches = e.originalEvent.touches;
      var event1 = touches[0];
      var event2 = touches[1];
      if (event1 && event2) {
        return;
      }
      e.preventDefault();
    } catch (e) {
      console.warn('Touch original event not exist!');
    }
    self.clearActiveState(e);
  },
  setAllItemStates: function setAllItemStates(e) {
    clearTimeout(this.timer);
    this.throttleSetAllItemStates(e, this);
  },
  clearActiveState: function clearActiveState(e) {
    var _this = this;
    // avoid clear state frequently, it costs a lot since all the items' states on the graph need to be cleared
    this.timer = setTimeout(function () {
      _this.throttleClearActiveState(e, _this);
    }, 50);
  },
  throttleSetAllItemStates: (0, _util.throttle)(function (e, self) {
    var item = e.item;
    var graph = self.graph;
    if (!graph || graph.destroyed) return;
    self.item = item;
    if (!self.shouldUpdate(e.item, {
      event: e,
      action: 'activate'
    }, self)) {
      return;
    }
    var activeState = self.activeState;
    var inactiveState = self.inactiveState;
    var nodes = graph.getNodes();
    var combos = graph.getCombos();
    var edges = graph.getEdges();
    var vEdges = graph.get('vedges');
    var nodeLength = nodes.length;
    var comboLength = combos.length;
    var edgeLength = edges.length;
    var vEdgeLength = vEdges.length;
    var inactiveItems = self.inactiveItems || {};
    var activeItems = self.activeItems || {};
    for (var i = 0; i < nodeLength; i++) {
      var node = nodes[i];
      var nodeId = node.getID();
      var hasSelected = node.hasState('selected');
      if (self.resetSelected) {
        if (hasSelected) {
          graph.setItemState(node, 'selected', false);
        }
      }
      if (activeItems[nodeId]) {
        graph.setItemState(node, activeState, false);
        delete activeItems[nodeId];
      }
      if (inactiveState && !inactiveItems[nodeId]) {
        graph.setItemState(node, inactiveState, true);
        inactiveItems[nodeId] = node;
      }
    }
    for (var i = 0; i < comboLength; i++) {
      var combo = combos[i];
      var comboId = combo.getID();
      var hasSelected = combo.hasState('selected');
      if (self.resetSelected) {
        if (hasSelected) {
          graph.setItemState(combo, 'selected', false);
        }
      }
      if (activeItems[comboId]) {
        graph.setItemState(combo, activeState, false);
        delete activeItems[comboId];
      }
      if (inactiveState && !inactiveItems[comboId]) {
        graph.setItemState(combo, inactiveState, true);
        inactiveItems[comboId] = combo;
      }
    }
    for (var i = 0; i < edgeLength; i++) {
      var edge = edges[i];
      var edgeId = edge.getID();
      if (activeItems[edgeId]) {
        graph.setItemState(edge, activeState, false);
        delete activeItems[edgeId];
      }
      if (inactiveState && !inactiveItems[edgeId]) {
        graph.setItemState(edge, inactiveState, true);
        inactiveItems[edgeId] = edge;
      }
    }
    for (var i = 0; i < vEdgeLength; i++) {
      var vEdge = vEdges[i];
      var vEdgeId = vEdge.getID();
      if (activeItems[vEdgeId]) {
        graph.setItemState(vEdge, activeState, false);
        delete activeItems[vEdgeId];
      }
      if (inactiveState && !inactiveItems[vEdgeId]) {
        graph.setItemState(vEdge, inactiveState, true);
        inactiveItems[vEdgeId] = vEdge;
      }
    }
    if (item && !item.destroyed) {
      if (inactiveState) {
        graph.setItemState(item, inactiveState, false);
        delete inactiveItems[item.getID()];
      }
      if (!activeItems[item.getID()]) {
        graph.setItemState(item, activeState, true);
        activeItems[item.getID()] = item;
      }
      var rEdges = item.getEdges();
      var rEdgeLegnth = rEdges.length;
      for (var i = 0; i < rEdgeLegnth; i++) {
        var edge = rEdges[i];
        var edgeId = edge.getID();
        var otherEnd = void 0;
        if (edge.getSource() === item) {
          otherEnd = edge.getTarget();
        } else {
          otherEnd = edge.getSource();
        }
        var otherEndId = otherEnd.getID();
        if (inactiveState && inactiveItems[otherEndId]) {
          graph.setItemState(otherEnd, inactiveState, false);
          delete inactiveItems[otherEndId];
        }
        if (!activeItems[otherEndId]) {
          graph.setItemState(otherEnd, activeState, true);
          activeItems[otherEndId] = otherEnd;
        }
        if (inactiveItems[edgeId]) {
          graph.setItemState(edge, inactiveState, false);
          delete inactiveItems[edgeId];
        }
        if (!activeItems[edgeId]) {
          graph.setItemState(edge, activeState, true);
          activeItems[edgeId] = edge;
        }
        edge.toFront();
      }
    }
    self.activeItems = activeItems;
    self.inactiveItems = inactiveItems;
    graph.emit('afteractivaterelations', {
      item: e.item,
      action: 'activate'
    });
  }, 50, {
    trailing: true,
    leading: true
  }),
  throttleClearActiveState: (0, _util.throttle)(function (e, self) {
    var graph = self.get('graph');
    if (!graph || graph.destroyed) return;
    if (!self.shouldUpdate(e.item, {
      event: e,
      action: 'deactivate'
    }, self)) return;
    var activeState = self.activeState;
    var inactiveState = self.inactiveState;
    var activeItems = self.activeItems || {};
    var inactiveItems = self.inactiveItems || {};
    Object.values(activeItems).filter(function (item) {
      return !item.destroyed;
    }).forEach(function (item) {
      graph.clearItemStates(item, activeState);
    });
    Object.values(inactiveItems).filter(function (item) {
      return !item.destroyed;
    }).forEach(function (item) {
      graph.clearItemStates(item, inactiveState);
    });
    self.activeItems = {};
    self.inactiveItems = {};
    graph.emit('afteractivaterelations', {
      item: e.item || self.get('item'),
      action: 'deactivate'
    });
  }, 50, {
    trailing: true,
    leading: true
  })
};
exports.default = _default;