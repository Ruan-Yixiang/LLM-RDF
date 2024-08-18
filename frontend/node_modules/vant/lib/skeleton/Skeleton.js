var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default,
  skeletonProps: () => skeletonProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_skeleton_title = __toESM(require("../skeleton-title"));
var import_skeleton_avatar = __toESM(require("../skeleton-avatar"));
var import_skeleton_paragraph = __toESM(require("../skeleton-paragraph"));
const [name, bem] = (0, import_utils.createNamespace)("skeleton");
const DEFAULT_LAST_ROW_WIDTH = "60%";
const skeletonProps = {
  row: (0, import_utils.makeNumericProp)(0),
  round: Boolean,
  title: Boolean,
  titleWidth: import_utils.numericProp,
  avatar: Boolean,
  avatarSize: import_utils.numericProp,
  avatarShape: (0, import_utils.makeStringProp)("round"),
  loading: import_utils.truthProp,
  animate: import_utils.truthProp,
  rowWidth: {
    type: [Number, String, Array],
    default: import_skeleton_paragraph.DEFAULT_ROW_WIDTH
  }
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  inheritAttrs: false,
  props: skeletonProps,
  setup(props, {
    slots,
    attrs
  }) {
    const renderAvatar = () => {
      if (props.avatar) {
        return (0, import_vue.createVNode)(import_skeleton_avatar.default, {
          "avatarShape": props.avatarShape,
          "avatarSize": props.avatarSize
        }, null);
      }
    };
    const renderTitle = () => {
      if (props.title) {
        return (0, import_vue.createVNode)(import_skeleton_title.default, {
          "round": props.round,
          "titleWidth": props.titleWidth
        }, null);
      }
    };
    const getRowWidth = (index) => {
      const {
        rowWidth
      } = props;
      if (rowWidth === import_skeleton_paragraph.DEFAULT_ROW_WIDTH && index === +props.row - 1) {
        return DEFAULT_LAST_ROW_WIDTH;
      }
      if (Array.isArray(rowWidth)) {
        return rowWidth[index];
      }
      return rowWidth;
    };
    const renderRows = () => Array(+props.row).fill("").map((_, i) => (0, import_vue.createVNode)(import_skeleton_paragraph.default, {
      "key": i,
      "round": props.round,
      "rowWidth": (0, import_utils.addUnit)(getRowWidth(i))
    }, null));
    const renderContents = () => {
      if (slots.template) {
        return slots.template();
      }
      return (0, import_vue.createVNode)(import_vue.Fragment, null, [renderAvatar(), (0, import_vue.createVNode)("div", {
        "class": bem("content")
      }, [renderTitle(), renderRows()])]);
    };
    return () => {
      var _a;
      if (!props.loading) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      return (0, import_vue.createVNode)("div", (0, import_vue.mergeProps)({
        "class": bem({
          animate: props.animate,
          round: props.round
        })
      }, attrs), [renderContents()]);
    };
  }
});
