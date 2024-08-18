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
  INDEX_BAR_KEY: () => INDEX_BAR_KEY,
  default: () => stdin_default,
  indexBarProps: () => indexBarProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_use = require("@vant/use");
var import_use_touch = require("../composables/use-touch");
var import_use_expose = require("../composables/use-expose");
function genAlphabet() {
  const charCodeOfA = "A".charCodeAt(0);
  const indexList = Array(26).fill("").map((_, i) => String.fromCharCode(charCodeOfA + i));
  return indexList;
}
const [name, bem] = (0, import_utils.createNamespace)("index-bar");
const indexBarProps = {
  sticky: import_utils.truthProp,
  zIndex: import_utils.numericProp,
  teleport: [String, Object],
  highlightColor: String,
  stickyOffsetTop: (0, import_utils.makeNumberProp)(0),
  indexList: {
    type: Array,
    default: genAlphabet
  }
};
const INDEX_BAR_KEY = Symbol(name);
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: indexBarProps,
  emits: ["select", "change"],
  setup(props, {
    emit,
    slots
  }) {
    const root = (0, import_vue2.ref)();
    const sidebar = (0, import_vue2.ref)();
    const activeAnchor = (0, import_vue2.ref)("");
    const touch = (0, import_use_touch.useTouch)();
    const scrollParent = (0, import_use.useScrollParent)(root);
    const {
      children,
      linkChildren
    } = (0, import_use.useChildren)(INDEX_BAR_KEY);
    let selectActiveIndex;
    linkChildren({
      props
    });
    const sidebarStyle = (0, import_vue2.computed)(() => {
      if ((0, import_utils.isDef)(props.zIndex)) {
        return {
          zIndex: +props.zIndex + 1
        };
      }
    });
    const highlightStyle = (0, import_vue2.computed)(() => {
      if (props.highlightColor) {
        return {
          color: props.highlightColor
        };
      }
    });
    const getActiveAnchor = (scrollTop, rects) => {
      for (let i = children.length - 1; i >= 0; i--) {
        const prevHeight = i > 0 ? rects[i - 1].height : 0;
        const reachTop = props.sticky ? prevHeight + props.stickyOffsetTop : 0;
        if (scrollTop + reachTop >= rects[i].top) {
          return i;
        }
      }
      return -1;
    };
    const getMatchAnchor = (index) => children.find((item) => String(item.index) === index);
    const onScroll = () => {
      if ((0, import_utils.isHidden)(root)) {
        return;
      }
      const {
        sticky,
        indexList
      } = props;
      const scrollTop = (0, import_utils.getScrollTop)(scrollParent.value);
      const scrollParentRect = (0, import_use.useRect)(scrollParent);
      const rects = children.map((item) => item.getRect(scrollParent.value, scrollParentRect));
      let active = -1;
      if (selectActiveIndex) {
        const match = getMatchAnchor(selectActiveIndex);
        if (match) {
          const rect = match.getRect(scrollParent.value, scrollParentRect);
          active = getActiveAnchor(rect.top, rects);
        }
      } else {
        active = getActiveAnchor(scrollTop, rects);
      }
      activeAnchor.value = indexList[active];
      if (sticky) {
        children.forEach((item, index) => {
          const {
            state,
            $el
          } = item;
          if (index === active || index === active - 1) {
            const rect = $el.getBoundingClientRect();
            state.left = rect.left;
            state.width = rect.width;
          } else {
            state.left = null;
            state.width = null;
          }
          if (index === active) {
            state.active = true;
            state.top = Math.max(props.stickyOffsetTop, rects[index].top - scrollTop) + scrollParentRect.top;
          } else if (index === active - 1 && selectActiveIndex === "") {
            const activeItemTop = rects[active].top - scrollTop;
            state.active = activeItemTop > 0;
            state.top = activeItemTop + scrollParentRect.top - rects[index].height;
          } else {
            state.active = false;
          }
        });
      }
      selectActiveIndex = "";
    };
    const init = () => {
      (0, import_vue2.nextTick)(onScroll);
    };
    (0, import_use.useEventListener)("scroll", onScroll, {
      target: scrollParent,
      passive: true
    });
    (0, import_vue2.onMounted)(init);
    (0, import_vue2.watch)(() => props.indexList, init);
    (0, import_vue2.watch)(activeAnchor, (value) => {
      if (value) {
        emit("change", value);
      }
    });
    const renderIndexes = () => props.indexList.map((index) => {
      const active = index === activeAnchor.value;
      return (0, import_vue.createVNode)("span", {
        "class": bem("index", {
          active
        }),
        "style": active ? highlightStyle.value : void 0,
        "data-index": index
      }, [index]);
    });
    const scrollTo = (index) => {
      selectActiveIndex = String(index);
      const match = getMatchAnchor(selectActiveIndex);
      if (match) {
        const scrollTop = (0, import_utils.getScrollTop)(scrollParent.value);
        const scrollParentRect = (0, import_use.useRect)(scrollParent);
        const {
          offsetHeight
        } = document.documentElement;
        match.$el.scrollIntoView();
        if (scrollTop === offsetHeight - scrollParentRect.height) {
          onScroll();
          return;
        }
        if (props.sticky && props.stickyOffsetTop) {
          (0, import_utils.setRootScrollTop)((0, import_utils.getRootScrollTop)() - props.stickyOffsetTop);
        }
        emit("select", match.index);
      }
    };
    const scrollToElement = (element) => {
      const {
        index
      } = element.dataset;
      if (index) {
        scrollTo(index);
      }
    };
    const onClickSidebar = (event) => {
      scrollToElement(event.target);
    };
    let touchActiveIndex;
    const onTouchMove = (event) => {
      touch.move(event);
      if (touch.isVertical()) {
        (0, import_utils.preventDefault)(event);
        const {
          clientX,
          clientY
        } = event.touches[0];
        const target = document.elementFromPoint(clientX, clientY);
        if (target) {
          const {
            index
          } = target.dataset;
          if (index && touchActiveIndex !== index) {
            touchActiveIndex = index;
            scrollToElement(target);
          }
        }
      }
    };
    const renderSidebar = () => (0, import_vue.createVNode)("div", {
      "ref": sidebar,
      "class": bem("sidebar"),
      "style": sidebarStyle.value,
      "onClick": onClickSidebar,
      "onTouchstartPassive": touch.start
    }, [renderIndexes()]);
    (0, import_use_expose.useExpose)({
      scrollTo
    });
    (0, import_use.useEventListener)("touchmove", onTouchMove, {
      target: sidebar
    });
    return () => {
      var _a;
      return (0, import_vue.createVNode)("div", {
        "ref": root,
        "class": bem()
      }, [props.teleport ? (0, import_vue.createVNode)(import_vue2.Teleport, {
        "to": props.teleport
      }, {
        default: () => [renderSidebar()]
      }) : renderSidebar(), (_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
