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
  collapseItemProps: () => collapseItemProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_Cell = require("../cell/Cell");
var import_utils = require("../utils");
var import_Collapse = require("../collapse/Collapse");
var import_use = require("@vant/use");
var import_use_expose = require("../composables/use-expose");
var import_use_lazy_render = require("../composables/use-lazy-render");
var import_cell = require("../cell");
const [name, bem] = (0, import_utils.createNamespace)("collapse-item");
const CELL_SLOTS = ["icon", "title", "value", "label", "right-icon"];
const collapseItemProps = (0, import_utils.extend)({}, import_Cell.cellSharedProps, {
  name: import_utils.numericProp,
  isLink: import_utils.truthProp,
  disabled: Boolean,
  readonly: Boolean,
  lazyRender: import_utils.truthProp
});
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: collapseItemProps,
  setup(props, {
    slots
  }) {
    const wrapperRef = (0, import_vue2.ref)();
    const contentRef = (0, import_vue2.ref)();
    const {
      parent,
      index
    } = (0, import_use.useParent)(import_Collapse.COLLAPSE_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <CollapseItem> must be a child component of <Collapse>.");
      }
      return;
    }
    const name2 = (0, import_vue2.computed)(() => {
      var _a;
      return (_a = props.name) != null ? _a : index.value;
    });
    const expanded = (0, import_vue2.computed)(() => parent.isExpanded(name2.value));
    const show = (0, import_vue2.ref)(expanded.value);
    const lazyRender = (0, import_use_lazy_render.useLazyRender)(() => show.value || !props.lazyRender);
    const onTransitionEnd = () => {
      if (!expanded.value) {
        show.value = false;
      } else if (wrapperRef.value) {
        wrapperRef.value.style.height = "";
      }
    };
    (0, import_vue2.watch)(expanded, (value, oldValue) => {
      if (oldValue === null) {
        return;
      }
      if (value) {
        show.value = true;
      }
      const tick = value ? import_vue2.nextTick : import_use.raf;
      tick(() => {
        if (!contentRef.value || !wrapperRef.value) {
          return;
        }
        const {
          offsetHeight
        } = contentRef.value;
        if (offsetHeight) {
          const contentHeight = `${offsetHeight}px`;
          wrapperRef.value.style.height = value ? "0" : contentHeight;
          (0, import_use.doubleRaf)(() => {
            if (wrapperRef.value) {
              wrapperRef.value.style.height = value ? contentHeight : "0";
            }
          });
        } else {
          onTransitionEnd();
        }
      });
    });
    const toggle = (newValue = !expanded.value) => {
      parent.toggle(name2.value, newValue);
    };
    const onClickTitle = () => {
      if (!props.disabled && !props.readonly) {
        toggle();
      }
    };
    const renderTitle = () => {
      const {
        border,
        disabled,
        readonly
      } = props;
      const attrs = (0, import_utils.pick)(props, Object.keys(import_Cell.cellSharedProps));
      if (readonly) {
        attrs.isLink = false;
      }
      if (disabled || readonly) {
        attrs.clickable = false;
      }
      return (0, import_vue.createVNode)(import_cell.Cell, (0, import_vue.mergeProps)({
        "role": "button",
        "class": bem("title", {
          disabled,
          expanded: expanded.value,
          borderless: !border
        }),
        "aria-expanded": String(expanded.value),
        "onClick": onClickTitle
      }, attrs), (0, import_utils.pick)(slots, CELL_SLOTS));
    };
    const renderContent = lazyRender(() => {
      var _a;
      return (0, import_vue.withDirectives)((0, import_vue.createVNode)("div", {
        "ref": wrapperRef,
        "class": bem("wrapper"),
        "onTransitionend": onTransitionEnd
      }, [(0, import_vue.createVNode)("div", {
        "ref": contentRef,
        "class": bem("content")
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]), [[import_vue.vShow, show.value]]);
    });
    (0, import_use_expose.useExpose)({
      toggle,
      expanded,
      itemName: name2
    });
    return () => (0, import_vue.createVNode)("div", {
      "class": [bem({
        border: index.value && props.border
      })]
    }, [renderTitle(), renderContent()]);
  }
});
