var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  areaProps: () => areaProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_Picker = require("../picker/Picker");
var import_utils2 = require("./utils");
var import_use_expose = require("../composables/use-expose");
var import_picker = require("../picker");
const [name, bem] = (0, import_utils.createNamespace)("area");
const areaProps = (0, import_utils.extend)({}, (0, import_utils.pick)(import_Picker.pickerSharedProps, import_utils2.INHERIT_PROPS), {
  modelValue: String,
  columnsNum: (0, import_utils.makeNumericProp)(3),
  columnsPlaceholder: (0, import_utils.makeArrayProp)(),
  areaList: {
    type: Object,
    default: () => ({})
  }
});
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: areaProps,
  emits: ["change", "confirm", "cancel", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const codes = (0, import_vue2.ref)([]);
    const picker = (0, import_vue2.ref)();
    const columns = (0, import_vue2.computed)(() => (0, import_utils2.formatDataForCascade)(props));
    const onChange = (...args) => emit("change", ...args);
    const onCancel = (...args) => emit("cancel", ...args);
    const onConfirm = (...args) => emit("confirm", ...args);
    (0, import_vue2.watch)(codes, (newCodes) => {
      const lastCode = newCodes.length ? newCodes[newCodes.length - 1] : "";
      if (lastCode && lastCode !== props.modelValue) {
        emit("update:modelValue", lastCode);
      }
    }, {
      deep: true
    });
    (0, import_vue2.watch)(() => props.modelValue, (newCode) => {
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
    (0, import_use_expose.useExpose)({
      confirm: () => {
        var _a;
        return (_a = picker.value) == null ? void 0 : _a.confirm();
      },
      getSelectedOptions: () => {
        var _a;
        return ((_a = picker.value) == null ? void 0 : _a.getSelectedOptions()) || [];
      }
    });
    return () => (0, import_vue.createVNode)(import_picker.Picker, (0, import_vue.mergeProps)({
      "ref": picker,
      "modelValue": codes.value,
      "onUpdate:modelValue": ($event) => codes.value = $event,
      "class": bem(),
      "columns": columns.value,
      "onChange": onChange,
      "onCancel": onCancel,
      "onConfirm": onConfirm
    }, (0, import_utils.pick)(props, import_utils2.INHERIT_PROPS)), (0, import_utils.pick)(slots, import_utils2.INHERIT_SLOTS));
  }
});
