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
  loadingProps: () => loadingProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
const [name, bem] = (0, import_utils.createNamespace)("loading");
const SpinIcon = Array(12).fill(null).map((_, index) => (0, import_vue.createVNode)("i", {
  "class": bem("line", String(index + 1))
}, null));
const CircularIcon = (0, import_vue.createVNode)("svg", {
  "class": bem("circular"),
  "viewBox": "25 25 50 50"
}, [(0, import_vue.createVNode)("circle", {
  "cx": "50",
  "cy": "50",
  "r": "20",
  "fill": "none"
}, null)]);
const loadingProps = {
  size: import_utils.numericProp,
  type: (0, import_utils.makeStringProp)("circular"),
  color: String,
  vertical: Boolean,
  textSize: import_utils.numericProp,
  textColor: String
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: loadingProps,
  setup(props, {
    slots
  }) {
    const spinnerStyle = (0, import_vue2.computed)(() => (0, import_utils.extend)({
      color: props.color
    }, (0, import_utils.getSizeStyle)(props.size)));
    const renderIcon = () => {
      const DefaultIcon = props.type === "spinner" ? SpinIcon : CircularIcon;
      return (0, import_vue.createVNode)("span", {
        "class": bem("spinner", props.type),
        "style": spinnerStyle.value
      }, [slots.icon ? slots.icon() : DefaultIcon]);
    };
    const renderText = () => {
      var _a;
      if (slots.default) {
        return (0, import_vue.createVNode)("span", {
          "class": bem("text"),
          "style": {
            fontSize: (0, import_utils.addUnit)(props.textSize),
            color: (_a = props.textColor) != null ? _a : props.color
          }
        }, [slots.default()]);
      }
    };
    return () => {
      const {
        type,
        vertical
      } = props;
      return (0, import_vue.createVNode)("div", {
        "class": bem([type, {
          vertical
        }]),
        "aria-live": "polite",
        "aria-busy": true
      }, [renderIcon(), renderText()]);
    };
  }
});
