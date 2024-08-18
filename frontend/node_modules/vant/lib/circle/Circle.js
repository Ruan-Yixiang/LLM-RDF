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
  circleProps: () => circleProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_use = require("@vant/use");
var import_utils = require("../utils");
const [name, bem] = (0, import_utils.createNamespace)("circle");
let uid = 0;
const format = (rate) => Math.min(Math.max(+rate, 0), 100);
function getPath(clockwise, viewBoxSize) {
  const sweepFlag = clockwise ? 1 : 0;
  return `M ${viewBoxSize / 2} ${viewBoxSize / 2} m 0, -500 a 500, 500 0 1, ${sweepFlag} 0, 1000 a 500, 500 0 1, ${sweepFlag} 0, -1000`;
}
const circleProps = {
  text: String,
  size: import_utils.numericProp,
  fill: (0, import_utils.makeStringProp)("none"),
  rate: (0, import_utils.makeNumericProp)(100),
  speed: (0, import_utils.makeNumericProp)(0),
  color: [String, Object],
  clockwise: import_utils.truthProp,
  layerColor: String,
  currentRate: (0, import_utils.makeNumberProp)(0),
  strokeWidth: (0, import_utils.makeNumericProp)(40),
  strokeLinecap: String,
  startPosition: (0, import_utils.makeStringProp)("top")
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: circleProps,
  emits: ["update:currentRate"],
  setup(props, {
    emit,
    slots
  }) {
    const id = `van-circle-${uid++}`;
    const viewBoxSize = (0, import_vue2.computed)(() => +props.strokeWidth + 1e3);
    const path = (0, import_vue2.computed)(() => getPath(props.clockwise, viewBoxSize.value));
    const svgStyle = (0, import_vue2.computed)(() => {
      const ROTATE_ANGLE_MAP = {
        top: 0,
        right: 90,
        bottom: 180,
        left: 270
      };
      const angleValue = ROTATE_ANGLE_MAP[props.startPosition];
      if (angleValue) {
        return {
          transform: `rotate(${angleValue}deg)`
        };
      }
    });
    (0, import_vue2.watch)(() => props.rate, (rate) => {
      let rafId;
      const startTime = Date.now();
      const startRate = props.currentRate;
      const endRate = format(rate);
      const duration = Math.abs((startRate - endRate) * 1e3 / +props.speed);
      const animate = () => {
        const now = Date.now();
        const progress = Math.min((now - startTime) / duration, 1);
        const rate2 = progress * (endRate - startRate) + startRate;
        emit("update:currentRate", format(parseFloat(rate2.toFixed(1))));
        if (endRate > startRate ? rate2 < endRate : rate2 > endRate) {
          rafId = (0, import_use.raf)(animate);
        }
      };
      if (props.speed) {
        if (rafId) {
          (0, import_use.cancelRaf)(rafId);
        }
        rafId = (0, import_use.raf)(animate);
      } else {
        emit("update:currentRate", endRate);
      }
    }, {
      immediate: true
    });
    const renderHover = () => {
      const PERIMETER = 3140;
      const {
        strokeWidth,
        currentRate,
        strokeLinecap
      } = props;
      const offset = PERIMETER * currentRate / 100;
      const color = (0, import_utils.isObject)(props.color) ? `url(#${id})` : props.color;
      const style = {
        stroke: color,
        strokeWidth: `${+strokeWidth + 1}px`,
        strokeLinecap,
        strokeDasharray: `${offset}px ${PERIMETER}px`
      };
      return (0, import_vue.createVNode)("path", {
        "d": path.value,
        "style": style,
        "class": bem("hover"),
        "stroke": color
      }, null);
    };
    const renderLayer = () => {
      const style = {
        fill: props.fill,
        stroke: props.layerColor,
        strokeWidth: `${props.strokeWidth}px`
      };
      return (0, import_vue.createVNode)("path", {
        "class": bem("layer"),
        "style": style,
        "d": path.value
      }, null);
    };
    const renderGradient = () => {
      const {
        color
      } = props;
      if (!(0, import_utils.isObject)(color)) {
        return;
      }
      const Stops = Object.keys(color).sort((a, b) => parseFloat(a) - parseFloat(b)).map((key, index) => (0, import_vue.createVNode)("stop", {
        "key": index,
        "offset": key,
        "stop-color": color[key]
      }, null));
      return (0, import_vue.createVNode)("defs", null, [(0, import_vue.createVNode)("linearGradient", {
        "id": id,
        "x1": "100%",
        "y1": "0%",
        "x2": "0%",
        "y2": "0%"
      }, [Stops])]);
    };
    const renderText = () => {
      if (slots.default) {
        return slots.default();
      }
      if (props.text) {
        return (0, import_vue.createVNode)("div", {
          "class": bem("text")
        }, [props.text]);
      }
    };
    return () => (0, import_vue.createVNode)("div", {
      "class": bem(),
      "style": (0, import_utils.getSizeStyle)(props.size)
    }, [(0, import_vue.createVNode)("svg", {
      "viewBox": `0 0 ${viewBoxSize.value} ${viewBoxSize.value}`,
      "style": svgStyle.value
    }, [renderGradient(), renderLayer(), renderHover()]), renderText()]);
  }
});
