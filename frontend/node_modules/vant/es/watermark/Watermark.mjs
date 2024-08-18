import { createVNode as _createVNode } from "vue";
import { defineComponent, nextTick, onUnmounted, ref, watch, watchEffect } from "vue";
import { extend, truthProp, numericProp, createNamespace, getZIndexStyle, makeNumberProp, makeNumericProp, makeStringProp } from "../utils/index.mjs";
const [name, bem] = createNamespace("watermark");
const watermarkProps = {
  gapX: makeNumberProp(0),
  gapY: makeNumberProp(0),
  image: String,
  width: makeNumberProp(100),
  height: makeNumberProp(100),
  rotate: makeNumericProp(-22),
  zIndex: numericProp,
  content: String,
  opacity: numericProp,
  fullPage: truthProp,
  textColor: makeStringProp("#dcdee0")
};
var stdin_default = defineComponent({
  name,
  props: watermarkProps,
  setup(props, {
    slots
  }) {
    const svgElRef = ref();
    const watermarkUrl = ref("");
    const imageBase64 = ref("");
    const renderWatermark = () => {
      const rotateStyle = {
        transformOrigin: "center",
        transform: `rotate(${props.rotate}deg)`
      };
      const svgInner = () => {
        if (props.image && !slots.content) {
          return _createVNode("image", {
            "href": imageBase64.value,
            "xlink:href": imageBase64.value,
            "x": "0",
            "y": "0",
            "width": props.width,
            "height": props.height,
            "style": rotateStyle
          }, null);
        }
        return _createVNode("foreignObject", {
          "x": "0",
          "y": "0",
          "width": props.width,
          "height": props.height
        }, [_createVNode("div", {
          "xmlns": "http://www.w3.org/1999/xhtml",
          "style": rotateStyle
        }, [slots.content ? slots.content() : _createVNode("span", {
          "style": {
            color: props.textColor
          }
        }, [props.content])])]);
      };
      const svgWidth = props.width + props.gapX;
      const svgHeight = props.height + props.gapY;
      return _createVNode("svg", {
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
    watchEffect(() => {
      if (props.image) {
        makeImageToBase64(props.image);
      }
    });
    watch(() => [imageBase64.value, props.content, props.textColor, props.height, props.width, props.rotate, props.gapX, props.gapY], () => {
      nextTick(() => {
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
    onUnmounted(() => {
      if (watermarkUrl.value) {
        URL.revokeObjectURL(watermarkUrl.value);
      }
    });
    return () => {
      const style = extend({
        backgroundImage: `url(${watermarkUrl.value})`
      }, getZIndexStyle(props.zIndex));
      return _createVNode("div", {
        "class": bem({
          full: props.fullPage
        }),
        "style": style
      }, [_createVNode("div", {
        "class": bem("wrapper"),
        "ref": svgElRef
      }, [renderWatermark()])]);
    };
  }
});
export {
  stdin_default as default,
  watermarkProps
};
