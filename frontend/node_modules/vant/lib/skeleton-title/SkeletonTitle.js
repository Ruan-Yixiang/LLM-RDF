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
  skeletonTitleProps: () => skeletonTitleProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
const [name, bem] = (0, import_utils.createNamespace)("skeleton-title");
const skeletonTitleProps = {
  round: Boolean,
  titleWidth: import_utils.numericProp
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: skeletonTitleProps,
  setup(props) {
    return () => (0, import_vue.createVNode)("h3", {
      "class": bem([{
        round: props.round
      }]),
      "style": {
        width: (0, import_utils.addUnit)(props.titleWidth)
      }
    }, null);
  }
});
