import { createVNode as _createVNode } from "vue";
import { ref, defineComponent } from "vue";
import { truthProp, makeStringProp, makeNumericProp, createNamespace } from "../utils/index.mjs";
import { Icon } from "../icon/index.mjs";
import { Button } from "../button/index.mjs";
import { usePlaceholder } from "../composables/use-placeholder.mjs";
const [name, bem, t] = createNamespace("submit-bar");
const submitBarProps = {
  tip: String,
  label: String,
  price: Number,
  tipIcon: String,
  loading: Boolean,
  currency: makeStringProp("\xA5"),
  disabled: Boolean,
  textAlign: String,
  buttonText: String,
  buttonType: makeStringProp("danger"),
  buttonColor: String,
  suffixLabel: String,
  placeholder: Boolean,
  decimalLength: makeNumericProp(2),
  safeAreaInsetBottom: truthProp
};
var stdin_default = defineComponent({
  name,
  props: submitBarProps,
  emits: ["submit"],
  setup(props, {
    emit,
    slots
  }) {
    const root = ref();
    const renderPlaceholder = usePlaceholder(root, bem);
    const renderText = () => {
      const {
        price,
        label,
        currency,
        textAlign,
        suffixLabel,
        decimalLength
      } = props;
      if (typeof price === "number") {
        const pricePair = (price / 100).toFixed(+decimalLength).split(".");
        const decimal = decimalLength ? `.${pricePair[1]}` : "";
        return _createVNode("div", {
          "class": bem("text"),
          "style": {
            textAlign
          }
        }, [_createVNode("span", null, [label || t("label")]), _createVNode("span", {
          "class": bem("price")
        }, [currency, _createVNode("span", {
          "class": bem("price-integer")
        }, [pricePair[0]]), decimal]), suffixLabel && _createVNode("span", {
          "class": bem("suffix-label")
        }, [suffixLabel])]);
      }
    };
    const renderTip = () => {
      var _a;
      const {
        tip,
        tipIcon
      } = props;
      if (slots.tip || tip) {
        return _createVNode("div", {
          "class": bem("tip")
        }, [tipIcon && _createVNode(Icon, {
          "class": bem("tip-icon"),
          "name": tipIcon
        }, null), tip && _createVNode("span", {
          "class": bem("tip-text")
        }, [tip]), (_a = slots.tip) == null ? void 0 : _a.call(slots)]);
      }
    };
    const onClickButton = () => emit("submit");
    const renderButton = () => {
      if (slots.button) {
        return slots.button();
      }
      return _createVNode(Button, {
        "round": true,
        "type": props.buttonType,
        "text": props.buttonText,
        "class": bem("button", props.buttonType),
        "color": props.buttonColor,
        "loading": props.loading,
        "disabled": props.disabled,
        "onClick": onClickButton
      }, null);
    };
    const renderSubmitBar = () => {
      var _a, _b;
      return _createVNode("div", {
        "ref": root,
        "class": [bem(), {
          "van-safe-area-bottom": props.safeAreaInsetBottom
        }]
      }, [(_a = slots.top) == null ? void 0 : _a.call(slots), renderTip(), _createVNode("div", {
        "class": bem("bar")
      }, [(_b = slots.default) == null ? void 0 : _b.call(slots), renderText(), renderButton()])]);
    };
    return () => {
      if (props.placeholder) {
        return renderPlaceholder(renderSubmitBar);
      }
      return renderSubmitBar();
    };
  }
});
export {
  stdin_default as default,
  submitBarProps
};
