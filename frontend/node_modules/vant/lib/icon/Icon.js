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
  iconProps: () => iconProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_badge = require("../badge");
var import_ConfigProvider = require("../config-provider/ConfigProvider");
const [name, bem] = (0, import_utils.createNamespace)("icon");
const isImage = (name2) => name2 == null ? void 0 : name2.includes("/");
const iconProps = {
  dot: Boolean,
  tag: (0, import_utils.makeStringProp)("i"),
  name: String,
  size: import_utils.numericProp,
  badge: import_utils.numericProp,
  color: String,
  badgeProps: Object,
  classPrefix: String
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: iconProps,
  setup(props, {
    slots
  }) {
    const config = (0, import_vue2.inject)(import_ConfigProvider.CONFIG_PROVIDER_KEY, null);
    const classPrefix = (0, import_vue2.computed)(() => props.classPrefix || (config == null ? void 0 : config.iconPrefix) || bem());
    return () => {
      const {
        tag,
        dot,
        name: name2,
        size,
        badge,
        color
      } = props;
      const isImageIcon = isImage(name2);
      return (0, import_vue.createVNode)(import_badge.Badge, (0, import_vue.mergeProps)({
        "dot": dot,
        "tag": tag,
        "class": [classPrefix.value, isImageIcon ? "" : `${classPrefix.value}-${name2}`],
        "style": {
          color,
          fontSize: (0, import_utils.addUnit)(size)
        },
        "content": badge
      }, props.badgeProps), {
        default: () => {
          var _a;
          return [(_a = slots.default) == null ? void 0 : _a.call(slots), isImageIcon && (0, import_vue.createVNode)("img", {
            "class": bem("image"),
            "src": name2
          }, null)];
        }
      });
    };
  }
});
