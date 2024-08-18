import { createVNode as _createVNode } from "vue";
import { computed, watchEffect, defineComponent } from "vue";
import { clamp, truthProp, makeStringProp, makeNumberProp, makeNumericProp, createNamespace, BORDER_SURROUND } from "../utils/index.mjs";
const [name, bem, t] = createNamespace("pagination");
const makePage = (number, text, active) => ({
  number,
  text,
  active
});
const paginationProps = {
  mode: makeStringProp("multi"),
  prevText: String,
  nextText: String,
  pageCount: makeNumericProp(0),
  modelValue: makeNumberProp(0),
  totalItems: makeNumericProp(0),
  showPageSize: makeNumericProp(5),
  itemsPerPage: makeNumericProp(10),
  forceEllipses: Boolean,
  showPrevButton: truthProp,
  showNextButton: truthProp
};
var stdin_default = defineComponent({
  name,
  props: paginationProps,
  emits: ["change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const count = computed(() => {
      const {
        pageCount,
        totalItems,
        itemsPerPage
      } = props;
      const count2 = +pageCount || Math.ceil(+totalItems / +itemsPerPage);
      return Math.max(1, count2);
    });
    const pages = computed(() => {
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
      value = clamp(value, 1, count.value);
      if (props.modelValue !== value) {
        emit("update:modelValue", value);
        if (emitChange) {
          emit("change", value);
        }
      }
    };
    watchEffect(() => updateModelValue(props.modelValue));
    const renderDesc = () => _createVNode("li", {
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
      return _createVNode("li", {
        "class": [bem("item", {
          disabled,
          border: mode === "simple",
          prev: true
        }), BORDER_SURROUND]
      }, [_createVNode("button", {
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
      return _createVNode("li", {
        "class": [bem("item", {
          disabled,
          border: mode === "simple",
          next: true
        }), BORDER_SURROUND]
      }, [_createVNode("button", {
        "type": "button",
        "disabled": disabled,
        "onClick": () => updateModelValue(modelValue + 1, true)
      }, [slot ? slot() : props.nextText || t("next")])]);
    };
    const renderPages = () => pages.value.map((page) => _createVNode("li", {
      "class": [bem("item", {
        active: page.active,
        page: true
      }), BORDER_SURROUND]
    }, [_createVNode("button", {
      "type": "button",
      "aria-current": page.active || void 0,
      "onClick": () => updateModelValue(page.number, true)
    }, [slots.page ? slots.page(page) : page.text])]));
    return () => _createVNode("nav", {
      "role": "navigation",
      "class": bem()
    }, [_createVNode("ul", {
      "class": bem("items")
    }, [renderPrevButton(), props.mode === "simple" ? renderDesc() : renderPages(), renderNextButton()])]);
  }
});
export {
  stdin_default as default,
  paginationProps
};
