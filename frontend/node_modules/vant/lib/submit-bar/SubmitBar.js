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
  submitBarProps: () => submitBarProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_icon = require("../icon");
var import_button = require("../button");
var import_use_placeholder = require("../composables/use-placeholder");
const [name, bem, t] = (0, import_utils.createNamespace)("submit-bar");
const submitBarProps = {
  tip: String,
  label: String,
  price: Number,
  tipIcon: String,
  loading: Boolean,
  currency: (0, import_utils.makeStringProp)("\xA5"),
  disabled: Boolean,
  textAlign: String,
  buttonText: String,
  buttonType: (0, import_utils.makeStringProp)("danger"),
  buttonColor: String,
  suffixLabel: String,
  placeholder: Boolean,
  decimalLength: (0, import_utils.makeNumericProp)(2),
  safeAreaInsetBottom: import_utils.truthProp
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: submitBarProps,
  emits: ["submit"],
  setup(props, {
    emit,
    slots
  }) {
    const root = (0, import_vue2.ref)();
    const renderPlaceholder = (0, import_use_placeholder.usePlaceholder)(root, bem);
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
        return (0, import_vue.createVNode)("div", {
          "class": bem("text"),
          "style": {
            textAlign
          }
        }, [(0, import_vue.createVNode)("span", null, [label || t("label")]), (0, import_vue.createVNode)("span", {
          "class": bem("price")
        }, [currency, (0, import_vue.createVNode)("span", {
          "class": bem("price-integer")
        }, [pricePair[0]]), decimal]), suffixLabel && (0, import_vue.createVNode)("span", {
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
        return (0, import_vue.createVNode)("div", {
          "class": bem("tip")
        }, [tipIcon && (0, import_vue.createVNode)(import_icon.Icon, {
          "class": bem("tip-icon"),
          "name": tipIcon
        }, null), tip && (0, import_vue.createVNode)("span", {
          "class": bem("tip-text")
        }, [tip]), (_a = slots.tip) == null ? void 0 : _a.call(slots)]);
      }
    };
    const onClickButton = () => emit("submit");
    const renderButton = () => {
      if (slots.button) {
        return slots.button();
      }
      return (0, import_vue.createVNode)(import_button.Button, {
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
      return (0, import_vue.createVNode)("div", {
        "ref": root,
        "class": [bem(), {
          "van-safe-area-bottom": props.safeAreaInsetBottom
        }]
      }, [(_a = slots.top) == null ? void 0 : _a.call(slots), renderTip(), (0, import_vue.createVNode)("div", {
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
