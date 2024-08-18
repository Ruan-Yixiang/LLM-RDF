import { createVNode as _createVNode, mergeProps as _mergeProps } from "vue";
import { defineComponent } from "vue";
import { extend, numericProp, createNamespace } from "../utils/index.mjs";
import { SIDEBAR_KEY } from "../sidebar/Sidebar.mjs";
import { useParent } from "@vant/use";
import { useRoute, routeProps } from "../composables/use-route.mjs";
import { Badge } from "../badge/index.mjs";
const [name, bem] = createNamespace("sidebar-item");
const sidebarItemProps = extend({}, routeProps, {
  dot: Boolean,
  title: String,
  badge: numericProp,
  disabled: Boolean,
  badgeProps: Object
});
var stdin_default = defineComponent({
  name,
  props: sidebarItemProps,
  emits: ["click"],
  setup(props, {
    emit,
    slots
  }) {
    const route = useRoute();
    const {
      parent,
      index
    } = useParent(SIDEBAR_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <SidebarItem> must be a child component of <Sidebar>.");
      }
      return;
    }
    const onClick = () => {
      if (props.disabled) {
        return;
      }
      emit("click", index.value);
      parent.setActive(index.value);
      route();
    };
    return () => {
      const {
        dot,
        badge,
        title,
        disabled
      } = props;
      const selected = index.value === parent.getActive();
      return _createVNode("div", {
        "role": "tab",
        "class": bem({
          select: selected,
          disabled
        }),
        "tabindex": disabled ? void 0 : 0,
        "aria-selected": selected,
        "onClick": onClick
      }, [_createVNode(Badge, _mergeProps({
        "dot": dot,
        "class": bem("text"),
        "content": badge
      }, props.badgeProps), {
        default: () => [slots.title ? slots.title() : title]
      })]);
    };
  }
});
export {
  stdin_default as default,
  sidebarItemProps
};
