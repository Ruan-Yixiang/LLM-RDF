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
  overlayProps: () => overlayProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_use = require("@vant/use");
var import_use_lazy_render = require("../composables/use-lazy-render");
const [name, bem] = (0, import_utils.createNamespace)("overlay");
const overlayProps = {
  show: Boolean,
  zIndex: import_utils.numericProp,
  duration: import_utils.numericProp,
  className: import_utils.unknownProp,
  lockScroll: import_utils.truthProp,
  lazyRender: import_utils.truthProp,
  customStyle: Object
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: overlayProps,
  setup(props, {
    slots
  }) {
    const root = (0, import_vue2.ref)();
    const lazyRender = (0, import_use_lazy_render.useLazyRender)(() => props.show || !props.lazyRender);
    const onTouchMove = (event) => {
      if (props.lockScroll) {
        (0, import_utils.preventDefault)(event, true);
      }
    };
    const renderOverlay = lazyRender(() => {
      var _a;
      const style = (0, import_utils.extend)((0, import_utils.getZIndexStyle)(props.zIndex), props.customStyle);
      if ((0, import_utils.isDef)(props.duration)) {
        style.animationDuration = `${props.duration}s`;
      }
      return (0, import_vue.withDirectives)((0, import_vue.createVNode)("div", {
        "ref": root,
        "style": style,
        "class": [bem(), props.className]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), [[import_vue.vShow, props.show]]);
    });
    (0, import_use.useEventListener)("touchmove", onTouchMove, {
      target: root
    });
    return () => (0, import_vue.createVNode)(import_vue2.Transition, {
      "name": "van-fade",
      "appear": true
    }, {
      default: renderOverlay
    });
  }
});
