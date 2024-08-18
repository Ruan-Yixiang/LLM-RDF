import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
import { ref, watch, computed, Teleport, nextTick, onMounted, defineComponent, onDeactivated, onActivated } from "vue";
import { extend, addUnit, inBrowser, numericProp, getScrollTop, getZIndexStyle, createNamespace, makeNumericProp } from "../utils/index.mjs";
import { throttle } from "../lazyload/vue-lazyload/util.mjs";
import { useEventListener, getScrollParent } from "@vant/use";
import { Icon } from "../icon/index.mjs";
const [name, bem] = createNamespace("back-top");
const backTopProps = {
  right: numericProp,
  bottom: numericProp,
  zIndex: numericProp,
  target: [String, Object],
  offset: makeNumericProp(200),
  immediate: Boolean,
  teleport: {
    type: [String, Object],
    default: "body"
  }
};
var stdin_default = defineComponent({
  name,
  inheritAttrs: false,
  props: backTopProps,
  emits: ["click"],
  setup(props, {
    emit,
    slots,
    attrs
  }) {
    let shouldReshow = false;
    const show = ref(false);
    const root = ref();
    const scrollParent = ref();
    const style = computed(() => extend(getZIndexStyle(props.zIndex), {
      right: addUnit(props.right),
      bottom: addUnit(props.bottom)
    }));
    const onClick = (event) => {
      var _a;
      emit("click", event);
      (_a = scrollParent.value) == null ? void 0 : _a.scrollTo({
        top: 0,
        behavior: props.immediate ? "auto" : "smooth"
      });
    };
    const scroll = () => {
      show.value = scrollParent.value ? getScrollTop(scrollParent.value) >= +props.offset : false;
    };
    const getTarget = () => {
      const {
        target
      } = props;
      if (typeof target === "string") {
        const el = document.querySelector(target);
        if (el) {
          return el;
        }
        if (process.env.NODE_ENV !== "production") {
          console.error(`[Vant] BackTop: target element "${target}" was not found, the BackTop component will not be rendered.`);
        }
      } else {
        return target;
      }
    };
    const updateTarget = () => {
      if (inBrowser) {
        nextTick(() => {
          scrollParent.value = props.target ? getTarget() : getScrollParent(root.value);
          scroll();
        });
      }
    };
    useEventListener("scroll", throttle(scroll, 100), {
      target: scrollParent
    });
    onMounted(updateTarget);
    onActivated(() => {
      if (shouldReshow) {
        show.value = true;
        shouldReshow = false;
      }
    });
    onDeactivated(() => {
      if (show.value && props.teleport) {
        show.value = false;
        shouldReshow = true;
      }
    });
    watch(() => props.target, updateTarget);
    return () => {
      const Content = _createVNode("div", _mergeProps({
        "ref": !props.teleport ? root : void 0,
        "class": bem({
          active: show.value
        }),
        "style": style.value,
        "onClick": onClick
      }, attrs), [slots.default ? slots.default() : _createVNode(Icon, {
        "name": "back-top",
        "class": bem("icon")
      }, null)]);
      if (props.teleport) {
        return [_createVNode("div", {
          "ref": root,
          "class": bem("placeholder")
        }, null), _createVNode(Teleport, {
          "to": props.teleport
        }, {
          default: () => [Content]
        })];
      }
      return Content;
    };
  }
});
export {
  backTopProps,
  stdin_default as default
};
