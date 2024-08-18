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
  couponCellProps: () => couponCellProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_cell = require("../cell");
const [name, bem, t] = (0, import_utils.createNamespace)("coupon-cell");
const couponCellProps = {
  title: String,
  border: import_utils.truthProp,
  editable: import_utils.truthProp,
  coupons: (0, import_utils.makeArrayProp)(),
  currency: (0, import_utils.makeStringProp)("\xA5"),
  chosenCoupon: (0, import_utils.makeNumericProp)(-1)
};
function formatValue({
  coupons,
  chosenCoupon,
  currency
}) {
  const coupon = coupons[+chosenCoupon];
  if (coupon) {
    let value = 0;
    if ((0, import_utils.isDef)(coupon.value)) {
      ({
        value
      } = coupon);
    } else if ((0, import_utils.isDef)(coupon.denominations)) {
      value = coupon.denominations;
    }
    return `-${currency} ${(value / 100).toFixed(2)}`;
  }
  return coupons.length === 0 ? t("noCoupon") : t("count", coupons.length);
}
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: couponCellProps,
  setup(props) {
    return () => {
      const selected = props.coupons[+props.chosenCoupon];
      return (0, import_vue.createVNode)(import_cell.Cell, {
        "class": bem(),
        "value": formatValue(props),
        "title": props.title || t("title"),
        "border": props.border,
        "isLink": props.editable,
        "valueClass": bem("value", {
          selected
        })
      }, null);
    };
  }
});
