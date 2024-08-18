import { withInstall } from "../utils/index.mjs";
import _SubmitBar from "./SubmitBar.mjs";
const SubmitBar = withInstall(_SubmitBar);
var stdin_default = SubmitBar;
import { submitBarProps } from "./SubmitBar.mjs";
export {
  SubmitBar,
  stdin_default as default,
  submitBarProps
};
