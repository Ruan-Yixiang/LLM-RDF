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
var stdin_exports = {};
__export(stdin_exports, {
  barrageProps: () => barrageProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_use_expose = require("../composables/use-expose");
var import_utils = require("../utils");
const barrageProps = {
  top: (0, import_utils.makeNumericProp)(10),
  rows: (0, import_utils.makeNumericProp)(4),
  duration: (0, import_utils.makeNumericProp)(4e3),
  autoPlay: import_utils.truthProp,
  delay: (0, import_utils.makeNumberProp)(300),
  modelValue: (0, import_utils.makeArrayProp)()
};
const [name, bem] = (0, import_utils.createNamespace)("barrage");
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: barrageProps,
  emits: ["update:modelValue"],
  setup(props, {
    emit,
    slots
  }) {
    const barrageWrapper = (0, import_vue2.ref)();
    const className = bem("item");
    const total = (0, import_vue2.ref)(0);
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
    const isInitBarrage = (0, import_vue2.ref)(true);
    const isPlay = (0, import_vue2.ref)(props.autoPlay);
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
    (0, import_vue2.watch)(() => props.modelValue.slice(), (newValue, oldValue) => updateBarrages(newValue != null ? newValue : [], oldValue != null ? oldValue : []), {
      deep: true
    });
    const rootStyle = (0, import_vue2.ref)({});
    (0, import_vue2.onMounted)(() => __async(this, null, function* () {
      var _a;
      rootStyle.value["--move-distance"] = `-${(_a = barrageWrapper.value) == null ? void 0 : _a.offsetWidth}px`;
      yield (0, import_vue2.nextTick)();
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
    (0, import_use_expose.useExpose)({
      play,
      pause
    });
    return () => {
      var _a;
      return (0, import_vue.createVNode)("div", {
        "class": bem(),
        "ref": barrageWrapper,
        "style": rootStyle.value
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
