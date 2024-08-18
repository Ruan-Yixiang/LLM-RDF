import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import { computed, defineComponent } from "vue";
import { BORDER, extend, addUnit, numericProp, createNamespace } from "../utils/index.mjs";
import { GRID_KEY } from "../grid/Grid.mjs";
import { useParent } from "@vant/use";
import { useRoute, routeProps } from "../composables/use-route.mjs";
import { Icon } from "../icon/index.mjs";
import { Badge } from "../badge/index.mjs";
const [name, bem] = createNamespace("grid-item");
const gridItemProps = extend({}, routeProps, {
  dot: Boolean,
  text: String,
  icon: String,
  badge: numericProp,
  iconColor: String,
  iconPrefix: String,
  badgeProps: Object
});
var stdin_default = defineComponent({
  name,
  props: gridItemProps,
  setup(props, {
    slots
  }) {
    const {
      parent,
      index
    } = useParent(GRID_KEY);
    const route = useRoute();
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <GridItem> must be a child component of <Grid>.");
      }
      return;
    }
    const rootStyle = computed(() => {
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
        const gutterValue = addUnit(gutter);
        style.paddingRight = gutterValue;
        if (index.value >= +columnNum) {
          style.marginTop = gutterValue;
        }
      }
      return style;
    });
    const contentStyle = computed(() => {
      const {
        square,
        gutter
      } = parent.props;
      if (square && gutter) {
        const gutterValue = addUnit(gutter);
        return {
          right: gutterValue,
          bottom: gutterValue,
          height: "auto"
        };
      }
    });
    const renderIcon = () => {
      if (slots.icon) {
        return _createVNode(Badge, _mergeProps({
          "dot": props.dot,
          "content": props.badge
        }, props.badgeProps), {
          default: slots.icon
        });
      }
      if (props.icon) {
        return _createVNode(Icon, {
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
        return _createVNode("span", {
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
        [BORDER]: border
      }];
      return _createVNode("div", {
        "class": [bem({
          square
        })],
        "style": rootStyle.value
      }, [_createVNode("div", {
        "role": clickable ? "button" : void 0,
        "class": classes,
        "style": contentStyle.value,
        "tabindex": clickable ? 0 : void 0,
        "onClick": route
      }, [renderContent()])]);
    };
  }
});
export {
  stdin_default as default,
  gridItemProps
};
