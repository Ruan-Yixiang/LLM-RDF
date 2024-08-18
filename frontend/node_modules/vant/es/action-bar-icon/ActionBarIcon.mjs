import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import { defineComponent } from "vue";
import { extend, createNamespace, unknownProp, numericProp } from "../utils/index.mjs";
import { ACTION_BAR_KEY } from "../action-bar/ActionBar.mjs";
import { useParent } from "@vant/use";
import { useRoute, routeProps } from "../composables/use-route.mjs";
import { Icon } from "../icon/index.mjs";
import { Badge } from "../badge/index.mjs";
const [name, bem] = createNamespace("action-bar-icon");
const actionBarIconProps = extend({}, routeProps, {
  dot: Boolean,
  text: String,
  icon: String,
  color: String,
  badge: numericProp,
  iconClass: unknownProp,
  badgeProps: Object,
  iconPrefix: String
});
var stdin_default = defineComponent({
  name,
  props: actionBarIconProps,
  setup(props, {
    slots
  }) {
    const route = useRoute();
    useParent(ACTION_BAR_KEY);
    const renderIcon = () => {
      const {
        dot,
        badge,
        icon,
        color,
        iconClass,
        badgeProps,
        iconPrefix
      } = props;
      if (slots.icon) {
        return _createVNode(Badge, _mergeProps({
          "dot": dot,
          "class": bem("icon"),
          "content": badge
        }, badgeProps), {
          default: slots.icon
        });
      }
      return _createVNode(Icon, {
        "tag": "div",
        "dot": dot,
        "name": icon,
        "badge": badge,
        "color": color,
        "class": [bem("icon"), iconClass],
        "badgeProps": badgeProps,
        "classPrefix": iconPrefix
      }, null);
    };
    return () => _createVNode("div", {
      "role": "button",
      "class": bem(),
      "tabindex": 0,
      "onClick": route
    }, [renderIcon(), slots.default ? slots.default() : props.text]);
  }
});
export {
  actionBarIconProps,
  stdin_default as default
};
