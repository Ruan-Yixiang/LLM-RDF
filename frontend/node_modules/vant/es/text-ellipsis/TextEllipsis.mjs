import { createVNode as _createVNode } from "vue";
import { ref, watch, onMounted, defineComponent } from "vue";
import { useEventListener } from "@vant/use";
import { makeNumericProp, makeStringProp, createNamespace } from "../utils/index.mjs";
const [name, bem] = createNamespace("text-ellipsis");
const textEllipsisProps = {
  rows: makeNumericProp(1),
  dots: makeStringProp("..."),
  content: makeStringProp(""),
  expandText: makeStringProp(""),
  collapseText: makeStringProp("")
};
var stdin_default = defineComponent({
  name,
  props: textEllipsisProps,
  emits: ["clickAction"],
  setup(props, {
    emit
  }) {
    const text = ref("");
    const expanded = ref(false);
    const hasAction = ref(false);
    const root = ref();
    const pxToNum = (value) => {
      if (!value)
        return 0;
      const match = value.match(/^\d*(\.\d*)?/);
      return match ? Number(match[0]) : 0;
    };
    const calcEllipsised = () => {
      const cloneContainer = () => {
        if (!root.value)
          return;
        const originStyle = window.getComputedStyle(root.value);
        const container2 = document.createElement("div");
        const styleNames = Array.prototype.slice.apply(originStyle);
        styleNames.forEach((name2) => {
          container2.style.setProperty(name2, originStyle.getPropertyValue(name2));
        });
        container2.style.position = "fixed";
        container2.style.zIndex = "-9999";
        container2.style.top = "-9999px";
        container2.style.height = "auto";
        container2.style.minHeight = "auto";
        container2.style.maxHeight = "auto";
        container2.innerText = props.content;
        document.body.appendChild(container2);
        return container2;
      };
      const calcEllipsisText = (container2, maxHeight2) => {
        const {
          dots,
          content,
          expandText
        } = props;
        let left = 0;
        let right = content.length;
        let res = -1;
        while (left <= right) {
          const mid = Math.floor((left + right) / 2);
          container2.innerText = content.slice(0, mid) + dots + expandText;
          if (container2.offsetHeight <= maxHeight2) {
            left = mid + 1;
            res = mid;
          } else {
            right = mid - 1;
          }
        }
        return content.slice(0, res) + dots;
      };
      const container = cloneContainer();
      if (!container)
        return;
      const {
        paddingBottom,
        paddingTop,
        lineHeight
      } = container.style;
      const maxHeight = (Number(props.rows) + 0.5) * pxToNum(lineHeight) + pxToNum(paddingTop) + pxToNum(paddingBottom);
      if (maxHeight < container.offsetHeight) {
        hasAction.value = true;
        text.value = calcEllipsisText(container, maxHeight);
      } else {
        hasAction.value = false;
        text.value = props.content;
      }
      document.body.removeChild(container);
    };
    const onClickAction = (event) => {
      expanded.value = !expanded.value;
      emit("clickAction", event);
    };
    const renderAction = () => _createVNode("span", {
      "class": bem("action"),
      "onClick": onClickAction
    }, [expanded.value ? props.collapseText : props.expandText]);
    onMounted(calcEllipsised);
    watch(() => [props.content, props.rows], calcEllipsised);
    useEventListener("resize", calcEllipsised);
    return () => _createVNode("div", {
      "ref": root,
      "class": bem()
    }, [expanded.value ? props.content : text.value, hasAction.value ? renderAction() : null]);
  }
});
export {
  stdin_default as default,
  textEllipsisProps
};
