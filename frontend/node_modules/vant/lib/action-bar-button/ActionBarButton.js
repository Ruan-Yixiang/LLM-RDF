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
  actionBarButtonProps: () => actionBarButtonProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_ActionBar = require("../action-bar/ActionBar");
var import_use = require("@vant/use");
var import_use_expose = require("../composables/use-expose");
var import_use_route = require("../composables/use-route");
var import_button = require("../button");
const [name, bem] = (0, import_utils.createNamespace)("action-bar-button");
const actionBarButtonProps = (0, import_utils.extend)({}, import_use_route.routeProps, {
  type: String,
  text: String,
  icon: String,
  color: String,
  loading: Boolean,
  disabled: Boolean
});
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: actionBarButtonProps,
  setup(props, {
    slots
  }) {
    const route = (0, import_use_route.useRoute)();
    const {
      parent,
      index
    } = (0, import_use.useParent)(import_ActionBar.ACTION_BAR_KEY);
    const isFirst = (0, import_vue2.computed)(() => {
      if (parent) {
        const prev = parent.children[index.value - 1];
        return !(prev && "isButton" in prev);
      }
    });
    const isLast = (0, import_vue2.computed)(() => {
      if (parent) {
        const next = parent.children[index.value + 1];
        return !(next && "isButton" in next);
      }
    });
    (0, import_use_expose.useExpose)({
      isButton: true
    });
    return () => {
      const {
        type,
        icon,
        text,
        color,
        loading,
        disabled
      } = props;
      return (0, import_vue.createVNode)(import_button.Button, {
        "class": bem([type, {
          last: isLast.value,
          first: isFirst.value
        }]),
        "size": "large",
        "type": type,
        "icon": icon,
        "color": color,
        "loading": loading,
        "disabled": disabled,
        "onClick": route
      }, {
        default: () => [slots.default ? slots.default() : text]
      });
    };
  }
});
