import { createVNode as _createVNode } from "vue";
import { ref, reactive, computed, defineComponent } from "vue";
import { extend, numericProp, BORDER_BOTTOM, getZIndexStyle, createNamespace } from "../utils/index.mjs";
import { INDEX_BAR_KEY } from "../index-bar/IndexBar.mjs";
import { getScrollTop, getRootScrollTop } from "../utils/dom.mjs";
import { useRect, useParent } from "@vant/use";
import { useExpose } from "../composables/use-expose.mjs";
const [name, bem] = createNamespace("index-anchor");
const indexAnchorProps = {
  index: numericProp
};
var stdin_default = defineComponent({
  name,
  props: indexAnchorProps,
  setup(props, {
    slots
  }) {
    const state = reactive({
      top: 0,
      left: null,
      rect: {
        top: 0,
        height: 0
      },
      width: null,
      active: false
    });
    const root = ref();
    const {
      parent
    } = useParent(INDEX_BAR_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <IndexAnchor> must be a child component of <IndexBar>.");
      }
      return;
    }
    const isSticky = () => state.active && parent.props.sticky;
    const anchorStyle = computed(() => {
      const {
        zIndex,
        highlightColor
      } = parent.props;
      if (isSticky()) {
        return extend(getZIndexStyle(zIndex), {
          left: state.left ? `${state.left}px` : void 0,
          width: state.width ? `${state.width}px` : void 0,
          transform: state.top ? `translate3d(0, ${state.top}px, 0)` : void 0,
          color: highlightColor
        });
      }
    });
    const getRect = (scrollParent, scrollParentRect) => {
      const rootRect = useRect(root);
      state.rect.height = rootRect.height;
      if (scrollParent === window || scrollParent === document.body) {
        state.rect.top = rootRect.top + getRootScrollTop();
      } else {
        state.rect.top = rootRect.top + getScrollTop(scrollParent) - scrollParentRect.top;
      }
      return state.rect;
    };
    useExpose({
      state,
      getRect
    });
    return () => {
      const sticky = isSticky();
      return _createVNode("div", {
        "ref": root,
        "style": {
          height: sticky ? `${state.rect.height}px` : void 0
        }
      }, [_createVNode("div", {
        "style": anchorStyle.value,
        "class": [bem({
          sticky
        }), {
          [BORDER_BOTTOM]: sticky
        }]
      }, [slots.default ? slots.default() : props.index])]);
    };
  }
});
export {
  stdin_default as default,
  indexAnchorProps
};
