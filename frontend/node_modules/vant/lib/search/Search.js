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
  default: () => stdin_default,
  searchProps: () => searchProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_Field = require("../field/Field");
var import_use_id = require("../composables/use-id");
var import_use_expose = require("../composables/use-expose");
var import_field = require("../field");
const [name, bem, t] = (0, import_utils.createNamespace)("search");
const searchProps = (0, import_utils.extend)({}, import_Field.fieldSharedProps, {
  label: String,
  shape: (0, import_utils.makeStringProp)("square"),
  leftIcon: (0, import_utils.makeStringProp)("search"),
  clearable: import_utils.truthProp,
  actionText: String,
  background: String,
  showAction: Boolean
});
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: searchProps,
  emits: ["blur", "focus", "clear", "search", "cancel", "clickInput", "clickLeftIcon", "clickRightIcon", "update:modelValue"],
  setup(props, {
    emit,
    slots,
    attrs
  }) {
    const id = (0, import_use_id.useId)();
    const fieldRef = (0, import_vue2.ref)();
    const onCancel = () => {
      if (!slots.action) {
        emit("update:modelValue", "");
        emit("cancel");
      }
    };
    const onKeypress = (event) => {
      const ENTER_CODE = 13;
      if (event.keyCode === ENTER_CODE) {
        (0, import_utils.preventDefault)(event);
        emit("search", props.modelValue);
      }
    };
    const getInputId = () => props.id || `${id}-input`;
    const renderLabel = () => {
      if (slots.label || props.label) {
        return (0, import_vue.createVNode)("label", {
          "class": bem("label"),
          "for": getInputId()
        }, [slots.label ? slots.label() : props.label]);
      }
    };
    const renderAction = () => {
      if (props.showAction) {
        const text = props.actionText || t("cancel");
        return (0, import_vue.createVNode)("div", {
          "class": bem("action"),
          "role": "button",
          "tabindex": 0,
          "onClick": onCancel
        }, [slots.action ? slots.action() : text]);
      }
    };
    const blur = () => {
      var _a;
      return (_a = fieldRef.value) == null ? void 0 : _a.blur();
    };
    const focus = () => {
      var _a;
      return (_a = fieldRef.value) == null ? void 0 : _a.focus();
    };
    const onBlur = (event) => emit("blur", event);
    const onFocus = (event) => emit("focus", event);
    const onClear = (event) => emit("clear", event);
    const onClickInput = (event) => emit("clickInput", event);
    const onClickLeftIcon = (event) => emit("clickLeftIcon", event);
    const onClickRightIcon = (event) => emit("clickRightIcon", event);
    const fieldPropNames = Object.keys(import_Field.fieldSharedProps);
    const renderField = () => {
      const fieldAttrs = (0, import_utils.extend)({}, attrs, (0, import_utils.pick)(props, fieldPropNames), {
        id: getInputId()
      });
      const onInput = (value) => emit("update:modelValue", value);
      return (0, import_vue.createVNode)(import_field.Field, (0, import_vue.mergeProps)({
        "ref": fieldRef,
        "type": "search",
        "class": bem("field"),
        "border": false,
        "onBlur": onBlur,
        "onFocus": onFocus,
        "onClear": onClear,
        "onKeypress": onKeypress,
        "onClickInput": onClickInput,
        "onClickLeftIcon": onClickLeftIcon,
        "onClickRightIcon": onClickRightIcon,
        "onUpdate:modelValue": onInput
      }, fieldAttrs), (0, import_utils.pick)(slots, ["left-icon", "right-icon"]));
    };
    (0, import_use_expose.useExpose)({
      focus,
      blur
    });
    return () => {
      var _a;
      return (0, import_vue.createVNode)("div", {
        "class": bem({
          "show-action": props.showAction
        }),
        "style": {
          background: props.background
        }
      }, [(_a = slots.left) == null ? void 0 : _a.call(slots), (0, import_vue.createVNode)("div", {
        "class": bem("content", props.shape)
      }, [renderLabel(), renderField()]), renderAction()]);
    };
  }
});
