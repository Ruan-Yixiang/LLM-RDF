import { createVNode as _createVNode } from "vue";
import { defineComponent } from "vue";
import { createNamespace, numericProp } from "../utils/index.mjs";
const DEFAULT_ROW_WIDTH = "100%";
const skeletonParagraphProps = {
  round: Boolean,
  rowWidth: {
    type: numericProp,
    default: DEFAULT_ROW_WIDTH
  }
};
const [name, bem] = createNamespace("skeleton-paragraph");
var stdin_default = defineComponent({
  name,
  props: skeletonParagraphProps,
  setup(props) {
    return () => _createVNode("div", {
      "class": bem([{
        round: props.round
      }]),
      "style": {
        width: props.rowWidth
      }
    }, null);
  }
});
export {
  DEFAULT_ROW_WIDTH,
  stdin_default as default,
  skeletonParagraphProps
};
