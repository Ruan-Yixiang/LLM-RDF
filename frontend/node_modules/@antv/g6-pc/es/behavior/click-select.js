import { each } from '@antv/util';
var DEFAULT_TRIGGER = 'shift';
var ALLOW_EVENTS = ['shift', 'ctrl', 'alt', 'control'];
export default {
  getDefaultCfg: function getDefaultCfg() {
    return {
      multiple: true,
      trigger: DEFAULT_TRIGGER,
      selectedState: 'selected',
      selectNode: true,
      selectEdge: false,
      selectCombo: true
    };
  },
  getEvents: function getEvents() {
    var self = this;
    // 检测输入是否合法
    if (!(ALLOW_EVENTS.indexOf(self.trigger.toLowerCase()) > -1)) {
      self.trigger = DEFAULT_TRIGGER;
      // eslint-disable-next-line no-console
      console.warn("Behavior click-select 的 trigger 参数不合法，请输入 'drag'、'shift'、'ctrl' 或 'alt'");
    }
    if (!self.multiple) {
      return {
        'node:click': 'onClick',
        'combo:click': 'onClick',
        'edge:click': 'onClick',
        'canvas:click': 'onCanvasClick'
      };
    }
    return {
      'node:click': 'onClick',
      'combo:click': 'onClick',
      'edge:click': 'onClick',
      'canvas:click': 'onCanvasClick',
      keyup: 'onKeyUp',
      keydown: 'onKeyDown'
    };
  },
  onClick: function onClick(evt) {
    var self = this;
    var item = evt.item;
    if (!item || item.destroyed) {
      return;
    }
    var type = item.getType();
    var graph = self.graph,
      keydown = self.keydown,
      multiple = self.multiple,
      shouldUpdate = self.shouldUpdate,
      shouldBegin = self.shouldBegin;
    if (!shouldBegin(evt, self)) {
      return;
    }
    // allow to select multiple nodes but did not press a key || do not allow the select multiple nodes
    if (!keydown || !multiple) {
      var selected = graph.findAllByState('node', self.selectedState).concat(graph.findAllByState('edge', self.selectedState)).concat(graph.findAllByState('combo', self.selectedState));
      each(selected, function (selectedItem) {
        if (selectedItem !== item) {
          graph.setItemState(selectedItem, self.selectedState, false);
        }
      });
    }
    // check if the item could be selected, given the current cfg
    var itemSelectable = function () {
      switch (type) {
        case 'node':
          return self.selectNode;
        case 'edge':
          return self.selectEdge;
        case 'combo':
          return self.selectCombo;
        default:
          return false;
      }
    }();
    if (!itemSelectable) {
      var selectedNodes = graph.findAllByState('node', self.selectedState);
      var selectedEdges = graph.findAllByState('edge', self.selectedState);
      var selectedCombos = graph.findAllByState('combo', self.selectedState);
      graph.emit('nodeselectchange', {
        selectedItems: {
          nodes: selectedNodes,
          edges: selectedEdges,
          combos: selectedCombos
        },
        select: false
      });
      return;
    }
    if (item.hasState(self.selectedState)) {
      if (shouldUpdate(evt, self)) {
        graph.setItemState(item, self.selectedState, false);
      }
      var selectedNodes = graph.findAllByState('node', self.selectedState);
      var selectedEdges = graph.findAllByState('edge', self.selectedState);
      var selectedCombos = graph.findAllByState('combo', self.selectedState);
      graph.emit('nodeselectchange', {
        target: item,
        selectedItems: {
          nodes: selectedNodes,
          edges: selectedEdges,
          combos: selectedCombos
        },
        select: false
      });
    } else {
      if (shouldUpdate(evt, self)) {
        graph.setItemState(item, self.selectedState, true);
      }
      var selectedNodes = graph.findAllByState('node', self.selectedState);
      var selectedEdges = graph.findAllByState('edge', self.selectedState);
      var selectedCombos = graph.findAllByState('combo', self.selectedState);
      graph.emit('nodeselectchange', {
        target: item,
        selectedItems: {
          nodes: selectedNodes,
          edges: selectedEdges,
          combos: selectedCombos
        },
        select: true
      });
    }
  },
  onCanvasClick: function onCanvasClick(evt) {
    var _this = this;
    var _a = this,
      graph = _a.graph,
      shouldBegin = _a.shouldBegin;
    if (!shouldBegin(evt, this)) {
      return;
    }
    var selected = graph.findAllByState('node', this.selectedState);
    each(selected, function (node) {
      graph.setItemState(node, _this.selectedState, false);
    });
    var selectedEdges = graph.findAllByState('edge', this.selectedState);
    each(selectedEdges, function (edge) {
      graph.setItemState(edge, _this.selectedState, false);
    });
    var selectedCombos = graph.findAllByState('combo', this.selectedState);
    each(selectedCombos, function (combo) {
      graph.setItemState(combo, _this.selectedState, false);
    });
    graph.emit('nodeselectchange', {
      selectedItems: {
        nodes: [],
        edges: [],
        combos: []
      },
      select: false
    });
  },
  onKeyDown: function onKeyDown(e) {
    var self = this;
    var code = e.key;
    if (!code) {
      return;
    }
    if (code.toLowerCase() === this.trigger.toLowerCase() || code.toLowerCase() === 'control') {
      self.keydown = true;
    } else {
      self.keydown = false;
    }
  },
  onKeyUp: function onKeyUp() {
    var self = this;
    self.keydown = false;
  }
};