import { createVNode as _createVNode } from "vue";
import { watch, defineComponent } from "vue";
import { unknownProp, numericProp, createNamespace } from "../utils/index.mjs";
import { useChildren, useCustomFieldValue } from "@vant/use";
const [name, bem] = createNamespace("radio-group");
const radioGroupProps = {
  disabled: Boolean,
  iconSize: numericProp,
  direction: String,
  modelValue: unknownProp,
  checkedColor: String
};
const RADIO_KEY = Symbol(name);
var stdin_default = defineComponent({
  name,
  props: radioGroupProps,
  emits: ["change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const {
      linkChildren
    } = useChildren(RADIO_KEY);
    const updateValue = (value) => emit("update:modelValue", value);
    watch(() => props.modelValue, (value) => emit("change", value));
    linkChildren({
      props,
      updateValue
    });
    useCustomFieldValue(() => props.modelValue);
    return () => {
      var _a;
      return _createVNode("div", {
        "class": bem([props.direction]),
        "role": "radiogroup"
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
export {
  RADIO_KEY,
  stdin_default as default,
  radioGroupProps
};
