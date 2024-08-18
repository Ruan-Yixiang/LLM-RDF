import { ref, reactive } from "vue";
import { deepAssign } from "../utils/deep-assign.mjs";
import defaultMessages from "./lang/zh-CN.mjs";
const lang = ref("zh-CN");
const messages = reactive({
  "zh-CN": defaultMessages
});
const Locale = {
  messages() {
    return messages[lang.value];
  },
  use(newLang, newMessages) {
    lang.value = newLang;
    this.add({ [newLang]: newMessages });
  },
  add(newMessages = {}) {
    deepAssign(messages, newMessages);
  }
};
const useCurrentLang = () => lang;
var stdin_default = Locale;
export {
  Locale,
  stdin_default as default,
  useCurrentLang
};
