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
  useHeight: () => useHeight
});
module.exports = __toCommonJS(stdin_exports);
var import_use = require("@vant/use");
var import_vue = require("vue");
var import_utils = require("../utils");
var import_on_popup_reopen = require("./on-popup-reopen");
const useHeight = (element, withSafeArea) => {
  const height = (0, import_vue.ref)();
  const setHeight = () => {
    height.value = (0, import_use.useRect)(element).height;
  };
  (0, import_vue.onMounted)(() => {
    (0, import_vue.nextTick)(setHeight);
    if (withSafeArea) {
      for (let i = 1; i <= 3; i++) {
        setTimeout(setHeight, 100 * i);
      }
    }
  });
  (0, import_on_popup_reopen.onPopupReopen)(() => (0, import_vue.nextTick)(setHeight));
  (0, import_vue.watch)([import_utils.windowWidth, import_utils.windowHeight], setHeight);
  return height;
};
