import { createVNode as _createVNode } from "vue";
import { watch, defineComponent } from "vue";
import { numericProp, createNamespace, makeArrayProp } from "../utils/index.mjs";
import { useChildren, useCustomFieldValue } from "@vant/use";
import { useExpose } from "../composables/use-expose.mjs";
const [name, bem] = createNamespace("checkbox-group");
const checkboxGroupProps = {
  max: numericProp,
  disabled: Boolean,
  iconSize: numericProp,
  direction: String,
  modelValue: makeArrayProp(),
  checkedColor: String
};
const CHECKBOX_GROUP_KEY = Symbol(name);
var stdin_default = defineComponent({
  name,
  props: checkboxGroupProps,
  emits: ["change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const {
      children,
      linkChildren
    } = useChildren(CHECKBOX_GROUP_KEY);
    const updateValue = (value) => emit("update:modelValue", value);
    const toggleAll = (options = {}) => {
      if (typeof options === "boolean") {
        options = {
          checked: options
        };
      }
      const {
        checked,
        skipDisabled
      } = options;
      const checkedChildren = children.filter((item) => {
        if (!item.props.bindGroup) {
          return false;
        }
        if (item.props.disabled && skipDisabled) {
          return item.checked.value;
        }
        return checked != null ? checked : !item.checked.value;
      });
      const names = checkedChildren.map((item) => item.name);
      updateValue(names);
    };
    watch(() => props.modelValue, (value) => emit("change", value));
    useExpose({
      toggleAll
    });
    useCustomFieldValue(() => props.modelValue);
    linkChildren({
      props,
      updateValue
    });
    return () => {
      var _a;
      return _createVNode("div", {
        "class": bem([props.direction])
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
export {
  CHECKBOX_GROUP_KEY,
  checkboxGroupProps,
  stdin_default as default
};
