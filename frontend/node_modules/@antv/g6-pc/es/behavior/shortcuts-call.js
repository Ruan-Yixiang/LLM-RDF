var DEFAULT_TRIGGER = 'ctrl';
var ALLOW_EVENTS = ['shift', 'ctrl', 'alt', 'control'];
var DEFAULT_COMBINED_KEY = '1';
export default {
  getDefaultCfg: function getDefaultCfg() {
    return {
      trigger: DEFAULT_TRIGGER,
      combinedKey: DEFAULT_COMBINED_KEY,
      functionName: 'fitView',
      functionParams: []
    };
  },
  getEvents: function getEvents() {
    // 检测输入是否合法
    if (!(ALLOW_EVENTS.indexOf(this.trigger.toLowerCase()) > -1)) {
      this.trigger = DEFAULT_TRIGGER;
      console.warn("Behavior shortcuts-fit-view \u7684 trigger \u53C2\u6570 '".concat(this.trigger, "' \u4E0D\u5408\u6CD5\uFF0C\u8BF7\u8F93\u5165 'drag'\u3001'shift'\u3001'ctrl' \u6216 'alt'"));
    }
    if (this.combinedKey === this.trigger) {
      this.combinedKey = undefined;
    }
    return {
      keyup: 'onKeyUp',
      keydown: 'onKeyDown'
    };
  },
  onKeyDown: function onKeyDown(e) {
    var code = e.key;
    if (!code) {
      return;
    }
    var triggerLowerCase = this.trigger.toLowerCase();
    var codeLowerCase = code.toLowerCase();
    // 按住 control 键时，允许用户设置 trigger 为 ctrl
    if (!this.triggerKeydown) {
      if (codeLowerCase === triggerLowerCase || codeLowerCase === 'control' && triggerLowerCase === 'ctrl' || codeLowerCase === 'ctrl' && triggerLowerCase === 'control') {
        this.triggerKeydown = true;
      } else {
        this.triggerKeydown = false;
      }
    }
    var graph = this.graph;
    if (!graph[this.functionName]) {
      console.warn("Behavior shortcuts-fit-view \u7684 functionName \u53C2\u6570 '".concat(this.functionName, "' \u4E0D\u5408\u6CD5\uFF0C\u5B83\u4E0D\u662F Graph \u7684\u4E00\u4E2A\u51FD\u6570\u540D"));
      return {};
    }
    // 未配置 combinedKey，直接 fitView
    if (this.triggerKeydown && !this.combinedKey) {
      if (this.functionParams && this.functionParams.length) graph[this.functionName].apply(graph, this.functionParams);else graph[this.functionName]();
      return;
    }
    var combinedKeyLowerCase = this.combinedKey.toLowerCase();
    if (this.triggerKeydown) {
      if (codeLowerCase === combinedKeyLowerCase || codeLowerCase === 'control' && combinedKeyLowerCase === 'ctrl' || codeLowerCase === 'ctrl' && combinedKeyLowerCase === 'control') {
        if (this.functionParams && this.functionParams.length) graph[this.functionName].apply(graph, this.functionParams);else graph[this.functionName]();
      }
    }
  },
  onKeyUp: function onKeyUp() {
    if (this.brush) {
      // 清除所有选中状态后，设置拖得动状态为false，并清除框选的brush
      this.brush.remove(true);
      this.brush = null;
      this.dragging = false;
    }
    this.triggerKeydown = false;
  }
};