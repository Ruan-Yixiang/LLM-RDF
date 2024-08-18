var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  countDownProps: () => countDownProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_utils2 = require("./utils");
var import_use = require("@vant/use");
var import_use_expose = require("../composables/use-expose");
const [name, bem] = (0, import_utils.createNamespace)("count-down");
const countDownProps = {
  time: (0, import_utils.makeNumericProp)(0),
  format: (0, import_utils.makeStringProp)("HH:mm:ss"),
  autoStart: import_utils.truthProp,
  millisecond: Boolean
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: countDownProps,
  emits: ["change", "finish"],
  setup(props, {
    emit,
    slots
  }) {
    const {
      start,
      pause,
      reset,
      current
    } = (0, import_use.useCountDown)({
      time: +props.time,
      millisecond: props.millisecond,
      onChange: (current2) => emit("change", current2),
      onFinish: () => emit("finish")
    });
    const timeText = (0, import_vue2.computed)(() => (0, import_utils2.parseFormat)(props.format, current.value));
    const resetTime = () => {
      reset(+props.time);
      if (props.autoStart) {
        start();
      }
    };
    (0, import_vue2.watch)(() => props.time, resetTime, {
      immediate: true
    });
    (0, import_use_expose.useExpose)({
      start,
      pause,
      reset: resetTime
    });
    return () => (0, import_vue.createVNode)("div", {
      "role": "timer",
      "class": bem()
    }, [slots.default ? slots.default(current.value) : timeText.value]);
  }
});
