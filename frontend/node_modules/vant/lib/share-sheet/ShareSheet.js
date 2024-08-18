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
  shareSheetProps: () => shareSheetProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_shared = require("../popup/shared");
var import_icon = require("../icon");
var import_popup = require("../popup");
const isImage = (name2) => name2 == null ? void 0 : name2.includes("/");
const popupInheritKeys = [...import_shared.popupSharedPropKeys, "round", "closeOnPopstate", "safeAreaInsetBottom"];
const iconMap = {
  qq: "qq",
  link: "link-o",
  weibo: "weibo",
  qrcode: "qr",
  poster: "photo-o",
  wechat: "wechat",
  "weapp-qrcode": "miniprogram-o",
  "wechat-moments": "wechat-moments"
};
const [name, bem, t] = (0, import_utils.createNamespace)("share-sheet");
const shareSheetProps = (0, import_utils.extend)({}, import_shared.popupSharedProps, {
  title: String,
  round: import_utils.truthProp,
  options: (0, import_utils.makeArrayProp)(),
  cancelText: String,
  description: String,
  closeOnPopstate: import_utils.truthProp,
  safeAreaInsetBottom: import_utils.truthProp
});
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: shareSheetProps,
  emits: ["cancel", "select", "update:show"],
  setup(props, {
    emit,
    slots
  }) {
    const updateShow = (value) => emit("update:show", value);
    const onCancel = () => {
      updateShow(false);
      emit("cancel");
    };
    const onSelect = (option, index) => emit("select", option, index);
    const renderHeader = () => {
      const title = slots.title ? slots.title() : props.title;
      const description = slots.description ? slots.description() : props.description;
      if (title || description) {
        return (0, import_vue.createVNode)("div", {
          "class": bem("header")
        }, [title && (0, import_vue.createVNode)("h2", {
          "class": bem("title")
        }, [title]), description && (0, import_vue.createVNode)("span", {
          "class": bem("description")
        }, [description])]);
      }
    };
    const renderIcon = (icon) => {
      if (isImage(icon)) {
        return (0, import_vue.createVNode)("img", {
          "src": icon,
          "class": bem("image-icon")
        }, null);
      }
      return (0, import_vue.createVNode)("div", {
        "class": bem("icon", [icon])
      }, [(0, import_vue.createVNode)(import_icon.Icon, {
        "name": iconMap[icon] || icon
      }, null)]);
    };
    const renderOption = (option, index) => {
      const {
        name: name2,
        icon,
        className,
        description
      } = option;
      return (0, import_vue.createVNode)("div", {
        "role": "button",
        "tabindex": 0,
        "class": [bem("option"), className, import_utils.HAPTICS_FEEDBACK],
        "onClick": () => onSelect(option, index)
      }, [renderIcon(icon), name2 && (0, import_vue.createVNode)("span", {
        "class": bem("name")
      }, [name2]), description && (0, import_vue.createVNode)("span", {
        "class": bem("option-description")
      }, [description])]);
    };
    const renderOptions = (options, border) => (0, import_vue.createVNode)("div", {
      "class": bem("options", {
        border
      })
    }, [options.map(renderOption)]);
    const renderRows = () => {
      const {
        options
      } = props;
      if (Array.isArray(options[0])) {
        return options.map((item, index) => renderOptions(item, index !== 0));
      }
      return renderOptions(options);
    };
    const renderCancelButton = () => {
      var _a;
      const cancelText = (_a = props.cancelText) != null ? _a : t("cancel");
      if (slots.cancel || cancelText) {
        return (0, import_vue.createVNode)("button", {
          "type": "button",
          "class": bem("cancel"),
          "onClick": onCancel
        }, [slots.cancel ? slots.cancel() : cancelText]);
      }
    };
    return () => (0, import_vue.createVNode)(import_popup.Popup, (0, import_vue.mergeProps)({
      "class": bem(),
      "position": "bottom",
      "onUpdate:show": updateShow
    }, (0, import_utils.pick)(props, popupInheritKeys)), {
      default: () => [renderHeader(), renderRows(), renderCancelButton()]
    });
  }
});
