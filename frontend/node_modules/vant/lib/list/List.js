var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stdin_exports = {};
__export(stdin_exports, {
  default: () => stdin_default,
  listProps: () => listProps
});
module.exports = __toCommonJS(stdin_exports);
var import_vue = require("vue");
var import_vue2 = require("vue");
var import_utils = require("../utils");
var import_use = require("@vant/use");
var import_use_expose = require("../composables/use-expose");
var import_use_tab_status = require("../composables/use-tab-status");
var import_loading = require("../loading");
const [name, bem, t] = (0, import_utils.createNamespace)("list");
const listProps = {
  error: Boolean,
  offset: (0, import_utils.makeNumericProp)(300),
  loading: Boolean,
  disabled: Boolean,
  finished: Boolean,
  errorText: String,
  direction: (0, import_utils.makeStringProp)("down"),
  loadingText: String,
  finishedText: String,
  immediateCheck: import_utils.truthProp
};
var stdin_default = (0, import_vue2.defineComponent)({
  name,
  props: listProps,
  emits: ["load", "update:error", "update:loading"],
  setup(props, {
    emit,
    slots
  }) {
    const loading = (0, import_vue2.ref)(props.loading);
    const root = (0, import_vue2.ref)();
    const placeholder = (0, import_vue2.ref)();
    const tabStatus = (0, import_use_tab_status.useTabStatus)();
    const scrollParent = (0, import_use.useScrollParent)(root);
    const check = () => {
      (0, import_vue2.nextTick)(() => {
        if (loading.value || props.finished || props.disabled || props.error || // skip check when inside an inactive tab
        (tabStatus == null ? void 0 : tabStatus.value) === false) {
          return;
        }
        const {
          direction
        } = props;
        const offset = +props.offset;
        const scrollParentRect = (0, import_use.useRect)(scrollParent);
        if (!scrollParentRect.height || (0, import_utils.isHidden)(root)) {
          return;
        }
        let isReachEdge = false;
        const placeholderRect = (0, import_use.useRect)(placeholder);
        if (direction === "up") {
          isReachEdge = scrollParentRect.top - placeholderRect.top <= offset;
        } else {
          isReachEdge = placeholderRect.bottom - scrollParentRect.bottom <= offset;
        }
        if (isReachEdge) {
          loading.value = true;
          emit("update:loading", true);
          emit("load");
        }
      });
    };
    const renderFinishedText = () => {
      if (props.finished) {
        const text = slots.finished ? slots.finished() : props.finishedText;
        if (text) {
          return (0, import_vue.createVNode)("div", {
            "class": bem("finished-text")
          }, [text]);
        }
      }
    };
    const clickErrorText = () => {
      emit("update:error", false);
      check();
    };
    const renderErrorText = () => {
      if (props.error) {
        const text = slots.error ? slots.error() : props.errorText;
        if (text) {
          return (0, import_vue.createVNode)("div", {
            "role": "button",
            "class": bem("error-text"),
            "tabindex": 0,
            "onClick": clickErrorText
          }, [text]);
        }
      }
    };
    const renderLoading = () => {
      if (loading.value && !props.finished && !props.disabled) {
        return (0, import_vue.createVNode)("div", {
          "class": bem("loading")
        }, [slots.loading ? slots.loading() : (0, import_vue.createVNode)(import_loading.Loading, {
          "class": bem("loading-icon")
        }, {
          default: () => [props.loadingText || t("loading")]
        })]);
      }
    };
    (0, import_vue2.watch)(() => [props.loading, props.finished, props.error], check);
    if (tabStatus) {
      (0, import_vue2.watch)(tabStatus, (tabActive) => {
        if (tabActive) {
          check();
        }
      });
    }
    (0, import_vue2.onUpdated)(() => {
      loading.value = props.loading;
    });
    (0, import_vue2.onMounted)(() => {
      if (props.immediateCheck) {
        check();
      }
    });
    (0, import_use_expose.useExpose)({
      check
    });
    (0, import_use.useEventListener)("scroll", check, {
      target: scrollParent,
      passive: true
    });
    return () => {
      var _a;
      const Content = (_a = slots.default) == null ? void 0 : _a.call(slots);
      const Placeholder = (0, import_vue.createVNode)("div", {
        "ref": placeholder,
        "class": bem("placeholder")
      }, null);
      return (0, import_vue.createVNode)("div", {
        "ref": root,
        "role": "feed",
        "class": bem(),
        "aria-busy": loading.value
      }, [props.direction === "down" ? Content : Placeholder, renderLoading(), renderFinishedText(), renderErrorText(), props.direction === "up" ? Content : Placeholder]);
    };
  }
});
