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
  actionSheetProps: () => actionSheetProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_icon = require("../icon");
var import_popup = require("../popup");
var import_loading = require("../loading");
var import_shared = require("../popup/shared");
const [name, bem] = (0, import_utils.createNamespace)("action-sheet");
const actionSheetProps = (0, import_utils.extend)({}, import_shared.popupSharedProps, {
  title: String,
  round: import_utils.truthProp,
  actions: (0, import_utils.makeArrayProp)(),
  closeIcon: (0, import_utils.makeStringProp)("cross"),
  closeable: import_utils.truthProp,
  cancelText: String,
  description: String,
  closeOnPopstate: import_utils.truthProp,
  closeOnClickAction: Boolean,
  safeAreaInsetBottom: import_utils.truthProp
});
const popupInheritKeys = [...import_shared.popupSharedPropKeys, "round", "closeOnPopstate", "safeAreaInsetBottom"];
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: actionSheetProps,
  emits: ["select", "cancel", "update:show"],
  setup(props, {
    slots,
    emit
  }) {
    const updateShow = (show) => emit("update:show", show);
    const onCancel = () => {
      updateShow(false);
      emit("cancel");
    };
    const renderHeader = () => {
      if (props.title) {
        return (0, import_vue.createVNode)("div", {
          "class": bem("header")
        }, [props.title, props.closeable && (0, import_vue.createVNode)(import_icon.Icon, {
          "name": props.closeIcon,
          "class": [bem("close"), import_utils.HAPTICS_FEEDBACK],
          "onClick": onCancel
        }, null)]);
      }
    };
    const renderCancel = () => {
      if (slots.cancel || props.cancelText) {
        return [(0, import_vue.createVNode)("div", {
          "class": bem("gap")
        }, null), (0, import_vue.createVNode)("button", {
          "type": "button",
          "class": bem("cancel"),
          "onClick": onCancel
        }, [slots.cancel ? slots.cancel() : props.cancelText])];
      }
    };
    const renderActionContent = (action, index) => {
      if (action.loading) {
        return (0, import_vue.createVNode)(import_loading.Loading, {
          "class": bem("loading-icon")
        }, null);
      }
      if (slots.action) {
        return slots.action({
          action,
          index
        });
      }
      return [(0, import_vue.createVNode)("span", {
        "class": bem("name")
      }, [action.name]), action.subname && (0, import_vue.createVNode)("div", {
        "class": bem("subname")
      }, [action.subname])];
    };
    const renderAction = (action, index) => {
      const {
        color,
        loading,
        callback,
        disabled,
        className
      } = action;
      const onClick = () => {
        if (disabled || loading) {
          return;
        }
        if (callback) {
          callback(action);
        }
        if (props.closeOnClickAction) {
          updateShow(false);
        }
        (0, import_vue2.nextTick)(() => emit("select", action, index));
      };
      return (0, import_vue.createVNode)("button", {
        "type": "button",
        "style": {
          color
        },
        "class": [bem("item", {
          loading,
          disabled
        }), className],
        "onClick": onClick
      }, [renderActionContent(action, index)]);
    };
    const renderDescription = () => {
      if (props.description || slots.description) {
        const content = slots.description ? slots.description() : props.description;
        return (0, import_vue.createVNode)("div", {
          "class": bem("description")
        }, [content]);
      }
    };
    return () => (0, import_vue.createVNode)(import_popup.Popup, (0, import_vue.mergeProps)({
      "class": bem(),
      "position": "bottom",
      "onUpdate:show": updateShow
    }, (0, import_utils.pick)(props, popupInheritKeys)), {
      default: () => {
        var _a;
        return [renderHeader(), renderDescription(), (0, import_vue.createVNode)("div", {
          "class": bem("content")
        }, [props.actions.map(renderAction), (_a = slots.default) == null ? void 0 : _a.call(slots)]), renderCancel()];
      }
    });
  }
});
