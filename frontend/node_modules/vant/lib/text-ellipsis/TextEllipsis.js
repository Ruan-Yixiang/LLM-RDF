var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default,
  textEllipsisProps: () => textEllipsisProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_use = require("@vant/use");
var import_utils = require("../utils");
const [name, bem] = (0, import_utils.createNamespace)("text-ellipsis");
const textEllipsisProps = {
  rows: (0, import_utils.makeNumericProp)(1),
  dots: (0, import_utils.makeStringProp)("..."),
  content: (0, import_utils.makeStringProp)(""),
  expandText: (0, import_utils.makeStringProp)(""),
  collapseText: (0, import_utils.makeStringProp)("")
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: textEllipsisProps,
  emits: ["clickAction"],
  setup(props, {
    emit
  }) {
    const text = (0, import_vue2.ref)("");
    const expanded = (0, import_vue2.ref)(false);
    const hasAction = (0, import_vue2.ref)(false);
    const root = (0, import_vue2.ref)();
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
    const renderAction = () => (0, import_vue.createVNode)("span", {
      "class": bem("action"),
      "onClick": onClickAction
    }, [expanded.value ? props.collapseText : props.expandText]);
    (0, import_vue2.onMounted)(calcEllipsised);
    (0, import_vue2.watch)(() => [props.content, props.rows], calcEllipsised);
    (0, import_use.useEventListener)("resize", calcEllipsised);
    return () => (0, import_vue.createVNode)("div", {
      "ref": root,
      "class": bem()
    }, [expanded.value ? props.content : text.value, hasAction.value ? renderAction() : null]);
  }
});
