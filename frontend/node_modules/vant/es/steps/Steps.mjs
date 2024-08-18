import { createVNode as _createVNode } from "vue";
import { defineComponent } from "vue";
import { makeStringProp, makeNumericProp, createNamespace } from "../utils/index.mjs";
import { useChildren } from "@vant/use";
const [name, bem] = createNamespace("steps");
const stepsProps = {
  active: makeNumericProp(0),
  direction: makeStringProp("horizontal"),
  activeIcon: makeStringProp("checked"),
  iconPrefix: String,
  finishIcon: String,
  activeColor: String,
  inactiveIcon: String,
  inactiveColor: String
};
const STEPS_KEY = Symbol(name);
var stdin_default = defineComponent({
  name,
  props: stepsProps,
  emits: ["clickStep"],
  setup(props, {
    emit,
    slots
  }) {
    const {
      linkChildren
    } = useChildren(STEPS_KEY);
    const onClickStep = (index) => emit("clickStep", index);
    linkChildren({
      props,
      onClickStep
    });
    return () => {
      var _a;
      return _createVNode("div", {
        "class": bem([props.direction])
      }, [_createVNode("div", {
        "class": bem("items")
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)])]);
    };
  }
});
export {
  STEPS_KEY,
  stdin_default as default,
  stepsProps
};
