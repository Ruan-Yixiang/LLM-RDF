import { createVNode as _createVNode } from "vue";
import { computed, defineComponent } from "vue";
import { extend, addUnit, numericProp, getSizeStyle, makeStringProp, createNamespace } from "../utils/index.mjs";
const [name, bem] = createNamespace("loading");
const SpinIcon = Array(12).fill(null).map((_, index) => _createVNode("i", {
  "class": bem("line", String(index + 1))
}, null));
const CircularIcon = _createVNode("svg", {
  "class": bem("circular"),
  "viewBox": "25 25 50 50"
}, [_createVNode("circle", {
  "cx": "50",
  "cy": "50",
  "r": "20",
  "fill": "none"
}, null)]);
const loadingProps = {
  size: numericProp,
  type: makeStringProp("circular"),
  color: String,
  vertical: Boolean,
  textSize: numericProp,
  textColor: String
};
var stdin_default = defineComponent({
  name,
  props: loadingProps,
  setup(props, {
    slots
  }) {
    const spinnerStyle = computed(() => extend({
      color: props.color
    }, getSizeStyle(props.size)));
    const renderIcon = () => {
      const DefaultIcon = props.type === "spinner" ? SpinIcon : CircularIcon;
      return _createVNode("span", {
        "class": bem("spinner", props.type),
        "style": spinnerStyle.value
      }, [slots.icon ? slots.icon() : DefaultIcon]);
    };
    const renderText = () => {
      var _a;
      if (slots.default) {
        return _createVNode("span", {
          "class": bem("text"),
          "style": {
            fontSize: addUnit(props.textSize),
            color: (_a = props.textColor) != null ? _a : props.color
          }
        }, [slots.default()]);
      }
    };
    return () => {
      const {
        type,
        vertical
      } = props;
      return _createVNode("div", {
        "class": bem([type, {
          vertical
        }]),
        "aria-live": "polite",
        "aria-busy": true
      }, [renderIcon(), renderText()]);
    };
  }
});
export {
  stdin_default as default,
  loadingProps
};
