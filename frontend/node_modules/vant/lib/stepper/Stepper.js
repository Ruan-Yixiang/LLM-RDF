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
  stepperProps: () => stepperProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_use = require("@vant/use");
const [name, bem] = (0, import_utils.createNamespace)("stepper");
const LONG_PRESS_INTERVAL = 200;
const isEqual = (value1, value2) => String(value1) === String(value2);
const stepperProps = {
  min: (0, import_utils.makeNumericProp)(1),
  max: (0, import_utils.makeNumericProp)(Infinity),
  name: (0, import_utils.makeNumericProp)(""),
  step: (0, import_utils.makeNumericProp)(1),
  theme: String,
  integer: Boolean,
  disabled: Boolean,
  showPlus: import_utils.truthProp,
  showMinus: import_utils.truthProp,
  showInput: import_utils.truthProp,
  longPress: import_utils.truthProp,
  autoFixed: import_utils.truthProp,
  allowEmpty: Boolean,
  modelValue: import_utils.numericProp,
  inputWidth: import_utils.numericProp,
  buttonSize: import_utils.numericProp,
  placeholder: String,
  disablePlus: Boolean,
  disableMinus: Boolean,
  disableInput: Boolean,
  beforeChange: Function,
  defaultValue: (0, import_utils.makeNumericProp)(1),
  decimalLength: import_utils.numericProp
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: stepperProps,
  emits: ["plus", "blur", "minus", "focus", "change", "overlimit", "update:modelValue"],
  setup(props, {
    emit
  }) {
    const format = (value, autoFixed = true) => {
      const {
        min,
        max,
        allowEmpty,
        decimalLength
      } = props;
      if (allowEmpty && value === "") {
        return value;
      }
      value = (0, import_utils.formatNumber)(String(value), !props.integer);
      value = value === "" ? 0 : +value;
      value = Number.isNaN(value) ? +min : value;
      value = autoFixed ? Math.max(Math.min(+max, value), +min) : value;
      if ((0, import_utils.isDef)(decimalLength)) {
        value = value.toFixed(+decimalLength);
      }
      return value;
    };
    const getInitialValue = () => {
      var _a;
      const defaultValue = (_a = props.modelValue) != null ? _a : props.defaultValue;
      const value = format(defaultValue);
      if (!isEqual(value, props.modelValue)) {
        emit("update:modelValue", value);
      }
      return value;
    };
    let actionType;
    const inputRef = (0, import_vue2.ref)();
    const current = (0, import_vue2.ref)(getInitialValue());
    const minusDisabled = (0, import_vue2.computed)(() => props.disabled || props.disableMinus || +current.value <= +props.min);
    const plusDisabled = (0, import_vue2.computed)(() => props.disabled || props.disablePlus || +current.value >= +props.max);
    const inputStyle = (0, import_vue2.computed)(() => ({
      width: (0, import_utils.addUnit)(props.inputWidth),
      height: (0, import_utils.addUnit)(props.buttonSize)
    }));
    const buttonStyle = (0, import_vue2.computed)(() => (0, import_utils.getSizeStyle)(props.buttonSize));
    const check = () => {
      const value = format(current.value);
      if (!isEqual(value, current.value)) {
        current.value = value;
      }
    };
    const setValue = (value) => {
      if (props.beforeChange) {
        (0, import_utils.callInterceptor)(props.beforeChange, {
          args: [value],
          done() {
            current.value = value;
          }
        });
      } else {
        current.value = value;
      }
    };
    const onChange = () => {
      if (actionType === "plus" && plusDisabled.value || actionType === "minus" && minusDisabled.value) {
        emit("overlimit", actionType);
        return;
      }
      const diff = actionType === "minus" ? -props.step : +props.step;
      const value = format((0, import_utils.addNumber)(+current.value, diff));
      setValue(value);
      emit(actionType);
    };
    const onInput = (event) => {
      const input = event.target;
      const {
        value
      } = input;
      const {
        decimalLength
      } = props;
      let formatted = (0, import_utils.formatNumber)(String(value), !props.integer);
      if ((0, import_utils.isDef)(decimalLength) && formatted.includes(".")) {
        const pair = formatted.split(".");
        formatted = `${pair[0]}.${pair[1].slice(0, +decimalLength)}`;
      }
      if (props.beforeChange) {
        input.value = String(current.value);
      } else if (!isEqual(value, formatted)) {
        input.value = formatted;
      }
      const isNumeric = formatted === String(+formatted);
      setValue(isNumeric ? +formatted : formatted);
    };
    const onFocus = (event) => {
      var _a;
      if (props.disableInput) {
        (_a = inputRef.value) == null ? void 0 : _a.blur();
      } else {
        emit("focus", event);
      }
    };
    const onBlur = (event) => {
      const input = event.target;
      const value = format(input.value, props.autoFixed);
      input.value = String(value);
      current.value = value;
      (0, import_vue2.nextTick)(() => {
        emit("blur", event);
        (0, import_utils.resetScroll)();
      });
    };
    let isLongPress;
    let longPressTimer;
    const longPressStep = () => {
      longPressTimer = setTimeout(() => {
        onChange();
        longPressStep();
      }, LONG_PRESS_INTERVAL);
    };
    const onTouchStart = () => {
      if (props.longPress) {
        isLongPress = false;
        clearTimeout(longPressTimer);
        longPressTimer = setTimeout(() => {
          isLongPress = true;
          onChange();
          longPressStep();
        }, import_utils.LONG_PRESS_START_TIME);
      }
    };
    const onTouchEnd = (event) => {
      if (props.longPress) {
        clearTimeout(longPressTimer);
        if (isLongPress) {
          (0, import_utils.preventDefault)(event);
        }
      }
    };
    const onMousedown = (event) => {
      if (props.disableInput) {
        (0, import_utils.preventDefault)(event);
      }
    };
    const createListeners = (type) => ({
      onClick: (event) => {
        (0, import_utils.preventDefault)(event);
        actionType = type;
        onChange();
      },
      onTouchstartPassive: () => {
        actionType = type;
        onTouchStart();
      },
      onTouchend: onTouchEnd,
      onTouchcancel: onTouchEnd
    });
    (0, import_vue2.watch)(() => [props.max, props.min, props.integer, props.decimalLength], check);
    (0, import_vue2.watch)(() => props.modelValue, (value) => {
      if (!isEqual(value, current.value)) {
        current.value = format(value);
      }
    });
    (0, import_vue2.watch)(current, (value) => {
      emit("update:modelValue", value);
      emit("change", value, {
        name: props.name
      });
    });
    (0, import_use.useCustomFieldValue)(() => props.modelValue);
    return () => (0, import_vue.createVNode)("div", {
      "role": "group",
      "class": bem([props.theme])
    }, [(0, import_vue.withDirectives)((0, import_vue.createVNode)("button", (0, import_vue.mergeProps)({
      "type": "button",
      "style": buttonStyle.value,
      "class": [bem("minus", {
        disabled: minusDisabled.value
      }), {
        [import_utils.HAPTICS_FEEDBACK]: !minusDisabled.value
      }],
      "aria-disabled": minusDisabled.value || void 0
    }, createListeners("minus")), null), [[import_vue.vShow, props.showMinus]]), (0, import_vue.withDirectives)((0, import_vue.createVNode)("input", {
      "ref": inputRef,
      "type": props.integer ? "tel" : "text",
      "role": "spinbutton",
      "class": bem("input"),
      "value": current.value,
      "style": inputStyle.value,
      "disabled": props.disabled,
      "readonly": props.disableInput,
      "inputmode": props.integer ? "numeric" : "decimal",
      "placeholder": props.placeholder,
      "aria-valuemax": props.max,
      "aria-valuemin": props.min,
      "aria-valuenow": current.value,
      "onBlur": onBlur,
      "onInput": onInput,
      "onFocus": onFocus,
      "onMousedown": onMousedown
    }, null), [[import_vue.vShow, props.showInput]]), (0, import_vue.withDirectives)((0, import_vue.createVNode)("button", (0, import_vue.mergeProps)({
      "type": "button",
      "style": buttonStyle.value,
      "class": [bem("plus", {
        disabled: plusDisabled.value
      }), {
        [import_utils.HAPTICS_FEEDBACK]: !plusDisabled.value
      }],
      "aria-disabled": plusDisabled.value || void 0
    }, createListeners("plus")), null), [[import_vue.vShow, props.showPlus]])]);
  }
});
