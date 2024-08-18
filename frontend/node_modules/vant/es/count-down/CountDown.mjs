import { createVNode as _createVNode } from "vue";
import { watch, computed, defineComponent } from "vue";
import { truthProp, makeStringProp, makeNumericProp, createNamespace } from "../utils/index.mjs";
import { parseFormat } from "./utils.mjs";
import { useCountDown } from "@vant/use";
import { useExpose } from "../composables/use-expose.mjs";
const [name, bem] = createNamespace("count-down");
const countDownProps = {
  time: makeNumericProp(0),
  format: makeStringProp("HH:mm:ss"),
  autoStart: truthProp,
  millisecond: Boolean
};
var stdin_default = defineComponent({
  name,
  props: countDownProps,
  emits: ["change", "finish"],
  setup(props, {
    emit,
    slots
  }) {
    const {
      start,
      pause,
      reset,
      current
    } = useCountDown({
      time: +props.time,
      millisecond: props.millisecond,
      onChange: (current2) => emit("change", current2),
      onFinish: () => emit("finish")
    });
    const timeText = computed(() => parseFormat(props.format, current.value));
    const resetTime = () => {
      reset(+props.time);
      if (props.autoStart) {
        start();
      }
    };
    watch(() => props.time, resetTime, {
      immediate: true
    });
    useExpose({
      start,
      pause,
      reset: resetTime
    });
    return () => _createVNode("div", {
      "role": "timer",
      "class": bem()
    }, [slots.default ? slots.default(current.value) : timeText.value]);
  }
});
export {
  countDownProps,
  stdin_default as default
};
