import { createVNode as _createVNode } from "vue";
import { defineComponent } from "vue";
import { createNamespace, numericProp, addUnit } from "../utils/index.mjs";
const [name, bem] = createNamespace("skeleton-title");
const skeletonTitleProps = {
  round: Boolean,
  titleWidth: numericProp
};
var stdin_default = defineComponent({
  name,
  props: skeletonTitleProps,
  setup(props) {
    return () => _createVNode("h3", {
      "class": bem([{
        round: props.round
      }]),
      "style": {
        width: addUnit(props.titleWidth)
      }
    }, null);
  }
});
export {
  stdin_default as default,
  skeletonTitleProps
};
