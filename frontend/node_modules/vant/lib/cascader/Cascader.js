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
  cascaderProps: () => cascaderProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_use_refs = require("../composables/use-refs");
var import_tab = require("../tab");
var import_tabs = require("../tabs");
var import_icon = require("../icon");
const [name, bem, t] = (0, import_utils.createNamespace)("cascader");
const cascaderProps = {
  title: String,
  options: (0, import_utils.makeArrayProp)(),
  closeable: import_utils.truthProp,
  swipeable: import_utils.truthProp,
  closeIcon: (0, import_utils.makeStringProp)("cross"),
  showHeader: import_utils.truthProp,
  modelValue: import_utils.numericProp,
  fieldNames: Object,
  placeholder: String,
  activeColor: String
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: cascaderProps,
  emits: ["close", "change", "finish", "clickTab", "update:modelValue"],
  setup(props, {
    slots,
    emit
  }) {
    const tabs = (0, import_vue2.ref)([]);
    const activeTab = (0, import_vue2.ref)(0);
    const [selectedElementRefs, setSelectedElementRefs] = (0, import_use_refs.useRefs)();
    const {
      text: textKey,
      value: valueKey,
      children: childrenKey
    } = (0, import_utils.extend)({
      text: "text",
      value: "value",
      children: "children"
    }, props.fieldNames);
    const getSelectedOptionsByValue = (options, value) => {
      for (const option of options) {
        if (option[valueKey] === value) {
          return [option];
        }
        if (option[childrenKey]) {
          const selectedOptions = getSelectedOptionsByValue(option[childrenKey], value);
          if (selectedOptions) {
            return [option, ...selectedOptions];
          }
        }
      }
    };
    const updateTabs = () => {
      const {
        options,
        modelValue
      } = props;
      if (modelValue !== void 0) {
        const selectedOptions = getSelectedOptionsByValue(options, modelValue);
        if (selectedOptions) {
          let optionsCursor = options;
          tabs.value = selectedOptions.map((option) => {
            const tab = {
              options: optionsCursor,
              selected: option
            };
            const next = optionsCursor.find((item) => item[valueKey] === option[valueKey]);
            if (next) {
              optionsCursor = next[childrenKey];
            }
            return tab;
          });
          if (optionsCursor) {
            tabs.value.push({
              options: optionsCursor,
              selected: null
            });
          }
          (0, import_vue2.nextTick)(() => {
            activeTab.value = tabs.value.length - 1;
          });
          return;
        }
      }
      tabs.value = [{
        options,
        selected: null
      }];
    };
    const onSelect = (option, tabIndex) => {
      if (option.disabled) {
        return;
      }
      tabs.value[tabIndex].selected = option;
      if (tabs.value.length > tabIndex + 1) {
        tabs.value = tabs.value.slice(0, tabIndex + 1);
      }
      if (option[childrenKey]) {
        const nextTab = {
          options: option[childrenKey],
          selected: null
        };
        if (tabs.value[tabIndex + 1]) {
          tabs.value[tabIndex + 1] = nextTab;
        } else {
          tabs.value.push(nextTab);
        }
        (0, import_vue2.nextTick)(() => {
          activeTab.value++;
        });
      }
      const selectedOptions = tabs.value.map((tab) => tab.selected).filter(Boolean);
      emit("update:modelValue", option[valueKey]);
      const params = {
        value: option[valueKey],
        tabIndex,
        selectedOptions
      };
      emit("change", params);
      if (!option[childrenKey]) {
        emit("finish", params);
      }
    };
    const onClose = () => emit("close");
    const onClickTab = ({
      name: name2,
      title
    }) => emit("clickTab", name2, title);
    const renderHeader = () => props.showHeader ? (0, import_vue.createVNode)("div", {
      "class": bem("header")
    }, [(0, import_vue.createVNode)("h2", {
      "class": bem("title")
    }, [slots.title ? slots.title() : props.title]), props.closeable ? (0, import_vue.createVNode)(import_icon.Icon, {
      "name": props.closeIcon,
      "class": [bem("close-icon"), import_utils.HAPTICS_FEEDBACK],
      "onClick": onClose
    }, null) : null]) : null;
    const renderOption = (option, selectedOption, tabIndex) => {
      const {
        disabled
      } = option;
      const selected = !!(selectedOption && option[valueKey] === selectedOption[valueKey]);
      const color = option.color || (selected ? props.activeColor : void 0);
      const Text = slots.option ? slots.option({
        option,
        selected
      }) : (0, import_vue.createVNode)("span", null, [option[textKey]]);
      return (0, import_vue.createVNode)("li", {
        "ref": selected ? setSelectedElementRefs(tabIndex) : void 0,
        "role": "menuitemradio",
        "class": [bem("option", {
          selected,
          disabled
        }), option.className],
        "style": {
          color
        },
        "tabindex": disabled ? void 0 : selected ? 0 : -1,
        "aria-checked": selected,
        "aria-disabled": disabled || void 0,
        "onClick": () => onSelect(option, tabIndex)
      }, [Text, selected ? (0, import_vue.createVNode)(import_icon.Icon, {
        "name": "success",
        "class": bem("selected-icon")
      }, null) : null]);
    };
    const renderOptions = (options, selectedOption, tabIndex) => (0, import_vue.createVNode)("ul", {
      "role": "menu",
      "class": bem("options")
    }, [options.map((option) => renderOption(option, selectedOption, tabIndex))]);
    const renderTab = (tab, tabIndex) => {
      const {
        options,
        selected
      } = tab;
      const placeholder = props.placeholder || t("select");
      const title = selected ? selected[textKey] : placeholder;
      return (0, import_vue.createVNode)(import_tab.Tab, {
        "title": title,
        "titleClass": bem("tab", {
          unselected: !selected
        })
      }, {
        default: () => {
          var _a, _b;
          return [(_a = slots["options-top"]) == null ? void 0 : _a.call(slots, {
            tabIndex
          }), renderOptions(options, selected, tabIndex), (_b = slots["options-bottom"]) == null ? void 0 : _b.call(slots, {
            tabIndex
          })];
        }
      });
    };
    const renderTabs = () => (0, import_vue.createVNode)(import_tabs.Tabs, {
      "active": activeTab.value,
      "onUpdate:active": ($event) => activeTab.value = $event,
      "shrink": true,
      "animated": true,
      "class": bem("tabs"),
      "color": props.activeColor,
      "swipeable": props.swipeable,
      "onClickTab": onClickTab
    }, {
      default: () => [tabs.value.map(renderTab)]
    });
    const scrollIntoView = (el) => {
      const scrollParent = el.parentElement;
      if (scrollParent) {
        scrollParent.scrollTop = el.offsetTop - (scrollParent.offsetHeight - el.offsetHeight) / 2;
      }
    };
    updateTabs();
    (0, import_vue2.watch)(activeTab, (value) => {
      const el = selectedElementRefs.value[value];
      if (el)
        scrollIntoView(el);
    });
    (0, import_vue2.watch)(() => props.options, updateTabs, {
      deep: true
    });
    (0, import_vue2.watch)(() => props.modelValue, (value) => {
      if (value !== void 0) {
        const values = tabs.value.map((tab) => {
          var _a;
          return (_a = tab.selected) == null ? void 0 : _a[valueKey];
        });
        if (values.includes(value)) {
          return;
        }
      }
      updateTabs();
    });
    return () => (0, import_vue.createVNode)("div", {
      "class": bem()
    }, [renderHeader(), renderTabs()]);
  }
});
