import { ref, watch } from "vue";
const useSyncPropRef = (getProp, setProp) => {
  const propRef = ref(getProp());
  watch(getProp, (value) => {
    if (value !== propRef.value) {
      propRef.value = value;
    }
  });
  watch(propRef, (value) => {
    if (value !== getProp()) {
      setProp(value);
    }
  });
  return propRef;
};
export {
  useSyncPropRef
};
