import { withInstall } from "../utils/index.mjs";
import _Dialog from "./Dialog.mjs";
const Dialog = withInstall(_Dialog);
var stdin_default = Dialog;
import { dialogProps } from "./Dialog.mjs";
import {
  showDialog,
  closeDialog,
  showConfirmDialog,
  setDialogDefaultOptions,
  resetDialogDefaultOptions
} from "./function-call.mjs";
export {
  Dialog,
  closeDialog,
  stdin_default as default,
  dialogProps,
  resetDialogDefaultOptions,
  setDialogDefaultOptions,
  showConfirmDialog,
  showDialog
};
