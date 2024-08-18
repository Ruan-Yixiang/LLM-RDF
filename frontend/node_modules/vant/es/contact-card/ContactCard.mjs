import { createVNode as _createVNode } from "vue";
import { defineComponent } from "vue";
import { truthProp, makeStringProp, createNamespace } from "../utils/index.mjs";
import { Cell } from "../cell/index.mjs";
const [name, bem, t] = createNamespace("contact-card");
const contactCardProps = {
  tel: String,
  name: String,
  type: makeStringProp("add"),
  addText: String,
  editable: truthProp
};
var stdin_default = defineComponent({
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
      return [_createVNode("div", null, [`${t("name")}\uFF1A${props.name}`]), _createVNode("div", null, [`${t("tel")}\uFF1A${props.tel}`])];
    };
    return () => _createVNode(Cell, {
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
export {
  contactCardProps,
  stdin_default as default
};
