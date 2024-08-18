import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
import { ref, watch, nextTick, reactive, onMounted, defineComponent } from "vue";
import { pick, truthProp, unknownProp, windowWidth, windowHeight, makeArrayProp, makeStringProp, makeNumericProp, callInterceptor, createNamespace, HAPTICS_FEEDBACK } from "../utils/index.mjs";
import { useRect } from "@vant/use";
import { useExpose } from "../composables/use-expose.mjs";
import { Icon } from "../icon/index.mjs";
import { Swipe } from "../swipe/index.mjs";
import { Popup } from "../popup/index.mjs";
import ImagePreviewItem from "./ImagePreviewItem.mjs";
const [name, bem] = createNamespace("image-preview");
const popupProps = ["show", "teleport", "transition", "overlayStyle", "closeOnPopstate"];
const imagePreviewProps = {
  show: Boolean,
  loop: truthProp,
  images: makeArrayProp(),
  minZoom: makeNumericProp(1 / 3),
  maxZoom: makeNumericProp(3),
  overlay: truthProp,
  closeable: Boolean,
  showIndex: truthProp,
  className: unknownProp,
  closeIcon: makeStringProp("clear"),
  transition: String,
  beforeClose: Function,
  overlayClass: unknownProp,
  overlayStyle: Object,
  swipeDuration: makeNumericProp(300),
  startPosition: makeNumericProp(0),
  showIndicators: Boolean,
  closeOnPopstate: truthProp,
  closeIconPosition: makeStringProp("top-right"),
  teleport: [String, Object]
};
var stdin_default = defineComponent({
  name,
  props: imagePreviewProps,
  emits: ["scale", "close", "closed", "change", "longPress", "update:show"],
  setup(props, {
    emit,
    slots
  }) {
    const swipeRef = ref();
    const state = reactive({
      active: 0,
      rootWidth: 0,
      rootHeight: 0,
      disableZoom: false
    });
    const resize = () => {
      if (swipeRef.value) {
        const rect = useRect(swipeRef.value.$el);
        state.rootWidth = rect.width;
        state.rootHeight = rect.height;
        swipeRef.value.resize();
      }
    };
    const emitScale = (args) => emit("scale", args);
    const updateShow = (show) => emit("update:show", show);
    const emitClose = () => {
      callInterceptor(props.beforeClose, {
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
        return _createVNode("div", {
          "class": bem("index")
        }, [slots.index ? slots.index({
          index: state.active
        }) : `${state.active + 1} / ${props.images.length}`]);
      }
    };
    const renderCover = () => {
      if (slots.cover) {
        return _createVNode("div", {
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
    const renderImages = () => _createVNode(Swipe, {
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
      default: () => [props.images.map((image, index) => _createVNode(ImagePreviewItem, {
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
        return _createVNode(Icon, {
          "role": "button",
          "name": props.closeIcon,
          "class": [bem("close-icon", props.closeIconPosition), HAPTICS_FEEDBACK],
          "onClick": emitClose
        }, null);
      }
    };
    const onClosed = () => emit("closed");
    const swipeTo = (index, options) => {
      var _a;
      return (_a = swipeRef.value) == null ? void 0 : _a.swipeTo(index, options);
    };
    useExpose({
      swipeTo
    });
    onMounted(resize);
    watch([windowWidth, windowHeight], resize);
    watch(() => props.startPosition, (value) => setActive(+value));
    watch(() => props.show, (value) => {
      const {
        images,
        startPosition
      } = props;
      if (value) {
        setActive(+startPosition);
        nextTick(() => {
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
    return () => _createVNode(Popup, _mergeProps({
      "class": [bem(), props.className],
      "overlayClass": [bem("overlay"), props.overlayClass],
      "onClosed": onClosed,
      "onUpdate:show": updateShow
    }, pick(props, popupProps)), {
      default: () => [renderClose(), renderImages(), renderIndex(), renderCover()]
    });
  }
});
export {
  stdin_default as default,
  imagePreviewProps
};
