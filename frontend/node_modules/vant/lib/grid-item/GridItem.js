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
  default: () => stdin_default,
  gridItemProps: () => gridItemProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_Grid = require("../grid/Grid");
var import_use = require("@vant/use");
var import_use_route = require("../composables/use-route");
var import_icon = require("../icon");
var import_badge = require("../badge");
const [name, bem] = (0, import_utils.createNamespace)("grid-item");
const gridItemProps = (0, import_utils.extend)({}, import_use_route.routeProps, {
  dot: Boolean,
  text: String,
  icon: String,
  badge: import_utils.numericProp,
  iconColor: String,
  iconPrefix: String,
  badgeProps: Object
});
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: gridItemProps,
  setup(props, {
    slots
  }) {
    const {
      parent,
      index
    } = (0, import_use.useParent)(import_Grid.GRID_KEY);
    const route = (0, import_use_route.useRoute)();
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <GridItem> must be a child component of <Grid>.");
      }
      return;
    }
    const rootStyle = (0, import_vue2.computed)(() => {
      const {
        square,
        gutter,
        columnNum
      } = parent.props;
      const percent = `${100 / +columnNum}%`;
      const style = {
        flexBasis: percent
      };
      if (square) {
        style.paddingTop = percent;
      } else if (gutter) {
        const gutterValue = (0, import_utils.addUnit)(gutter);
        style.paddingRight = gutterValue;
        if (index.value >= +columnNum) {
          style.marginTop = gutterValue;
        }
      }
      return style;
    });
    const contentStyle = (0, import_vue2.computed)(() => {
      const {
        square,
        gutter
      } = parent.props;
      if (square && gutter) {
        const gutterValue = (0, import_utils.addUnit)(gutter);
        return {
          right: gutterValue,
          bottom: gutterValue,
          height: "auto"
        };
      }
    });
    const renderIcon = () => {
      if (slots.icon) {
        return (0, import_vue.createVNode)(import_badge.Badge, (0, import_vue.mergeProps)({
          "dot": props.dot,
          "content": props.badge
        }, props.badgeProps), {
          default: slots.icon
        });
      }
      if (props.icon) {
        return (0, import_vue.createVNode)(import_icon.Icon, {
          "dot": props.dot,
          "name": props.icon,
          "size": parent.props.iconSize,
          "badge": props.badge,
          "class": bem("icon"),
          "color": props.iconColor,
          "badgeProps": props.badgeProps,
          "classPrefix": props.iconPrefix
        }, null);
      }
    };
    const renderText = () => {
      if (slots.text) {
        return slots.text();
      }
      if (props.text) {
        return (0, import_vue.createVNode)("span", {
          "class": bem("text")
        }, [props.text]);
      }
    };
    const renderContent = () => {
      if (slots.default) {
        return slots.default();
      }
      return [renderIcon(), renderText()];
    };
    return () => {
      const {
        center,
        border,
        square,
        gutter,
        reverse,
        direction,
        clickable
      } = parent.props;
      const classes = [bem("content", [direction, {
        center,
        square,
        reverse,
        clickable,
        surround: border && gutter
      }]), {
        [import_utils.BORDER]: border
      }];
      return (0, import_vue.createVNode)("div", {
        "class": [bem({
          square
        })],
        "style": rootStyle.value
      }, [(0, import_vue.createVNode)("div", {
        "role": clickable ? "button" : void 0,
        "class": classes,
        "style": contentStyle.value,
        "tabindex": clickable ? 0 : void 0,
        "onClick": route
      }, [renderContent()])]);
    };
  }
});
