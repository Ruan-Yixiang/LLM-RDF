import { createVNode as _createVNode } from "vue";
import { Transition, defineComponent } from "vue";
import { truthProp, makeStringProp, createNamespace, HAPTICS_FEEDBACK } from "../utils/index.mjs";
import { Icon } from "../icon/index.mjs";
const [name, bem] = createNamespace("tag");
const tagProps = {
  size: String,
  mark: Boolean,
  show: truthProp,
  type: makeStringProp("default"),
  color: String,
  plain: Boolean,
  round: Boolean,
  textColor: String,
  closeable: Boolean
};
var stdin_default = defineComponent({
  name,
  props: tagProps,
  emits: ["close"],
  setup(props, {
    slots,
    emit
  }) {
    const onClose = (event) => {
      event.stopPropagation();
      emit("close", event);
    };
    const getStyle = () => {
      if (props.plain) {
        return {
          color: props.textColor || props.color,
          borderColor: props.color
        };
      }
      return {
        color: props.textColor,
        background: props.color
      };
    };
    const renderTag = () => {
      var _a;
      const {
        type,
        mark,
        plain,
        round,
        size,
        closeable
      } = props;
      const classes = {
        mark,
        plain,
        round
      };
      if (size) {
        classes[size] = size;
      }
      const CloseIcon = closeable && _createVNode(Icon, {
        "name": "cross",
        "class": [bem("close"), HAPTICS_FEEDBACK],
        "onClick": onClose
      }, null);
      return _createVNode("span", {
        "style": getStyle(),
        "class": bem([classes, type])
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots), CloseIcon]);
    };
    return () => _createVNode(Transition, {
      "name": props.closeable ? "van-fade" : void 0
    }, {
      default: () => [props.show ? renderTag() : null]
    });
  }
});
export {
  stdin_default as default,
  tagProps
};
