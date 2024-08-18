import { createVNode as _createVNode } from "vue";
import { defineComponent } from "vue";
import { addUnit, truthProp, numericProp, BORDER_LEFT, makeStringProp, BORDER_SURROUND, createNamespace, makeNumericProp } from "../utils/index.mjs";
const [name, bem] = createNamespace("password-input");
const passwordInputProps = {
  info: String,
  mask: truthProp,
  value: makeStringProp(""),
  gutter: numericProp,
  length: makeNumericProp(6),
  focused: Boolean,
  errorInfo: String
};
var stdin_default = defineComponent({
  name,
  props: passwordInputProps,
  emits: ["focus"],
  setup(props, {
    emit
  }) {
    const onTouchStart = (event) => {
      event.stopPropagation();
      emit("focus", event);
    };
    const renderPoints = () => {
      const Points = [];
      const {
        mask,
        value,
        gutter,
        focused
      } = props;
      const length = +props.length;
      for (let i = 0; i < length; i++) {
        const char = value[i];
        const showBorder = i !== 0 && !gutter;
        const showCursor = focused && i === value.length;
        let style;
        if (i !== 0 && gutter) {
          style = {
            marginLeft: addUnit(gutter)
          };
        }
        Points.push(_createVNode("li", {
          "class": [{
            [BORDER_LEFT]: showBorder
          }, bem("item", {
            focus: showCursor
          })],
          "style": style
        }, [mask ? _createVNode("i", {
          "style": {
            visibility: char ? "visible" : "hidden"
          }
        }, null) : char, showCursor && _createVNode("div", {
          "class": bem("cursor")
        }, null)]));
      }
      return Points;
    };
    return () => {
      const info = props.errorInfo || props.info;
      return _createVNode("div", {
        "class": bem()
      }, [_createVNode("ul", {
        "class": [bem("security"), {
          [BORDER_SURROUND]: !props.gutter
        }],
        "onTouchstartPassive": onTouchStart
      }, [renderPoints()]), info && _createVNode("div", {
        "class": bem(props.errorInfo ? "error-info" : "info")
      }, [info])]);
    };
  }
});
export {
  stdin_default as default,
  passwordInputProps
};
