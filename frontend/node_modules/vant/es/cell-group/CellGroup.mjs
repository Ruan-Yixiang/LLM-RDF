import { Fragment as _Fragment, createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import { defineComponent } from "vue";
import { truthProp, createNamespace, BORDER_TOP_BOTTOM } from "../utils/index.mjs";
const [name, bem] = createNamespace("cell-group");
const cellGroupProps = {
  title: String,
  inset: Boolean,
  border: truthProp
};
var stdin_default = defineComponent({
  name,
  inheritAttrs: false,
  props: cellGroupProps,
  setup(props, {
    slots,
    attrs
  }) {
    const renderGroup = () => {
      var _a;
      return _createVNode("div", _mergeProps({
        "class": [bem({
          inset: props.inset
        }), {
          [BORDER_TOP_BOTTOM]: props.border && !props.inset
        }]
      }, attrs), [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
    const renderTitle = () => _createVNode("div", {
      "class": bem("title", {
        inset: props.inset
      })
    }, [slots.title ? slots.title() : props.title]);
    return () => {
      if (props.title || slots.title) {
        return _createVNode(_Fragment, null, [renderTitle(), renderGroup()]);
      }
      return renderGroup();
    };
  }
});
export {
  cellGroupProps,
  stdin_default as default
};
