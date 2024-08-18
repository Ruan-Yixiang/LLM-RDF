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
  indexAnchorProps: () => indexAnchorProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_IndexBar = require("../index-bar/IndexBar");
var import_dom = require("../utils/dom");
var import_use = require("@vant/use");
var import_use_expose = require("../composables/use-expose");
const [name, bem] = (0, import_utils.createNamespace)("index-anchor");
const indexAnchorProps = {
  index: import_utils.numericProp
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: indexAnchorProps,
  setup(props, {
    slots
  }) {
    const state = (0, import_vue2.reactive)({
      top: 0,
      left: null,
      rect: {
        top: 0,
        height: 0
      },
      width: null,
      active: false
    });
    const root = (0, import_vue2.ref)();
    const {
      parent
    } = (0, import_use.useParent)(import_IndexBar.INDEX_BAR_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <IndexAnchor> must be a child component of <IndexBar>.");
      }
      return;
    }
    const isSticky = () => state.active && parent.props.sticky;
    const anchorStyle = (0, import_vue2.computed)(() => {
      const {
        zIndex,
        highlightColor
      } = parent.props;
      if (isSticky()) {
        return (0, import_utils.extend)((0, import_utils.getZIndexStyle)(zIndex), {
          left: state.left ? `${state.left}px` : void 0,
          width: state.width ? `${state.width}px` : void 0,
          transform: state.top ? `translate3d(0, ${state.top}px, 0)` : void 0,
          color: highlightColor
        });
      }
    });
    const getRect = (scrollParent, scrollParentRect) => {
      const rootRect = (0, import_use.useRect)(root);
      state.rect.height = rootRect.height;
      if (scrollParent === window || scrollParent === document.body) {
        state.rect.top = rootRect.top + (0, import_dom.getRootScrollTop)();
      } else {
        state.rect.top = rootRect.top + (0, import_dom.getScrollTop)(scrollParent) - scrollParentRect.top;
      }
      return state.rect;
    };
    (0, import_use_expose.useExpose)({
      state,
      getRect
    });
    return () => {
      const sticky = isSticky();
      return (0, import_vue.createVNode)("div", {
        "ref": root,
        "style": {
          height: sticky ? `${state.rect.height}px` : void 0
        }
      }, [(0, import_vue.createVNode)("div", {
        "style": anchorStyle.value,
        "class": [bem({
          sticky
        }), {
          [import_utils.BORDER_BOTTOM]: sticky
        }]
      }, [slots.default ? slots.default() : props.index])]);
    };
  }
});
