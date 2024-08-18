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
  mountComponent: () => mountComponent,
  usePopupState: () => usePopupState
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_basic = require("./basic");
var import_use_expose = require("../composables/use-expose");
function usePopupState() {
  const state = (0, import_vue.reactive)({
    show: false
  });
  const toggle = (show) => {
    state.show = show;
  };
  const open = (props) => {
    (0, import_basic.extend)(state, props, { transitionAppear: true });
    toggle(true);
  };
  const close = () => toggle(false);
  (0, import_use_expose.useExpose)({ open, close, toggle });
  return {
    open,
    close,
    state,
    toggle
  };
}
function mountComponent(RootComponent) {
  const app = (0, import_vue.createApp)(RootComponent);
  const root = document.createElement("div");
  document.body.appendChild(root);
  return {
    instance: app.mount(root),
    unmount() {
      app.unmount();
      document.body.removeChild(root);
    }
  };
}
