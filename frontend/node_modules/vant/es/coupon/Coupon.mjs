import { createVNode as _createVNode } from "vue";
import { computed, defineComponent } from "vue";
import { makeStringProp, createNamespace, makeRequiredProp } from "../utils/index.mjs";
import { getDate, formatAmount, formatDiscount } from "./utils.mjs";
import { Checkbox } from "../checkbox/index.mjs";
const [name, bem, t] = createNamespace("coupon");
var stdin_default = defineComponent({
  name,
  props: {
    chosen: Boolean,
    coupon: makeRequiredProp(Object),
    disabled: Boolean,
    currency: makeStringProp("\xA5")
  },
  setup(props) {
    const validPeriod = computed(() => {
      const {
        startAt,
        endAt
      } = props.coupon;
      return `${getDate(startAt)} - ${getDate(endAt)}`;
    });
    const faceAmount = computed(() => {
      const {
        coupon,
        currency
      } = props;
      if (coupon.valueDesc) {
        return [coupon.valueDesc, _createVNode("span", null, [coupon.unitDesc || ""])];
      }
      if (coupon.denominations) {
        const denominations = formatAmount(coupon.denominations);
        return [_createVNode("span", null, [currency]), ` ${denominations}`];
      }
      if (coupon.discount) {
        return t("discount", formatDiscount(coupon.discount));
      }
      return "";
    });
    const conditionMessage = computed(() => {
      const condition = formatAmount(props.coupon.originCondition || 0);
      return condition === "0" ? t("unlimited") : t("condition", condition);
    });
    return () => {
      const {
        chosen,
        coupon,
        disabled
      } = props;
      const description = disabled && coupon.reason || coupon.description;
      return _createVNode("div", {
        "class": bem({
          disabled
        })
      }, [_createVNode("div", {
        "class": bem("content")
      }, [_createVNode("div", {
        "class": bem("head")
      }, [_createVNode("h2", {
        "class": bem("amount")
      }, [faceAmount.value]), _createVNode("p", {
        "class": bem("condition")
      }, [coupon.condition || conditionMessage.value])]), _createVNode("div", {
        "class": bem("body")
      }, [_createVNode("p", {
        "class": bem("name")
      }, [coupon.name]), _createVNode("p", {
        "class": bem("valid")
      }, [validPeriod.value]), !disabled && _createVNode(Checkbox, {
        "class": bem("corner"),
        "modelValue": chosen
      }, null)])]), description && _createVNode("p", {
        "class": bem("description")
      }, [description])]);
    };
  }
});
export {
  stdin_default as default
};
