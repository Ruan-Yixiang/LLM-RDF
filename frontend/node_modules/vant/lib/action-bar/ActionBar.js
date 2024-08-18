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
  ACTION_BAR_KEY: () => ACTION_BAR_KEY,
  actionBarProps: () => actionBarProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_use = require("@vant/use");
var import_use_placeholder = require("../composables/use-placeholder");
const [name, bem] = (0, import_utils.createNamespace)("action-bar");
const ACTION_BAR_KEY = Symbol(name);
const actionBarProps = {
  placeholder: Boolean,
  safeAreaInsetBottom: import_utils.truthProp
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: actionBarProps,
  setup(props, {
    slots
  }) {
    const root = (0, import_vue2.ref)();
    const renderPlaceholder = (0, import_use_placeholder.usePlaceholder)(root, bem);
    const {
      linkChildren
    } = (0, import_use.useChildren)(ACTION_BAR_KEY);
    linkChildren();
    const renderActionBar = () => {
      var _a;
      return (0, import_vue.createVNode)("div", {
        "ref": root,
        "class": [bem(), {
          "van-safe-area-bottom": props.safeAreaInsetBottom
        }]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
    return () => {
      if (props.placeholder) {
        return renderPlaceholder(renderActionBar);
      }
      return renderActionBar();
    };
  }
});
