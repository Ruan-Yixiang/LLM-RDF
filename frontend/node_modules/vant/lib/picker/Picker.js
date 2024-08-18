var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default,
  pickerProps: () => pickerProps,
  pickerSharedProps: () => pickerSharedProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_utils2 = require("./utils");
var import_use = require("@vant/use");
var import_use_expose = require("../composables/use-expose");
var import_loading = require("../loading");
var import_PickerColumn = __toESM(require("./PickerColumn"));
var import_PickerToolbar = __toESM(require("./PickerToolbar"));
var import_PickerGroup = require("../picker-group/PickerGroup");
const pickerSharedProps = (0, import_utils.extend)({
  loading: Boolean,
  readonly: Boolean,
  allowHtml: Boolean,
  optionHeight: (0, import_utils.makeNumericProp)(44),
  showToolbar: import_utils.truthProp,
  swipeDuration: (0, import_utils.makeNumericProp)(1e3),
  visibleOptionNum: (0, import_utils.makeNumericProp)(6)
}, import_PickerToolbar.pickerToolbarProps);
const pickerProps = (0, import_utils.extend)({}, pickerSharedProps, {
  columns: (0, import_utils.makeArrayProp)(),
  modelValue: (0, import_utils.makeArrayProp)(),
  toolbarPosition: (0, import_utils.makeStringProp)("top"),
  columnsFieldNames: Object
});
var stdin_default = (0, import_vue2.defineComponent)({
  name: import_utils2.name,
  props: pickerProps,
  emits: ["confirm", "cancel", "change", "scrollInto", "clickOption", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const columnsRef = (0, import_vue2.ref)();
    const selectedValues = (0, import_vue2.ref)(props.modelValue.slice(0));
    const {
      parent
    } = (0, import_use.useParent)(import_PickerGroup.PICKER_GROUP_KEY);
    const {
      children,
      linkChildren
    } = (0, import_use.useChildren)(import_PickerColumn.PICKER_KEY);
    linkChildren();
    const fields = (0, import_vue2.computed)(() => (0, import_utils2.assignDefaultFields)(props.columnsFieldNames));
    const optionHeight = (0, import_vue2.computed)(() => (0, import_utils.unitToPx)(props.optionHeight));
    const columnsType = (0, import_vue2.computed)(() => (0, import_utils2.getColumnsType)(props.columns, fields.value));
    const currentColumns = (0, import_vue2.computed)(() => {
      const {
        columns
      } = props;
      switch (columnsType.value) {
        case "multiple":
          return columns;
        case "cascade":
          return (0, import_utils2.formatCascadeColumns)(columns, fields.value, selectedValues);
        default:
          return [columns];
      }
    });
    const hasOptions = (0, import_vue2.computed)(() => currentColumns.value.some((options) => options.length));
    const selectedOptions = (0, import_vue2.computed)(() => currentColumns.value.map((options, index) => (0, import_utils2.findOptionByValue)(options, selectedValues.value[index], fields.value)));
    const selectedIndexes = (0, import_vue2.computed)(() => currentColumns.value.map((options, index) => options.findIndex((option) => option[fields.value.value] === selectedValues.value[index])));
    const setValue = (index, value) => {
      if (selectedValues.value[index] !== value) {
        const newValues = selectedValues.value.slice(0);
        newValues[index] = value;
        selectedValues.value = newValues;
      }
    };
    const getEventParams = () => ({
      selectedValues: selectedValues.value.slice(0),
      selectedOptions: selectedOptions.value,
      selectedIndexes: selectedIndexes.value
    });
    const onChange = (value, columnIndex) => {
      setValue(columnIndex, value);
      if (columnsType.value === "cascade") {
        selectedValues.value.forEach((value2, index) => {
          const options = currentColumns.value[index];
          if (!(0, import_utils2.isOptionExist)(options, value2, fields.value)) {
            setValue(index, options.length ? options[0][fields.value.value] : void 0);
          }
        });
      }
      (0, import_vue2.nextTick)(() => {
        emit("change", (0, import_utils.extend)({
          columnIndex
        }, getEventParams()));
      });
    };
    const onClickOption = (currentOption, columnIndex) => {
      const params = {
        columnIndex,
        currentOption
      };
      emit("clickOption", (0, import_utils.extend)(getEventParams(), params));
      emit("scrollInto", params);
    };
    const confirm = () => {
      children.forEach((child) => child.stopMomentum());
      const params = getEventParams();
      (0, import_vue2.nextTick)(() => {
        emit("confirm", params);
      });
      return params;
    };
    const cancel = () => emit("cancel", getEventParams());
    const renderColumnItems = () => currentColumns.value.map((options, columnIndex) => (0, import_vue.createVNode)(import_PickerColumn.default, {
      "value": selectedValues.value[columnIndex],
      "fields": fields.value,
      "options": options,
      "readonly": props.readonly,
      "allowHtml": props.allowHtml,
      "optionHeight": optionHeight.value,
      "swipeDuration": props.swipeDuration,
      "visibleOptionNum": props.visibleOptionNum,
      "onChange": (value) => onChange(value, columnIndex),
      "onClickOption": (option) => onClickOption(option, columnIndex),
      "onScrollInto": (option) => {
        emit("scrollInto", {
          currentOption: option,
          columnIndex
        });
      }
    }, {
      option: slots.option
    }));
    const renderMask = (wrapHeight) => {
      if (hasOptions.value) {
        const frameStyle = {
          height: `${optionHeight.value}px`
        };
        const maskStyle = {
          backgroundSize: `100% ${(wrapHeight - optionHeight.value) / 2}px`
        };
        return [(0, import_vue.createVNode)("div", {
          "class": (0, import_utils2.bem)("mask"),
          "style": maskStyle
        }, null), (0, import_vue.createVNode)("div", {
          "class": [import_utils.BORDER_UNSET_TOP_BOTTOM, (0, import_utils2.bem)("frame")],
          "style": frameStyle
        }, null)];
      }
    };
    const renderColumns = () => {
      const wrapHeight = optionHeight.value * +props.visibleOptionNum;
      const columnsStyle = {
        height: `${wrapHeight}px`
      };
      return (0, import_vue.createVNode)("div", {
        "ref": columnsRef,
        "class": (0, import_utils2.bem)("columns"),
        "style": columnsStyle
      }, [renderColumnItems(), renderMask(wrapHeight)]);
    };
    const renderToolbar = () => {
      if (props.showToolbar && !parent) {
        return (0, import_vue.createVNode)(import_PickerToolbar.default, (0, import_vue.mergeProps)((0, import_utils.pick)(props, import_PickerToolbar.pickerToolbarPropKeys), {
          "onConfirm": confirm,
          "onCancel": cancel
        }), (0, import_utils.pick)(slots, import_PickerToolbar.pickerToolbarSlots));
      }
    };
    (0, import_vue2.watch)(currentColumns, (columns) => {
      columns.forEach((options, index) => {
        if (options.length && !(0, import_utils2.isOptionExist)(options, selectedValues.value[index], fields.value)) {
          setValue(index, (0, import_utils2.getFirstEnabledOption)(options)[fields.value.value]);
        }
      });
    }, {
      immediate: true
    });
    let lastEmittedModelValue;
    (0, import_vue2.watch)(() => props.modelValue, (newValues) => {
      if (!(0, import_utils.isSameValue)(newValues, selectedValues.value) && !(0, import_utils.isSameValue)(newValues, lastEmittedModelValue)) {
        selectedValues.value = newValues.slice(0);
        lastEmittedModelValue = newValues.slice(0);
      }
    }, {
      deep: true
    });
    (0, import_vue2.watch)(selectedValues, (newValues) => {
      if (!(0, import_utils.isSameValue)(newValues, props.modelValue)) {
        lastEmittedModelValue = newValues.slice(0);
        emit("update:modelValue", lastEmittedModelValue);
      }
    }, {
      immediate: true
    });
    (0, import_use.useEventListener)("touchmove", import_utils.preventDefault, {
      target: columnsRef
    });
    const getSelectedOptions = () => selectedOptions.value;
    (0, import_use_expose.useExpose)({
      confirm,
      getSelectedOptions
    });
    return () => {
      var _a, _b;
      return (0, import_vue.createVNode)("div", {
        "class": (0, import_utils2.bem)()
      }, [props.toolbarPosition === "top" ? renderToolbar() : null, props.loading ? (0, import_vue.createVNode)(import_loading.Loading, {
        "class": (0, import_utils2.bem)("loading")
      }, null) : null, (_a = slots["columns-top"]) == null ? void 0 : _a.call(slots), renderColumns(), (_b = slots["columns-bottom"]) == null ? void 0 : _b.call(slots), props.toolbarPosition === "bottom" ? renderToolbar() : null]);
    };
  }
});
