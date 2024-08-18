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
  paginationProps: () => paginationProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
const [name, bem, t] = (0, import_utils.createNamespace)("pagination");
const makePage = (number, text, active) => ({
  number,
  text,
  active
});
const paginationProps = {
  mode: (0, import_utils.makeStringProp)("multi"),
  prevText: String,
  nextText: String,
  pageCount: (0, import_utils.makeNumericProp)(0),
  modelValue: (0, import_utils.makeNumberProp)(0),
  totalItems: (0, import_utils.makeNumericProp)(0),
  showPageSize: (0, import_utils.makeNumericProp)(5),
  itemsPerPage: (0, import_utils.makeNumericProp)(10),
  forceEllipses: Boolean,
  showPrevButton: import_utils.truthProp,
  showNextButton: import_utils.truthProp
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: paginationProps,
  emits: ["change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const count = (0, import_vue2.computed)(() => {
      const {
        pageCount,
        totalItems,
        itemsPerPage
      } = props;
      const count2 = +pageCount || Math.ceil(+totalItems / +itemsPerPage);
      return Math.max(1, count2);
    });
    const pages = (0, import_vue2.computed)(() => {
      const items = [];
      const pageCount = count.value;
      const showPageSize = +props.showPageSize;
      const {
        modelValue,
        forceEllipses
      } = props;
      let startPage = 1;
      let endPage = pageCount;
      const isMaxSized = showPageSize < pageCount;
      if (isMaxSized) {
        startPage = Math.max(modelValue - Math.floor(showPageSize / 2), 1);
        endPage = startPage + showPageSize - 1;
        if (endPage > pageCount) {
          endPage = pageCount;
          startPage = endPage - showPageSize + 1;
        }
      }
      for (let number = startPage; number <= endPage; number++) {
        const page = makePage(number, number, number === modelValue);
        items.push(page);
      }
      if (isMaxSized && showPageSize > 0 && forceEllipses) {
        if (startPage > 1) {
          const prevPages = makePage(startPage - 1, "...");
          items.unshift(prevPages);
        }
        if (endPage < pageCount) {
          const nextPages = makePage(endPage + 1, "...");
          items.push(nextPages);
        }
      }
      return items;
    });
    const updateModelValue = (value, emitChange) => {
      value = (0, import_utils.clamp)(value, 1, count.value);
      if (props.modelValue !== value) {
        emit("update:modelValue", value);
        if (emitChange) {
          emit("change", value);
        }
      }
    };
    (0, import_vue2.watchEffect)(() => updateModelValue(props.modelValue));
    const renderDesc = () => (0, import_vue.createVNode)("li", {
      "class": bem("page-desc")
    }, [slots.pageDesc ? slots.pageDesc() : `${props.modelValue}/${count.value}`]);
    const renderPrevButton = () => {
      const {
        mode,
        modelValue,
        showPrevButton
      } = props;
      if (!showPrevButton) {
        return;
      }
      const slot = slots["prev-text"];
      const disabled = modelValue === 1;
      return (0, import_vue.createVNode)("li", {
        "class": [bem("item", {
          disabled,
          border: mode === "simple",
          prev: true
        }), import_utils.BORDER_SURROUND]
      }, [(0, import_vue.createVNode)("button", {
        "type": "button",
        "disabled": disabled,
        "onClick": () => updateModelValue(modelValue - 1, true)
      }, [slot ? slot() : props.prevText || t("prev")])]);
    };
    const renderNextButton = () => {
      const {
        mode,
        modelValue,
        showNextButton
      } = props;
      if (!showNextButton) {
        return;
      }
      const slot = slots["next-text"];
      const disabled = modelValue === count.value;
      return (0, import_vue.createVNode)("li", {
        "class": [bem("item", {
          disabled,
          border: mode === "simple",
          next: true
        }), import_utils.BORDER_SURROUND]
      }, [(0, import_vue.createVNode)("button", {
        "type": "button",
        "disabled": disabled,
        "onClick": () => updateModelValue(modelValue + 1, true)
      }, [slot ? slot() : props.nextText || t("next")])]);
    };
    const renderPages = () => pages.value.map((page) => (0, import_vue.createVNode)("li", {
      "class": [bem("item", {
        active: page.active,
        page: true
      }), import_utils.BORDER_SURROUND]
    }, [(0, import_vue.createVNode)("button", {
      "type": "button",
      "aria-current": page.active || void 0,
      "onClick": () => updateModelValue(page.number, true)
    }, [slots.page ? slots.page(page) : page.text])]));
    return () => (0, import_vue.createVNode)("nav", {
      "role": "navigation",
      "class": bem()
    }, [(0, import_vue.createVNode)("ul", {
      "class": bem("items")
    }, [renderPrevButton(), props.mode === "simple" ? renderDesc() : renderPages(), renderNextButton()])]);
  }
});
