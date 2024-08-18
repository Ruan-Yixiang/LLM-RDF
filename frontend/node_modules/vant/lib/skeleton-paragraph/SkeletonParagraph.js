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
  DEFAULT_ROW_WIDTH: () => DEFAULT_ROW_WIDTH,
  default: () => stdin_default,
  skeletonParagraphProps: () => skeletonParagraphProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
const DEFAULT_ROW_WIDTH = "100%";
const skeletonParagraphProps = {
  round: Boolean,
  rowWidth: {
    type: import_utils.numericProp,
    default: DEFAULT_ROW_WIDTH
  }
};
const [name, bem] = (0, import_utils.createNamespace)("skeleton-paragraph");
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: skeletonParagraphProps,
  setup(props) {
    return () => (0, import_vue.createVNode)("div", {
      "class": bem([{
        round: props.round
      }]),
      "style": {
        width: props.rowWidth
      }
    }, null);
  }
});
