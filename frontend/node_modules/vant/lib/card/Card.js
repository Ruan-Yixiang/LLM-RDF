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
  cardProps: () => cardProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_tag = require("../tag");
var import_image = require("../image");
const [name, bem] = (0, import_utils.createNamespace)("card");
const cardProps = {
  tag: String,
  num: import_utils.numericProp,
  desc: String,
  thumb: String,
  title: String,
  price: import_utils.numericProp,
  centered: Boolean,
  lazyLoad: Boolean,
  currency: (0, import_utils.makeStringProp)("\xA5"),
  thumbLink: String,
  originPrice: import_utils.numericProp
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: cardProps,
  emits: ["clickThumb"],
  setup(props, {
    slots,
    emit
  }) {
    const renderTitle = () => {
      if (slots.title) {
        return slots.title();
      }
      if (props.title) {
        return (0, import_vue.createVNode)("div", {
          "class": [bem("title"), "van-multi-ellipsis--l2"]
        }, [props.title]);
      }
    };
    const renderThumbTag = () => {
      if (slots.tag || props.tag) {
        return (0, import_vue.createVNode)("div", {
          "class": bem("tag")
        }, [slots.tag ? slots.tag() : (0, import_vue.createVNode)(import_tag.Tag, {
          "mark": true,
          "type": "primary"
        }, {
          default: () => [props.tag]
        })]);
      }
    };
    const renderThumbImage = () => {
      if (slots.thumb) {
        return slots.thumb();
      }
      return (0, import_vue.createVNode)(import_image.Image, {
        "src": props.thumb,
        "fit": "cover",
        "width": "100%",
        "height": "100%",
        "lazyLoad": props.lazyLoad
      }, null);
    };
    const renderThumb = () => {
      if (slots.thumb || props.thumb) {
        return (0, import_vue.createVNode)("a", {
          "href": props.thumbLink,
          "class": bem("thumb"),
          "onClick": (event) => emit("clickThumb", event)
        }, [renderThumbImage(), renderThumbTag()]);
      }
    };
    const renderDesc = () => {
      if (slots.desc) {
        return slots.desc();
      }
      if (props.desc) {
        return (0, import_vue.createVNode)("div", {
          "class": [bem("desc"), "van-ellipsis"]
        }, [props.desc]);
      }
    };
    const renderPriceText = () => {
      const priceArr = props.price.toString().split(".");
      return (0, import_vue.createVNode)("div", null, [(0, import_vue.createVNode)("span", {
        "class": bem("price-currency")
      }, [props.currency]), (0, import_vue.createVNode)("span", {
        "class": bem("price-integer")
      }, [priceArr[0]]), (0, import_vue.createTextVNode)("."), (0, import_vue.createVNode)("span", {
        "class": bem("price-decimal")
      }, [priceArr[1]])]);
    };
    return () => {
      var _a, _b, _c;
      const showNum = slots.num || (0, import_utils.isDef)(props.num);
      const showPrice = slots.price || (0, import_utils.isDef)(props.price);
      const showOriginPrice = slots["origin-price"] || (0, import_utils.isDef)(props.originPrice);
      const showBottom = showNum || showPrice || showOriginPrice || slots.bottom;
      const Price = showPrice && (0, import_vue.createVNode)("div", {
        "class": bem("price")
      }, [slots.price ? slots.price() : renderPriceText()]);
      const OriginPrice = showOriginPrice && (0, import_vue.createVNode)("div", {
        "class": bem("origin-price")
      }, [slots["origin-price"] ? slots["origin-price"]() : `${props.currency} ${props.originPrice}`]);
      const Num = showNum && (0, import_vue.createVNode)("div", {
        "class": bem("num")
      }, [slots.num ? slots.num() : `x${props.num}`]);
      const Footer = slots.footer && (0, import_vue.createVNode)("div", {
        "class": bem("footer")
      }, [slots.footer()]);
      const Bottom = showBottom && (0, import_vue.createVNode)("div", {
        "class": bem("bottom")
      }, [(_a = slots["price-top"]) == null ? void 0 : _a.call(slots), Price, OriginPrice, Num, (_b = slots.bottom) == null ? void 0 : _b.call(slots)]);
      return (0, import_vue.createVNode)("div", {
        "class": bem()
      }, [(0, import_vue.createVNode)("div", {
        "class": bem("header")
      }, [renderThumb(), (0, import_vue.createVNode)("div", {
        "class": bem("content", {
          centered: props.centered
        })
      }, [(0, import_vue.createVNode)("div", null, [renderTitle(), renderDesc(), (_c = slots.tags) == null ? void 0 : _c.call(slots)]), Bottom])]), Footer]);
    };
  }
});
