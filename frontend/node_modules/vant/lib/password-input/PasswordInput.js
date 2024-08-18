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
  passwordInputProps: () => passwordInputProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
const [name, bem] = (0, import_utils.createNamespace)("password-input");
const passwordInputProps = {
  info: String,
  mask: import_utils.truthProp,
  value: (0, import_utils.makeStringProp)(""),
  gutter: import_utils.numericProp,
  length: (0, import_utils.makeNumericProp)(6),
  focused: Boolean,
  errorInfo: String
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: passwordInputProps,
  emits: ["focus"],
  setup(props, {
    emit
  }) {
    const onTouchStart = (event) => {
      event.stopPropagation();
      emit("focus", event);
    };
    const renderPoints = () => {
      const Points = [];
      const {
        mask,
        value,
        gutter,
        focused
      } = props;
      const length = +props.length;
      for (let i = 0; i < length; i++) {
        const char = value[i];
        const showBorder = i !== 0 && !gutter;
        const showCursor = focused && i === value.length;
        let style;
        if (i !== 0 && gutter) {
          style = {
            marginLeft: (0, import_utils.addUnit)(gutter)
          };
        }
        Points.push((0, import_vue.createVNode)("li", {
          "class": [{
            [import_utils.BORDER_LEFT]: showBorder
          }, bem("item", {
            focus: showCursor
          })],
          "style": style
        }, [mask ? (0, import_vue.createVNode)("i", {
          "style": {
            visibility: char ? "visible" : "hidden"
          }
        }, null) : char, showCursor && (0, import_vue.createVNode)("div", {
          "class": bem("cursor")
        }, null)]));
      }
      return Points;
    };
    return () => {
      const info = props.errorInfo || props.info;
      return (0, import_vue.createVNode)("div", {
        "class": bem()
      }, [(0, import_vue.createVNode)("ul", {
        "class": [bem("security"), {
          [import_utils.BORDER_SURROUND]: !props.gutter
        }],
        "onTouchstartPassive": onTouchStart
      }, [renderPoints()]), info && (0, import_vue.createVNode)("div", {
        "class": bem(props.errorInfo ? "error-info" : "info")
      }, [info])]);
    };
  }
});
