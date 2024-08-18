import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import { extend, inBrowser } from "../utils/index.mjs";
import { mountComponent, usePopupState } from "../utils/mount-component.mjs";
import VanImagePreview from "./ImagePreview.mjs";
let instance;
const defaultConfig = {
  loop: true,
  images: [],
  maxZoom: 3,
  minZoom: 1 / 3,
  onScale: void 0,
  onClose: void 0,
  onChange: void 0,
  teleport: "body",
  className: "",
  showIndex: true,
  closeable: false,
  closeIcon: "clear",
  transition: void 0,
  beforeClose: void 0,
  overlayStyle: void 0,
  overlayClass: void 0,
  startPosition: 0,
  swipeDuration: 300,
  showIndicators: false,
  closeOnPopstate: true,
  closeIconPosition: "top-right"
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
      const onClosed = () => {
        state.images = [];
      };
      return () => _createVNode(VanImagePreview, _mergeProps(state, {
        "onClosed": onClosed,
        "onUpdate:show": toggle
      }), null);
    }
  }));
}
const showImagePreview = (options, startPosition = 0) => {
  if (!inBrowser) {
    return;
  }
  if (!instance) {
    initInstance();
  }
  options = Array.isArray(options) ? {
    images: options,
    startPosition
  } : options;
  instance.open(extend({}, defaultConfig, options));
  return instance;
};
export {
  showImagePreview
};
