import { createVNode as _createVNode } from "vue";
import { ref, defineComponent } from "vue";
import { truthProp, numericProp, BORDER_BOTTOM, getZIndexStyle, createNamespace, HAPTICS_FEEDBACK } from "../utils/index.mjs";
import { usePlaceholder } from "../composables/use-placeholder.mjs";
import { Icon } from "../icon/index.mjs";
const [name, bem] = createNamespace("nav-bar");
const navBarProps = {
  title: String,
  fixed: Boolean,
  zIndex: numericProp,
  border: truthProp,
  leftText: String,
  rightText: String,
  leftArrow: Boolean,
  placeholder: Boolean,
  safeAreaInsetTop: Boolean,
  clickable: truthProp
};
var stdin_default = defineComponent({
  name,
  props: navBarProps,
  emits: ["clickLeft", "clickRight"],
  setup(props, {
    emit,
    slots
  }) {
    const navBarRef = ref();
    const renderPlaceholder = usePlaceholder(navBarRef, bem);
    const onClickLeft = (event) => emit("clickLeft", event);
    const onClickRight = (event) => emit("clickRight", event);
    const renderLeft = () => {
      if (slots.left) {
        return slots.left();
      }
      return [props.leftArrow && _createVNode(Icon, {
        "class": bem("arrow"),
        "name": "arrow-left"
      }, null), props.leftText && _createVNode("span", {
        "class": bem("text")
      }, [props.leftText])];
    };
    const renderRight = () => {
      if (slots.right) {
        return slots.right();
      }
      return _createVNode("span", {
        "class": bem("text")
      }, [props.rightText]);
    };
    const renderNavBar = () => {
      const {
        title,
        fixed,
        border,
        zIndex
      } = props;
      const style = getZIndexStyle(zIndex);
      const hasLeft = props.leftArrow || props.leftText || slots.left;
      const hasRight = props.rightText || slots.right;
      return _createVNode("div", {
        "ref": navBarRef,
        "style": style,
        "class": [bem({
          fixed
        }), {
          [BORDER_BOTTOM]: border,
          "van-safe-area-top": props.safeAreaInsetTop
        }]
      }, [_createVNode("div", {
        "class": bem("content")
      }, [hasLeft && _createVNode("div", {
        "class": [bem("left"), props.clickable ? HAPTICS_FEEDBACK : ""],
        "onClick": onClickLeft
      }, [renderLeft()]), _createVNode("div", {
        "class": [bem("title"), "van-ellipsis"]
      }, [slots.title ? slots.title() : title]), hasRight && _createVNode("div", {
        "class": [bem("right"), props.clickable ? HAPTICS_FEEDBACK : ""],
        "onClick": onClickRight
      }, [renderRight()])])]);
    };
    return () => {
      if (props.fixed && props.placeholder) {
        return renderPlaceholder(renderNavBar);
      }
      return renderNavBar();
    };
  }
});
export {
  stdin_default as default,
  navBarProps
};
