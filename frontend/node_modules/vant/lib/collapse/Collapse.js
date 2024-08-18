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
  COLLAPSE_KEY: () => COLLAPSE_KEY,
  collapseProps: () => collapseProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_use = require("@vant/use");
var import_use_expose = require("../composables/use-expose");
const [name, bem] = (0, import_utils.createNamespace)("collapse");
const COLLAPSE_KEY = Symbol(name);
const collapseProps = {
  border: import_utils.truthProp,
  accordion: Boolean,
  modelValue: {
    type: [String, Number, Array],
    default: ""
  }
};
function validateModelValue(modelValue, accordion) {
  if (accordion && Array.isArray(modelValue)) {
    console.error('[Vant] Collapse: "v-model" should not be Array in accordion mode');
    return false;
  }
  if (!accordion && !Array.isArray(modelValue)) {
    console.error('[Vant] Collapse: "v-model" should be Array in non-accordion mode');
    return false;
  }
  return true;
}
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: collapseProps,
  emits: ["change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const {
      linkChildren,
      children
    } = (0, import_use.useChildren)(COLLAPSE_KEY);
    const updateName = (name2) => {
      emit("change", name2);
      emit("update:modelValue", name2);
    };
    const toggle = (name2, expanded) => {
      const {
        accordion,
        modelValue
      } = props;
      if (accordion) {
        updateName(name2 === modelValue ? "" : name2);
      } else if (expanded) {
        updateName(modelValue.concat(name2));
      } else {
        updateName(modelValue.filter((activeName) => activeName !== name2));
      }
    };
    const toggleAll = (options = {}) => {
      if (props.accordion) {
        return;
      }
      if (typeof options === "boolean") {
        options = {
          expanded: options
        };
      }
      const {
        expanded,
        skipDisabled
      } = options;
      const expandedChildren = children.filter((item) => {
        if (item.disabled && skipDisabled) {
          return item.expanded.value;
        }
        return expanded != null ? expanded : !item.expanded.value;
      });
      const names = expandedChildren.map((item) => item.itemName.value);
      updateName(names);
    };
    const isExpanded = (name2) => {
      const {
        accordion,
        modelValue
      } = props;
      if (process.env.NODE_ENV !== "production" && !validateModelValue(modelValue, accordion)) {
        return false;
      }
      return accordion ? modelValue === name2 : modelValue.includes(name2);
    };
    (0, import_use_expose.useExpose)({
      toggleAll
    });
    linkChildren({
      toggle,
      isExpanded
    });
    return () => {
      var _a;
      return (0, import_vue.createVNode)("div", {
        "class": [bem(), {
          [import_utils.BORDER_TOP_BOTTOM]: props.border
        }]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
