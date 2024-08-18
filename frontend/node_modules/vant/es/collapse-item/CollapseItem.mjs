import { withDirectives as _withDirectives, vShow as _vShow, createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import { ref, watch, computed, nextTick, defineComponent } from "vue";
import { cellSharedProps } from "../cell/Cell.mjs";
import { pick, extend, truthProp, numericProp, createNamespace } from "../utils/index.mjs";
import { COLLAPSE_KEY } from "../collapse/Collapse.mjs";
import { raf, doubleRaf, useParent } from "@vant/use";
import { useExpose } from "../composables/use-expose.mjs";
import { useLazyRender } from "../composables/use-lazy-render.mjs";
import { Cell } from "../cell/index.mjs";
const [name, bem] = createNamespace("collapse-item");
const CELL_SLOTS = ["icon", "title", "value", "label", "right-icon"];
const collapseItemProps = extend({}, cellSharedProps, {
  name: numericProp,
  isLink: truthProp,
  disabled: Boolean,
  readonly: Boolean,
  lazyRender: truthProp
});
var stdin_default = defineComponent({
  name,
  props: collapseItemProps,
  setup(props, {
    slots
  }) {
    const wrapperRef = ref();
    const contentRef = ref();
    const {
      parent,
      index
    } = useParent(COLLAPSE_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <CollapseItem> must be a child component of <Collapse>.");
      }
      return;
    }
    const name2 = computed(() => {
      var _a;
      return (_a = props.name) != null ? _a : index.value;
    });
    const expanded = computed(() => parent.isExpanded(name2.value));
    const show = ref(expanded.value);
    const lazyRender = useLazyRender(() => show.value || !props.lazyRender);
    const onTransitionEnd = () => {
      if (!expanded.value) {
        show.value = false;
      } else if (wrapperRef.value) {
        wrapperRef.value.style.height = "";
      }
    };
    watch(expanded, (value, oldValue) => {
      if (oldValue === null) {
        return;
      }
      if (value) {
        show.value = true;
      }
      const tick = value ? nextTick : raf;
      tick(() => {
        if (!contentRef.value || !wrapperRef.value) {
          return;
        }
        const {
          offsetHeight
        } = contentRef.value;
        if (offsetHeight) {
          const contentHeight = `${offsetHeight}px`;
          wrapperRef.value.style.height = value ? "0" : contentHeight;
          doubleRaf(() => {
            if (wrapperRef.value) {
              wrapperRef.value.style.height = value ? contentHeight : "0";
            }
          });
        } else {
          onTransitionEnd();
        }
      });
    });
    const toggle = (newValue = !expanded.value) => {
      parent.toggle(name2.value, newValue);
    };
    const onClickTitle = () => {
      if (!props.disabled && !props.readonly) {
        toggle();
      }
    };
    const renderTitle = () => {
      const {
        border,
        disabled,
        readonly
      } = props;
      const attrs = pick(props, Object.keys(cellSharedProps));
      if (readonly) {
        attrs.isLink = false;
      }
      if (disabled || readonly) {
        attrs.clickable = false;
      }
      return _createVNode(Cell, _mergeProps({
        "role": "button",
        "class": bem("title", {
          disabled,
          expanded: expanded.value,
          borderless: !border
        }),
        "aria-expanded": String(expanded.value),
        "onClick": onClickTitle
      }, attrs), pick(slots, CELL_SLOTS));
    };
    const renderContent = lazyRender(() => {
      var _a;
      return _withDirectives(_createVNode("div", {
        "ref": wrapperRef,
        "class": bem("wrapper"),
        "onTransitionend": onTransitionEnd
      }, [_createVNode("div", {
        "ref": contentRef,
        "class": bem("content")
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]), [[_vShow, show.value]]);
    });
    useExpose({
      toggle,
      expanded,
      itemName: name2
    });
    return () => _createVNode("div", {
      "class": [bem({
        border: index.value && props.border
      })]
    }, [renderTitle(), renderContent()]);
  }
});
export {
  collapseItemProps,
  stdin_default as default
};
