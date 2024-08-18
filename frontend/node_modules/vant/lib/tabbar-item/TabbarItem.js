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
  tabbarItemProps: () => tabbarItemProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_Tabbar = require("../tabbar/Tabbar");
var import_use = require("@vant/use");
var import_use_route = require("../composables/use-route");
var import_icon = require("../icon");
var import_badge = require("../badge");
const [name, bem] = (0, import_utils.createNamespace)("tabbar-item");
const tabbarItemProps = (0, import_utils.extend)({}, import_use_route.routeProps, {
  dot: Boolean,
  icon: String,
  name: import_utils.numericProp,
  badge: import_utils.numericProp,
  badgeProps: Object,
  iconPrefix: String
});
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: tabbarItemProps,
  emits: ["click"],
  setup(props, {
    emit,
    slots
  }) {
    const route = (0, import_use_route.useRoute)();
    const vm = (0, import_vue2.getCurrentInstance)().proxy;
    const {
      parent,
      index
    } = (0, import_use.useParent)(import_Tabbar.TABBAR_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <TabbarItem> must be a child component of <Tabbar>.");
      }
      return;
    }
    const active = (0, import_vue2.computed)(() => {
      var _a;
      const {
        route: route2,
        modelValue
      } = parent.props;
      if (route2 && "$route" in vm) {
        const {
          $route
        } = vm;
        const {
          to
        } = props;
        const config = (0, import_utils.isObject)(to) ? to : {
          path: to
        };
        return !!$route.matched.find((val) => {
          const pathMatched = "path" in config && config.path === val.path;
          const nameMatched = "name" in config && config.name === val.name;
          return pathMatched || nameMatched;
        });
      }
      return ((_a = props.name) != null ? _a : index.value) === modelValue;
    });
    const onClick = (event) => {
      var _a;
      if (!active.value) {
        parent.setActive((_a = props.name) != null ? _a : index.value, route);
      }
      emit("click", event);
    };
    const renderIcon = () => {
      if (slots.icon) {
        return slots.icon({
          active: active.value
        });
      }
      if (props.icon) {
        return (0, import_vue.createVNode)(import_icon.Icon, {
          "name": props.icon,
          "classPrefix": props.iconPrefix
        }, null);
      }
    };
    return () => {
      var _a;
      const {
        dot,
        badge
      } = props;
      const {
        activeColor,
        inactiveColor
      } = parent.props;
      const color = active.value ? activeColor : inactiveColor;
      return (0, import_vue.createVNode)("div", {
        "role": "tab",
        "class": bem({
          active: active.value
        }),
        "style": {
          color
        },
        "tabindex": 0,
        "aria-selected": active.value,
        "onClick": onClick
      }, [(0, import_vue.createVNode)(import_badge.Badge, (0, import_vue.mergeProps)({
        "dot": dot,
        "class": bem("icon"),
        "content": badge
      }, props.badgeProps), {
        default: renderIcon
      }), (0, import_vue.createVNode)("div", {
        "class": bem("text")
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots, {
        active: active.value
      })])]);
    };
  }
});
