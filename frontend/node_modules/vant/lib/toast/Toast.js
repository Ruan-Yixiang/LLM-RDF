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
  toastProps: () => toastProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_lock_click = require("./lock-click");
var import_icon = require("../icon");
var import_popup = require("../popup");
var import_loading = require("../loading");
const [name, bem] = (0, import_utils.createNamespace)("toast");
const popupInheritProps = ["show", "overlay", "teleport", "transition", "overlayClass", "overlayStyle", "closeOnClickOverlay"];
const toastProps = {
  icon: String,
  show: Boolean,
  type: (0, import_utils.makeStringProp)("text"),
  overlay: Boolean,
  message: import_utils.numericProp,
  iconSize: import_utils.numericProp,
  duration: (0, import_utils.makeNumberProp)(2e3),
  position: (0, import_utils.makeStringProp)("middle"),
  teleport: [String, Object],
  wordBreak: String,
  className: import_utils.unknownProp,
  iconPrefix: String,
  transition: (0, import_utils.makeStringProp)("van-fade"),
  loadingType: String,
  forbidClick: Boolean,
  overlayClass: import_utils.unknownProp,
  overlayStyle: Object,
  closeOnClick: Boolean,
  closeOnClickOverlay: Boolean
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: toastProps,
  emits: ["update:show"],
  setup(props, {
    emit,
    slots
  }) {
    let timer;
    let clickable = false;
    const toggleClickable = () => {
      const newValue = props.show && props.forbidClick;
      if (clickable !== newValue) {
        clickable = newValue;
        (0, import_lock_click.lockClick)(clickable);
      }
    };
    const updateShow = (show) => emit("update:show", show);
    const onClick = () => {
      if (props.closeOnClick) {
        updateShow(false);
      }
    };
    const clearTimer = () => clearTimeout(timer);
    const renderIcon = () => {
      const {
        icon,
        type,
        iconSize,
        iconPrefix,
        loadingType
      } = props;
      const hasIcon = icon || type === "success" || type === "fail";
      if (hasIcon) {
        return (0, import_vue.createVNode)(import_icon.Icon, {
          "name": icon || type,
          "size": iconSize,
          "class": bem("icon"),
          "classPrefix": iconPrefix
        }, null);
      }
      if (type === "loading") {
        return (0, import_vue.createVNode)(import_loading.Loading, {
          "class": bem("loading"),
          "size": iconSize,
          "type": loadingType
        }, null);
      }
    };
    const renderMessage = () => {
      const {
        type,
        message
      } = props;
      if (slots.message) {
        return (0, import_vue.createVNode)("div", {
          "class": bem("text")
        }, [slots.message()]);
      }
      if ((0, import_utils.isDef)(message) && message !== "") {
        return type === "html" ? (0, import_vue.createVNode)("div", {
          "key": 0,
          "class": bem("text"),
          "innerHTML": String(message)
        }, null) : (0, import_vue.createVNode)("div", {
          "class": bem("text")
        }, [message]);
      }
    };
    (0, import_vue2.watch)(() => [props.show, props.forbidClick], toggleClickable);
    (0, import_vue2.watch)(() => [props.show, props.type, props.message, props.duration], () => {
      clearTimer();
      if (props.show && props.duration > 0) {
        timer = setTimeout(() => {
          updateShow(false);
        }, props.duration);
      }
    });
    (0, import_vue2.onMounted)(toggleClickable);
    (0, import_vue2.onUnmounted)(toggleClickable);
    return () => (0, import_vue.createVNode)(import_popup.Popup, (0, import_vue.mergeProps)({
      "class": [bem([props.position, props.wordBreak === "normal" ? "break-normal" : props.wordBreak, {
        [props.type]: !props.icon
      }]), props.className],
      "lockScroll": false,
      "onClick": onClick,
      "onClosed": clearTimer,
      "onUpdate:show": updateShow
    }, (0, import_utils.pick)(props, popupInheritProps)), {
      default: () => [renderIcon(), renderMessage()]
    });
  }
});
