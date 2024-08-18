import { createVNode as _createVNode } from "vue";
import { defineComponent } from "vue";
import { truthProp, makeStringProp, createNamespace } from "../utils/index.mjs";
const [name, bem] = createNamespace("divider");
const dividerProps = {
  dashed: Boolean,
  hairline: truthProp,
  vertical: Boolean,
  contentPosition: makeStringProp("center")
};
var stdin_default = defineComponent({
  name,
  props: dividerProps,
  setup(props, {
    slots
  }) {
    return () => {
      var _a;
      return _createVNode("div", {
        "role": "separator",
        "class": bem({
          dashed: props.dashed,
          hairline: props.hairline,
          vertical: props.vertical,
          [`content-${props.contentPosition}`]: !!slots.default && !props.vertical
        })
      }, [!props.vertical && ((_a = slots.default) == null ? void 0 : _a.call(slots))]);
    };
  }
});
export {
  stdin_default as default,
  dividerProps
};
