import { createVNode as _createVNode } from "vue";
import { computed, Comment, defineComponent, Fragment, Text } from "vue";
import { createNamespace } from "../utils/index.mjs";
const [name, bem] = createNamespace("space");
const spaceProps = {
  align: String,
  direction: {
    type: String,
    default: "horizontal"
  },
  size: {
    type: [Number, String, Array],
    default: 8
  },
  wrap: Boolean,
  fill: Boolean
};
function filterEmpty(children = []) {
  const nodes = [];
  children.forEach((child) => {
    if (Array.isArray(child)) {
      nodes.push(...child);
    } else if (child.type === Fragment) {
      nodes.push(...filterEmpty(child.children));
    } else {
      nodes.push(child);
    }
  });
  return nodes.filter((c) => {
    var _a;
    return !(c && (c.type === Comment || c.type === Fragment && ((_a = c.children) == null ? void 0 : _a.length) === 0 || c.type === Text && c.children.trim() === ""));
  });
}
var stdin_default = defineComponent({
  name,
  props: spaceProps,
  setup(props, {
    slots
  }) {
    const mergedAlign = computed(() => {
      var _a;
      return (_a = props.align) != null ? _a : props.direction === "horizontal" ? "center" : "";
    });
    const getMargin = (size) => {
      if (typeof size === "number") {
        return size + "px";
      }
      return size;
    };
    const getMarginStyle = (isLast) => {
      const style = {};
      const marginRight = `${getMargin(Array.isArray(props.size) ? props.size[0] : props.size)}`;
      const marginBottom = `${getMargin(Array.isArray(props.size) ? props.size[1] : props.size)}`;
      if (isLast) {
        return props.wrap ? {
          marginBottom
        } : {};
      }
      if (props.direction === "horizontal") {
        style.marginRight = marginRight;
      }
      if (props.direction === "vertical" || props.wrap) {
        style.marginBottom = marginBottom;
      }
      return style;
    };
    return () => {
      var _a;
      const children = filterEmpty((_a = slots.default) == null ? void 0 : _a.call(slots));
      return _createVNode("div", {
        "class": [bem({
          [props.direction]: props.direction,
          [`align-${mergedAlign.value}`]: mergedAlign.value,
          wrap: props.wrap,
          fill: props.fill
        })]
      }, [children.map((c, i) => _createVNode("div", {
        "key": `item-${i}`,
        "class": `${name}-item`,
        "style": getMarginStyle(i === children.length - 1)
      }, [c]))]);
    };
  }
});
export {
  stdin_default as default,
  spaceProps
};
