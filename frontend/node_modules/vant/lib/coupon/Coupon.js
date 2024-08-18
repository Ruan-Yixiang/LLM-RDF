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
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_utils2 = require("./utils");
var import_checkbox = require("../checkbox");
const [name, bem, t] = (0, import_utils.createNamespace)("coupon");
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: {
    chosen: Boolean,
    coupon: (0, import_utils.makeRequiredProp)(Object),
    disabled: Boolean,
    currency: (0, import_utils.makeStringProp)("\xA5")
  },
  setup(props) {
    const validPeriod = (0, import_vue2.computed)(() => {
      const {
        startAt,
        endAt
      } = props.coupon;
      return `${(0, import_utils2.getDate)(startAt)} - ${(0, import_utils2.getDate)(endAt)}`;
    });
    const faceAmount = (0, import_vue2.computed)(() => {
      const {
        coupon,
        currency
      } = props;
      if (coupon.valueDesc) {
        return [coupon.valueDesc, (0, import_vue.createVNode)("span", null, [coupon.unitDesc || ""])];
      }
      if (coupon.denominations) {
        const denominations = (0, import_utils2.formatAmount)(coupon.denominations);
        return [(0, import_vue.createVNode)("span", null, [currency]), ` ${denominations}`];
      }
      if (coupon.discount) {
        return t("discount", (0, import_utils2.formatDiscount)(coupon.discount));
      }
      return "";
    });
    const conditionMessage = (0, import_vue2.computed)(() => {
      const condition = (0, import_utils2.formatAmount)(props.coupon.originCondition || 0);
      return condition === "0" ? t("unlimited") : t("condition", condition);
    });
    return () => {
      const {
        chosen,
        coupon,
        disabled
      } = props;
      const description = disabled && coupon.reason || coupon.description;
      return (0, import_vue.createVNode)("div", {
        "class": bem({
          disabled
        })
      }, [(0, import_vue.createVNode)("div", {
        "class": bem("content")
      }, [(0, import_vue.createVNode)("div", {
        "class": bem("head")
      }, [(0, import_vue.createVNode)("h2", {
        "class": bem("amount")
      }, [faceAmount.value]), (0, import_vue.createVNode)("p", {
        "class": bem("condition")
      }, [coupon.condition || conditionMessage.value])]), (0, import_vue.createVNode)("div", {
        "class": bem("body")
      }, [(0, import_vue.createVNode)("p", {
        "class": bem("name")
      }, [coupon.name]), (0, import_vue.createVNode)("p", {
        "class": bem("valid")
      }, [validPeriod.value]), !disabled && (0, import_vue.createVNode)(import_checkbox.Checkbox, {
        "class": bem("corner"),
        "modelValue": chosen
      }, null)])]), description && (0, import_vue.createVNode)("p", {
        "class": bem("description")
      }, [description])]);
    };
  }
});
