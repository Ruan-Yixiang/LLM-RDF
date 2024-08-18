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
  PICKER_KEY: () => PICKER_KEY,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_utils2 = require("./utils");
var import_use = require("@vant/use");
var import_use_touch = require("../composables/use-touch");
var import_use_expose = require("../composables/use-expose");
const DEFAULT_DURATION = 200;
const MOMENTUM_TIME = 300;
const MOMENTUM_DISTANCE = 15;
const [name, bem] = (0, import_utils.createNamespace)("picker-column");
const PICKER_KEY = Symbol(name);
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: {
    value: import_utils.numericProp,
    fields: (0, import_utils.makeRequiredProp)(Object),
    options: (0, import_utils.makeArrayProp)(),
    readonly: Boolean,
    allowHtml: Boolean,
    optionHeight: (0, import_utils.makeRequiredProp)(Number),
    swipeDuration: (0, import_utils.makeRequiredProp)(import_utils.numericProp),
    visibleOptionNum: (0, import_utils.makeRequiredProp)(import_utils.numericProp)
  },
  emits: ["change", "clickOption", "scrollInto"],
  setup(props, {
    emit,
    slots
  }) {
    let moving;
    let startOffset;
    let touchStartTime;
    let momentumOffset;
    let transitionEndTrigger;
    const root = (0, import_vue2.ref)();
    const wrapper = (0, import_vue2.ref)();
    const currentOffset = (0, import_vue2.ref)(0);
    const currentDuration = (0, import_vue2.ref)(0);
    const touch = (0, import_use_touch.useTouch)();
    const count = () => props.options.length;
    const baseOffset = () => props.optionHeight * (+props.visibleOptionNum - 1) / 2;
    const updateValueByIndex = (index) => {
      const enabledIndex = (0, import_utils2.findIndexOfEnabledOption)(props.options, index);
      const offset = -enabledIndex * props.optionHeight;
      const trigger = () => {
        const value = props.options[enabledIndex][props.fields.value];
        if (value !== props.value) {
          emit("change", value);
        }
      };
      if (moving && offset !== currentOffset.value) {
        transitionEndTrigger = trigger;
      } else {
        trigger();
      }
      currentOffset.value = offset;
    };
    const isReadonly = () => props.readonly || !props.options.length;
    const onClickOption = (index) => {
      if (moving || isReadonly()) {
        return;
      }
      transitionEndTrigger = null;
      currentDuration.value = DEFAULT_DURATION;
      updateValueByIndex(index);
      emit("clickOption", props.options[index]);
    };
    const getIndexByOffset = (offset) => (0, import_utils.clamp)(Math.round(-offset / props.optionHeight), 0, count() - 1);
    const currentIndex = (0, import_vue2.computed)(() => getIndexByOffset(currentOffset.value));
    const momentum = (distance, duration) => {
      const speed = Math.abs(distance / duration);
      distance = currentOffset.value + speed / 3e-3 * (distance < 0 ? -1 : 1);
      const index = getIndexByOffset(distance);
      currentDuration.value = +props.swipeDuration;
      updateValueByIndex(index);
    };
    const stopMomentum = () => {
      moving = false;
      currentDuration.value = 0;
      if (transitionEndTrigger) {
        transitionEndTrigger();
        transitionEndTrigger = null;
      }
    };
    const onTouchStart = (event) => {
      if (isReadonly()) {
        return;
      }
      touch.start(event);
      if (moving) {
        const translateY = (0, import_utils2.getElementTranslateY)(wrapper.value);
        currentOffset.value = Math.min(0, translateY - baseOffset());
      }
      currentDuration.value = 0;
      startOffset = currentOffset.value;
      touchStartTime = Date.now();
      momentumOffset = startOffset;
      transitionEndTrigger = null;
    };
    const onTouchMove = (event) => {
      if (isReadonly()) {
        return;
      }
      touch.move(event);
      if (touch.isVertical()) {
        moving = true;
        (0, import_utils.preventDefault)(event, true);
      }
      const newOffset = (0, import_utils.clamp)(startOffset + touch.deltaY.value, -(count() * props.optionHeight), props.optionHeight);
      const newIndex = getIndexByOffset(newOffset);
      if (newIndex !== currentIndex.value) {
        emit("scrollInto", props.options[newIndex]);
      }
      currentOffset.value = newOffset;
      const now = Date.now();
      if (now - touchStartTime > MOMENTUM_TIME) {
        touchStartTime = now;
        momentumOffset = newOffset;
      }
    };
    const onTouchEnd = () => {
      if (isReadonly()) {
        return;
      }
      const distance = currentOffset.value - momentumOffset;
      const duration = Date.now() - touchStartTime;
      const startMomentum = duration < MOMENTUM_TIME && Math.abs(distance) > MOMENTUM_DISTANCE;
      if (startMomentum) {
        momentum(distance, duration);
        return;
      }
      const index = getIndexByOffset(currentOffset.value);
      currentDuration.value = DEFAULT_DURATION;
      updateValueByIndex(index);
      setTimeout(() => {
        moving = false;
      }, 0);
    };
    const renderOptions = () => {
      const optionStyle = {
        height: `${props.optionHeight}px`
      };
      return props.options.map((option, index) => {
        const text = option[props.fields.text];
        const {
          disabled
        } = option;
        const value = option[props.fields.value];
        const data = {
          role: "button",
          style: optionStyle,
          tabindex: disabled ? -1 : 0,
          class: [bem("item", {
            disabled,
            selected: value === props.value
          }), option.className],
          onClick: () => onClickOption(index)
        };
        const childData = {
          class: "van-ellipsis",
          [props.allowHtml ? "innerHTML" : "textContent"]: text
        };
        return (0, import_vue.createVNode)("li", data, [slots.option ? slots.option(option, index) : (0, import_vue.createVNode)("div", childData, null)]);
      });
    };
    (0, import_use.useParent)(PICKER_KEY);
    (0, import_use_expose.useExpose)({
      stopMomentum
    });
    (0, import_vue2.watchEffect)(() => {
      const index = props.options.findIndex((option) => option[props.fields.value] === props.value);
      const enabledIndex = (0, import_utils2.findIndexOfEnabledOption)(props.options, index);
      const offset = -enabledIndex * props.optionHeight;
      currentOffset.value = offset;
    });
    (0, import_use.useEventListener)("touchmove", onTouchMove, {
      target: root
    });
    return () => (0, import_vue.createVNode)("div", {
      "ref": root,
      "class": bem(),
      "onTouchstartPassive": onTouchStart,
      "onTouchend": onTouchEnd,
      "onTouchcancel": onTouchEnd
    }, [(0, import_vue.createVNode)("ul", {
      "ref": wrapper,
      "style": {
        transform: `translate3d(0, ${currentOffset.value + baseOffset()}px, 0)`,
        transitionDuration: `${currentDuration.value}ms`,
        transitionProperty: currentDuration.value ? "all" : "none"
      },
      "class": bem("wrapper"),
      "onTransitionend": stopMomentum
    }, [renderOptions()])]);
  }
});
