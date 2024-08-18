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
  backTopProps: () => backTopProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_util = require("../lazyload/vue-lazyload/util");
var import_use = require("@vant/use");
var import_icon = require("../icon");
const [name, bem] = (0, import_utils.createNamespace)("back-top");
const backTopProps = {
  right: import_utils.numericProp,
  bottom: import_utils.numericProp,
  zIndex: import_utils.numericProp,
  target: [String, Object],
  offset: (0, import_utils.makeNumericProp)(200),
  immediate: Boolean,
  teleport: {
    type: [String, Object],
    default: "body"
  }
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  inheritAttrs: false,
  props: backTopProps,
  emits: ["click"],
  setup(props, {
    emit,
    slots,
    attrs
  }) {
    let shouldReshow = false;
    const show = (0, import_vue2.ref)(false);
    const root = (0, import_vue2.ref)();
    const scrollParent = (0, import_vue2.ref)();
    const style = (0, import_vue2.computed)(() => (0, import_utils.extend)((0, import_utils.getZIndexStyle)(props.zIndex), {
      right: (0, import_utils.addUnit)(props.right),
      bottom: (0, import_utils.addUnit)(props.bottom)
    }));
    const onClick = (event) => {
      var _a;
      emit("click", event);
      (_a = scrollParent.value) == null ? void 0 : _a.scrollTo({
        top: 0,
        behavior: props.immediate ? "auto" : "smooth"
      });
    };
    const scroll = () => {
      show.value = scrollParent.value ? (0, import_utils.getScrollTop)(scrollParent.value) >= +props.offset : false;
    };
    const getTarget = () => {
      const {
        target
      } = props;
      if (typeof target === "string") {
        const el = document.querySelector(target);
        if (el) {
          return el;
        }
        if (process.env.NODE_ENV !== "production") {
          console.error(`[Vant] BackTop: target element "${target}" was not found, the BackTop component will not be rendered.`);
        }
      } else {
        return target;
      }
    };
    const updateTarget = () => {
      if (import_utils.inBrowser) {
        (0, import_vue2.nextTick)(() => {
          scrollParent.value = props.target ? getTarget() : (0, import_use.getScrollParent)(root.value);
          scroll();
        });
      }
    };
    (0, import_use.useEventListener)("scroll", (0, import_util.throttle)(scroll, 100), {
      target: scrollParent
    });
    (0, import_vue2.onMounted)(updateTarget);
    (0, import_vue2.onActivated)(() => {
      if (shouldReshow) {
        show.value = true;
        shouldReshow = false;
      }
    });
    (0, import_vue2.onDeactivated)(() => {
      if (show.value && props.teleport) {
        show.value = false;
        shouldReshow = true;
      }
    });
    (0, import_vue2.watch)(() => props.target, updateTarget);
    return () => {
      const Content = (0, import_vue.createVNode)("div", (0, import_vue.mergeProps)({
        "ref": !props.teleport ? root : void 0,
        "class": bem({
          active: show.value
        }),
        "style": style.value,
        "onClick": onClick
      }, attrs), [slots.default ? slots.default() : (0, import_vue.createVNode)(import_icon.Icon, {
        "name": "back-top",
        "class": bem("icon")
      }, null)]);
      if (props.teleport) {
        return [(0, import_vue.createVNode)("div", {
          "ref": root,
          "class": bem("placeholder")
        }, null), (0, import_vue.createVNode)(import_vue2.Teleport, {
          "to": props.teleport
        }, {
          default: () => [Content]
        })];
      }
      return Content;
    };
  }
});
