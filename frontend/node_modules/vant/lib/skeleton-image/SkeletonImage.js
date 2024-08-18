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
  skeletonImageProps: () => skeletonImageProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_icon = require("../icon");
const [name, bem] = (0, import_utils.createNamespace)("skeleton-image");
const skeletonImageProps = {
  imageSize: import_utils.numericProp,
  imageShape: (0, import_utils.makeStringProp)("square")
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: skeletonImageProps,
  setup(props) {
    return () => (0, import_vue.createVNode)("div", {
      "class": bem([props.imageShape]),
      "style": (0, import_utils.getSizeStyle)(props.imageSize)
    }, [(0, import_vue.createVNode)(import_icon.Icon, {
      "name": "photo",
      "class": bem("icon")
    }, null)]);
  }
});
