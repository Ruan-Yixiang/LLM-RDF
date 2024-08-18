import { createVNode as _createVNode } from "vue";
import { defineComponent } from "vue";
import { bem, t } from "./utils.mjs";
import { createNamespace, HAPTICS_FEEDBACK } from "../utils/index.mjs";
const [name] = createNamespace("picker-toolbar");
const pickerToolbarProps = {
  title: String,
  cancelButtonText: String,
  confirmButtonText: String
};
const pickerToolbarSlots = ["cancel", "confirm", "title", "toolbar"];
const pickerToolbarPropKeys = Object.keys(pickerToolbarProps);
var stdin_default = defineComponent({
  name,
  props: pickerToolbarProps,
  emits: ["confirm", "cancel"],
  setup(props, {
    emit,
    slots
  }) {
    const renderTitle = () => {
      if (slots.title) {
        return slots.title();
      }
      if (props.title) {
        return _createVNode("div", {
          "class": [bem("title"), "van-ellipsis"]
        }, [props.title]);
      }
    };
    const onCancel = () => emit("cancel");
    const onConfirm = () => emit("confirm");
    const renderCancel = () => {
      const text = props.cancelButtonText || t("cancel");
      return _createVNode("button", {
        "type": "button",
        "class": [bem("cancel"), HAPTICS_FEEDBACK],
        "onClick": onCancel
      }, [slots.cancel ? slots.cancel() : text]);
    };
    const renderConfirm = () => {
      const text = props.confirmButtonText || t("confirm");
      return _createVNode("button", {
        "type": "button",
        "class": [bem("confirm"), HAPTICS_FEEDBACK],
        "onClick": onConfirm
      }, [slots.confirm ? slots.confirm() : text]);
    };
    return () => _createVNode("div", {
      "class": bem("toolbar")
    }, [slots.toolbar ? slots.toolbar() : [renderCancel(), renderTitle(), renderConfirm()]]);
  }
});
export {
  stdin_default as default,
  pickerToolbarPropKeys,
  pickerToolbarProps,
  pickerToolbarSlots
};
