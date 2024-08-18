import { createVNode as _createVNode } from "vue";
import { ref, computed, defineComponent } from "vue";
import { clamp, addUnit, addNumber, numericProp, isSameValue, getSizeStyle, preventDefault, stopPropagation, createNamespace, makeNumericProp } from "../utils/index.mjs";
import { useRect, useCustomFieldValue, useEventListener } from "@vant/use";
import { useTouch } from "../composables/use-touch.mjs";
const [name, bem] = createNamespace("slider");
const sliderProps = {
  min: makeNumericProp(0),
  max: makeNumericProp(100),
  step: makeNumericProp(1),
  range: Boolean,
  reverse: Boolean,
  disabled: Boolean,
  readonly: Boolean,
  vertical: Boolean,
  barHeight: numericProp,
  buttonSize: numericProp,
  activeColor: String,
  inactiveColor: String,
  modelValue: {
    type: [Number, Array],
    default: 0
  }
};
var stdin_default = defineComponent({
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
    const root = ref();
    const slider = [ref(), ref()];
    const dragStatus = ref();
    const touch = useTouch();
    const scope = computed(() => Number(props.max) - Number(props.min));
    const wrapperStyle = computed(() => {
      const crossAxis = props.vertical ? "width" : "height";
      return {
        background: props.inactiveColor,
        [crossAxis]: addUnit(props.barHeight)
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
    const barStyle = computed(() => {
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
      value = clamp(value, min, max);
      const diff = Math.round((value - min) / step) * step;
      return addNumber(min, diff);
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
      if (!isSameValue(value, props.modelValue)) {
        emit("update:modelValue", value);
      }
      if (end && !isSameValue(value, startValue)) {
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
      const rect = useRect(root);
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
      preventDefault(event, true);
      touch.move(event);
      dragStatus.value = "dragging";
      const rect = useRect(root);
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
      return _createVNode("div", {
        "class": bem("button"),
        "style": getSizeStyle(props.buttonSize)
      }, null);
    };
    const renderButton = (index) => {
      const current2 = typeof index === "number" ? props.modelValue[index] : props.modelValue;
      return _createVNode("div", {
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
        "onClick": stopPropagation
      }, [renderButtonContent(current2, index)]);
    };
    updateValue(props.modelValue);
    useCustomFieldValue(() => props.modelValue);
    slider.forEach((item) => {
      useEventListener("touchmove", onTouchMove, {
        target: item
      });
    });
    return () => _createVNode("div", {
      "ref": root,
      "style": wrapperStyle.value,
      "class": bem({
        vertical: props.vertical,
        disabled: props.disabled
      }),
      "onClick": onClick
    }, [_createVNode("div", {
      "class": bem("bar"),
      "style": barStyle.value
    }, [props.range ? [renderButton(0), renderButton(1)] : renderButton()])]);
  }
});
export {
  stdin_default as default,
  sliderProps
};
