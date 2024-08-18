import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import { extend, inBrowser } from "../utils/index.mjs";
import { mountComponent, usePopupState } from "../utils/mount-component.mjs";
import Dialog from "./Dialog.mjs";
let instance;
const DEFAULT_OPTIONS = {
  title: "",
  width: "",
  theme: null,
  message: "",
  overlay: true,
  callback: null,
  teleport: "body",
  className: "",
  allowHtml: false,
  lockScroll: true,
  transition: void 0,
  beforeClose: null,
  overlayClass: "",
  overlayStyle: void 0,
  messageAlign: "",
  cancelButtonText: "",
  cancelButtonColor: null,
  cancelButtonDisabled: false,
  confirmButtonText: "",
  confirmButtonColor: null,
  confirmButtonDisabled: false,
  showConfirmButton: true,
  showCancelButton: false,
  closeOnPopstate: true,
  closeOnClickOverlay: false
};
let currentOptions = extend({}, DEFAULT_OPTIONS);
function initInstance() {
  const Wrapper = {
    setup() {
      const {
        state,
        toggle
      } = usePopupState();
      return () => _createVNode(Dialog, _mergeProps(state, {
        "onUpdate:show": toggle
      }), null);
    }
  };
  ({
    instance
  } = mountComponent(Wrapper));
}
function showDialog(options) {
  if (!inBrowser) {
    return Promise.resolve();
  }
  return new Promise((resolve, reject) => {
    if (!instance) {
      initInstance();
    }
    instance.open(extend({}, currentOptions, options, {
      callback: (action) => {
        (action === "confirm" ? resolve : reject)(action);
      }
    }));
  });
}
const setDialogDefaultOptions = (options) => {
  extend(currentOptions, options);
};
const resetDialogDefaultOptions = () => {
  currentOptions = extend({}, DEFAULT_OPTIONS);
};
const showConfirmDialog = (options) => showDialog(extend({
  showCancelButton: true
}, options));
const closeDialog = () => {
  if (instance) {
    instance.toggle(false);
  }
};
export {
  closeDialog,
  resetDialogDefaultOptions,
  setDialogDefaultOptions,
  showConfirmDialog,
  showDialog
};
