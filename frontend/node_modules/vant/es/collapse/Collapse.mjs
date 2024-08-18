import { createVNode as _createVNode } from "vue";
import { defineComponent } from "vue";
import { truthProp, createNamespace, BORDER_TOP_BOTTOM } from "../utils/index.mjs";
import { useChildren } from "@vant/use";
import { useExpose } from "../composables/use-expose.mjs";
const [name, bem] = createNamespace("collapse");
const COLLAPSE_KEY = Symbol(name);
const collapseProps = {
  border: truthProp,
  accordion: Boolean,
  modelValue: {
    type: [String, Number, Array],
    default: ""
  }
};
function validateModelValue(modelValue, accordion) {
  if (accordion && Array.isArray(modelValue)) {
    console.error('[Vant] Collapse: "v-model" should not be Array in accordion mode');
    return false;
  }
  if (!accordion && !Array.isArray(modelValue)) {
    console.error('[Vant] Collapse: "v-model" should be Array in non-accordion mode');
    return false;
  }
  return true;
}
var stdin_default = defineComponent({
  name,
  props: collapseProps,
  emits: ["change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const {
      linkChildren,
      children
    } = useChildren(COLLAPSE_KEY);
    const updateName = (name2) => {
      emit("change", name2);
      emit("update:modelValue", name2);
    };
    const toggle = (name2, expanded) => {
      const {
        accordion,
        modelValue
      } = props;
      if (accordion) {
        updateName(name2 === modelValue ? "" : name2);
      } else if (expanded) {
        updateName(modelValue.concat(name2));
      } else {
        updateName(modelValue.filter((activeName) => activeName !== name2));
      }
    };
    const toggleAll = (options = {}) => {
      if (props.accordion) {
        return;
      }
      if (typeof options === "boolean") {
        options = {
          expanded: options
        };
      }
      const {
        expanded,
        skipDisabled
      } = options;
      const expandedChildren = children.filter((item) => {
        if (item.disabled && skipDisabled) {
          return item.expanded.value;
        }
        return expanded != null ? expanded : !item.expanded.value;
      });
      const names = expandedChildren.map((item) => item.itemName.value);
      updateName(names);
    };
    const isExpanded = (name2) => {
      const {
        accordion,
        modelValue
      } = props;
      if (process.env.NODE_ENV !== "production" && !validateModelValue(modelValue, accordion)) {
        return false;
      }
      return accordion ? modelValue === name2 : modelValue.includes(name2);
    };
    useExpose({
      toggleAll
    });
    linkChildren({
      toggle,
      isExpanded
    });
    return () => {
      var _a;
      return _createVNode("div", {
        "class": [bem(), {
          [BORDER_TOP_BOTTOM]: props.border
        }]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
export {
  COLLAPSE_KEY,
  collapseProps,
  stdin_default as default
};
