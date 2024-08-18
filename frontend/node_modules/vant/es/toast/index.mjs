import { withInstall } from "../utils/index.mjs";
import _Toast from "./Toast.mjs";
const Toast = withInstall(_Toast);
var stdin_default = Toast;
import { toastProps } from "./Toast.mjs";
import {
  showToast,
  closeToast,
  showFailToast,
  showLoadingToast,
  showSuccessToast,
  allowMultipleToast,
  setToastDefaultOptions,
  resetToastDefaultOptions
} from "./function-call.mjs";
export {
  Toast,
  allowMultipleToast,
  closeToast,
  stdin_default as default,
  resetToastDefaultOptions,
  setToastDefaultOptions,
  showFailToast,
  showLoadingToast,
  showSuccessToast,
  showToast,
  toastProps
};
