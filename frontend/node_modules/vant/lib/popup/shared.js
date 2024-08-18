var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
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
  popupSharedPropKeys: () => popupSharedPropKeys,
  popupSharedProps: () => popupSharedProps
});
module.exports = __toCommonJS(stdin_exports);
var import_utils = require("../utils");
const popupSharedProps = {
  // whether to show popup
  show: Boolean,
  // z-index
  zIndex: import_utils.numericProp,
  // whether to show overlay
  overlay: import_utils.truthProp,
  // transition duration
  duration: import_utils.numericProp,
  // teleport
  teleport: [String, Object],
  // prevent body scroll
  lockScroll: import_utils.truthProp,
  // whether to lazy render
  lazyRender: import_utils.truthProp,
  // callback function before close
  beforeClose: Function,
  // overlay custom style
  overlayStyle: Object,
  // overlay custom class name
  overlayClass: import_utils.unknownProp,
  // Initial rendering animation
  transitionAppear: Boolean,
  // whether to close popup when overlay is clicked
  closeOnClickOverlay: import_utils.truthProp
};
const popupSharedPropKeys = Object.keys(
  popupSharedProps
);
