import { createVNode as _createVNode } from "vue";
import { defineComponent, ref } from "vue";
import { truthProp, createNamespace } from "../utils/index.mjs";
import { useChildren } from "@vant/use";
import { usePlaceholder } from "../composables/use-placeholder.mjs";
const [name, bem] = createNamespace("action-bar");
const ACTION_BAR_KEY = Symbol(name);
const actionBarProps = {
  placeholder: Boolean,
  safeAreaInsetBottom: truthProp
};
var stdin_default = defineComponent({
  name,
  props: actionBarProps,
  setup(props, {
    slots
  }) {
    const root = ref();
    const renderPlaceholder = usePlaceholder(root, bem);
    const {
      linkChildren
    } = useChildren(ACTION_BAR_KEY);
    linkChildren();
    const renderActionBar = () => {
      var _a;
      return _createVNode("div", {
        "ref": root,
        "class": [bem(), {
          "van-safe-area-bottom": props.safeAreaInsetBottom
        }]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
    return () => {
      if (props.placeholder) {
        return renderPlaceholder(renderActionBar);
      }
      return renderActionBar();
    };
  }
});
export {
  ACTION_BAR_KEY,
  actionBarProps,
  stdin_default as default
};
