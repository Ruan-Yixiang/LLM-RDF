import { withDirectives as _withDirectives, vShow as _vShow, createVNode as _createVNode } from "vue";
import { ref, watch, computed, nextTick, onMounted, defineComponent } from "vue";
import { truthProp, windowHeight, makeArrayProp, makeStringProp, makeNumberProp, createNamespace } from "../utils/index.mjs";
import { useRefs } from "../composables/use-refs.mjs";
import { Tab } from "../tab/index.mjs";
import { Tabs } from "../tabs/index.mjs";
import { Empty } from "../empty/index.mjs";
import { Field } from "../field/index.mjs";
import { Button } from "../button/index.mjs";
import { Coupon } from "../coupon/index.mjs";
import { useRect } from "@vant/use";
const [name, bem, t] = createNamespace("coupon-list");
const couponListProps = {
  code: makeStringProp(""),
  coupons: makeArrayProp(),
  currency: makeStringProp("\xA5"),
  showCount: truthProp,
  emptyImage: String,
  chosenCoupon: makeNumberProp(-1),
  enabledTitle: String,
  disabledTitle: String,
  disabledCoupons: makeArrayProp(),
  showExchangeBar: truthProp,
  showCloseButton: truthProp,
  closeButtonText: String,
  inputPlaceholder: String,
  exchangeMinLength: makeNumberProp(1),
  exchangeButtonText: String,
  displayedCouponIndex: makeNumberProp(-1),
  exchangeButtonLoading: Boolean,
  exchangeButtonDisabled: Boolean
};
var stdin_default = defineComponent({
  name,
  props: couponListProps,
  emits: ["change", "exchange", "update:code"],
  setup(props, {
    emit,
    slots
  }) {
    const [couponRefs, setCouponRefs] = useRefs();
    const root = ref();
    const barRef = ref();
    const activeTab = ref(0);
    const listHeight = ref(0);
    const currentCode = ref(props.code);
    const buttonDisabled = computed(() => !props.exchangeButtonLoading && (props.exchangeButtonDisabled || !currentCode.value || currentCode.value.length < props.exchangeMinLength));
    const updateListHeight = () => {
      const TABS_HEIGHT = 44;
      const rootHeight = useRect(root).height;
      const headerHeight = useRect(barRef).height + TABS_HEIGHT;
      listHeight.value = (rootHeight > headerHeight ? rootHeight : windowHeight.value) - headerHeight;
    };
    const onExchange = () => {
      emit("exchange", currentCode.value);
      if (!props.code) {
        currentCode.value = "";
      }
    };
    const scrollToCoupon = (index) => {
      nextTick(() => {
        var _a;
        return (_a = couponRefs.value[index]) == null ? void 0 : _a.scrollIntoView();
      });
    };
    const renderEmpty = () => _createVNode(Empty, {
      "image": props.emptyImage
    }, {
      default: () => [_createVNode("p", {
        "class": bem("empty-tip")
      }, [t("noCoupon")])]
    });
    const renderExchangeBar = () => {
      if (props.showExchangeBar) {
        return _createVNode("div", {
          "ref": barRef,
          "class": bem("exchange-bar")
        }, [_createVNode(Field, {
          "modelValue": currentCode.value,
          "onUpdate:modelValue": ($event) => currentCode.value = $event,
          "clearable": true,
          "border": false,
          "class": bem("field"),
          "placeholder": props.inputPlaceholder || t("placeholder"),
          "maxlength": "20"
        }, null), _createVNode(Button, {
          "plain": true,
          "type": "primary",
          "class": bem("exchange"),
          "text": props.exchangeButtonText || t("exchange"),
          "loading": props.exchangeButtonLoading,
          "disabled": buttonDisabled.value,
          "onClick": onExchange
        }, null)]);
      }
    };
    const renderCouponTab = () => {
      const {
        coupons
      } = props;
      const count = props.showCount ? ` (${coupons.length})` : "";
      const title = (props.enabledTitle || t("enable")) + count;
      return _createVNode(Tab, {
        "title": title
      }, {
        default: () => {
          var _a;
          return [_createVNode("div", {
            "class": bem("list", {
              "with-bottom": props.showCloseButton
            }),
            "style": {
              height: `${listHeight.value}px`
            }
          }, [coupons.map((coupon, index) => _createVNode(Coupon, {
            "key": coupon.id,
            "ref": setCouponRefs(index),
            "coupon": coupon,
            "chosen": index === props.chosenCoupon,
            "currency": props.currency,
            "onClick": () => emit("change", index)
          }, null)), !coupons.length && renderEmpty(), (_a = slots["list-footer"]) == null ? void 0 : _a.call(slots)])];
        }
      });
    };
    const renderDisabledTab = () => {
      const {
        disabledCoupons
      } = props;
      const count = props.showCount ? ` (${disabledCoupons.length})` : "";
      const title = (props.disabledTitle || t("disabled")) + count;
      return _createVNode(Tab, {
        "title": title
      }, {
        default: () => {
          var _a;
          return [_createVNode("div", {
            "class": bem("list", {
              "with-bottom": props.showCloseButton
            }),
            "style": {
              height: `${listHeight.value}px`
            }
          }, [disabledCoupons.map((coupon) => _createVNode(Coupon, {
            "disabled": true,
            "key": coupon.id,
            "coupon": coupon,
            "currency": props.currency
          }, null)), !disabledCoupons.length && renderEmpty(), (_a = slots["disabled-list-footer"]) == null ? void 0 : _a.call(slots)])];
        }
      });
    };
    watch(() => props.code, (value) => {
      currentCode.value = value;
    });
    watch(windowHeight, updateListHeight);
    watch(currentCode, (value) => emit("update:code", value));
    watch(() => props.displayedCouponIndex, scrollToCoupon);
    onMounted(() => {
      updateListHeight();
      scrollToCoupon(props.displayedCouponIndex);
    });
    return () => _createVNode("div", {
      "ref": root,
      "class": bem()
    }, [renderExchangeBar(), _createVNode(Tabs, {
      "active": activeTab.value,
      "onUpdate:active": ($event) => activeTab.value = $event,
      "class": bem("tab")
    }, {
      default: () => [renderCouponTab(), renderDisabledTab()]
    }), _createVNode("div", {
      "class": bem("bottom")
    }, [_withDirectives(_createVNode(Button, {
      "round": true,
      "block": true,
      "type": "primary",
      "class": bem("close"),
      "text": props.closeButtonText || t("close"),
      "onClick": () => emit("change", -1)
    }, null), [[_vShow, props.showCloseButton]])])]);
  }
});
export {
  couponListProps,
  stdin_default as default
};
