import { useRect } from "@vant/use";
import { ref, onMounted, nextTick, watch } from "vue";
import { windowHeight, windowWidth } from "../utils/index.mjs";
import { onPopupReopen } from "./on-popup-reopen.mjs";
const useHeight = (element, withSafeArea) => {
  const height = ref();
  const setHeight = () => {
    height.value = useRect(element).height;
  };
  onMounted(() => {
    nextTick(setHeight);
    if (withSafeArea) {
      for (let i = 1; i <= 3; i++) {
        setTimeout(setHeight, 100 * i);
      }
    }
  });
  onPopupReopen(() => nextTick(setHeight));
  watch([windowWidth, windowHeight], setHeight);
  return height;
};
export {
  useHeight
};
