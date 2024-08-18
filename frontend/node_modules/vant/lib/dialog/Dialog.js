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
  dialogProps: () => dialogProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_shared = require("../popup/shared");
var import_popup = require("../popup");
var import_button = require("../button");
var import_action_bar = require("../action-bar");
var import_action_bar_button = require("../action-bar-button");
const [name, bem, t] = (0, import_utils.createNamespace)("dialog");
const dialogProps = (0, import_utils.extend)({}, import_shared.popupSharedProps, {
  title: String,
  theme: String,
  width: import_utils.numericProp,
  message: [String, Function],
  callback: Function,
  allowHtml: Boolean,
  className: import_utils.unknownProp,
  transition: (0, import_utils.makeStringProp)("van-dialog-bounce"),
  messageAlign: String,
  closeOnPopstate: import_utils.truthProp,
  showCancelButton: Boolean,
  cancelButtonText: String,
  cancelButtonColor: String,
  cancelButtonDisabled: Boolean,
  confirmButtonText: String,
  confirmButtonColor: String,
  confirmButtonDisabled: Boolean,
  showConfirmButton: import_utils.truthProp,
  closeOnClickOverlay: Boolean
});
const popupInheritKeys = [...import_shared.popupSharedPropKeys, "transition", "closeOnPopstate"];
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: dialogProps,
  emits: ["confirm", "cancel", "keydown", "update:show"],
  setup(props, {
    emit,
    slots
  }) {
    const root = (0, import_vue2.ref)();
    const loading = (0, import_vue2.reactive)({
      confirm: false,
      cancel: false
    });
    const updateShow = (value) => emit("update:show", value);
    const close = (action) => {
      var _a;
      updateShow(false);
      (_a = props.callback) == null ? void 0 : _a.call(props, action);
    };
    const getActionHandler = (action) => () => {
      if (!props.show) {
        return;
      }
      emit(action);
      if (props.beforeClose) {
        loading[action] = true;
        (0, import_utils.callInterceptor)(props.beforeClose, {
          args: [action],
          done() {
            close(action);
            loading[action] = false;
          },
          canceled() {
            loading[action] = false;
          }
        });
      } else {
        close(action);
      }
    };
    const onCancel = getActionHandler("cancel");
    const onConfirm = getActionHandler("confirm");
    const onKeydown = (0, import_vue2.withKeys)((event) => {
      var _a, _b;
      if (event.target !== ((_b = (_a = root.value) == null ? void 0 : _a.popupRef) == null ? void 0 : _b.value)) {
        return;
      }
      const onEventType = {
        Enter: props.showConfirmButton ? onConfirm : import_utils.noop,
        Escape: props.showCancelButton ? onCancel : import_utils.noop
      };
      onEventType[event.key]();
      emit("keydown", event);
    }, ["enter", "esc"]);
    const renderTitle = () => {
      const title = slots.title ? slots.title() : props.title;
      if (title) {
        return (0, import_vue.createVNode)("div", {
          "class": bem("header", {
            isolated: !props.message && !slots.default
          })
        }, [title]);
      }
    };
    const renderMessage = (hasTitle) => {
      const {
        message,
        allowHtml,
        messageAlign
      } = props;
      const classNames = bem("message", {
        "has-title": hasTitle,
        [messageAlign]: messageAlign
      });
      const content = (0, import_utils.isFunction)(message) ? message() : message;
      if (allowHtml && typeof content === "string") {
        return (0, import_vue.createVNode)("div", {
          "class": classNames,
          "innerHTML": content
        }, null);
      }
      return (0, import_vue.createVNode)("div", {
        "class": classNames
      }, [content]);
    };
    const renderContent = () => {
      if (slots.default) {
        return (0, import_vue.createVNode)("div", {
          "class": bem("content")
        }, [slots.default()]);
      }
      const {
        title,
        message,
        allowHtml
      } = props;
      if (message) {
        const hasTitle = !!(title || slots.title);
        return (0, import_vue.createVNode)("div", {
          "key": allowHtml ? 1 : 0,
          "class": bem("content", {
            isolated: !hasTitle
          })
        }, [renderMessage(hasTitle)]);
      }
    };
    const renderButtons = () => (0, import_vue.createVNode)("div", {
      "class": [import_utils.BORDER_TOP, bem("footer")]
    }, [props.showCancelButton && (0, import_vue.createVNode)(import_button.Button, {
      "size": "large",
      "text": props.cancelButtonText || t("cancel"),
      "class": bem("cancel"),
      "style": {
        color: props.cancelButtonColor
      },
      "loading": loading.cancel,
      "disabled": props.cancelButtonDisabled,
      "onClick": onCancel
    }, null), props.showConfirmButton && (0, import_vue.createVNode)(import_button.Button, {
      "size": "large",
      "text": props.confirmButtonText || t("confirm"),
      "class": [bem("confirm"), {
        [import_utils.BORDER_LEFT]: props.showCancelButton
      }],
      "style": {
        color: props.confirmButtonColor
      },
      "loading": loading.confirm,
      "disabled": props.confirmButtonDisabled,
      "onClick": onConfirm
    }, null)]);
    const renderRoundButtons = () => (0, import_vue.createVNode)(import_action_bar.ActionBar, {
      "class": bem("footer")
    }, {
      default: () => [props.showCancelButton && (0, import_vue.createVNode)(import_action_bar_button.ActionBarButton, {
        "type": "warning",
        "text": props.cancelButtonText || t("cancel"),
        "class": bem("cancel"),
        "color": props.cancelButtonColor,
        "loading": loading.cancel,
        "disabled": props.cancelButtonDisabled,
        "onClick": onCancel
      }, null), props.showConfirmButton && (0, import_vue.createVNode)(import_action_bar_button.ActionBarButton, {
        "type": "danger",
        "text": props.confirmButtonText || t("confirm"),
        "class": bem("confirm"),
        "color": props.confirmButtonColor,
        "loading": loading.confirm,
        "disabled": props.confirmButtonDisabled,
        "onClick": onConfirm
      }, null)]
    });
    const renderFooter = () => {
      if (slots.footer) {
        return slots.footer();
      }
      return props.theme === "round-button" ? renderRoundButtons() : renderButtons();
    };
    return () => {
      const {
        width,
        title,
        theme,
        message,
        className
      } = props;
      return (0, import_vue.createVNode)(import_popup.Popup, (0, import_vue.mergeProps)({
        "ref": root,
        "role": "dialog",
        "class": [bem([theme]), className],
        "style": {
          width: (0, import_utils.addUnit)(width)
        },
        "tabindex": 0,
        "aria-labelledby": title || message,
        "onKeydown": onKeydown,
        "onUpdate:show": updateShow
      }, (0, import_utils.pick)(props, popupInheritKeys)), {
        default: () => [renderTitle(), renderContent(), renderFooter()]
      });
    };
  }
});
