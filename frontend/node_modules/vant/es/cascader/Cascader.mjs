import { createVNode as _createVNode } from "vue";
import { ref, watch, nextTick, defineComponent } from "vue";
import { extend, truthProp, numericProp, makeArrayProp, makeStringProp, createNamespace, HAPTICS_FEEDBACK } from "../utils/index.mjs";
import { useRefs } from "../composables/use-refs.mjs";
import { Tab } from "../tab/index.mjs";
import { Tabs } from "../tabs/index.mjs";
import { Icon } from "../icon/index.mjs";
const [name, bem, t] = createNamespace("cascader");
const cascaderProps = {
  title: String,
  options: makeArrayProp(),
  closeable: truthProp,
  swipeable: truthProp,
  closeIcon: makeStringProp("cross"),
  showHeader: truthProp,
  modelValue: numericProp,
  fieldNames: Object,
  placeholder: String,
  activeColor: String
};
var stdin_default = defineComponent({
  name,
  props: cascaderProps,
  emits: ["close", "change", "finish", "clickTab", "update:modelValue"],
  setup(props, {
    slots,
    emit
  }) {
    const tabs = ref([]);
    const activeTab = ref(0);
    const [selectedElementRefs, setSelectedElementRefs] = useRefs();
    const {
      text: textKey,
      value: valueKey,
      children: childrenKey
    } = extend({
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
          nextTick(() => {
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
        nextTick(() => {
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
    const renderHeader = () => props.showHeader ? _createVNode("div", {
      "class": bem("header")
    }, [_createVNode("h2", {
      "class": bem("title")
    }, [slots.title ? slots.title() : props.title]), props.closeable ? _createVNode(Icon, {
      "name": props.closeIcon,
      "class": [bem("close-icon"), HAPTICS_FEEDBACK],
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
      }) : _createVNode("span", null, [option[textKey]]);
      return _createVNode("li", {
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
      }, [Text, selected ? _createVNode(Icon, {
        "name": "success",
        "class": bem("selected-icon")
      }, null) : null]);
    };
    const renderOptions = (options, selectedOption, tabIndex) => _createVNode("ul", {
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
      return _createVNode(Tab, {
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
    const renderTabs = () => _createVNode(Tabs, {
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
    watch(activeTab, (value) => {
      const el = selectedElementRefs.value[value];
      if (el)
        scrollIntoView(el);
    });
    watch(() => props.options, updateTabs, {
      deep: true
    });
    watch(() => props.modelValue, (value) => {
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
    return () => _createVNode("div", {
      "class": bem()
    }, [renderHeader(), renderTabs()]);
  }
});
export {
  cascaderProps,
  stdin_default as default
};
