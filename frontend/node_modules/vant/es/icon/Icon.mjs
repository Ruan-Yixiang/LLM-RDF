import { mergeProps as _mergeProps, createVNode as _createVNode } from "vue";
import { inject, computed, defineComponent } from "vue";
import { addUnit, numericProp, makeStringProp, createNamespace } from "../utils/index.mjs";
import { Badge } from "../badge/index.mjs";
import { CONFIG_PROVIDER_KEY } from "../config-provider/ConfigProvider.mjs";
const [name, bem] = createNamespace("icon");
const isImage = (name2) => name2 == null ? void 0 : name2.includes("/");
const iconProps = {
  dot: Boolean,
  tag: makeStringProp("i"),
  name: String,
  size: numericProp,
  badge: numericProp,
  color: String,
  badgeProps: Object,
  classPrefix: String
};
var stdin_default = defineComponent({
  name,
  props: iconProps,
  setup(props, {
    slots
  }) {
    const config = inject(CONFIG_PROVIDER_KEY, null);
    const classPrefix = computed(() => props.classPrefix || (config == null ? void 0 : config.iconPrefix) || bem());
    return () => {
      const {
        tag,
        dot,
        name: name2,
        size,
        badge,
        color
      } = props;
      const isImageIcon = isImage(name2);
      return _createVNode(Badge, _mergeProps({
        "dot": dot,
        "tag": tag,
        "class": [classPrefix.value, isImageIcon ? "" : `${classPrefix.value}-${name2}`],
        "style": {
          color,
          fontSize: addUnit(size)
        },
        "content": badge
      }, props.badgeProps), {
        default: () => {
          var _a;
          return [(_a = slots.default) == null ? void 0 : _a.call(slots), isImageIcon && _createVNode("img", {
            "class": bem("image"),
            "src": name2
          }, null)];
        }
      });
    };
  }
});
export {
  stdin_default as default,
  iconProps
};
