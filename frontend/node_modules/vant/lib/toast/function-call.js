var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
  allowMultipleToast: () => allowMultipleToast,
  closeToast: () => closeToast,
  resetToastDefaultOptions: () => resetToastDefaultOptions,
  setToastDefaultOptions: () => setToastDefaultOptions,
  showFailToast: () => showFailToast,
  showLoadingToast: () => showLoadingToast,
  showSuccessToast: () => showSuccessToast,
  showToast: () => showToast
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_mount_component = require("../utils/mount-component");
var import_Toast = __toESM(require("./Toast"));
const defaultOptions = {
  icon: "",
  type: "text",
  message: "",
  className: "",
  overlay: false,
  onClose: void 0,
  onOpened: void 0,
  duration: 2e3,
  teleport: "body",
  iconSize: void 0,
  iconPrefix: void 0,
  position: "middle",
  transition: "van-fade",
  forbidClick: false,
  loadingType: void 0,
  overlayClass: "",
  overlayStyle: void 0,
  closeOnClick: false,
  closeOnClickOverlay: false
};
let queue = [];
let allowMultiple = false;
let currentOptions = (0, import_utils.extend)({}, defaultOptions);
const defaultOptionsMap = /* @__PURE__ */ new Map();
function parseOptions(message) {
  if ((0, import_utils.isObject)(message)) {
    return message;
  }
  return {
    message
  };
}
function createInstance() {
  const {
    instance,
    unmount
  } = (0, import_mount_component.mountComponent)({
    setup() {
      const message = (0, import_vue2.ref)("");
      const {
        open,
        state,
        close,
        toggle
      } = (0, import_mount_component.usePopupState)();
      const onClosed = () => {
        if (allowMultiple) {
          queue = queue.filter((item) => item !== instance);
          unmount();
        }
      };
      const render = () => {
        const attrs = {
          onClosed,
          "onUpdate:show": toggle
        };
        return (0, import_vue.createVNode)(import_Toast.default, (0, import_vue.mergeProps)(state, attrs), null);
      };
      (0, import_vue2.watch)(message, (val) => {
        state.message = val;
      });
      (0, import_vue2.getCurrentInstance)().render = render;
      return {
        open,
        close,
        message
      };
    }
  });
  return instance;
}
function getInstance() {
  if (!queue.length || allowMultiple) {
    const instance = createInstance();
    queue.push(instance);
  }
  return queue[queue.length - 1];
}
function showToast(options = {}) {
  if (!import_utils.inBrowser) {
    return {};
  }
  const toast = getInstance();
  const parsedOptions = parseOptions(options);
  toast.open((0, import_utils.extend)({}, currentOptions, defaultOptionsMap.get(parsedOptions.type || currentOptions.type), parsedOptions));
  return toast;
}
const createMethod = (type) => (options) => showToast((0, import_utils.extend)({
  type
}, parseOptions(options)));
const showLoadingToast = createMethod("loading");
const showSuccessToast = createMethod("success");
const showFailToast = createMethod("fail");
const closeToast = (all) => {
  var _a;
  if (queue.length) {
    if (all) {
      queue.forEach((toast) => {
        toast.close();
      });
      queue = [];
    } else if (!allowMultiple) {
      queue[0].close();
    } else {
      (_a = queue.shift()) == null ? void 0 : _a.close();
    }
  }
};
function setToastDefaultOptions(type, options) {
  if (typeof type === "string") {
    defaultOptionsMap.set(type, options);
  } else {
    (0, import_utils.extend)(currentOptions, type);
  }
}
const resetToastDefaultOptions = (type) => {
  if (typeof type === "string") {
    defaultOptionsMap.delete(type);
  } else {
    currentOptions = (0, import_utils.extend)({}, defaultOptions);
    defaultOptionsMap.clear();
  }
};
const allowMultipleToast = (value = true) => {
  allowMultiple = value;
};
