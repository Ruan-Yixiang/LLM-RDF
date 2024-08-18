import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
import { defineComponent } from "vue";
import { pick, extend, truthProp, makeArrayProp, createNamespace, HAPTICS_FEEDBACK } from "../utils/index.mjs";
import { popupSharedProps, popupSharedPropKeys } from "../popup/shared.mjs";
import { Icon } from "../icon/index.mjs";
import { Popup } from "../popup/index.mjs";
const isImage = (name2) => name2 == null ? void 0 : name2.includes("/");
const popupInheritKeys = [...popupSharedPropKeys, "round", "closeOnPopstate", "safeAreaInsetBottom"];
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
const [name, bem, t] = createNamespace("share-sheet");
const shareSheetProps = extend({}, popupSharedProps, {
  title: String,
  round: truthProp,
  options: makeArrayProp(),
  cancelText: String,
  description: String,
  closeOnPopstate: truthProp,
  safeAreaInsetBottom: truthProp
});
var stdin_default = defineComponent({
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
        return _createVNode("div", {
          "class": bem("header")
        }, [title && _createVNode("h2", {
          "class": bem("title")
        }, [title]), description && _createVNode("span", {
          "class": bem("description")
        }, [description])]);
      }
    };
    const renderIcon = (icon) => {
      if (isImage(icon)) {
        return _createVNode("img", {
          "src": icon,
          "class": bem("image-icon")
        }, null);
      }
      return _createVNode("div", {
        "class": bem("icon", [icon])
      }, [_createVNode(Icon, {
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
      return _createVNode("div", {
        "role": "button",
        "tabindex": 0,
        "class": [bem("option"), className, HAPTICS_FEEDBACK],
        "onClick": () => onSelect(option, index)
      }, [renderIcon(icon), name2 && _createVNode("span", {
        "class": bem("name")
      }, [name2]), description && _createVNode("span", {
        "class": bem("option-description")
      }, [description])]);
    };
    const renderOptions = (options, border) => _createVNode("div", {
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
        return _createVNode("button", {
          "type": "button",
          "class": bem("cancel"),
          "onClick": onCancel
        }, [slots.cancel ? slots.cancel() : cancelText]);
      }
    };
    return () => _createVNode(Popup, _mergeProps({
      "class": bem(),
      "position": "bottom",
      "onUpdate:show": updateShow
    }, pick(props, popupInheritKeys)), {
      default: () => [renderHeader(), renderRows(), renderCancelButton()]
    });
  }
});
export {
  stdin_default as default,
  shareSheetProps
};
