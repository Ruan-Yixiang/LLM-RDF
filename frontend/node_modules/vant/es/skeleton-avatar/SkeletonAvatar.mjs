import { createVNode as _createVNode } from "vue";
import { defineComponent } from "vue";
import { numericProp, getSizeStyle, makeStringProp, createNamespace } from "../utils/index.mjs";
const [name, bem] = createNamespace("skeleton-avatar");
const skeletonAvatarProps = {
  avatarSize: numericProp,
  avatarShape: makeStringProp("round")
};
var stdin_default = defineComponent({
  name,
  props: skeletonAvatarProps,
  setup(props) {
    return () => _createVNode("div", {
      "class": bem([props.avatarShape]),
      "style": getSizeStyle(props.avatarSize)
    }, null);
  }
});
export {
  stdin_default as default,
  skeletonAvatarProps
};
