import { createVNode as _createVNode } from "vue";
import { defineComponent } from "vue";
import { createNamespace } from "../utils/index.mjs";
import { t, bem } from "./utils.mjs";
const [name] = createNamespace("calendar-header");
var stdin_default = defineComponent({
  name,
  props: {
    date: Date,
    title: String,
    subtitle: String,
    showTitle: Boolean,
    showSubtitle: Boolean,
    firstDayOfWeek: Number
  },
  emits: ["clickSubtitle"],
  setup(props, {
    slots,
    emit
  }) {
    const renderTitle = () => {
      if (props.showTitle) {
        const text = props.title || t("title");
        const title = slots.title ? slots.title() : text;
        return _createVNode("div", {
          "class": bem("header-title")
        }, [title]);
      }
    };
    const onClickSubtitle = (event) => emit("clickSubtitle", event);
    const renderSubtitle = () => {
      if (props.showSubtitle) {
        const title = slots.subtitle ? slots.subtitle({
          date: props.date,
          text: props.subtitle
        }) : props.subtitle;
        return _createVNode("div", {
          "class": bem("header-subtitle"),
          "onClick": onClickSubtitle
        }, [title]);
      }
    };
    const renderWeekDays = () => {
      const {
        firstDayOfWeek
      } = props;
      const weekdays = t("weekdays");
      const renderWeekDays2 = [...weekdays.slice(firstDayOfWeek, 7), ...weekdays.slice(0, firstDayOfWeek)];
      return _createVNode("div", {
        "class": bem("weekdays")
      }, [renderWeekDays2.map((text) => _createVNode("span", {
        "class": bem("weekday")
      }, [text]))]);
    };
    return () => _createVNode("div", {
      "class": bem("header")
    }, [renderTitle(), renderSubtitle(), renderWeekDays()]);
  }
});
export {
  stdin_default as default
};
