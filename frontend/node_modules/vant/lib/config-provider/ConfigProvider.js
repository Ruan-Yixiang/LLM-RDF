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
  CONFIG_PROVIDER_KEY: () => CONFIG_PROVIDER_KEY,
  configProviderProps: () => configProviderProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_use_global_z_index = require("../composables/use-global-z-index");
const [name, bem] = (0, import_utils.createNamespace)("config-provider");
const CONFIG_PROVIDER_KEY = Symbol(name);
const configProviderProps = {
  tag: (0, import_utils.makeStringProp)("div"),
  theme: (0, import_utils.makeStringProp)("light"),
  zIndex: Number,
  themeVars: Object,
  themeVarsDark: Object,
  themeVarsLight: Object,
  iconPrefix: String
};
function mapThemeVarsToCSSVars(themeVars) {
  const cssVars = {};
  Object.keys(themeVars).forEach((key) => {
    cssVars[`--van-${(0, import_utils.kebabCase)(key)}`] = themeVars[key];
  });
  return cssVars;
}
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: configProviderProps,
  setup(props, {
    slots
  }) {
    const style = (0, import_vue2.computed)(() => mapThemeVarsToCSSVars((0, import_utils.extend)({}, props.themeVars, props.theme === "dark" ? props.themeVarsDark : props.themeVarsLight)));
    if (import_utils.inBrowser) {
      const addTheme = () => {
        document.documentElement.classList.add(`van-theme-${props.theme}`);
      };
      const removeTheme = (theme = props.theme) => {
        document.documentElement.classList.remove(`van-theme-${theme}`);
      };
      (0, import_vue2.watch)(() => props.theme, (newVal, oldVal) => {
        if (oldVal) {
          removeTheme(oldVal);
        }
        addTheme();
      }, {
        immediate: true
      });
      (0, import_vue2.onActivated)(addTheme);
      (0, import_vue2.onDeactivated)(removeTheme);
      (0, import_vue2.onBeforeUnmount)(removeTheme);
    }
    (0, import_vue2.provide)(CONFIG_PROVIDER_KEY, props);
    (0, import_vue2.watchEffect)(() => {
      if (props.zIndex !== void 0) {
        (0, import_use_global_z_index.setGlobalZIndex)(props.zIndex);
      }
    });
    return () => (0, import_vue.createVNode)(props.tag, {
      "class": bem(),
      "style": style.value
    }, {
      default: () => {
        var _a;
        return [(_a = slots.default) == null ? void 0 : _a.call(slots)];
      }
    });
  }
});
