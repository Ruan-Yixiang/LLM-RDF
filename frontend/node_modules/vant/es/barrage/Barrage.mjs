var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
import { createVNode as _createVNode } from "vue";
import { defineComponent, onMounted, ref, nextTick, watch } from "vue";
import { useExpose } from "../composables/use-expose.mjs";
import { createNamespace, makeArrayProp, makeNumberProp, makeNumericProp, truthProp } from "../utils/index.mjs";
const barrageProps = {
  top: makeNumericProp(10),
  rows: makeNumericProp(4),
  duration: makeNumericProp(4e3),
  autoPlay: truthProp,
  delay: makeNumberProp(300),
  modelValue: makeArrayProp()
};
const [name, bem] = createNamespace("barrage");
var stdin_default = defineComponent({
  name,
  props: barrageProps,
  emits: ["update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const barrageWrapper = ref();
    const className = bem("item");
    const total = ref(0);
    const barrageItems = [];
    const createBarrageItem = (text, delay = props.delay) => {
      const item = document.createElement("span");
      item.className = className;
      item.innerText = String(text);
      item.style.animationDuration = `${props.duration}ms`;
      item.style.animationDelay = `${delay}ms`;
      item.style.animationName = "van-barrage";
      item.style.animationTimingFunction = "linear";
      return item;
    };
    const isInitBarrage = ref(true);
    const isPlay = ref(props.autoPlay);
    const appendBarrageItem = ({
      id,
      text
    }, i) => {
      var _a;
      const item = createBarrageItem(text, isInitBarrage.value ? i * props.delay : void 0);
      if (!props.autoPlay && isPlay.value === false) {
        item.style.animationPlayState = "paused";
      }
      (_a = barrageWrapper.value) == null ? void 0 : _a.append(item);
      total.value++;
      const top = (total.value - 1) % +props.rows * item.offsetHeight + +props.top;
      item.style.top = `${top}px`;
      item.dataset.id = String(id);
      barrageItems.push(item);
      item.addEventListener("animationend", () => {
        emit("update:modelValue", [...props.modelValue].filter((v) => String(v.id) !== item.dataset.id));
      });
    };
    const updateBarrages = (newValue, oldValue) => {
      const map = new Map(oldValue.map((item) => [item.id, item]));
      newValue.forEach((item, i) => {
        if (map.has(item.id)) {
          map.delete(item.id);
        } else {
          appendBarrageItem(item, i);
        }
      });
      map.forEach((item) => {
        const index = barrageItems.findIndex((span) => span.dataset.id === String(item.id));
        if (index > -1) {
          barrageItems[index].remove();
          barrageItems.splice(index, 1);
        }
      });
      isInitBarrage.value = false;
    };
    watch(() => props.modelValue.slice(), (newValue, oldValue) => updateBarrages(newValue != null ? newValue : [], oldValue != null ? oldValue : []), {
      deep: true
    });
    const rootStyle = ref({});
    onMounted(() => __async(this, null, function* () {
      var _a;
      rootStyle.value["--move-distance"] = `-${(_a = barrageWrapper.value) == null ? void 0 : _a.offsetWidth}px`;
      yield nextTick();
      updateBarrages(props.modelValue, []);
    }));
    const play = () => {
      isPlay.value = true;
      barrageItems.forEach((item) => {
        item.style.animationPlayState = "running";
      });
    };
    const pause = () => {
      isPlay.value = false;
      barrageItems.forEach((item) => {
        item.style.animationPlayState = "paused";
      });
    };
    useExpose({
      play,
      pause
    });
    return () => {
      var _a;
      return _createVNode("div", {
        "class": bem(),
        "ref": barrageWrapper,
        "style": rootStyle.value
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
export {
  barrageProps,
  stdin_default as default
};
