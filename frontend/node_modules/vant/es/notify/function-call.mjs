import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import { extend, isObject, inBrowser } from "../utils/index.mjs";
import { mountComponent, usePopupState } from "../utils/mount-component.mjs";
import VanNotify from "./Notify.mjs";
let timer;
let instance;
const parseOptions = (message) => isObject(message) ? message : {
  message
};
function initInstance() {
  ({
    instance
  } = mountComponent({
    setup() {
      const {
        state,
        toggle
      } = usePopupState();
      return () => _createVNode(VanNotify, _mergeProps(state, {
        "onUpdate:show": toggle
      }), null);
    }
  }));
}
const getDefaultOptions = () => ({
  type: "danger",
  color: void 0,
  message: "",
  onClose: void 0,
  onClick: void 0,
  onOpened: void 0,
  duration: 3e3,
  position: void 0,
  className: "",
  lockScroll: false,
  background: void 0
});
let currentOptions = getDefaultOptions();
const closeNotify = () => {
  if (instance) {
    instance.toggle(false);
  }
};
function showNotify(options) {
  if (!inBrowser) {
    return;
  }
  if (!instance) {
    initInstance();
  }
  options = extend({}, currentOptions, parseOptions(options));
  instance.open(options);
  clearTimeout(timer);
  if (options.duration > 0) {
    timer = setTimeout(closeNotify, options.duration);
  }
  return instance;
}
const setNotifyDefaultOptions = (options) => extend(currentOptions, options);
const resetNotifyDefaultOptions = () => {
  currentOptions = getDefaultOptions();
};
export {
  closeNotify,
  resetNotifyDefaultOptions,
  setNotifyDefaultOptions,
  showNotify
};
