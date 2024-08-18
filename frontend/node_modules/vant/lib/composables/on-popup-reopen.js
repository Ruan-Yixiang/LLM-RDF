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
  POPUP_TOGGLE_KEY: () => POPUP_TOGGLE_KEY,
  onPopupReopen: () => onPopupReopen
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
const POPUP_TOGGLE_KEY = Symbol();
function onPopupReopen(callback) {
  const popupToggleStatus = (0, import_vue.inject)(POPUP_TOGGLE_KEY, null);
  if (popupToggleStatus) {
    (0, import_vue.watch)(popupToggleStatus, (show) => {
      if (show) {
        callback();
      }
    });
  }
}
