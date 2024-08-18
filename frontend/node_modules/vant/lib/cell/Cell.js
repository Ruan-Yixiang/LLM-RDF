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
  cellProps: () => cellProps,
  cellSharedProps: () => cellSharedProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_use_route = require("../composables/use-route");
var import_icon = require("../icon");
const [name, bem] = (0, import_utils.createNamespace)("cell");
const cellSharedProps = {
  tag: (0, import_utils.makeStringProp)("div"),
  icon: String,
  size: String,
  title: import_utils.numericProp,
  value: import_utils.numericProp,
  label: import_utils.numericProp,
  center: Boolean,
  isLink: Boolean,
  border: import_utils.truthProp,
  required: Boolean,
  iconPrefix: String,
  valueClass: import_utils.unknownProp,
  labelClass: import_utils.unknownProp,
  titleClass: import_utils.unknownProp,
  titleStyle: null,
  arrowDirection: String,
  clickable: {
    type: Boolean,
    default: null
  }
};
const cellProps = (0, import_utils.extend)({}, cellSharedProps, import_use_route.routeProps);
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: cellProps,
  setup(props, {
    slots
  }) {
    const route = (0, import_use_route.useRoute)();
    const renderLabel = () => {
      const showLabel = slots.label || (0, import_utils.isDef)(props.label);
      if (showLabel) {
        return (0, import_vue.createVNode)("div", {
          "class": [bem("label"), props.labelClass]
        }, [slots.label ? slots.label() : props.label]);
      }
    };
    const renderTitle = () => {
      var _a;
      if (slots.title || (0, import_utils.isDef)(props.title)) {
        const titleSlot = (_a = slots.title) == null ? void 0 : _a.call(slots);
        if (Array.isArray(titleSlot) && titleSlot.length === 0) {
          return;
        }
        return (0, import_vue.createVNode)("div", {
          "class": [bem("title"), props.titleClass],
          "style": props.titleStyle
        }, [titleSlot || (0, import_vue.createVNode)("span", null, [props.title]), renderLabel()]);
      }
    };
    const renderValue = () => {
      const slot = slots.value || slots.default;
      const hasValue = slot || (0, import_utils.isDef)(props.value);
      if (hasValue) {
        return (0, import_vue.createVNode)("div", {
          "class": [bem("value"), props.valueClass]
        }, [slot ? slot() : (0, import_vue.createVNode)("span", null, [props.value])]);
      }
    };
    const renderLeftIcon = () => {
      if (slots.icon) {
        return slots.icon();
      }
      if (props.icon) {
        return (0, import_vue.createVNode)(import_icon.Icon, {
          "name": props.icon,
          "class": bem("left-icon"),
          "classPrefix": props.iconPrefix
        }, null);
      }
    };
    const renderRightIcon = () => {
      if (slots["right-icon"]) {
        return slots["right-icon"]();
      }
      if (props.isLink) {
        const name2 = props.arrowDirection && props.arrowDirection !== "right" ? `arrow-${props.arrowDirection}` : "arrow";
        return (0, import_vue.createVNode)(import_icon.Icon, {
          "name": name2,
          "class": bem("right-icon")
        }, null);
      }
    };
    return () => {
      var _a;
      const {
        tag,
        size,
        center,
        border,
        isLink,
        required
      } = props;
      const clickable = (_a = props.clickable) != null ? _a : isLink;
      const classes = {
        center,
        required,
        clickable,
        borderless: !border
      };
      if (size) {
        classes[size] = !!size;
      }
      return (0, import_vue.createVNode)(tag, {
        "class": bem(classes),
        "role": clickable ? "button" : void 0,
        "tabindex": clickable ? 0 : void 0,
        "onClick": route
      }, {
        default: () => {
          var _a2;
          return [renderLeftIcon(), renderTitle(), renderValue(), renderRightIcon(), (_a2 = slots.extra) == null ? void 0 : _a2.call(slots)];
        }
      });
    };
  }
});
