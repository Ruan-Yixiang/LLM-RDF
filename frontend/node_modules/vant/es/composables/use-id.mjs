import { getCurrentInstance } from "vue";
let current = 0;
function useId() {
  const vm = getCurrentInstance();
  const { name = "unknown" } = (vm == null ? void 0 : vm.type) || {};
  if (process.env.NODE_ENV === "test") {
    return name;
  }
  return `${name}-${++current}`;
}
export {
  useId
};
