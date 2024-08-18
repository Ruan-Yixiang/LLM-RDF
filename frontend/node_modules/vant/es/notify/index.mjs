import { withInstall } from "../utils/index.mjs";
import _Notify from "./Notify.mjs";
const Notify = withInstall(_Notify);
var stdin_default = Notify;
import { notifyProps } from "./Notify.mjs";
import {
  showNotify,
  closeNotify,
  setNotifyDefaultOptions,
  resetNotifyDefaultOptions
} from "./function-call.mjs";
export {
  Notify,
  closeNotify,
  stdin_default as default,
  notifyProps,
  resetNotifyDefaultOptions,
  setNotifyDefaultOptions,
  showNotify
};
