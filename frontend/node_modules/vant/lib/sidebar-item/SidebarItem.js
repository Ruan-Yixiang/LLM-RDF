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
  sidebarItemProps: () => sidebarItemProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_Sidebar = require("../sidebar/Sidebar");
var import_use = require("@vant/use");
var import_use_route = require("../composables/use-route");
var import_badge = require("../badge");
const [name, bem] = (0, import_utils.createNamespace)("sidebar-item");
const sidebarItemProps = (0, import_utils.extend)({}, import_use_route.routeProps, {
  dot: Boolean,
  title: String,
  badge: import_utils.numericProp,
  disabled: Boolean,
  badgeProps: Object
});
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: sidebarItemProps,
  emits: ["click"],
  setup(props, {
    emit,
    slots
  }) {
    const route = (0, import_use_route.useRoute)();
    const {
      parent,
      index
    } = (0, import_use.useParent)(import_Sidebar.SIDEBAR_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <SidebarItem> must be a child component of <Sidebar>.");
      }
      return;
    }
    const onClick = () => {
      if (props.disabled) {
        return;
      }
      emit("click", index.value);
      parent.setActive(index.value);
      route();
    };
    return () => {
      const {
        dot,
        badge,
        title,
        disabled
      } = props;
      const selected = index.value === parent.getActive();
      return (0, import_vue.createVNode)("div", {
        "role": "tab",
        "class": bem({
          select: selected,
          disabled
        }),
        "tabindex": disabled ? void 0 : 0,
        "aria-selected": selected,
        "onClick": onClick
      }, [(0, import_vue.createVNode)(import_badge.Badge, (0, import_vue.mergeProps)({
        "dot": dot,
        "class": bem("text"),
        "content": badge
      }, props.badgeProps), {
        default: () => [slots.title ? slots.title() : title]
      })]);
    };
  }
});
