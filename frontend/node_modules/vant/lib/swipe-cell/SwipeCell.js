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
  swipeCellProps: () => swipeCellProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_use = require("@vant/use");
var import_use_touch = require("../composables/use-touch");
var import_use_expose = require("../composables/use-expose");
const [name, bem] = (0, import_utils.createNamespace)("swipe-cell");
const swipeCellProps = {
  name: (0, import_utils.makeNumericProp)(""),
  disabled: Boolean,
  leftWidth: import_utils.numericProp,
  rightWidth: import_utils.numericProp,
  beforeClose: Function,
  stopPropagation: Boolean
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: swipeCellProps,
  emits: ["open", "close", "click"],
  setup(props, {
    emit,
    slots
  }) {
    let opened;
    let lockClick;
    let startOffset;
    const root = (0, import_vue2.ref)();
    const leftRef = (0, import_vue2.ref)();
    const rightRef = (0, import_vue2.ref)();
    const state = (0, import_vue2.reactive)({
      offset: 0,
      dragging: false
    });
    const touch = (0, import_use_touch.useTouch)();
    const getWidthByRef = (ref2) => ref2.value ? (0, import_use.useRect)(ref2).width : 0;
    const leftWidth = (0, import_vue2.computed)(() => (0, import_utils.isDef)(props.leftWidth) ? +props.leftWidth : getWidthByRef(leftRef));
    const rightWidth = (0, import_vue2.computed)(() => (0, import_utils.isDef)(props.rightWidth) ? +props.rightWidth : getWidthByRef(rightRef));
    const open = (side) => {
      state.offset = side === "left" ? leftWidth.value : -rightWidth.value;
      if (!opened) {
        opened = true;
        emit("open", {
          name: props.name,
          position: side
        });
      }
    };
    const close = (position) => {
      state.offset = 0;
      if (opened) {
        opened = false;
        emit("close", {
          name: props.name,
          position
        });
      }
    };
    const toggle = (side) => {
      const offset = Math.abs(state.offset);
      const THRESHOLD = 0.15;
      const threshold = opened ? 1 - THRESHOLD : THRESHOLD;
      const width = side === "left" ? leftWidth.value : rightWidth.value;
      if (width && offset > width * threshold) {
        open(side);
      } else {
        close(side);
      }
    };
    const onTouchStart = (event) => {
      if (!props.disabled) {
        startOffset = state.offset;
        touch.start(event);
      }
    };
    const onTouchMove = (event) => {
      if (props.disabled) {
        return;
      }
      const {
        deltaX
      } = touch;
      touch.move(event);
      if (touch.isHorizontal()) {
        lockClick = true;
        state.dragging = true;
        const isEdge = !opened || deltaX.value * startOffset < 0;
        if (isEdge) {
          (0, import_utils.preventDefault)(event, props.stopPropagation);
        }
        state.offset = (0, import_utils.clamp)(deltaX.value + startOffset, -rightWidth.value, leftWidth.value);
      }
    };
    const onTouchEnd = () => {
      if (state.dragging) {
        state.dragging = false;
        toggle(state.offset > 0 ? "left" : "right");
        setTimeout(() => {
          lockClick = false;
        }, 0);
      }
    };
    const onClick = (position = "outside") => {
      emit("click", position);
      if (opened && !lockClick) {
        (0, import_utils.callInterceptor)(props.beforeClose, {
          args: [{
            name: props.name,
            position
          }],
          done: () => close(position)
        });
      }
    };
    const getClickHandler = (position, stop) => (event) => {
      if (stop) {
        event.stopPropagation();
      }
      onClick(position);
    };
    const renderSideContent = (side, ref2) => {
      const contentSlot = slots[side];
      if (contentSlot) {
        return (0, import_vue.createVNode)("div", {
          "ref": ref2,
          "class": bem(side),
          "onClick": getClickHandler(side, true)
        }, [contentSlot()]);
      }
    };
    (0, import_use_expose.useExpose)({
      open,
      close
    });
    (0, import_use.useClickAway)(root, () => onClick("outside"), {
      eventName: "touchstart"
    });
    (0, import_use.useEventListener)("touchmove", onTouchMove, {
      target: root
    });
    return () => {
      var _a;
      const wrapperStyle = {
        transform: `translate3d(${state.offset}px, 0, 0)`,
        transitionDuration: state.dragging ? "0s" : ".6s"
      };
      return (0, import_vue.createVNode)("div", {
        "ref": root,
        "class": bem(),
        "onClick": getClickHandler("cell", lockClick),
        "onTouchstartPassive": onTouchStart,
        "onTouchend": onTouchEnd,
        "onTouchcancel": onTouchEnd
      }, [(0, import_vue.createVNode)("div", {
        "class": bem("wrapper"),
        "style": wrapperStyle
      }, [renderSideContent("left", leftRef), (_a = slots.default) == null ? void 0 : _a.call(slots), renderSideContent("right", rightRef)])]);
    };
  }
});
