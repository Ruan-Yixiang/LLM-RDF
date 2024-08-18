let globalZIndex = 2e3;
const useGlobalZIndex = () => ++globalZIndex;
const setGlobalZIndex = (val) => {
  globalZIndex = val;
};
export {
  setGlobalZIndex,
  useGlobalZIndex
};
