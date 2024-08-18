import { Fragment as _Fragment, createVNode as _createVNode } from "vue";
import { ref, defineComponent } from "vue";
import { createNamespace, numericProp } from "../utils/index.mjs";
import { Cell } from "../cell/index.mjs";
import { Field } from "../field/index.mjs";
const [name, bem] = createNamespace("address-edit-detail");
const t = createNamespace("address-edit")[2];
var stdin_default = defineComponent({
  name,
  props: {
    show: Boolean,
    rows: numericProp,
    value: String,
    rules: Array,
    focused: Boolean,
    maxlength: numericProp,
    searchResult: Array,
    showSearchResult: Boolean
  },
  emits: ["blur", "focus", "input", "selectSearch"],
  setup(props, {
    emit
  }) {
    const field = ref();
    const showSearchResult = () => props.focused && props.searchResult && props.showSearchResult;
    const onSelect = (express) => {
      emit("selectSearch", express);
      emit("input", `${express.address || ""} ${express.name || ""}`.trim());
    };
    const renderSearchResult = () => {
      if (!showSearchResult()) {
        return;
      }
      const {
        searchResult
      } = props;
      return searchResult.map((express) => _createVNode(Cell, {
        "clickable": true,
        "key": (express.name || "") + (express.address || ""),
        "icon": "location-o",
        "title": express.name,
        "label": express.address,
        "class": bem("search-item"),
        "border": false,
        "onClick": () => onSelect(express)
      }, null));
    };
    const onBlur = (event) => emit("blur", event);
    const onFocus = (event) => emit("focus", event);
    const onInput = (value) => emit("input", value);
    return () => {
      if (props.show) {
        return _createVNode(_Fragment, null, [_createVNode(Field, {
          "autosize": true,
          "clearable": true,
          "ref": field,
          "class": bem(),
          "rows": props.rows,
          "type": "textarea",
          "rules": props.rules,
          "label": t("addressDetail"),
          "border": !showSearchResult(),
          "maxlength": props.maxlength,
          "modelValue": props.value,
          "placeholder": t("addressDetail"),
          "onBlur": onBlur,
          "onFocus": onFocus,
          "onUpdate:modelValue": onInput
        }, null), renderSearchResult()]);
      }
    };
  }
});
export {
  stdin_default as default
};
