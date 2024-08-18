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
  navBarProps: () => navBarProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_use_placeholder = require("../composables/use-placeholder");
var import_icon = require("../icon");
const [name, bem] = (0, import_utils.createNamespace)("nav-bar");
const navBarProps = {
  title: String,
  fixed: Boolean,
  zIndex: import_utils.numericProp,
  border: import_utils.truthProp,
  leftText: String,
  rightText: String,
  leftArrow: Boolean,
  placeholder: Boolean,
  safeAreaInsetTop: Boolean,
  clickable: import_utils.truthProp
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: navBarProps,
  emits: ["clickLeft", "clickRight"],
  setup(props, {
    emit,
    slots
  }) {
    const navBarRef = (0, import_vue2.ref)();
    const renderPlaceholder = (0, import_use_placeholder.usePlaceholder)(navBarRef, bem);
    const onClickLeft = (event) => emit("clickLeft", event);
    const onClickRight = (event) => emit("clickRight", event);
    const renderLeft = () => {
      if (slots.left) {
        return slots.left();
      }
      return [props.leftArrow && (0, import_vue.createVNode)(import_icon.Icon, {
        "class": bem("arrow"),
        "name": "arrow-left"
      }, null), props.leftText && (0, import_vue.createVNode)("span", {
        "class": bem("text")
      }, [props.leftText])];
    };
    const renderRight = () => {
      if (slots.right) {
        return slots.right();
      }
      return (0, import_vue.createVNode)("span", {
        "class": bem("text")
      }, [props.rightText]);
    };
    const renderNavBar = () => {
      const {
        title,
        fixed,
        border,
        zIndex
      } = props;
      const style = (0, import_utils.getZIndexStyle)(zIndex);
      const hasLeft = props.leftArrow || props.leftText || slots.left;
      const hasRight = props.rightText || slots.right;
      return (0, import_vue.createVNode)("div", {
        "ref": navBarRef,
        "style": style,
        "class": [bem({
          fixed
        }), {
          [import_utils.BORDER_BOTTOM]: border,
          "van-safe-area-top": props.safeAreaInsetTop
        }]
      }, [(0, import_vue.createVNode)("div", {
        "class": bem("content")
      }, [hasLeft && (0, import_vue.createVNode)("div", {
        "class": [bem("left"), props.clickable ? import_utils.HAPTICS_FEEDBACK : ""],
        "onClick": onClickLeft
      }, [renderLeft()]), (0, import_vue.createVNode)("div", {
        "class": [bem("title"), "van-ellipsis"]
      }, [slots.title ? slots.title() : title]), hasRight && (0, import_vue.createVNode)("div", {
        "class": [bem("right"), props.clickable ? import_utils.HAPTICS_FEEDBACK : ""],
        "onClick": onClickRight
      }, [renderRight()])])]);
    };
    return () => {
      if (props.fixed && props.placeholder) {
        return renderPlaceholder(renderNavBar);
      }
      return renderNavBar();
    };
  }
});
