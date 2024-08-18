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
  couponListProps: () => couponListProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_use_refs = require("../composables/use-refs");
var import_tab = require("../tab");
var import_tabs = require("../tabs");
var import_empty = require("../empty");
var import_field = require("../field");
var import_button = require("../button");
var import_coupon = require("../coupon");
var import_use = require("@vant/use");
const [name, bem, t] = (0, import_utils.createNamespace)("coupon-list");
const couponListProps = {
  code: (0, import_utils.makeStringProp)(""),
  coupons: (0, import_utils.makeArrayProp)(),
  currency: (0, import_utils.makeStringProp)("\xA5"),
  showCount: import_utils.truthProp,
  emptyImage: String,
  chosenCoupon: (0, import_utils.makeNumberProp)(-1),
  enabledTitle: String,
  disabledTitle: String,
  disabledCoupons: (0, import_utils.makeArrayProp)(),
  showExchangeBar: import_utils.truthProp,
  showCloseButton: import_utils.truthProp,
  closeButtonText: String,
  inputPlaceholder: String,
  exchangeMinLength: (0, import_utils.makeNumberProp)(1),
  exchangeButtonText: String,
  displayedCouponIndex: (0, import_utils.makeNumberProp)(-1),
  exchangeButtonLoading: Boolean,
  exchangeButtonDisabled: Boolean
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: couponListProps,
  emits: ["change", "exchange", "update:code"],
  setup(props, {
    emit,
    slots
  }) {
    const [couponRefs, setCouponRefs] = (0, import_use_refs.useRefs)();
    const root = (0, import_vue2.ref)();
    const barRef = (0, import_vue2.ref)();
    const activeTab = (0, import_vue2.ref)(0);
    const listHeight = (0, import_vue2.ref)(0);
    const currentCode = (0, import_vue2.ref)(props.code);
    const buttonDisabled = (0, import_vue2.computed)(() => !props.exchangeButtonLoading && (props.exchangeButtonDisabled || !currentCode.value || currentCode.value.length < props.exchangeMinLength));
    const updateListHeight = () => {
      const TABS_HEIGHT = 44;
      const rootHeight = (0, import_use.useRect)(root).height;
      const headerHeight = (0, import_use.useRect)(barRef).height + TABS_HEIGHT;
      listHeight.value = (rootHeight > headerHeight ? rootHeight : import_utils.windowHeight.value) - headerHeight;
    };
    const onExchange = () => {
      emit("exchange", currentCode.value);
      if (!props.code) {
        currentCode.value = "";
      }
    };
    const scrollToCoupon = (index) => {
      (0, import_vue2.nextTick)(() => {
        var _a;
        return (_a = couponRefs.value[index]) == null ? void 0 : _a.scrollIntoView();
      });
    };
    const renderEmpty = () => (0, import_vue.createVNode)(import_empty.Empty, {
      "image": props.emptyImage
    }, {
      default: () => [(0, import_vue.createVNode)("p", {
        "class": bem("empty-tip")
      }, [t("noCoupon")])]
    });
    const renderExchangeBar = () => {
      if (props.showExchangeBar) {
        return (0, import_vue.createVNode)("div", {
          "ref": barRef,
          "class": bem("exchange-bar")
        }, [(0, import_vue.createVNode)(import_field.Field, {
          "modelValue": currentCode.value,
          "onUpdate:modelValue": ($event) => currentCode.value = $event,
          "clearable": true,
          "border": false,
          "class": bem("field"),
          "placeholder": props.inputPlaceholder || t("placeholder"),
          "maxlength": "20"
        }, null), (0, import_vue.createVNode)(import_button.Button, {
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
      return (0, import_vue.createVNode)(import_tab.Tab, {
        "title": title
      }, {
        default: () => {
          var _a;
          return [(0, import_vue.createVNode)("div", {
            "class": bem("list", {
              "with-bottom": props.showCloseButton
            }),
            "style": {
              height: `${listHeight.value}px`
            }
          }, [coupons.map((coupon, index) => (0, import_vue.createVNode)(import_coupon.Coupon, {
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
      return (0, import_vue.createVNode)(import_tab.Tab, {
        "title": title
      }, {
        default: () => {
          var _a;
          return [(0, import_vue.createVNode)("div", {
            "class": bem("list", {
              "with-bottom": props.showCloseButton
            }),
            "style": {
              height: `${listHeight.value}px`
            }
          }, [disabledCoupons.map((coupon) => (0, import_vue.createVNode)(import_coupon.Coupon, {
            "disabled": true,
            "key": coupon.id,
            "coupon": coupon,
            "currency": props.currency
          }, null)), !disabledCoupons.length && renderEmpty(), (_a = slots["disabled-list-footer"]) == null ? void 0 : _a.call(slots)])];
        }
      });
    };
    (0, import_vue2.watch)(() => props.code, (value) => {
      currentCode.value = value;
    });
    (0, import_vue2.watch)(import_utils.windowHeight, updateListHeight);
    (0, import_vue2.watch)(currentCode, (value) => emit("update:code", value));
    (0, import_vue2.watch)(() => props.displayedCouponIndex, scrollToCoupon);
    (0, import_vue2.onMounted)(() => {
      updateListHeight();
      scrollToCoupon(props.displayedCouponIndex);
    });
    return () => (0, import_vue.createVNode)("div", {
      "ref": root,
      "class": bem()
    }, [renderExchangeBar(), (0, import_vue.createVNode)(import_tabs.Tabs, {
      "active": activeTab.value,
      "onUpdate:active": ($event) => activeTab.value = $event,
      "class": bem("tab")
    }, {
      default: () => [renderCouponTab(), renderDisabledTab()]
    }), (0, import_vue.createVNode)("div", {
      "class": bem("bottom")
    }, [(0, import_vue.withDirectives)((0, import_vue.createVNode)(import_button.Button, {
      "round": true,
      "block": true,
      "type": "primary",
      "class": bem("close"),
      "text": props.closeButtonText || t("close"),
      "onClick": () => emit("change", -1)
    }, null), [[import_vue.vShow, props.showCloseButton]])])]);
  }
});
