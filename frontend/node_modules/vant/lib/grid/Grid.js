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
  GRID_KEY: () => GRID_KEY,
  default: () => stdin_default,
  gridProps: () => gridProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_constant = require("../utils/constant");
var import_use = require("@vant/use");
const [name, bem] = (0, import_utils.createNamespace)("grid");
const gridProps = {
  square: Boolean,
  center: import_utils.truthProp,
  border: import_utils.truthProp,
  gutter: import_utils.numericProp,
  reverse: Boolean,
  iconSize: import_utils.numericProp,
  direction: String,
  clickable: Boolean,
  columnNum: (0, import_utils.makeNumericProp)(4)
};
const GRID_KEY = Symbol(name);
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: gridProps,
  setup(props, {
    slots
  }) {
    const {
      linkChildren
    } = (0, import_use.useChildren)(GRID_KEY);
    linkChildren({
      props
    });
    return () => {
      var _a;
      return (0, import_vue.createVNode)("div", {
        "style": {
          paddingLeft: (0, import_utils.addUnit)(props.gutter)
        },
        "class": [bem(), {
          [import_constant.BORDER_TOP]: props.border && !props.gutter
        }]
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]);
    };
  }
});
