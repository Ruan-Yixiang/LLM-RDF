import { withInstall } from "../utils/index.mjs";
import _Overlay from "./Overlay.mjs";
const Overlay = withInstall(_Overlay);
var stdin_default = Overlay;
import { overlayProps } from "./Overlay.mjs";
export {
  Overlay,
  stdin_default as default,
  overlayProps
};
