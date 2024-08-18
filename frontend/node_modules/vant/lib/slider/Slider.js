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
  sliderProps: () => sliderProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_use = require("@vant/use");
var import_use_touch = require("../composables/use-touch");
const [name, bem] = (0, import_utils.createNamespace)("slider");
const sliderProps = {
  min: (0, import_utils.makeNumericProp)(0),
  max: (0, import_utils.makeNumericProp)(100),
  step: (0, import_utils.makeNumericProp)(1),
  range: Boolean,
  reverse: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  vertical: Boolean,
  barHeight: import_utils.numericProp,
  buttonSize: import_utils.numericProp,
  activeColor: String,
  inactiveColor: String,
  modelValue: {
    type: [Number, Array],
    default: 0
  }
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: sliderProps,
  emits: ["change", "dragEnd", "dragStart", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    let buttonIndex;
    let current;
    let startValue;
    const root = (0, import_vue2.ref)();
    const slider = [(0, import_vue2.ref)(), (0, import_vue2.ref)()];
    const dragStatus = (0, import_vue2.ref)();
    const touch = (0, import_use_touch.useTouch)();
    const scope = (0, import_vue2.computed)(() => Number(props.max) - Number(props.min));
    const wrapperStyle = (0, import_vue2.computed)(() => {
      const crossAxis = props.vertical ? "width" : "height";
      return {
        background: props.inactiveColor,
        [crossAxis]: (0, import_utils.addUnit)(props.barHeight)
      };
    });
    const isRange = (val) => props.range && Array.isArray(val);
    const calcMainAxis = () => {
      const {
        modelValue,
        min
      } = props;
      if (isRange(modelValue)) {
        return `${(modelValue[1] - modelValue[0]) * 100 / scope.value}%`;
      }
      return `${(modelValue - Number(min)) * 100 / scope.value}%`;
    };
    const calcOffset = () => {
      const {
        modelValue,
        min
      } = props;
      if (isRange(modelValue)) {
        return `${(modelValue[0] - Number(min)) * 100 / scope.value}%`;
      }
      return "0%";
    };
    const barStyle = (0, import_vue2.computed)(() => {
      const mainAxis = props.vertical ? "height" : "width";
      const style = {
        [mainAxis]: calcMainAxis(),
        background: props.activeColor
      };
      if (dragStatus.value) {
        style.transition = "none";
      }
      const getPositionKey = () => {
        if (props.vertical) {
          return props.reverse ? "bottom" : "top";
        }
        return props.reverse ? "right" : "left";
      };
      style[getPositionKey()] = calcOffset();
      return style;
    });
    const format = (value) => {
      const min = +props.min;
      const max = +props.max;
      const step = +props.step;
      value = (0, import_utils.clamp)(value, min, max);
      const diff = Math.round((value - min) / step) * step;
      return (0, import_utils.addNumber)(min, diff);
    };
    const updateStartValue = () => {
      const current2 = props.modelValue;
      if (isRange(current2)) {
        startValue = current2.map(format);
      } else {
        startValue = format(current2);
      }
    };
    const handleRangeValue = (value) => {
      var _a, _b;
      const left = (_a = value[0]) != null ? _a : Number(props.min);
      const right = (_b = value[1]) != null ? _b : Number(props.max);
      return left > right ? [right, left] : [left, right];
    };
    const updateValue = (value, end) => {
      if (isRange(value)) {
        value = handleRangeValue(value).map(format);
      } else {
        value = format(value);
      }
      if (!(0, import_utils.isSameValue)(value, props.modelValue)) {
        emit("update:modelValue", value);
      }
      if (end && !(0, import_utils.isSameValue)(value, startValue)) {
        emit("change", value);
      }
    };
    const onClick = (event) => {
      event.stopPropagation();
      if (props.disabled || props.readonly) {
        return;
      }
      updateStartValue();
      const {
        min,
        reverse,
        vertical,
        modelValue
      } = props;
      const rect = (0, import_use.useRect)(root);
      const getDelta = () => {
        if (vertical) {
          if (reverse) {
            return rect.bottom - event.clientY;
          }
          return event.clientY - rect.top;
        }
        if (reverse) {
          return rect.right - event.clientX;
        }
        return event.clientX - rect.left;
      };
      const total = vertical ? rect.height : rect.width;
      const value = Number(min) + getDelta() / total * scope.value;
      if (isRange(modelValue)) {
        const [left, right] = modelValue;
        const middle = (left + right) / 2;
        if (value <= middle) {
          updateValue([value, right], true);
        } else {
          updateValue([left, value], true);
        }
      } else {
        updateValue(value, true);
      }
    };
    const onTouchStart = (event) => {
      if (props.disabled || props.readonly) {
        return;
      }
      touch.start(event);
      current = props.modelValue;
      updateStartValue();
      dragStatus.value = "start";
    };
    const onTouchMove = (event) => {
      if (props.disabled || props.readonly) {
        return;
      }
      if (dragStatus.value === "start") {
        emit("dragStart", event);
      }
      (0, import_utils.preventDefault)(event, true);
      touch.move(event);
      dragStatus.value = "dragging";
      const rect = (0, import_use.useRect)(root);
      const delta = props.vertical ? touch.deltaY.value : touch.deltaX.value;
      const total = props.vertical ? rect.height : rect.width;
      let diff = delta / total * scope.value;
      if (props.reverse) {
        diff = -diff;
      }
      if (isRange(startValue)) {
        const index = props.reverse ? 1 - buttonIndex : buttonIndex;
        current[index] = startValue[index] + diff;
      } else {
        current = startValue + diff;
      }
      updateValue(current);
    };
    const onTouchEnd = (event) => {
      if (props.disabled || props.readonly) {
        return;
      }
      if (dragStatus.value === "dragging") {
        updateValue(current, true);
        emit("dragEnd", event);
      }
      dragStatus.value = "";
    };
    const getButtonClassName = (index) => {
      if (typeof index === "number") {
        const position = ["left", "right"];
        return bem(`button-wrapper`, position[index]);
      }
      return bem("button-wrapper", props.reverse ? "left" : "right");
    };
    const renderButtonContent = (value, index) => {
      const dragging = dragStatus.value === "dragging";
      if (typeof index === "number") {
        const slot = slots[index === 0 ? "left-button" : "right-button"];
        let dragIndex;
        if (dragging && Array.isArray(current)) {
          dragIndex = current[0] > current[1] ? buttonIndex ^ 1 : buttonIndex;
        }
        if (slot) {
          return slot({
            value,
            dragging,
            dragIndex
          });
        }
      }
      if (slots.button) {
        return slots.button({
          value,
          dragging
        });
      }
      return (0, import_vue.createVNode)("div", {
        "class": bem("button"),
        "style": (0, import_utils.getSizeStyle)(props.buttonSize)
      }, null);
    };
    const renderButton = (index) => {
      const current2 = typeof index === "number" ? props.modelValue[index] : props.modelValue;
      return (0, import_vue.createVNode)("div", {
        "ref": slider[index != null ? index : 0],
        "role": "slider",
        "class": getButtonClassName(index),
        "tabindex": props.disabled ? void 0 : 0,
        "aria-valuemin": props.min,
        "aria-valuenow": current2,
        "aria-valuemax": props.max,
        "aria-disabled": props.disabled || void 0,
        "aria-readonly": props.readonly || void 0,
        "aria-orientation": props.vertical ? "vertical" : "horizontal",
        "onTouchstartPassive": (event) => {
          if (typeof index === "number") {
            buttonIndex = index;
          }
          onTouchStart(event);
        },
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd,
        "onClick": import_utils.stopPropagation
      }, [renderButtonContent(current2, index)]);
    };
    updateValue(props.modelValue);
    (0, import_use.useCustomFieldValue)(() => props.modelValue);
    slider.forEach((item) => {
      (0, import_use.useEventListener)("touchmove", onTouchMove, {
        target: item
      });
    });
    return () => (0, import_vue.createVNode)("div", {
      "ref": root,
      "style": wrapperStyle.value,
      "class": bem({
        vertical: props.vertical,
        disabled: props.disabled
      }),
      "onClick": onClick
    }, [(0, import_vue.createVNode)("div", {
      "class": bem("bar"),
      "style": barStyle.value
    }, [props.range ? [renderButton(0), renderButton(1)] : renderButton()])]);
  }
});
