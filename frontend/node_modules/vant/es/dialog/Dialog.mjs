import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
import { ref, reactive, withKeys, defineComponent } from "vue";
import { noop, pick, extend, addUnit, truthProp, isFunction, BORDER_TOP, BORDER_LEFT, unknownProp, numericProp, makeStringProp, callInterceptor, createNamespace } from "../utils/index.mjs";
import { popupSharedProps, popupSharedPropKeys } from "../popup/shared.mjs";
import { Popup } from "../popup/index.mjs";
import { Button } from "../button/index.mjs";
import { ActionBar } from "../action-bar/index.mjs";
import { ActionBarButton } from "../action-bar-button/index.mjs";
const [name, bem, t] = createNamespace("dialog");
const dialogProps = extend({}, popupSharedProps, {
  title: String,
  theme: String,
  width: numericProp,
  message: [String, Function],
  callback: Function,
  allowHtml: Boolean,
  className: unknownProp,
  transition: makeStringProp("van-dialog-bounce"),
  messageAlign: String,
  closeOnPopstate: truthProp,
  showCancelButton: Boolean,
  cancelButtonText: String,
  cancelButtonColor: String,
  cancelButtonDisabled: Boolean,
  confirmButtonText: String,
  confirmButtonColor: String,
  confirmButtonDisabled: Boolean,
  showConfirmButton: truthProp,
  closeOnClickOverlay: Boolean
});
const popupInheritKeys = [...popupSharedPropKeys, "transition", "closeOnPopstate"];
var stdin_default = defineComponent({
  name,
  props: dialogProps,
  emits: ["confirm", "cancel", "keydown", "update:show"],
  setup(props, {
    emit,
    slots
  }) {
    const root = ref();
    const loading = reactive({
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
        callInterceptor(props.beforeClose, {
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
    const onKeydown = withKeys((event) => {
      var _a, _b;
      if (event.target !== ((_b = (_a = root.value) == null ? void 0 : _a.popupRef) == null ? void 0 : _b.value)) {
        return;
      }
      const onEventType = {
        Enter: props.showConfirmButton ? onConfirm : noop,
        Escape: props.showCancelButton ? onCancel : noop
      };
      onEventType[event.key]();
      emit("keydown", event);
    }, ["enter", "esc"]);
    const renderTitle = () => {
      const title = slots.title ? slots.title() : props.title;
      if (title) {
        return _createVNode("div", {
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
      const content = isFunction(message) ? message() : message;
      if (allowHtml && typeof content === "string") {
        return _createVNode("div", {
          "class": classNames,
          "innerHTML": content
        }, null);
      }
      return _createVNode("div", {
        "class": classNames
      }, [content]);
    };
    const renderContent = () => {
      if (slots.default) {
        return _createVNode("div", {
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
        return _createVNode("div", {
          "key": allowHtml ? 1 : 0,
          "class": bem("content", {
            isolated: !hasTitle
          })
        }, [renderMessage(hasTitle)]);
      }
    };
    const renderButtons = () => _createVNode("div", {
      "class": [BORDER_TOP, bem("footer")]
    }, [props.showCancelButton && _createVNode(Button, {
      "size": "large",
      "text": props.cancelButtonText || t("cancel"),
      "class": bem("cancel"),
      "style": {
        color: props.cancelButtonColor
      },
      "loading": loading.cancel,
      "disabled": props.cancelButtonDisabled,
      "onClick": onCancel
    }, null), props.showConfirmButton && _createVNode(Button, {
      "size": "large",
      "text": props.confirmButtonText || t("confirm"),
      "class": [bem("confirm"), {
        [BORDER_LEFT]: props.showCancelButton
      }],
      "style": {
        color: props.confirmButtonColor
      },
      "loading": loading.confirm,
      "disabled": props.confirmButtonDisabled,
      "onClick": onConfirm
    }, null)]);
    const renderRoundButtons = () => _createVNode(ActionBar, {
      "class": bem("footer")
    }, {
      default: () => [props.showCancelButton && _createVNode(ActionBarButton, {
        "type": "warning",
        "text": props.cancelButtonText || t("cancel"),
        "class": bem("cancel"),
        "color": props.cancelButtonColor,
        "loading": loading.cancel,
        "disabled": props.cancelButtonDisabled,
        "onClick": onCancel
      }, null), props.showConfirmButton && _createVNode(ActionBarButton, {
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
      return _createVNode(Popup, _mergeProps({
        "ref": root,
        "role": "dialog",
        "class": [bem([theme]), className],
        "style": {
          width: addUnit(width)
        },
        "tabindex": 0,
        "aria-labelledby": title || message,
        "onKeydown": onKeydown,
        "onUpdate:show": updateShow
      }, pick(props, popupInheritKeys)), {
        default: () => [renderTitle(), renderContent(), renderFooter()]
      });
    };
  }
});
export {
  stdin_default as default,
  dialogProps
};
