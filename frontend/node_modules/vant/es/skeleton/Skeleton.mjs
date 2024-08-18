import { mergeProps as _mergeProps, Fragment as _Fragment, createVNode as _createVNode } from "vue";
import { defineComponent } from "vue";
import { addUnit, truthProp, numericProp, makeStringProp, makeNumericProp, createNamespace } from "../utils/index.mjs";
import SkeletonTitle from "../skeleton-title/index.mjs";
import SkeletonAvatar from "../skeleton-avatar/index.mjs";
import SkeletonParagraph, { DEFAULT_ROW_WIDTH } from "../skeleton-paragraph/index.mjs";
const [name, bem] = createNamespace("skeleton");
const DEFAULT_LAST_ROW_WIDTH = "60%";
const skeletonProps = {
  row: makeNumericProp(0),
  round: Boolean,
  title: Boolean,
  titleWidth: numericProp,
  avatar: Boolean,
  avatarSize: numericProp,
  avatarShape: makeStringProp("round"),
  loading: truthProp,
  animate: truthProp,
  rowWidth: {
    type: [Number, String, Array],
    default: DEFAULT_ROW_WIDTH
  }
};
var stdin_default = defineComponent({
  name,
  inheritAttrs: false,
  props: skeletonProps,
  setup(props, {
    slots,
    attrs
  }) {
    const renderAvatar = () => {
      if (props.avatar) {
        return _createVNode(SkeletonAvatar, {
          "avatarShape": props.avatarShape,
          "avatarSize": props.avatarSize
        }, null);
      }
    };
    const renderTitle = () => {
      if (props.title) {
        return _createVNode(SkeletonTitle, {
          "round": props.round,
          "titleWidth": props.titleWidth
        }, null);
      }
    };
    const getRowWidth = (index) => {
      const {
        rowWidth
      } = props;
      if (rowWidth === DEFAULT_ROW_WIDTH && index === +props.row - 1) {
        return DEFAULT_LAST_ROW_WIDTH;
      }
      if (Array.isArray(rowWidth)) {
        return rowWidth[index];
      }
      return rowWidth;
    };
    const renderRows = () => Array(+props.row).fill("").map((_, i) => _createVNode(SkeletonParagraph, {
      "key": i,
      "round": props.round,
      "rowWidth": addUnit(getRowWidth(i))
    }, null));
    const renderContents = () => {
      if (slots.template) {
        return slots.template();
      }
      return _createVNode(_Fragment, null, [renderAvatar(), _createVNode("div", {
        "class": bem("content")
      }, [renderTitle(), renderRows()])]);
    };
    return () => {
      var _a;
      if (!props.loading) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      return _createVNode("div", _mergeProps({
        "class": bem({
          animate: props.animate,
          round: props.round
        })
      }, attrs), [renderContents()]);
    };
  }
});
export {
  stdin_default as default,
  skeletonProps
};
