import { withInstall } from "../utils/index.mjs";
import _Uploader from "./Uploader.mjs";
const Uploader = withInstall(_Uploader);
var stdin_default = Uploader;
import { uploaderProps } from "./Uploader.mjs";
export {
  Uploader,
  stdin_default as default,
  uploaderProps
};
