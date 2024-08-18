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
  default: () => stdin_default,
  treeSelectProps: () => treeSelectProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_icon = require("../icon");
var import_sidebar = require("../sidebar");
var import_sidebar_item = require("../sidebar-item");
const [name, bem] = (0, import_utils.createNamespace)("tree-select");
const treeSelectProps = {
  max: (0, import_utils.makeNumericProp)(Infinity),
  items: (0, import_utils.makeArrayProp)(),
  height: (0, import_utils.makeNumericProp)(300),
  selectedIcon: (0, import_utils.makeStringProp)("success"),
  mainActiveIndex: (0, import_utils.makeNumericProp)(0),
  activeId: {
    type: [Number, String, Array],
    default: 0
  }
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: treeSelectProps,
  emits: ["clickNav", "clickItem", "update:activeId", "update:mainActiveIndex"],
  setup(props, {
    emit,
    slots
  }) {
    const isActiveItem = (id) => Array.isArray(props.activeId) ? props.activeId.includes(id) : props.activeId === id;
    const renderSubItem = (item) => {
      const onClick = () => {
        if (item.disabled) {
          return;
        }
        let activeId;
        if (Array.isArray(props.activeId)) {
          activeId = props.activeId.slice();
          const index = activeId.indexOf(item.id);
          if (index !== -1) {
            activeId.splice(index, 1);
          } else if (activeId.length < +props.max) {
            activeId.push(item.id);
          }
        } else {
          activeId = item.id;
        }
        emit("update:activeId", activeId);
        emit("clickItem", item);
      };
      return (0, import_vue.createVNode)("div", {
        "key": item.id,
        "class": ["van-ellipsis", bem("item", {
          active: isActiveItem(item.id),
          disabled: item.disabled
        })],
        "onClick": onClick
      }, [item.text, isActiveItem(item.id) && (0, import_vue.createVNode)(import_icon.Icon, {
        "name": props.selectedIcon,
        "class": bem("selected")
      }, null)]);
    };
    const onSidebarChange = (index) => {
      emit("update:mainActiveIndex", index);
    };
    const onClickSidebarItem = (index) => emit("clickNav", index);
    const renderSidebar = () => {
      const Items = props.items.map((item) => (0, import_vue.createVNode)(import_sidebar_item.SidebarItem, {
        "dot": item.dot,
        "badge": item.badge,
        "class": [bem("nav-item"), item.className],
        "disabled": item.disabled,
        "onClick": onClickSidebarItem
      }, {
        title: () => slots["nav-text"] ? slots["nav-text"](item) : item.text
      }));
      return (0, import_vue.createVNode)(import_sidebar.Sidebar, {
        "class": bem("nav"),
        "modelValue": props.mainActiveIndex,
        "onChange": onSidebarChange
      }, {
        default: () => [Items]
      });
    };
    const renderContent = () => {
      if (slots.content) {
        return slots.content();
      }
      const selected = props.items[+props.mainActiveIndex] || {};
      if (selected.children) {
        return selected.children.map(renderSubItem);
      }
    };
    return () => (0, import_vue.createVNode)("div", {
      "class": bem(),
      "style": {
        height: (0, import_utils.addUnit)(props.height)
      }
    }, [renderSidebar(), (0, import_vue.createVNode)("div", {
      "class": bem("content")
    }, [renderContent()])]);
  }
});
