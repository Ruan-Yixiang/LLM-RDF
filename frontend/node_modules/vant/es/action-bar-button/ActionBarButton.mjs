import { createVNode as _createVNode } from "vue";
import { computed, defineComponent } from "vue";
import { extend, createNamespace } from "../utils/index.mjs";
import { ACTION_BAR_KEY } from "../action-bar/ActionBar.mjs";
import { useParent } from "@vant/use";
import { useExpose } from "../composables/use-expose.mjs";
import { useRoute, routeProps } from "../composables/use-route.mjs";
import { Button } from "../button/index.mjs";
const [name, bem] = createNamespace("action-bar-button");
const actionBarButtonProps = extend({}, routeProps, {
  type: String,
  text: String,
  icon: String,
  color: String,
  loading: Boolean,
  disabled: Boolean
});
var stdin_default = defineComponent({
  name,
  props: actionBarButtonProps,
  setup(props, {
    slots
  }) {
    const route = useRoute();
    const {
      parent,
      index
    } = useParent(ACTION_BAR_KEY);
    const isFirst = computed(() => {
      if (parent) {
        const prev = parent.children[index.value - 1];
        return !(prev && "isButton" in prev);
      }
    });
    const isLast = computed(() => {
      if (parent) {
        const next = parent.children[index.value + 1];
        return !(next && "isButton" in next);
      }
    });
    useExpose({
      isButton: true
    });
    return () => {
      const {
        type,
        icon,
        text,
        color,
        loading,
        disabled
      } = props;
      return _createVNode(Button, {
        "class": bem([type, {
          last: isLast.value,
          first: isFirst.value
        }]),
        "size": "large",
        "type": type,
        "icon": icon,
        "color": color,
        "loading": loading,
        "disabled": disabled,
        "onClick": route
      }, {
        default: () => [slots.default ? slots.default() : text]
      });
    };
  }
});
export {
  actionBarButtonProps,
  stdin_default as default
};
