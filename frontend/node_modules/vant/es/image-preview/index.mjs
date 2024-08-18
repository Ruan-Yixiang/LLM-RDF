import { withInstall } from "../utils/index.mjs";
import _ImagePreview from "./ImagePreview.mjs";
const ImagePreview = withInstall(_ImagePreview);
var stdin_default = ImagePreview;
import { imagePreviewProps } from "./ImagePreview.mjs";
import { showImagePreview } from "./function-call.mjs";
export {
  ImagePreview,
  stdin_default as default,
  imagePreviewProps,
  showImagePreview
};
