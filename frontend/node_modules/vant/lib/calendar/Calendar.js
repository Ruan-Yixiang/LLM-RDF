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
  calendarProps: () => calendarProps,
  default: () => stdin_default
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_utils2 = require("./utils");
var import_use = require("@vant/use");
var import_use_refs = require("../composables/use-refs");
var import_use_expose = require("../composables/use-expose");
var import_popup = require("../popup");
var import_button = require("../button");
var import_toast = require("../toast");
var import_CalendarMonth = __toESM(require("./CalendarMonth"));
var import_CalendarHeader = __toESM(require("./CalendarHeader"));
const calendarProps = {
  show: Boolean,
  type: (0, import_utils.makeStringProp)("single"),
  title: String,
  color: String,
  round: import_utils.truthProp,
  readonly: Boolean,
  poppable: import_utils.truthProp,
  maxRange: (0, import_utils.makeNumericProp)(null),
  position: (0, import_utils.makeStringProp)("bottom"),
  teleport: [String, Object],
  showMark: import_utils.truthProp,
  showTitle: import_utils.truthProp,
  formatter: Function,
  rowHeight: import_utils.numericProp,
  confirmText: String,
  rangePrompt: String,
  lazyRender: import_utils.truthProp,
  showConfirm: import_utils.truthProp,
  defaultDate: [Date, Array],
  allowSameDay: Boolean,
  showSubtitle: import_utils.truthProp,
  closeOnPopstate: import_utils.truthProp,
  showRangePrompt: import_utils.truthProp,
  confirmDisabledText: String,
  closeOnClickOverlay: import_utils.truthProp,
  safeAreaInsetTop: Boolean,
  safeAreaInsetBottom: import_utils.truthProp,
  minDate: {
    type: Date,
    validator: import_utils.isDate,
    default: import_utils2.getToday
  },
  maxDate: {
    type: Date,
    validator: import_utils.isDate,
    default: () => {
      const now = (0, import_utils2.getToday)();
      return new Date(now.getFullYear(), now.getMonth() + 6, now.getDate());
    }
  },
  firstDayOfWeek: {
    type: import_utils.numericProp,
    default: 0,
    validator: (val) => val >= 0 && val <= 6
  }
};
var stdin_default = (0, import_vue2.defineComponent)({
  name: import_utils2.name,
  props: calendarProps,
  emits: ["select", "confirm", "unselect", "monthShow", "overRange", "update:show", "clickSubtitle"],
  setup(props, {
    emit,
    slots
  }) {
    const limitDateRange = (date, minDate = props.minDate, maxDate = props.maxDate) => {
      if ((0, import_utils2.compareDay)(date, minDate) === -1) {
        return minDate;
      }
      if ((0, import_utils2.compareDay)(date, maxDate) === 1) {
        return maxDate;
      }
      return date;
    };
    const getInitialDate = (defaultDate = props.defaultDate) => {
      const {
        type,
        minDate,
        maxDate,
        allowSameDay
      } = props;
      if (defaultDate === null) {
        return defaultDate;
      }
      const now = (0, import_utils2.getToday)();
      if (type === "range") {
        if (!Array.isArray(defaultDate)) {
          defaultDate = [];
        }
        const start = limitDateRange(defaultDate[0] || now, minDate, allowSameDay ? maxDate : (0, import_utils2.getPrevDay)(maxDate));
        const end = limitDateRange(defaultDate[1] || now, allowSameDay ? minDate : (0, import_utils2.getNextDay)(minDate));
        return [start, end];
      }
      if (type === "multiple") {
        if (Array.isArray(defaultDate)) {
          return defaultDate.map((date) => limitDateRange(date));
        }
        return [limitDateRange(now)];
      }
      if (!defaultDate || Array.isArray(defaultDate)) {
        defaultDate = now;
      }
      return limitDateRange(defaultDate);
    };
    let bodyHeight;
    const bodyRef = (0, import_vue2.ref)();
    const subtitle = (0, import_vue2.ref)({
      text: "",
      date: void 0
    });
    const currentDate = (0, import_vue2.ref)(getInitialDate());
    const [monthRefs, setMonthRefs] = (0, import_use_refs.useRefs)();
    const dayOffset = (0, import_vue2.computed)(() => props.firstDayOfWeek ? +props.firstDayOfWeek % 7 : 0);
    const months = (0, import_vue2.computed)(() => {
      const months2 = [];
      const cursor = new Date(props.minDate);
      cursor.setDate(1);
      do {
        months2.push(new Date(cursor));
        cursor.setMonth(cursor.getMonth() + 1);
      } while ((0, import_utils2.compareMonth)(cursor, props.maxDate) !== 1);
      return months2;
    });
    const buttonDisabled = (0, import_vue2.computed)(() => {
      if (currentDate.value) {
        if (props.type === "range") {
          return !currentDate.value[0] || !currentDate.value[1];
        }
        if (props.type === "multiple") {
          return !currentDate.value.length;
        }
      }
      return !currentDate.value;
    });
    const getSelectedDate = () => currentDate.value;
    const onScroll = () => {
      const top = (0, import_utils.getScrollTop)(bodyRef.value);
      const bottom = top + bodyHeight;
      const heights = months.value.map((item, index) => monthRefs.value[index].getHeight());
      const heightSum = heights.reduce((a, b) => a + b, 0);
      if (bottom > heightSum && top > 0) {
        return;
      }
      let height = 0;
      let currentMonth;
      const visibleRange = [-1, -1];
      for (let i = 0; i < months.value.length; i++) {
        const month = monthRefs.value[i];
        const visible = height <= bottom && height + heights[i] >= top;
        if (visible) {
          visibleRange[1] = i;
          if (!currentMonth) {
            currentMonth = month;
            visibleRange[0] = i;
          }
          if (!monthRefs.value[i].showed) {
            monthRefs.value[i].showed = true;
            emit("monthShow", {
              date: month.date,
              title: month.getTitle()
            });
          }
        }
        height += heights[i];
      }
      months.value.forEach((month, index) => {
        const visible = index >= visibleRange[0] - 1 && index <= visibleRange[1] + 1;
        monthRefs.value[index].setVisible(visible);
      });
      if (currentMonth) {
        subtitle.value = {
          text: currentMonth.getTitle(),
          date: currentMonth.date
        };
      }
    };
    const scrollToDate = (targetDate) => {
      (0, import_use.raf)(() => {
        months.value.some((month, index) => {
          if ((0, import_utils2.compareMonth)(month, targetDate) === 0) {
            if (bodyRef.value) {
              monthRefs.value[index].scrollToDate(bodyRef.value, targetDate);
            }
            return true;
          }
          return false;
        });
        onScroll();
      });
    };
    const scrollToCurrentDate = () => {
      if (props.poppable && !props.show) {
        return;
      }
      if (currentDate.value) {
        const targetDate = props.type === "single" ? currentDate.value : currentDate.value[0];
        if ((0, import_utils.isDate)(targetDate)) {
          scrollToDate(targetDate);
        }
      } else {
        (0, import_use.raf)(onScroll);
      }
    };
    const init = () => {
      if (props.poppable && !props.show) {
        return;
      }
      (0, import_use.raf)(() => {
        bodyHeight = Math.floor((0, import_use.useRect)(bodyRef).height);
      });
      scrollToCurrentDate();
    };
    const reset = (date = getInitialDate()) => {
      currentDate.value = date;
      scrollToCurrentDate();
    };
    const checkRange = (date) => {
      const {
        maxRange,
        rangePrompt,
        showRangePrompt
      } = props;
      if (maxRange && (0, import_utils2.calcDateNum)(date) > +maxRange) {
        if (showRangePrompt) {
          (0, import_toast.showToast)(rangePrompt || (0, import_utils2.t)("rangePrompt", maxRange));
        }
        emit("overRange");
        return false;
      }
      return true;
    };
    const onConfirm = () => {
      var _a;
      return emit("confirm", (_a = currentDate.value) != null ? _a : (0, import_utils2.cloneDates)(currentDate.value));
    };
    const select = (date, complete) => {
      const setCurrentDate = (date2) => {
        currentDate.value = date2;
        emit("select", (0, import_utils2.cloneDates)(date2));
      };
      if (complete && props.type === "range") {
        const valid = checkRange(date);
        if (!valid) {
          setCurrentDate([date[0], (0, import_utils2.getDayByOffset)(date[0], +props.maxRange - 1)]);
          return;
        }
      }
      setCurrentDate(date);
      if (complete && !props.showConfirm) {
        onConfirm();
      }
    };
    const getDisabledDate = (disabledDays2, startDay, date) => {
      var _a;
      return (_a = disabledDays2.find((day) => (0, import_utils2.compareDay)(startDay, day.date) === -1 && (0, import_utils2.compareDay)(day.date, date) === -1)) == null ? void 0 : _a.date;
    };
    const disabledDays = (0, import_vue2.computed)(() => monthRefs.value.reduce((arr, ref2) => {
      var _a, _b;
      arr.push(...(_b = (_a = ref2.disabledDays) == null ? void 0 : _a.value) != null ? _b : []);
      return arr;
    }, []));
    const onClickDay = (item) => {
      if (props.readonly || !item.date) {
        return;
      }
      const {
        date
      } = item;
      const {
        type
      } = props;
      if (type === "range") {
        if (!currentDate.value) {
          select([date]);
          return;
        }
        const [startDay, endDay] = currentDate.value;
        if (startDay && !endDay) {
          const compareToStart = (0, import_utils2.compareDay)(date, startDay);
          if (compareToStart === 1) {
            const disabledDay = getDisabledDate(disabledDays.value, startDay, date);
            if (disabledDay) {
              const endDay2 = (0, import_utils2.getPrevDay)(disabledDay);
              if ((0, import_utils2.compareDay)(startDay, endDay2) === -1) {
                select([startDay, endDay2]);
              } else {
                select([date]);
              }
            } else {
              select([startDay, date], true);
            }
          } else if (compareToStart === -1) {
            select([date]);
          } else if (props.allowSameDay) {
            select([date, date], true);
          }
        } else {
          select([date]);
        }
      } else if (type === "multiple") {
        if (!currentDate.value) {
          select([date]);
          return;
        }
        const dates = currentDate.value;
        const selectedIndex = dates.findIndex((dateItem) => (0, import_utils2.compareDay)(dateItem, date) === 0);
        if (selectedIndex !== -1) {
          const [unselectedDate] = dates.splice(selectedIndex, 1);
          emit("unselect", (0, import_utils2.cloneDate)(unselectedDate));
        } else if (props.maxRange && dates.length >= +props.maxRange) {
          (0, import_toast.showToast)(props.rangePrompt || (0, import_utils2.t)("rangePrompt", props.maxRange));
        } else {
          select([...dates, date]);
        }
      } else {
        select(date, true);
      }
    };
    const updateShow = (value) => emit("update:show", value);
    const renderMonth = (date, index) => {
      const showMonthTitle = index !== 0 || !props.showSubtitle;
      return (0, import_vue.createVNode)(import_CalendarMonth.default, (0, import_vue.mergeProps)({
        "ref": setMonthRefs(index),
        "date": date,
        "currentDate": currentDate.value,
        "showMonthTitle": showMonthTitle,
        "firstDayOfWeek": dayOffset.value
      }, (0, import_utils.pick)(props, ["type", "color", "minDate", "maxDate", "showMark", "formatter", "rowHeight", "lazyRender", "showSubtitle", "allowSameDay"]), {
        "onClick": onClickDay
      }), (0, import_utils.pick)(slots, ["top-info", "bottom-info", "month-title"]));
    };
    const renderFooterButton = () => {
      if (slots.footer) {
        return slots.footer();
      }
      if (props.showConfirm) {
        const slot = slots["confirm-text"];
        const disabled = buttonDisabled.value;
        const text = disabled ? props.confirmDisabledText : props.confirmText;
        return (0, import_vue.createVNode)(import_button.Button, {
          "round": true,
          "block": true,
          "type": "primary",
          "color": props.color,
          "class": (0, import_utils2.bem)("confirm"),
          "disabled": disabled,
          "nativeType": "button",
          "onClick": onConfirm
        }, {
          default: () => [slot ? slot({
            disabled
          }) : text || (0, import_utils2.t)("confirm")]
        });
      }
    };
    const renderFooter = () => (0, import_vue.createVNode)("div", {
      "class": [(0, import_utils2.bem)("footer"), {
        "van-safe-area-bottom": props.safeAreaInsetBottom
      }]
    }, [renderFooterButton()]);
    const renderCalendar = () => (0, import_vue.createVNode)("div", {
      "class": (0, import_utils2.bem)()
    }, [(0, import_vue.createVNode)(import_CalendarHeader.default, {
      "date": subtitle.value.date,
      "title": props.title,
      "subtitle": subtitle.value.text,
      "showTitle": props.showTitle,
      "showSubtitle": props.showSubtitle,
      "firstDayOfWeek": dayOffset.value,
      "onClickSubtitle": (event) => emit("clickSubtitle", event)
    }, (0, import_utils.pick)(slots, ["title", "subtitle"])), (0, import_vue.createVNode)("div", {
      "ref": bodyRef,
      "class": (0, import_utils2.bem)("body"),
      "onScroll": onScroll
    }, [months.value.map(renderMonth)]), renderFooter()]);
    (0, import_vue2.watch)(() => props.show, init);
    (0, import_vue2.watch)(() => [props.type, props.minDate, props.maxDate], () => reset(getInitialDate(currentDate.value)));
    (0, import_vue2.watch)(() => props.defaultDate, (value = null) => {
      currentDate.value = value;
      scrollToCurrentDate();
    });
    (0, import_use_expose.useExpose)({
      reset,
      scrollToDate,
      getSelectedDate
    });
    (0, import_use.onMountedOrActivated)(init);
    return () => {
      if (props.poppable) {
        return (0, import_vue.createVNode)(import_popup.Popup, {
          "show": props.show,
          "class": (0, import_utils2.bem)("popup"),
          "round": props.round,
          "position": props.position,
          "closeable": props.showTitle || props.showSubtitle,
          "teleport": props.teleport,
          "closeOnPopstate": props.closeOnPopstate,
          "safeAreaInsetTop": props.safeAreaInsetTop,
          "closeOnClickOverlay": props.closeOnClickOverlay,
          "onUpdate:show": updateShow
        }, {
          default: renderCalendar
        });
      }
      return renderCalendar();
    };
  }
});
