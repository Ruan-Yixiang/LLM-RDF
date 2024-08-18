import { createVNode as _createVNode } from "vue";
import { defineComponent } from "vue";
import { makeNumericProp, createNamespace } from "../utils/index.mjs";
import { useChildren } from "@vant/use";
const [name, bem] = createNamespace("sidebar");
const SIDEBAR_KEY = Symbol(name);
const sidebarProps = {
  modelValue: makeNumericProp(0)
};
var stdin_default = defineComponent({
  name,
  props: sidebarProps,
  emits: ["change", "update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const {
      linkChildren
    } = useChildren(SIDEBAR_KEY);
    const getActive = () => +props.modelValue;
    const setActive = (value) => {
      if (value !== getActive()) {
        emit("update:modelValue", value);
        emit("change", value);
      }
    };
    linkChildren({
      getActive,
      setActive
    });
    return () => {
      var _a;
      return _createVNode("div", {
        "role": "tablist",
        "class": bem()
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
export {
  SIDEBAR_KEY,
  stdin_default as default,
  sidebarProps
};
