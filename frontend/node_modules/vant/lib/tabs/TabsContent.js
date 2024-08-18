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
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_swipe = require("../swipe");
var import_use_expose = require("../composables/use-expose");
const [name, bem] = (0, import_utils.createNamespace)("tabs");
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: {
    count: (0, import_utils.makeRequiredProp)(Number),
    inited: Boolean,
    animated: Boolean,
    duration: (0, import_utils.makeRequiredProp)(import_utils.numericProp),
    swipeable: Boolean,
    lazyRender: Boolean,
    currentIndex: (0, import_utils.makeRequiredProp)(Number)
  },
  emits: ["change"],
  setup(props, {
    emit,
    slots
  }) {
    const swipeRef = (0, import_vue2.ref)();
    const onChange = (index) => emit("change", index);
    const renderChildren = () => {
      var _a;
      const Content = (_a = slots.default) == null ? void 0 : _a.call(slots);
      if (props.animated || props.swipeable) {
        return (0, import_vue.createVNode)(import_swipe.Swipe, {
          "ref": swipeRef,
          "loop": false,
          "class": bem("track"),
          "duration": +props.duration * 1e3,
          "touchable": props.swipeable,
          "lazyRender": props.lazyRender,
          "showIndicators": false,
          "onChange": onChange
        }, {
          default: () => [Content]
        });
      }
      return Content;
    };
    const swipeToCurrentTab = (index) => {
      const swipe = swipeRef.value;
      if (swipe && swipe.state.active !== index) {
        swipe.swipeTo(index, {
          immediate: !props.inited
        });
      }
    };
    (0, import_vue2.watch)(() => props.currentIndex, swipeToCurrentTab);
    (0, import_vue2.onMounted)(() => {
      swipeToCurrentTab(props.currentIndex);
    });
    (0, import_use_expose.useExpose)({
      swipeRef
    });
    return () => (0, import_vue.createVNode)("div", {
      "class": bem("content", {
        animated: props.animated || props.swipeable
      })
    }, [renderChildren()]);
  }
});
