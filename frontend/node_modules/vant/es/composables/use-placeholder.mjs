import { createVNode as _createVNode } from "vue";
import { useHeight } from "./use-height.mjs";
function usePlaceholder(contentRef, bem) {
  const height = useHeight(contentRef, true);
  return (renderContent) => _createVNode("div", {
    "class": bem("placeholder"),
    "style": {
      height: height.value ? `${height.value}px` : void 0
    }
  }, [renderContent()]);
}
export {
  usePlaceholder
};
