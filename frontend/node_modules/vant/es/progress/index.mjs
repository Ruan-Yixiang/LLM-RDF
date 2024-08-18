import { withInstall } from "../utils/index.mjs";
import _Progress from "./Progress.mjs";
const Progress = withInstall(_Progress);
var stdin_default = Progress;
import { progressProps } from "./Progress.mjs";
export {
  Progress,
  stdin_default as default,
  progressProps
};
