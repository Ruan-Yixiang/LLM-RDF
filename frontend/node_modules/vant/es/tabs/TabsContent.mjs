import { createVNode as _createVNode } from "vue";
import { ref, watch, onMounted, defineComponent } from "vue";
import { numericProp, makeRequiredProp, createNamespace } from "../utils/index.mjs";
import { Swipe } from "../swipe/index.mjs";
import { useExpose } from "../composables/use-expose.mjs";
const [name, bem] = createNamespace("tabs");
var stdin_default = defineComponent({
  name,
  props: {
    count: makeRequiredProp(Number),
    inited: Boolean,
    animated: Boolean,
    duration: makeRequiredProp(numericProp),
    swipeable: Boolean,
    lazyRender: Boolean,
    currentIndex: makeRequiredProp(Number)
  },
  emits: ["change"],
  setup(props, {
    emit,
    slots
  }) {
    const swipeRef = ref();
    const onChange = (index) => emit("change", index);
    const renderChildren = () => {
      var _a;
      const Content = (_a = slots.default) == null ? void 0 : _a.call(slots);
      if (props.animated || props.swipeable) {
        return _createVNode(Swipe, {
          "ref": swipeRef,
          "loop": false,
          "class": bem("track"),
          "duration": +props.duration * 1e3,
          "touchable": props.swipeable,
          "lazyRender": props.lazyRender,
          "showIndicators": false,
          "onChange": onChange
        }, {
          default: () => [Content]
        });
      }
      return Content;
    };
    const swipeToCurrentTab = (index) => {
      const swipe = swipeRef.value;
      if (swipe && swipe.state.active !== index) {
        swipe.swipeTo(index, {
          immediate: !props.inited
        });
      }
    };
    watch(() => props.currentIndex, swipeToCurrentTab);
    onMounted(() => {
      swipeToCurrentTab(props.currentIndex);
    });
    useExpose({
      swipeRef
    });
    return () => _createVNode("div", {
      "class": bem("content", {
        animated: props.animated || props.swipeable
      })
    }, [renderChildren()]);
  }
});
export {
  stdin_default as default
};
