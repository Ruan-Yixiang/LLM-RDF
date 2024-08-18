var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
  default: () => stdin_default,
  imagePreviewProps: () => imagePreviewProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_use = require("@vant/use");
var import_use_expose = require("../composables/use-expose");
var import_icon = require("../icon");
var import_swipe = require("../swipe");
var import_popup = require("../popup");
var import_ImagePreviewItem = __toESM(require("./ImagePreviewItem"));
const [name, bem] = (0, import_utils.createNamespace)("image-preview");
const popupProps = ["show", "teleport", "transition", "overlayStyle", "closeOnPopstate"];
const imagePreviewProps = {
  show: Boolean,
  loop: import_utils.truthProp,
  images: (0, import_utils.makeArrayProp)(),
  minZoom: (0, import_utils.makeNumericProp)(1 / 3),
  maxZoom: (0, import_utils.makeNumericProp)(3),
  overlay: import_utils.truthProp,
  closeable: Boolean,
  showIndex: import_utils.truthProp,
  className: import_utils.unknownProp,
  closeIcon: (0, import_utils.makeStringProp)("clear"),
  transition: String,
  beforeClose: Function,
  overlayClass: import_utils.unknownProp,
  overlayStyle: Object,
  swipeDuration: (0, import_utils.makeNumericProp)(300),
  startPosition: (0, import_utils.makeNumericProp)(0),
  showIndicators: Boolean,
  closeOnPopstate: import_utils.truthProp,
  closeIconPosition: (0, import_utils.makeStringProp)("top-right"),
  teleport: [String, Object]
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: imagePreviewProps,
  emits: ["scale", "close", "closed", "change", "longPress", "update:show"],
  setup(props, {
    emit,
    slots
  }) {
    const swipeRef = (0, import_vue2.ref)();
    const state = (0, import_vue2.reactive)({
      active: 0,
      rootWidth: 0,
      rootHeight: 0,
      disableZoom: false
    });
    const resize = () => {
      if (swipeRef.value) {
        const rect = (0, import_use.useRect)(swipeRef.value.$el);
        state.rootWidth = rect.width;
        state.rootHeight = rect.height;
        swipeRef.value.resize();
      }
    };
    const emitScale = (args) => emit("scale", args);
    const updateShow = (show) => emit("update:show", show);
    const emitClose = () => {
      (0, import_utils.callInterceptor)(props.beforeClose, {
        args: [state.active],
        done: () => updateShow(false)
      });
    };
    const setActive = (active) => {
      if (active !== state.active) {
        state.active = active;
        emit("change", active);
      }
    };
    const renderIndex = () => {
      if (props.showIndex) {
        return (0, import_vue.createVNode)("div", {
          "class": bem("index")
        }, [slots.index ? slots.index({
          index: state.active
        }) : `${state.active + 1} / ${props.images.length}`]);
      }
    };
    const renderCover = () => {
      if (slots.cover) {
        return (0, import_vue.createVNode)("div", {
          "class": bem("cover")
        }, [slots.cover()]);
      }
    };
    const onDragStart = () => {
      state.disableZoom = true;
    };
    const onDragEnd = () => {
      state.disableZoom = false;
    };
    const renderImages = () => (0, import_vue.createVNode)(import_swipe.Swipe, {
      "ref": swipeRef,
      "lazyRender": true,
      "loop": props.loop,
      "class": bem("swipe"),
      "duration": props.swipeDuration,
      "initialSwipe": props.startPosition,
      "showIndicators": props.showIndicators,
      "indicatorColor": "white",
      "onChange": setActive,
      "onDragEnd": onDragEnd,
      "onDragStart": onDragStart
    }, {
      default: () => [props.images.map((image, index) => (0, import_vue.createVNode)(import_ImagePreviewItem.default, {
        "src": image,
        "show": props.show,
        "active": state.active,
        "maxZoom": props.maxZoom,
        "minZoom": props.minZoom,
        "rootWidth": state.rootWidth,
        "rootHeight": state.rootHeight,
        "disableZoom": state.disableZoom,
        "onScale": emitScale,
        "onClose": emitClose,
        "onLongPress": () => emit("longPress", {
          index
        })
      }, {
        image: slots.image
      }))]
    });
    const renderClose = () => {
      if (props.closeable) {
        return (0, import_vue.createVNode)(import_icon.Icon, {
          "role": "button",
          "name": props.closeIcon,
          "class": [bem("close-icon", props.closeIconPosition), import_utils.HAPTICS_FEEDBACK],
          "onClick": emitClose
        }, null);
      }
    };
    const onClosed = () => emit("closed");
    const swipeTo = (index, options) => {
      var _a;
      return (_a = swipeRef.value) == null ? void 0 : _a.swipeTo(index, options);
    };
    (0, import_use_expose.useExpose)({
      swipeTo
    });
    (0, import_vue2.onMounted)(resize);
    (0, import_vue2.watch)([import_utils.windowWidth, import_utils.windowHeight], resize);
    (0, import_vue2.watch)(() => props.startPosition, (value) => setActive(+value));
    (0, import_vue2.watch)(() => props.show, (value) => {
      const {
        images,
        startPosition
      } = props;
      if (value) {
        setActive(+startPosition);
        (0, import_vue2.nextTick)(() => {
          resize();
          swipeTo(+startPosition, {
            immediate: true
          });
        });
      } else {
        emit("close", {
          index: state.active,
          url: images[state.active]
        });
      }
    });
    return () => (0, import_vue.createVNode)(import_popup.Popup, (0, import_vue.mergeProps)({
      "class": [bem(), props.className],
      "overlayClass": [bem("overlay"), props.overlayClass],
      "onClosed": onClosed,
      "onUpdate:show": updateShow
    }, (0, import_utils.pick)(props, popupProps)), {
      default: () => [renderClose(), renderImages(), renderIndex(), renderCover()]
    });
  }
});
