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
  contactListProps: () => contactListProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_tag = require("../tag");
var import_icon = require("../icon");
var import_cell = require("../cell");
var import_radio = require("../radio");
var import_button = require("../button");
var import_radio_group = require("../radio-group");
const [name, bem, t] = (0, import_utils.createNamespace)("contact-list");
const contactListProps = {
  list: Array,
  addText: String,
  modelValue: import_utils.unknownProp,
  defaultTagText: String
};
var stdin_default = (0, import_vue2.defineComponent)({
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
      const renderRightIcon = () => (0, import_vue.createVNode)(import_radio.Radio, {
        "class": bem("radio"),
        "name": item.id,
        "iconSize": 18
      }, null);
      const renderEditIcon = () => (0, import_vue.createVNode)(import_icon.Icon, {
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
          nodes.push((0, import_vue.createVNode)(import_tag.Tag, {
            "type": "primary",
            "round": true,
            "class": bem("item-tag")
          }, {
            default: () => [props.defaultTagText]
          }));
        }
        return nodes;
      };
      return (0, import_vue.createVNode)(import_cell.Cell, {
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
    return () => (0, import_vue.createVNode)("div", {
      "class": bem()
    }, [(0, import_vue.createVNode)(import_radio_group.RadioGroup, {
      "modelValue": props.modelValue,
      "class": bem("group")
    }, {
      default: () => [props.list && props.list.map(renderItem)]
    }), (0, import_vue.createVNode)("div", {
      "class": [bem("bottom"), "van-safe-area-bottom"]
    }, [(0, import_vue.createVNode)(import_button.Button, {
      "round": true,
      "block": true,
      "type": "primary",
      "class": bem("add"),
      "text": props.addText || t("addContact"),
      "onClick": () => emit("add")
    }, null)])]);
  }
});
