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
  badgeProps: () => badgeProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
const [name, bem] = (0, import_utils.createNamespace)("badge");
const badgeProps = {
  dot: Boolean,
  max: import_utils.numericProp,
  tag: (0, import_utils.makeStringProp)("div"),
  color: String,
  offset: Array,
  content: import_utils.numericProp,
  showZero: import_utils.truthProp,
  position: (0, import_utils.makeStringProp)("top-right")
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: badgeProps,
  setup(props, {
    slots
  }) {
    const hasContent = () => {
      if (slots.content) {
        return true;
      }
      const {
        content,
        showZero
      } = props;
      return (0, import_utils.isDef)(content) && content !== "" && (showZero || content !== 0 && content !== "0");
    };
    const renderContent = () => {
      const {
        dot,
        max,
        content
      } = props;
      if (!dot && hasContent()) {
        if (slots.content) {
          return slots.content();
        }
        if ((0, import_utils.isDef)(max) && (0, import_utils.isNumeric)(content) && +content > +max) {
          return `${max}+`;
        }
        return content;
      }
    };
    const getOffsetWithMinusString = (val) => val.startsWith("-") ? val.replace("-", "") : `-${val}`;
    const style = (0, import_vue2.computed)(() => {
      const style2 = {
        background: props.color
      };
      if (props.offset) {
        const [x, y] = props.offset;
        const {
          position
        } = props;
        const [offsetY, offsetX] = position.split("-");
        if (slots.default) {
          if (typeof y === "number") {
            style2[offsetY] = (0, import_utils.addUnit)(offsetY === "top" ? y : -y);
          } else {
            style2[offsetY] = offsetY === "top" ? (0, import_utils.addUnit)(y) : getOffsetWithMinusString(y);
          }
          if (typeof x === "number") {
            style2[offsetX] = (0, import_utils.addUnit)(offsetX === "left" ? x : -x);
          } else {
            style2[offsetX] = offsetX === "left" ? (0, import_utils.addUnit)(x) : getOffsetWithMinusString(x);
          }
        } else {
          style2.marginTop = (0, import_utils.addUnit)(y);
          style2.marginLeft = (0, import_utils.addUnit)(x);
        }
      }
      return style2;
    });
    const renderBadge = () => {
      if (hasContent() || props.dot) {
        return (0, import_vue.createVNode)("div", {
          "class": bem([props.position, {
            dot: props.dot,
            fixed: !!slots.default
          }]),
          "style": style.value
        }, [renderContent()]);
      }
    };
    return () => {
      if (slots.default) {
        const {
          tag
        } = props;
        return (0, import_vue.createVNode)(tag, {
          "class": bem("wrapper")
        }, {
          default: () => [slots.default(), renderBadge()]
        });
      }
      return renderBadge();
    };
  }
});
