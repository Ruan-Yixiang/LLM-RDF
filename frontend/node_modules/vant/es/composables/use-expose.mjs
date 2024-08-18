import { getCurrentInstance } from "vue";
import { extend } from "../utils/index.mjs";
function useExpose(apis) {
  const instance = getCurrentInstance();
  if (instance) {
    extend(instance.proxy, apis);
  }
}
export {
  useExpose
};
