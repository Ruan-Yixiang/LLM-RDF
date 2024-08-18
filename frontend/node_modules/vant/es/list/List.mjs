import { createVNode as _createVNode } from "vue";
import { ref, watch, nextTick, onUpdated, onMounted, defineComponent } from "vue";
import { isHidden, truthProp, makeStringProp, makeNumericProp, createNamespace } from "../utils/index.mjs";
import { useRect, useScrollParent, useEventListener } from "@vant/use";
import { useExpose } from "../composables/use-expose.mjs";
import { useTabStatus } from "../composables/use-tab-status.mjs";
import { Loading } from "../loading/index.mjs";
const [name, bem, t] = createNamespace("list");
const listProps = {
  error: Boolean,
  offset: makeNumericProp(300),
  loading: Boolean,
  disabled: Boolean,
  finished: Boolean,
  errorText: String,
  direction: makeStringProp("down"),
  loadingText: String,
  finishedText: String,
  immediateCheck: truthProp
};
var stdin_default = defineComponent({
  name,
  props: listProps,
  emits: ["load", "update:error", "update:loading"],
  setup(props, {
    emit,
    slots
  }) {
    const loading = ref(props.loading);
    const root = ref();
    const placeholder = ref();
    const tabStatus = useTabStatus();
    const scrollParent = useScrollParent(root);
    const check = () => {
      nextTick(() => {
        if (loading.value || props.finished || props.disabled || props.error || // skip check when inside an inactive tab
        (tabStatus == null ? void 0 : tabStatus.value) === false) {
          return;
        }
        const {
          direction
        } = props;
        const offset = +props.offset;
        const scrollParentRect = useRect(scrollParent);
        if (!scrollParentRect.height || isHidden(root)) {
          return;
        }
        let isReachEdge = false;
        const placeholderRect = useRect(placeholder);
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
          return _createVNode("div", {
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
          return _createVNode("div", {
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
        return _createVNode("div", {
          "class": bem("loading")
        }, [slots.loading ? slots.loading() : _createVNode(Loading, {
          "class": bem("loading-icon")
        }, {
          default: () => [props.loadingText || t("loading")]
        })]);
      }
    };
    watch(() => [props.loading, props.finished, props.error], check);
    if (tabStatus) {
      watch(tabStatus, (tabActive) => {
        if (tabActive) {
          check();
        }
      });
    }
    onUpdated(() => {
      loading.value = props.loading;
    });
    onMounted(() => {
      if (props.immediateCheck) {
        check();
      }
    });
    useExpose({
      check
    });
    useEventListener("scroll", check, {
      target: scrollParent,
      passive: true
    });
    return () => {
      var _a;
      const Content = (_a = slots.default) == null ? void 0 : _a.call(slots);
      const Placeholder = _createVNode("div", {
        "ref": placeholder,
        "class": bem("placeholder")
      }, null);
      return _createVNode("div", {
        "ref": root,
        "role": "feed",
        "class": bem(),
        "aria-busy": loading.value
      }, [props.direction === "down" ? Content : Placeholder, renderLoading(), renderFinishedText(), renderErrorText(), props.direction === "up" ? Content : Placeholder]);
    };
  }
});
export {
  stdin_default as default,
  listProps
};
