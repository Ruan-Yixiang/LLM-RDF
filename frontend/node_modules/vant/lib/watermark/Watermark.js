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
  watermarkProps: () => watermarkProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
const [name, bem] = (0, import_utils.createNamespace)("watermark");
const watermarkProps = {
  gapX: (0, import_utils.makeNumberProp)(0),
  gapY: (0, import_utils.makeNumberProp)(0),
  image: String,
  width: (0, import_utils.makeNumberProp)(100),
  height: (0, import_utils.makeNumberProp)(100),
  rotate: (0, import_utils.makeNumericProp)(-22),
  zIndex: import_utils.numericProp,
  content: String,
  opacity: import_utils.numericProp,
  fullPage: import_utils.truthProp,
  textColor: (0, import_utils.makeStringProp)("#dcdee0")
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: watermarkProps,
  setup(props, {
    slots
  }) {
    const svgElRef = (0, import_vue2.ref)();
    const watermarkUrl = (0, import_vue2.ref)("");
    const imageBase64 = (0, import_vue2.ref)("");
    const renderWatermark = () => {
      const rotateStyle = {
        transformOrigin: "center",
        transform: `rotate(${props.rotate}deg)`
      };
      const svgInner = () => {
        if (props.image && !slots.content) {
          return (0, import_vue.createVNode)("image", {
            "href": imageBase64.value,
            "xlink:href": imageBase64.value,
            "x": "0",
            "y": "0",
            "width": props.width,
            "height": props.height,
            "style": rotateStyle
          }, null);
        }
        return (0, import_vue.createVNode)("foreignObject", {
          "x": "0",
          "y": "0",
          "width": props.width,
          "height": props.height
        }, [(0, import_vue.createVNode)("div", {
          "xmlns": "http://www.w3.org/1999/xhtml",
          "style": rotateStyle
        }, [slots.content ? slots.content() : (0, import_vue.createVNode)("span", {
          "style": {
            color: props.textColor
          }
        }, [props.content])])]);
      };
      const svgWidth = props.width + props.gapX;
      const svgHeight = props.height + props.gapY;
      return (0, import_vue.createVNode)("svg", {
        "viewBox": `0 0 ${svgWidth} ${svgHeight}`,
        "width": svgWidth,
        "height": svgHeight,
        "xmlns": "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        "style": {
          padding: `0 ${props.gapX}px ${props.gapY}px 0`,
          opacity: props.opacity
        }
      }, [svgInner()]);
    };
    const makeImageToBase64 = (url) => {
      const canvas = document.createElement("canvas");
      const image = new Image();
      image.crossOrigin = "anonymous";
      image.referrerPolicy = "no-referrer";
      image.onload = () => {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const ctx = canvas.getContext("2d");
        ctx == null ? void 0 : ctx.drawImage(image, 0, 0);
        imageBase64.value = canvas.toDataURL();
      };
      image.src = url;
    };
    const makeSvgToBlobUrl = (svgStr) => {
      const svgBlob = new Blob([svgStr], {
        type: "image/svg+xml"
      });
      return URL.createObjectURL(svgBlob);
    };
    (0, import_vue2.watchEffect)(() => {
      if (props.image) {
        makeImageToBase64(props.image);
      }
    });
    (0, import_vue2.watch)(() => [imageBase64.value, props.content, props.textColor, props.height, props.width, props.rotate, props.gapX, props.gapY], () => {
      (0, import_vue2.nextTick)(() => {
        if (svgElRef.value) {
          if (watermarkUrl.value) {
            URL.revokeObjectURL(watermarkUrl.value);
          }
          watermarkUrl.value = makeSvgToBlobUrl(svgElRef.value.innerHTML);
        }
      });
    }, {
      immediate: true
    });
    (0, import_vue2.onUnmounted)(() => {
      if (watermarkUrl.value) {
        URL.revokeObjectURL(watermarkUrl.value);
      }
    });
    return () => {
      const style = (0, import_utils.extend)({
        backgroundImage: `url(${watermarkUrl.value})`
      }, (0, import_utils.getZIndexStyle)(props.zIndex));
      return (0, import_vue.createVNode)("div", {
        "class": bem({
          full: props.fullPage
        }),
        "style": style
      }, [(0, import_vue.createVNode)("div", {
        "class": bem("wrapper"),
        "ref": svgElRef
      }, [renderWatermark()])]);
    };
  }
});
