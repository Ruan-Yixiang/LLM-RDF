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
  actionBarIconProps: () => actionBarIconProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_ActionBar = require("../action-bar/ActionBar");
var import_use = require("@vant/use");
var import_use_route = require("../composables/use-route");
var import_icon = require("../icon");
var import_badge = require("../badge");
const [name, bem] = (0, import_utils.createNamespace)("action-bar-icon");
const actionBarIconProps = (0, import_utils.extend)({}, import_use_route.routeProps, {
  dot: Boolean,
  text: String,
  icon: String,
  color: String,
  badge: import_utils.numericProp,
  iconClass: import_utils.unknownProp,
  badgeProps: Object,
  iconPrefix: String
});
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: actionBarIconProps,
  setup(props, {
    slots
  }) {
    const route = (0, import_use_route.useRoute)();
    (0, import_use.useParent)(import_ActionBar.ACTION_BAR_KEY);
    const renderIcon = () => {
      const {
        dot,
        badge,
        icon,
        color,
        iconClass,
        badgeProps,
        iconPrefix
      } = props;
      if (slots.icon) {
        return (0, import_vue.createVNode)(import_badge.Badge, (0, import_vue.mergeProps)({
          "dot": dot,
          "class": bem("icon"),
          "content": badge
        }, badgeProps), {
          default: slots.icon
        });
      }
      return (0, import_vue.createVNode)(import_icon.Icon, {
        "tag": "div",
        "dot": dot,
        "name": icon,
        "badge": badge,
        "color": color,
        "class": [bem("icon"), iconClass],
        "badgeProps": badgeProps,
        "classPrefix": iconPrefix
      }, null);
    };
    return () => (0, import_vue.createVNode)("div", {
      "role": "button",
      "class": bem(),
      "tabindex": 0,
      "onClick": route
    }, [renderIcon(), slots.default ? slots.default() : props.text]);
  }
});
