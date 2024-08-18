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
  contactCardProps: () => contactCardProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_cell = require("../cell");
const [name, bem, t] = (0, import_utils.createNamespace)("contact-card");
const contactCardProps = {
  tel: String,
  name: String,
  type: (0, import_utils.makeStringProp)("add"),
  addText: String,
  editable: import_utils.truthProp
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: contactCardProps,
  emits: ["click"],
  setup(props, {
    emit
  }) {
    const onClick = (event) => {
      if (props.editable) {
        emit("click", event);
      }
    };
    const renderContent = () => {
      if (props.type === "add") {
        return props.addText || t("addContact");
      }
      return [(0, import_vue.createVNode)("div", null, [`${t("name")}\uFF1A${props.name}`]), (0, import_vue.createVNode)("div", null, [`${t("tel")}\uFF1A${props.tel}`])];
    };
    return () => (0, import_vue.createVNode)(import_cell.Cell, {
      "center": true,
      "icon": props.type === "edit" ? "contact" : "add-square",
      "class": bem([props.type]),
      "border": false,
      "isLink": props.editable,
      "titleClass": bem("title"),
      "onClick": onClick
    }, {
      title: renderContent
    });
  }
});
