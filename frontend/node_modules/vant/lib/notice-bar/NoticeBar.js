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
  noticeBarProps: () => noticeBarProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_use = require("@vant/use");
var import_use_expose = require("../composables/use-expose");
var import_on_popup_reopen = require("../composables/on-popup-reopen");
var import_icon = require("../icon");
const [name, bem] = (0, import_utils.createNamespace)("notice-bar");
const noticeBarProps = {
  text: String,
  mode: String,
  color: String,
  delay: (0, import_utils.makeNumericProp)(1),
  speed: (0, import_utils.makeNumericProp)(60),
  leftIcon: String,
  wrapable: Boolean,
  background: String,
  scrollable: {
    type: Boolean,
    default: null
  }
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: noticeBarProps,
  emits: ["close", "replay"],
  setup(props, {
    emit,
    slots
  }) {
    let wrapWidth = 0;
    let contentWidth = 0;
    let startTimer;
    const wrapRef = (0, import_vue2.ref)();
    const contentRef = (0, import_vue2.ref)();
    const state = (0, import_vue2.reactive)({
      show: true,
      offset: 0,
      duration: 0
    });
    const renderLeftIcon = () => {
      if (slots["left-icon"]) {
        return slots["left-icon"]();
      }
      if (props.leftIcon) {
        return (0, import_vue.createVNode)(import_icon.Icon, {
          "class": bem("left-icon"),
          "name": props.leftIcon
        }, null);
      }
    };
    const getRightIconName = () => {
      if (props.mode === "closeable") {
        return "cross";
      }
      if (props.mode === "link") {
        return "arrow";
      }
    };
    const onClickRightIcon = (event) => {
      if (props.mode === "closeable") {
        state.show = false;
        emit("close", event);
      }
    };
    const renderRightIcon = () => {
      if (slots["right-icon"]) {
        return slots["right-icon"]();
      }
      const name2 = getRightIconName();
      if (name2) {
        return (0, import_vue.createVNode)(import_icon.Icon, {
          "name": name2,
          "class": bem("right-icon"),
          "onClick": onClickRightIcon
        }, null);
      }
    };
    const onTransitionEnd = () => {
      state.offset = wrapWidth;
      state.duration = 0;
      (0, import_use.raf)(() => {
        (0, import_use.doubleRaf)(() => {
          state.offset = -contentWidth;
          state.duration = (contentWidth + wrapWidth) / +props.speed;
          emit("replay");
        });
      });
    };
    const renderMarquee = () => {
      const ellipsis = props.scrollable === false && !props.wrapable;
      const style = {
        transform: state.offset ? `translateX(${state.offset}px)` : "",
        transitionDuration: `${state.duration}s`
      };
      return (0, import_vue.createVNode)("div", {
        "ref": wrapRef,
        "role": "marquee",
        "class": bem("wrap")
      }, [(0, import_vue.createVNode)("div", {
        "ref": contentRef,
        "style": style,
        "class": [bem("content"), {
          "van-ellipsis": ellipsis
        }],
        "onTransitionend": onTransitionEnd
      }, [slots.default ? slots.default() : props.text])]);
    };
    const reset = () => {
      const {
        delay,
        speed,
        scrollable
      } = props;
      const ms = (0, import_utils.isDef)(delay) ? +delay * 1e3 : 0;
      wrapWidth = 0;
      contentWidth = 0;
      state.offset = 0;
      state.duration = 0;
      clearTimeout(startTimer);
      startTimer = setTimeout(() => {
        if (!wrapRef.value || !contentRef.value || scrollable === false) {
          return;
        }
        const wrapRefWidth = (0, import_use.useRect)(wrapRef).width;
        const contentRefWidth = (0, import_use.useRect)(contentRef).width;
        if (scrollable || contentRefWidth > wrapRefWidth) {
          (0, import_use.doubleRaf)(() => {
            wrapWidth = wrapRefWidth;
            contentWidth = contentRefWidth;
            state.offset = -contentWidth;
            state.duration = contentWidth / +speed;
          });
        }
      }, ms);
    };
    (0, import_on_popup_reopen.onPopupReopen)(reset);
    (0, import_use.onMountedOrActivated)(reset);
    (0, import_use.useEventListener)("pageshow", reset);
    (0, import_use_expose.useExpose)({
      reset
    });
    (0, import_vue2.watch)(() => [props.text, props.scrollable], reset);
    return () => {
      const {
        color,
        wrapable,
        background
      } = props;
      return (0, import_vue.withDirectives)((0, import_vue.createVNode)("div", {
        "role": "alert",
        "class": bem({
          wrapable
        }),
        "style": {
          color,
          background
        }
      }, [renderLeftIcon(), renderMarquee(), renderRightIcon()]), [[import_vue.vShow, state.show]]);
    };
  }
});
