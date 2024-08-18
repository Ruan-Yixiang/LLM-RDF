import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
import { nextTick, defineComponent } from "vue";
import { pick, extend, truthProp, makeArrayProp, makeStringProp, createNamespace, HAPTICS_FEEDBACK } from "../utils/index.mjs";
import { Icon } from "../icon/index.mjs";
import { Popup } from "../popup/index.mjs";
import { Loading } from "../loading/index.mjs";
import { popupSharedProps, popupSharedPropKeys } from "../popup/shared.mjs";
const [name, bem] = createNamespace("action-sheet");
const actionSheetProps = extend({}, popupSharedProps, {
  title: String,
  round: truthProp,
  actions: makeArrayProp(),
  closeIcon: makeStringProp("cross"),
  closeable: truthProp,
  cancelText: String,
  description: String,
  closeOnPopstate: truthProp,
  closeOnClickAction: Boolean,
  safeAreaInsetBottom: truthProp
});
const popupInheritKeys = [...popupSharedPropKeys, "round", "closeOnPopstate", "safeAreaInsetBottom"];
var stdin_default = defineComponent({
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
        return _createVNode("div", {
          "class": bem("header")
        }, [props.title, props.closeable && _createVNode(Icon, {
          "name": props.closeIcon,
          "class": [bem("close"), HAPTICS_FEEDBACK],
          "onClick": onCancel
        }, null)]);
      }
    };
    const renderCancel = () => {
      if (slots.cancel || props.cancelText) {
        return [_createVNode("div", {
          "class": bem("gap")
        }, null), _createVNode("button", {
          "type": "button",
          "class": bem("cancel"),
          "onClick": onCancel
        }, [slots.cancel ? slots.cancel() : props.cancelText])];
      }
    };
    const renderActionContent = (action, index) => {
      if (action.loading) {
        return _createVNode(Loading, {
          "class": bem("loading-icon")
        }, null);
      }
      if (slots.action) {
        return slots.action({
          action,
          index
        });
      }
      return [_createVNode("span", {
        "class": bem("name")
      }, [action.name]), action.subname && _createVNode("div", {
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
        nextTick(() => emit("select", action, index));
      };
      return _createVNode("button", {
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
        return _createVNode("div", {
          "class": bem("description")
        }, [content]);
      }
    };
    return () => _createVNode(Popup, _mergeProps({
      "class": bem(),
      "position": "bottom",
      "onUpdate:show": updateShow
    }, pick(props, popupInheritKeys)), {
      default: () => {
        var _a;
        return [renderHeader(), renderDescription(), _createVNode("div", {
          "class": bem("content")
        }, [props.actions.map(renderAction), (_a = slots.default) == null ? void 0 : _a.call(slots)]), renderCancel()];
      }
    });
  }
});
export {
  actionSheetProps,
  stdin_default as default
};
