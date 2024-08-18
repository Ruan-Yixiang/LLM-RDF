import { createVNode as _createVNode } from "vue";
import { defineComponent } from "vue";
import { createNamespace, unknownProp } from "../utils/index.mjs";
import { Tag } from "../tag/index.mjs";
import { Icon } from "../icon/index.mjs";
import { Cell } from "../cell/index.mjs";
import { Radio } from "../radio/index.mjs";
import { Button } from "../button/index.mjs";
import { RadioGroup } from "../radio-group/index.mjs";
const [name, bem, t] = createNamespace("contact-list");
const contactListProps = {
  list: Array,
  addText: String,
  modelValue: unknownProp,
  defaultTagText: String
};
var stdin_default = defineComponent({
  name,
  props: contactListProps,
  emits: ["add", "edit", "select", "update:modelValue"],
  setup(props, {
    emit
  }) {
    const renderItem = (item, index) => {
      const onClick = () => {
        emit("update:modelValue", item.id);
        emit("select", item, index);
      };
      const renderRightIcon = () => _createVNode(Radio, {
        "class": bem("radio"),
        "name": item.id,
        "iconSize": 18
      }, null);
      const renderEditIcon = () => _createVNode(Icon, {
        "name": "edit",
        "class": bem("edit"),
        "onClick": (event) => {
          event.stopPropagation();
          emit("edit", item, index);
        }
      }, null);
      const renderContent = () => {
        const nodes = [`${item.name}\uFF0C${item.tel}`];
        if (item.isDefault && props.defaultTagText) {
          nodes.push(_createVNode(Tag, {
            "type": "primary",
            "round": true,
            "class": bem("item-tag")
          }, {
            default: () => [props.defaultTagText]
          }));
        }
        return nodes;
      };
      return _createVNode(Cell, {
        "key": item.id,
        "isLink": true,
        "center": true,
        "class": bem("item"),
        "titleClass": bem("item-title"),
        "onClick": onClick
      }, {
        icon: renderEditIcon,
        title: renderContent,
        "right-icon": renderRightIcon
      });
    };
    return () => _createVNode("div", {
      "class": bem()
    }, [_createVNode(RadioGroup, {
      "modelValue": props.modelValue,
      "class": bem("group")
    }, {
      default: () => [props.list && props.list.map(renderItem)]
    }), _createVNode("div", {
      "class": [bem("bottom"), "van-safe-area-bottom"]
    }, [_createVNode(Button, {
      "round": true,
      "block": true,
      "type": "primary",
      "class": bem("add"),
      "text": props.addText || t("addContact"),
      "onClick": () => emit("add")
    }, null)])]);
  }
});
export {
  contactListProps,
  stdin_default as default
};
