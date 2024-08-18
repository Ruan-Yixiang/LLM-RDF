import { createTextVNode as _createTextVNode, createVNode as _createVNode } from "vue";
import { defineComponent } from "vue";
import { isDef, numericProp, makeStringProp, createNamespace } from "../utils/index.mjs";
import { Tag } from "../tag/index.mjs";
import { Image } from "../image/index.mjs";
const [name, bem] = createNamespace("card");
const cardProps = {
  tag: String,
  num: numericProp,
  desc: String,
  thumb: String,
  title: String,
  price: numericProp,
  centered: Boolean,
  lazyLoad: Boolean,
  currency: makeStringProp("\xA5"),
  thumbLink: String,
  originPrice: numericProp
};
var stdin_default = defineComponent({
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
        return _createVNode("div", {
          "class": [bem("title"), "van-multi-ellipsis--l2"]
        }, [props.title]);
      }
    };
    const renderThumbTag = () => {
      if (slots.tag || props.tag) {
        return _createVNode("div", {
          "class": bem("tag")
        }, [slots.tag ? slots.tag() : _createVNode(Tag, {
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
      return _createVNode(Image, {
        "src": props.thumb,
        "fit": "cover",
        "width": "100%",
        "height": "100%",
        "lazyLoad": props.lazyLoad
      }, null);
    };
    const renderThumb = () => {
      if (slots.thumb || props.thumb) {
        return _createVNode("a", {
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
        return _createVNode("div", {
          "class": [bem("desc"), "van-ellipsis"]
        }, [props.desc]);
      }
    };
    const renderPriceText = () => {
      const priceArr = props.price.toString().split(".");
      return _createVNode("div", null, [_createVNode("span", {
        "class": bem("price-currency")
      }, [props.currency]), _createVNode("span", {
        "class": bem("price-integer")
      }, [priceArr[0]]), _createTextVNode("."), _createVNode("span", {
        "class": bem("price-decimal")
      }, [priceArr[1]])]);
    };
    return () => {
      var _a, _b, _c;
      const showNum = slots.num || isDef(props.num);
      const showPrice = slots.price || isDef(props.price);
      const showOriginPrice = slots["origin-price"] || isDef(props.originPrice);
      const showBottom = showNum || showPrice || showOriginPrice || slots.bottom;
      const Price = showPrice && _createVNode("div", {
        "class": bem("price")
      }, [slots.price ? slots.price() : renderPriceText()]);
      const OriginPrice = showOriginPrice && _createVNode("div", {
        "class": bem("origin-price")
      }, [slots["origin-price"] ? slots["origin-price"]() : `${props.currency} ${props.originPrice}`]);
      const Num = showNum && _createVNode("div", {
        "class": bem("num")
      }, [slots.num ? slots.num() : `x${props.num}`]);
      const Footer = slots.footer && _createVNode("div", {
        "class": bem("footer")
      }, [slots.footer()]);
      const Bottom = showBottom && _createVNode("div", {
        "class": bem("bottom")
      }, [(_a = slots["price-top"]) == null ? void 0 : _a.call(slots), Price, OriginPrice, Num, (_b = slots.bottom) == null ? void 0 : _b.call(slots)]);
      return _createVNode("div", {
        "class": bem()
      }, [_createVNode("div", {
        "class": bem("header")
      }, [renderThumb(), _createVNode("div", {
        "class": bem("content", {
          centered: props.centered
        })
      }, [_createVNode("div", null, [renderTitle(), renderDesc(), (_c = slots.tags) == null ? void 0 : _c.call(slots)]), Bottom])]), Footer]);
    };
  }
});
export {
  cardProps,
  stdin_default as default
};
