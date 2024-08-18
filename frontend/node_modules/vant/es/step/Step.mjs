import { createVNode as _createVNode } from "vue";
import { computed, defineComponent } from "vue";
import { BORDER, createNamespace } from "../utils/index.mjs";
import { STEPS_KEY } from "../steps/Steps.mjs";
import { useParent } from "@vant/use";
import { Icon } from "../icon/index.mjs";
const [name, bem] = createNamespace("step");
var stdin_default = defineComponent({
  name,
  setup(props, {
    slots
  }) {
    const {
      parent,
      index
    } = useParent(STEPS_KEY);
    if (!parent) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[Vant] <Step> must be a child component of <Steps>.");
      }
      return;
    }
    const parentProps = parent.props;
    const getStatus = () => {
      const active = +parentProps.active;
      if (index.value < active) {
        return "finish";
      }
      return index.value === active ? "process" : "waiting";
    };
    const isActive = () => getStatus() === "process";
    const lineStyle = computed(() => ({
      background: getStatus() === "finish" ? parentProps.activeColor : parentProps.inactiveColor
    }));
    const titleStyle = computed(() => {
      if (isActive()) {
        return {
          color: parentProps.activeColor
        };
      }
      if (getStatus() === "waiting") {
        return {
          color: parentProps.inactiveColor
        };
      }
    });
    const onClickStep = () => parent.onClickStep(index.value);
    const renderCircle = () => {
      const {
        iconPrefix,
        finishIcon,
        activeIcon,
        activeColor,
        inactiveIcon
      } = parentProps;
      if (isActive()) {
        if (slots["active-icon"]) {
          return slots["active-icon"]();
        }
        return _createVNode(Icon, {
          "class": bem("icon", "active"),
          "name": activeIcon,
          "color": activeColor,
          "classPrefix": iconPrefix
        }, null);
      }
      if (getStatus() === "finish" && (finishIcon || slots["finish-icon"])) {
        if (slots["finish-icon"]) {
          return slots["finish-icon"]();
        }
        return _createVNode(Icon, {
          "class": bem("icon", "finish"),
          "name": finishIcon,
          "color": activeColor,
          "classPrefix": iconPrefix
        }, null);
      }
      if (slots["inactive-icon"]) {
        return slots["inactive-icon"]();
      }
      if (inactiveIcon) {
        return _createVNode(Icon, {
          "class": bem("icon"),
          "name": inactiveIcon,
          "classPrefix": iconPrefix
        }, null);
      }
      return _createVNode("i", {
        "class": bem("circle"),
        "style": lineStyle.value
      }, null);
    };
    return () => {
      var _a;
      const status = getStatus();
      return _createVNode("div", {
        "class": [BORDER, bem([parentProps.direction, {
          [status]: status
        }])]
      }, [_createVNode("div", {
        "class": bem("title", {
          active: isActive()
        }),
        "style": titleStyle.value,
        "onClick": onClickStep
      }, [(_a = slots.default) == null ? void 0 : _a.call(slots)]), _createVNode("div", {
        "class": bem("circle-container"),
        "onClick": onClickStep
      }, [renderCircle()]), _createVNode("div", {
        "class": bem("line"),
        "style": lineStyle.value
      }, null)]);
    };
  }
});
export {
  stdin_default as default
};
