import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import { ref, watch, computed, defineComponent } from "vue";
import { pick, extend, makeArrayProp, makeNumericProp, createNamespace } from "../utils/index.mjs";
import { pickerSharedProps } from "../picker/Picker.mjs";
import { INHERIT_PROPS, INHERIT_SLOTS, formatDataForCascade } from "./utils.mjs";
import { useExpose } from "../composables/use-expose.mjs";
import { Picker } from "../picker/index.mjs";
const [name, bem] = createNamespace("area");
const areaProps = extend({}, pick(pickerSharedProps, INHERIT_PROPS), {
  modelValue: String,
  columnsNum: makeNumericProp(3),
  columnsPlaceholder: makeArrayProp(),
  areaList: {
    type: Object,
    default: () => ({})
  }
});
var stdin_default = defineComponent({
  name,
  props: areaProps,
  emits: ["change", "confirm", "cancel", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const codes = ref([]);
    const picker = ref();
    const columns = computed(() => formatDataForCascade(props));
    const onChange = (...args) => emit("change", ...args);
    const onCancel = (...args) => emit("cancel", ...args);
    const onConfirm = (...args) => emit("confirm", ...args);
    watch(codes, (newCodes) => {
      const lastCode = newCodes.length ? newCodes[newCodes.length - 1] : "";
      if (lastCode && lastCode !== props.modelValue) {
        emit("update:modelValue", lastCode);
      }
    }, {
      deep: true
    });
    watch(() => props.modelValue, (newCode) => {
      if (newCode) {
        const lastCode = codes.value.length ? codes.value[codes.value.length - 1] : "";
        if (newCode !== lastCode) {
          codes.value = [`${newCode.slice(0, 2)}0000`, `${newCode.slice(0, 4)}00`, newCode].slice(0, +props.columnsNum);
        }
      } else {
        codes.value = [];
      }
    }, {
      immediate: true
    });
    useExpose({
      confirm: () => {
        var _a;
        return (_a = picker.value) == null ? void 0 : _a.confirm();
      },
      getSelectedOptions: () => {
        var _a;
        return ((_a = picker.value) == null ? void 0 : _a.getSelectedOptions()) || [];
      }
    });
    return () => _createVNode(Picker, _mergeProps({
      "ref": picker,
      "modelValue": codes.value,
      "onUpdate:modelValue": ($event) => codes.value = $event,
      "class": bem(),
      "columns": columns.value,
      "onChange": onChange,
      "onCancel": onCancel,
      "onConfirm": onConfirm
    }, pick(props, INHERIT_PROPS)), pick(slots, INHERIT_SLOTS));
  }
});
export {
  areaProps,
  stdin_default as default
};
