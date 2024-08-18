import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import { watch, computed, defineComponent } from "vue";
import { createNamespace, extend, pick, truthProp } from "../utils/index.mjs";
import { CHECKBOX_GROUP_KEY } from "../checkbox-group/CheckboxGroup.mjs";
import { useParent, useCustomFieldValue } from "@vant/use";
import { useExpose } from "../composables/use-expose.mjs";
import Checker, { checkerProps } from "./Checker.mjs";
const [name, bem] = createNamespace("checkbox");
const checkboxProps = extend({}, checkerProps, {
  bindGroup: truthProp
});
var stdin_default = defineComponent({
  name,
  props: checkboxProps,
  emits: ["change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const {
      parent
    } = useParent(CHECKBOX_GROUP_KEY);
    const setParentValue = (checked2) => {
      const {
        name: name2
      } = props;
      const {
        max,
        modelValue
      } = parent.props;
      const value = modelValue.slice();
      if (checked2) {
        const overlimit = max && value.length >= +max;
        if (!overlimit && !value.includes(name2)) {
          value.push(name2);
          if (props.bindGroup) {
            parent.updateValue(value);
          }
        }
      } else {
        const index = value.indexOf(name2);
        if (index !== -1) {
          value.splice(index, 1);
          if (props.bindGroup) {
            parent.updateValue(value);
          }
        }
      }
    };
    const checked = computed(() => {
      if (parent && props.bindGroup) {
        return parent.props.modelValue.indexOf(props.name) !== -1;
      }
      return !!props.modelValue;
    });
    const toggle = (newValue = !checked.value) => {
      if (parent && props.bindGroup) {
        setParentValue(newValue);
      } else {
        emit("update:modelValue", newValue);
      }
    };
    watch(() => props.modelValue, (value) => emit("change", value));
    useExpose({
      toggle,
      props,
      checked
    });
    useCustomFieldValue(() => props.modelValue);
    return () => _createVNode(Checker, _mergeProps({
      "bem": bem,
      "role": "checkbox",
      "parent": parent,
      "checked": checked.value,
      "onToggle": toggle
    }, props), pick(slots, ["default", "icon"]));
  }
});
export {
  checkboxProps,
  stdin_default as default
};
