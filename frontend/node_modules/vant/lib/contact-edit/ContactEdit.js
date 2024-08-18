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
  contactEditProps: () => contactEditProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_cell = require("../cell");
var import_form = require("../form");
var import_field = require("../field");
var import_button = require("../button");
var import_switch = require("../switch");
const [name, bem, t] = (0, import_utils.createNamespace)("contact-edit");
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
    default: () => (0, import_utils.extend)({}, DEFAULT_CONTACT)
  },
  telValidator: {
    type: Function,
    default: import_utils.isMobile
  }
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: contactEditProps,
  emits: ["save", "delete", "changeDefault"],
  setup(props, {
    emit
  }) {
    const contact = (0, import_vue2.reactive)((0, import_utils.extend)({}, DEFAULT_CONTACT, props.contactInfo));
    const onSave = () => {
      if (!props.isSaving) {
        emit("save", contact);
      }
    };
    const onDelete = () => emit("delete", contact);
    const renderButtons = () => (0, import_vue.createVNode)("div", {
      "class": bem("buttons")
    }, [(0, import_vue.createVNode)(import_button.Button, {
      "block": true,
      "round": true,
      "type": "primary",
      "text": t("save"),
      "class": bem("button"),
      "loading": props.isSaving,
      "nativeType": "submit"
    }, null), props.isEdit && (0, import_vue.createVNode)(import_button.Button, {
      "block": true,
      "round": true,
      "text": t("delete"),
      "class": bem("button"),
      "loading": props.isDeleting,
      "onClick": onDelete
    }, null)]);
    const renderSwitch = () => (0, import_vue.createVNode)(import_switch.Switch, {
      "modelValue": contact.isDefault,
      "onUpdate:modelValue": ($event) => contact.isDefault = $event,
      "onChange": (checked) => emit("changeDefault", checked)
    }, null);
    const renderSetDefault = () => {
      if (props.showSetDefault) {
        return (0, import_vue.createVNode)(import_cell.Cell, {
          "title": props.setDefaultLabel,
          "class": bem("switch-cell"),
          "border": false
        }, {
          "right-icon": renderSwitch
        });
      }
    };
    (0, import_vue2.watch)(() => props.contactInfo, (value) => (0, import_utils.extend)(contact, DEFAULT_CONTACT, value));
    return () => (0, import_vue.createVNode)(import_form.Form, {
      "class": bem(),
      "onSubmit": onSave
    }, {
      default: () => [(0, import_vue.createVNode)("div", {
        "class": bem("fields")
      }, [(0, import_vue.createVNode)(import_field.Field, {
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
      }, null), (0, import_vue.createVNode)(import_field.Field, {
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
