import { createVNode as _createVNode } from "vue";
import { defineComponent } from "vue";
import { numericProp, getSizeStyle, makeStringProp, createNamespace } from "../utils/index.mjs";
import { Icon } from "../icon/index.mjs";
const [name, bem] = createNamespace("skeleton-image");
const skeletonImageProps = {
  imageSize: numericProp,
  imageShape: makeStringProp("square")
};
var stdin_default = defineComponent({
  name,
  props: skeletonImageProps,
  setup(props) {
    return () => _createVNode("div", {
      "class": bem([props.imageShape]),
      "style": getSizeStyle(props.imageSize)
    }, [_createVNode(Icon, {
      "name": "photo",
      "class": bem("icon")
    }, null)]);
  }
});
export {
  stdin_default as default,
  skeletonImageProps
};
