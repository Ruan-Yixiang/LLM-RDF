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
  buttonProps: () => buttonProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_use_route = require("../composables/use-route");
var import_icon = require("../icon");
var import_loading = require("../loading");
const [name, bem] = (0, import_utils.createNamespace)("button");
const buttonProps = (0, import_utils.extend)({}, import_use_route.routeProps, {
  tag: (0, import_utils.makeStringProp)("button"),
  text: String,
  icon: String,
  type: (0, import_utils.makeStringProp)("default"),
  size: (0, import_utils.makeStringProp)("normal"),
  color: String,
  block: Boolean,
  plain: Boolean,
  round: Boolean,
  square: Boolean,
  loading: Boolean,
  hairline: Boolean,
  disabled: Boolean,
  iconPrefix: String,
  nativeType: (0, import_utils.makeStringProp)("button"),
  loadingSize: import_utils.numericProp,
  loadingText: String,
  loadingType: String,
  iconPosition: (0, import_utils.makeStringProp)("left")
});
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: buttonProps,
  emits: ["click"],
  setup(props, {
    emit,
    slots
  }) {
    const route = (0, import_use_route.useRoute)();
    const renderLoadingIcon = () => {
      if (slots.loading) {
        return slots.loading();
      }
      return (0, import_vue.createVNode)(import_loading.Loading, {
        "size": props.loadingSize,
        "type": props.loadingType,
        "class": bem("loading")
      }, null);
    };
    const renderIcon = () => {
      if (props.loading) {
        return renderLoadingIcon();
      }
      if (slots.icon) {
        return (0, import_vue.createVNode)("div", {
          "class": bem("icon")
        }, [slots.icon()]);
      }
      if (props.icon) {
        return (0, import_vue.createVNode)(import_icon.Icon, {
          "name": props.icon,
          "class": bem("icon"),
          "classPrefix": props.iconPrefix
        }, null);
      }
    };
    const renderText = () => {
      let text;
      if (props.loading) {
        text = props.loadingText;
      } else {
        text = slots.default ? slots.default() : props.text;
      }
      if (text) {
        return (0, import_vue.createVNode)("span", {
          "class": bem("text")
        }, [text]);
      }
    };
    const getStyle = () => {
      const {
        color,
        plain
      } = props;
      if (color) {
        const style = {
          color: plain ? color : "white"
        };
        if (!plain) {
          style.background = color;
        }
        if (color.includes("gradient")) {
          style.border = 0;
        } else {
          style.borderColor = color;
        }
        return style;
      }
    };
    const onClick = (event) => {
      if (props.loading) {
        (0, import_utils.preventDefault)(event);
      } else if (!props.disabled) {
        emit("click", event);
        route();
      }
    };
    return () => {
      const {
        tag,
        type,
        size,
        block,
        round,
        plain,
        square,
        loading,
        disabled,
        hairline,
        nativeType,
        iconPosition
      } = props;
      const classes = [bem([type, size, {
        plain,
        block,
        round,
        square,
        loading,
        disabled,
        hairline
      }]), {
        [import_utils.BORDER_SURROUND]: hairline
      }];
      return (0, import_vue.createVNode)(tag, {
        "type": nativeType,
        "class": classes,
        "style": getStyle(),
        "disabled": disabled,
        "onClick": onClick
      }, {
        default: () => [(0, import_vue.createVNode)("div", {
          "class": bem("content")
        }, [iconPosition === "left" && renderIcon(), renderText(), iconPosition === "right" && renderIcon()])]
      });
    };
  }
});
