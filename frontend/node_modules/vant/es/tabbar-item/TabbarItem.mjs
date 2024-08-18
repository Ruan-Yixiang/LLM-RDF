import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
import { computed, defineComponent, getCurrentInstance } from "vue";
import { createNamespace, extend, isObject, numericProp } from "../utils/index.mjs";
import { TABBAR_KEY } from "../tabbar/Tabbar.mjs";
import { useParent } from "@vant/use";
import { routeProps, useRoute } from "../composables/use-route.mjs";
import { Icon } from "../icon/index.mjs";
import { Badge } from "../badge/index.mjs";
const [name, bem] = createNamespace("tabbar-item");
const tabbarItemProps = extend({}, routeProps, {
  dot: Boolean,
  icon: String,
  name: numericProp,
  badge: numericProp,
  badgeProps: Object,
  iconPrefix: String
});
var stdin_default = defineComponent({
  name,
  props: tabbarItemProps,
  emits: ["click"],
  setup(props, {
    emit,
    slots
  }) {
    const route = useRoute();
    const vm = getCurrentInstance().proxy;
    const {
      parent,
      index
    } = useParent(TABBAR_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <TabbarItem> must be a child component of <Tabbar>.");
      }
      return;
    }
    const active = computed(() => {
      var _a;
      const {
        route: route2,
        modelValue
      } = parent.props;
      if (route2 && "$route" in vm) {
        const {
          $route
        } = vm;
        const {
          to
        } = props;
        const config = isObject(to) ? to : {
          path: to
        };
        return !!$route.matched.find((val) => {
          const pathMatched = "path" in config && config.path === val.path;
          const nameMatched = "name" in config && config.name === val.name;
          return pathMatched || nameMatched;
        });
      }
      return ((_a = props.name) != null ? _a : index.value) === modelValue;
    });
    const onClick = (event) => {
      var _a;
      if (!active.value) {
        parent.setActive((_a = props.name) != null ? _a : index.value, route);
      }
      emit("click", event);
    };
    const renderIcon = () => {
      if (slots.icon) {
        return slots.icon({
          active: active.value
        });
      }
      if (props.icon) {
        return _createVNode(Icon, {
          "name": props.icon,
          "classPrefix": props.iconPrefix
        }, null);
      }
    };
    return () => {
      var _a;
      const {
        dot,
        badge
      } = props;
      const {
        activeColor,
        inactiveColor
      } = parent.props;
      const color = active.value ? activeColor : inactiveColor;
      return _createVNode("div", {
        "role": "tab",
        "class": bem({
          active: active.value
        }),
        "style": {
          color
        },
        "tabindex": 0,
        "aria-selected": active.value,
        "onClick": onClick
      }, [_createVNode(Badge, _mergeProps({
        "dot": dot,
        "class": bem("icon"),
        "content": badge
      }, props.badgeProps), {
        default: renderIcon
      }), _createVNode("div", {
        "class": bem("text")
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots, {
        active: active.value
      })])]);
    };
  }
});
export {
  stdin_default as default,
  tabbarItemProps
};
