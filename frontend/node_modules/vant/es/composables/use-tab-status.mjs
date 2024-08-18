import { inject } from "vue";
const TAB_STATUS_KEY = Symbol();
const useTabStatus = () => inject(TAB_STATUS_KEY, null);
export {
  TAB_STATUS_KEY,
  useTabStatus
};
