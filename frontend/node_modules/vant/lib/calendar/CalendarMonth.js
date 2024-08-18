var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_utils2 = require("../date-picker/utils");
var import_utils3 = require("./utils");
var import_use = require("@vant/use");
var import_use_expose = require("../composables/use-expose");
var import_use_height = require("../composables/use-height");
var import_CalendarDay = __toESM(require("./CalendarDay"));
const [name] = (0, import_utils.createNamespace)("calendar-month");
const calendarMonthProps = {
  date: (0, import_utils.makeRequiredProp)(Date),
  type: String,
  color: String,
  minDate: (0, import_utils.makeRequiredProp)(Date),
  maxDate: (0, import_utils.makeRequiredProp)(Date),
  showMark: Boolean,
  rowHeight: import_utils.numericProp,
  formatter: Function,
  lazyRender: Boolean,
  currentDate: [Date, Array],
  allowSameDay: Boolean,
  showSubtitle: Boolean,
  showMonthTitle: Boolean,
  firstDayOfWeek: Number
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: calendarMonthProps,
  emits: ["click"],
  setup(props, {
    emit,
    slots
  }) {
    const [visible, setVisible] = (0, import_use.useToggle)();
    const daysRef = (0, import_vue2.ref)();
    const monthRef = (0, import_vue2.ref)();
    const height = (0, import_use_height.useHeight)(monthRef);
    const title = (0, import_vue2.computed)(() => (0, import_utils3.formatMonthTitle)(props.date));
    const rowHeight = (0, import_vue2.computed)(() => (0, import_utils.addUnit)(props.rowHeight));
    const offset = (0, import_vue2.computed)(() => {
      const realDay = props.date.getDay();
      if (props.firstDayOfWeek) {
        return (realDay + 7 - props.firstDayOfWeek) % 7;
      }
      return realDay;
    });
    const totalDay = (0, import_vue2.computed)(() => (0, import_utils2.getMonthEndDay)(props.date.getFullYear(), props.date.getMonth() + 1));
    const shouldRender = (0, import_vue2.computed)(() => visible.value || !props.lazyRender);
    const getTitle = () => title.value;
    const getMultipleDayType = (day) => {
      const isSelected = (date) => props.currentDate.some((item) => (0, import_utils3.compareDay)(item, date) === 0);
      if (isSelected(day)) {
        const prevDay = (0, import_utils3.getPrevDay)(day);
        const nextDay = (0, import_utils3.getNextDay)(day);
        const prevSelected = isSelected(prevDay);
        const nextSelected = isSelected(nextDay);
        if (prevSelected && nextSelected) {
          return "multiple-middle";
        }
        if (prevSelected) {
          return "end";
        }
        if (nextSelected) {
          return "start";
        }
        return "multiple-selected";
      }
      return "";
    };
    const getRangeDayType = (day) => {
      const [startDay, endDay] = props.currentDate;
      if (!startDay) {
        return "";
      }
      const compareToStart = (0, import_utils3.compareDay)(day, startDay);
      if (!endDay) {
        return compareToStart === 0 ? "start" : "";
      }
      const compareToEnd = (0, import_utils3.compareDay)(day, endDay);
      if (props.allowSameDay && compareToStart === 0 && compareToEnd === 0) {
        return "start-end";
      }
      if (compareToStart === 0) {
        return "start";
      }
      if (compareToEnd === 0) {
        return "end";
      }
      if (compareToStart > 0 && compareToEnd < 0) {
        return "middle";
      }
      return "";
    };
    const getDayType = (day) => {
      const {
        type,
        minDate,
        maxDate,
        currentDate
      } = props;
      if ((0, import_utils3.compareDay)(day, minDate) < 0 || (0, import_utils3.compareDay)(day, maxDate) > 0) {
        return "disabled";
      }
      if (currentDate === null) {
        return "";
      }
      if (Array.isArray(currentDate)) {
        if (type === "multiple") {
          return getMultipleDayType(day);
        }
        if (type === "range") {
          return getRangeDayType(day);
        }
      } else if (type === "single") {
        return (0, import_utils3.compareDay)(day, currentDate) === 0 ? "selected" : "";
      }
      return "";
    };
    const getBottomInfo = (dayType) => {
      if (props.type === "range") {
        if (dayType === "start" || dayType === "end") {
          return (0, import_utils3.t)(dayType);
        }
        if (dayType === "start-end") {
          return `${(0, import_utils3.t)("start")}/${(0, import_utils3.t)("end")}`;
        }
      }
    };
    const renderTitle = () => {
      if (props.showMonthTitle) {
        return (0, import_vue.createVNode)("div", {
          "class": (0, import_utils3.bem)("month-title")
        }, [slots["month-title"] ? slots["month-title"]({
          date: props.date,
          text: title.value
        }) : title.value]);
      }
    };
    const renderMark = () => {
      if (props.showMark && shouldRender.value) {
        return (0, import_vue.createVNode)("div", {
          "class": (0, import_utils3.bem)("month-mark")
        }, [props.date.getMonth() + 1]);
      }
    };
    const placeholders = (0, import_vue2.computed)(() => {
      const count = Math.ceil((totalDay.value + offset.value) / 7);
      return Array(count).fill({
        type: "placeholder"
      });
    });
    const days = (0, import_vue2.computed)(() => {
      const days2 = [];
      const year = props.date.getFullYear();
      const month = props.date.getMonth();
      for (let day = 1; day <= totalDay.value; day++) {
        const date = new Date(year, month, day);
        const type = getDayType(date);
        let config = {
          date,
          type,
          text: day,
          bottomInfo: getBottomInfo(type)
        };
        if (props.formatter) {
          config = props.formatter(config);
        }
        days2.push(config);
      }
      return days2;
    });
    const disabledDays = (0, import_vue2.computed)(() => days.value.filter((day) => day.type === "disabled"));
    const scrollToDate = (body, targetDate) => {
      if (daysRef.value) {
        const daysRect = (0, import_use.useRect)(daysRef.value);
        const totalRows = placeholders.value.length;
        const currentRow = Math.ceil((targetDate.getDate() + offset.value) / 7);
        const rowOffset = (currentRow - 1) * daysRect.height / totalRows;
        (0, import_utils.setScrollTop)(body, daysRect.top + rowOffset + body.scrollTop - (0, import_use.useRect)(body).top);
      }
    };
    const renderDay = (item, index) => (0, import_vue.createVNode)(import_CalendarDay.default, {
      "item": item,
      "index": index,
      "color": props.color,
      "offset": offset.value,
      "rowHeight": rowHeight.value,
      "onClick": (item2) => emit("click", item2)
    }, (0, import_utils.pick)(slots, ["top-info", "bottom-info"]));
    const renderDays = () => (0, import_vue.createVNode)("div", {
      "ref": daysRef,
      "role": "grid",
      "class": (0, import_utils3.bem)("days")
    }, [renderMark(), (shouldRender.value ? days : placeholders).value.map(renderDay)]);
    (0, import_use_expose.useExpose)({
      getTitle,
      getHeight: () => height.value,
      setVisible,
      scrollToDate,
      disabledDays
    });
    return () => (0, import_vue.createVNode)("div", {
      "class": (0, import_utils3.bem)("month"),
      "ref": monthRef
    }, [renderTitle(), renderDays()]);
  }
});
