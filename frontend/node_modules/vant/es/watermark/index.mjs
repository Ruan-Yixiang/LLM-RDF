import { withInstall } from "../utils/index.mjs";
import _Watermark from "./Watermark.mjs";
const Watermark = withInstall(_Watermark);
var stdin_default = Watermark;
import { watermarkProps } from "./Watermark.mjs";
export {
  Watermark,
  stdin_default as default,
  watermarkProps
};
