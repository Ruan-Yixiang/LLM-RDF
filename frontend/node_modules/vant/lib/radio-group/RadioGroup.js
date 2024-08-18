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
  RADIO_KEY: () => RADIO_KEY,
  default: () => stdin_default,
  radioGroupProps: () => radioGroupProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_use = require("@vant/use");
const [name, bem] = (0, import_utils.createNamespace)("radio-group");
const radioGroupProps = {
  disabled: Boolean,
  iconSize: import_utils.numericProp,
  direction: String,
  modelValue: import_utils.unknownProp,
  checkedColor: String
};
const RADIO_KEY = Symbol(name);
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: radioGroupProps,
  emits: ["change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const {
      linkChildren
    } = (0, import_use.useChildren)(RADIO_KEY);
    const updateValue = (value) => emit("update:modelValue", value);
    (0, import_vue2.watch)(() => props.modelValue, (value) => emit("change", value));
    linkChildren({
      props,
      updateValue
    });
    (0, import_use.useCustomFieldValue)(() => props.modelValue);
    return () => {
      var _a;
      return (0, import_vue.createVNode)("div", {
        "class": bem([props.direction]),
        "role": "radiogroup"
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
