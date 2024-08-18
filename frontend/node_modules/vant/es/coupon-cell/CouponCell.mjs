import { createVNode as _createVNode } from "vue";
import { defineComponent } from "vue";
import { isDef, truthProp, makeArrayProp, makeStringProp, makeNumericProp, createNamespace } from "../utils/index.mjs";
import { Cell } from "../cell/index.mjs";
const [name, bem, t] = createNamespace("coupon-cell");
const couponCellProps = {
  title: String,
  border: truthProp,
  editable: truthProp,
  coupons: makeArrayProp(),
  currency: makeStringProp("\xA5"),
  chosenCoupon: makeNumericProp(-1)
};
function formatValue({
  coupons,
  chosenCoupon,
  currency
}) {
  const coupon = coupons[+chosenCoupon];
  if (coupon) {
    let value = 0;
    if (isDef(coupon.value)) {
      ({
        value
      } = coupon);
    } else if (isDef(coupon.denominations)) {
      value = coupon.denominations;
    }
    return `-${currency} ${(value / 100).toFixed(2)}`;
  }
  return coupons.length === 0 ? t("noCoupon") : t("count", coupons.length);
}
var stdin_default = defineComponent({
  name,
  props: couponCellProps,
  setup(props) {
    return () => {
      const selected = props.coupons[+props.chosenCoupon];
      return _createVNode(Cell, {
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
export {
  couponCellProps,
  stdin_default as default
};
