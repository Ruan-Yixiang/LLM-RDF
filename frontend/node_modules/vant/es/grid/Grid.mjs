import { createVNode as _createVNode } from "vue";
import { defineComponent } from "vue";
import { createNamespace, addUnit, truthProp, numericProp, makeNumericProp } from "../utils/index.mjs";
import { BORDER_TOP } from "../utils/constant.mjs";
import { useChildren } from "@vant/use";
const [name, bem] = createNamespace("grid");
const gridProps = {
  square: Boolean,
  center: truthProp,
  border: truthProp,
  gutter: numericProp,
  reverse: Boolean,
  iconSize: numericProp,
  direction: String,
  clickable: Boolean,
  columnNum: makeNumericProp(4)
};
const GRID_KEY = Symbol(name);
var stdin_default = defineComponent({
  name,
  props: gridProps,
  setup(props, {
    slots
  }) {
    const {
      linkChildren
    } = useChildren(GRID_KEY);
    linkChildren({
      props
    });
    return () => {
      var _a;
      return _createVNode("div", {
        "style": {
          paddingLeft: addUnit(props.gutter)
        },
        "class": [bem(), {
          [BORDER_TOP]: props.border && !props.gutter
        }]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
export {
  GRID_KEY,
  stdin_default as default,
  gridProps
};
