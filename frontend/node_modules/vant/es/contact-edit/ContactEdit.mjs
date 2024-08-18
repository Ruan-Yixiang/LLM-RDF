import { createVNode as _createVNode } from "vue";
import { watch, reactive, defineComponent } from "vue";
import { isMobile, createNamespace, extend } from "../utils/index.mjs";
import { Cell } from "../cell/index.mjs";
import { Form } from "../form/index.mjs";
import { Field } from "../field/index.mjs";
import { Button } from "../button/index.mjs";
import { Switch } from "../switch/index.mjs";
const [name, bem, t] = createNamespace("contact-edit");
const DEFAULT_CONTACT = {
  tel: "",
  name: ""
};
const contactEditProps = {
  isEdit: Boolean,
  isSaving: Boolean,
  isDeleting: Boolean,
  showSetDefault: Boolean,
  setDefaultLabel: String,
  contactInfo: {
    type: Object,
    default: () => extend({}, DEFAULT_CONTACT)
  },
  telValidator: {
    type: Function,
    default: isMobile
  }
};
var stdin_default = defineComponent({
  name,
  props: contactEditProps,
  emits: ["save", "delete", "changeDefault"],
  setup(props, {
    emit
  }) {
    const contact = reactive(extend({}, DEFAULT_CONTACT, props.contactInfo));
    const onSave = () => {
      if (!props.isSaving) {
        emit("save", contact);
      }
    };
    const onDelete = () => emit("delete", contact);
    const renderButtons = () => _createVNode("div", {
      "class": bem("buttons")
    }, [_createVNode(Button, {
      "block": true,
      "round": true,
      "type": "primary",
      "text": t("save"),
      "class": bem("button"),
      "loading": props.isSaving,
      "nativeType": "submit"
    }, null), props.isEdit && _createVNode(Button, {
      "block": true,
      "round": true,
      "text": t("delete"),
      "class": bem("button"),
      "loading": props.isDeleting,
      "onClick": onDelete
    }, null)]);
    const renderSwitch = () => _createVNode(Switch, {
      "modelValue": contact.isDefault,
      "onUpdate:modelValue": ($event) => contact.isDefault = $event,
      "onChange": (checked) => emit("changeDefault", checked)
    }, null);
    const renderSetDefault = () => {
      if (props.showSetDefault) {
        return _createVNode(Cell, {
          "title": props.setDefaultLabel,
          "class": bem("switch-cell"),
          "border": false
        }, {
          "right-icon": renderSwitch
        });
      }
    };
    watch(() => props.contactInfo, (value) => extend(contact, DEFAULT_CONTACT, value));
    return () => _createVNode(Form, {
      "class": bem(),
      "onSubmit": onSave
    }, {
      default: () => [_createVNode("div", {
        "class": bem("fields")
      }, [_createVNode(Field, {
        "modelValue": contact.name,
        "onUpdate:modelValue": ($event) => contact.name = $event,
        "clearable": true,
        "label": t("name"),
        "rules": [{
          required: true,
          message: t("nameEmpty")
        }],
        "maxlength": "30",
        "placeholder": t("name")
      }, null), _createVNode(Field, {
        "modelValue": contact.tel,
        "onUpdate:modelValue": ($event) => contact.tel = $event,
        "clearable": true,
        "type": "tel",
        "label": t("tel"),
        "rules": [{
          validator: props.telValidator,
          message: t("telInvalid")
        }],
        "placeholder": t("tel")
      }, null)]), renderSetDefault(), renderButtons()]
    });
  }
});
export {
  contactEditProps,
  stdin_default as default
};
