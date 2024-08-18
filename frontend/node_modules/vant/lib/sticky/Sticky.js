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
  stickyProps: () => stickyProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_use = require("@vant/use");
var import_use_visibility_change = require("../composables/use-visibility-change");
const [name, bem] = (0, import_utils.createNamespace)("sticky");
const stickyProps = {
  zIndex: import_utils.numericProp,
  position: (0, import_utils.makeStringProp)("top"),
  container: Object,
  offsetTop: (0, import_utils.makeNumericProp)(0),
  offsetBottom: (0, import_utils.makeNumericProp)(0)
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: stickyProps,
  emits: ["scroll", "change"],
  setup(props, {
    emit,
    slots
  }) {
    const root = (0, import_vue2.ref)();
    const scrollParent = (0, import_use.useScrollParent)(root);
    const state = (0, import_vue2.reactive)({
      fixed: false,
      width: 0,
      // root width
      height: 0,
      // root height
      transform: 0
    });
    const isReset = (0, import_vue2.ref)(false);
    const offset = (0, import_vue2.computed)(() => (0, import_utils.unitToPx)(props.position === "top" ? props.offsetTop : props.offsetBottom));
    const rootStyle = (0, import_vue2.computed)(() => {
      if (isReset.value) {
        return;
      }
      const {
        fixed,
        height,
        width
      } = state;
      if (fixed) {
        return {
          width: `${width}px`,
          height: `${height}px`
        };
      }
    });
    const stickyStyle = (0, import_vue2.computed)(() => {
      if (!state.fixed || isReset.value) {
        return;
      }
      const style = (0, import_utils.extend)((0, import_utils.getZIndexStyle)(props.zIndex), {
        width: `${state.width}px`,
        height: `${state.height}px`,
        [props.position]: `${offset.value}px`
      });
      if (state.transform) {
        style.transform = `translate3d(0, ${state.transform}px, 0)`;
      }
      return style;
    });
    const emitScroll = (scrollTop) => emit("scroll", {
      scrollTop,
      isFixed: state.fixed
    });
    const onScroll = () => {
      if (!root.value || (0, import_utils.isHidden)(root)) {
        return;
      }
      const {
        container,
        position
      } = props;
      const rootRect = (0, import_use.useRect)(root);
      const scrollTop = (0, import_utils.getScrollTop)(window);
      state.width = rootRect.width;
      state.height = rootRect.height;
      if (position === "top") {
        if (container) {
          const containerRect = (0, import_use.useRect)(container);
          const difference = containerRect.bottom - offset.value - state.height;
          state.fixed = offset.value > rootRect.top && containerRect.bottom > 0;
          state.transform = difference < 0 ? difference : 0;
        } else {
          state.fixed = offset.value > rootRect.top;
        }
      } else {
        const {
          clientHeight
        } = document.documentElement;
        if (container) {
          const containerRect = (0, import_use.useRect)(container);
          const difference = clientHeight - containerRect.top - offset.value - state.height;
          state.fixed = clientHeight - offset.value < rootRect.bottom && clientHeight > containerRect.top;
          state.transform = difference < 0 ? -difference : 0;
        } else {
          state.fixed = clientHeight - offset.value < rootRect.bottom;
        }
      }
      emitScroll(scrollTop);
    };
    (0, import_vue2.watch)(() => state.fixed, (value) => emit("change", value));
    (0, import_use.useEventListener)("scroll", onScroll, {
      target: scrollParent,
      passive: true
    });
    (0, import_use_visibility_change.useVisibilityChange)(root, onScroll);
    (0, import_vue2.watch)([import_utils.windowWidth, import_utils.windowHeight], () => {
      if (!root.value || (0, import_utils.isHidden)(root) || !state.fixed) {
        return;
      }
      isReset.value = true;
      (0, import_vue2.nextTick)(() => {
        const rootRect = (0, import_use.useRect)(root);
        state.width = rootRect.width;
        state.height = rootRect.height;
        isReset.value = false;
      });
    });
    return () => {
      var _a;
      return (0, import_vue.createVNode)("div", {
        "ref": root,
        "style": rootStyle.value
      }, [(0, import_vue.createVNode)("div", {
        "class": bem({
          fixed: state.fixed && !isReset.value
        }),
        "style": stickyStyle.value
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    };
  }
});
