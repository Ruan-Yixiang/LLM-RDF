import { withInstall } from "../utils/index.mjs";
import _CountDown from "./CountDown.mjs";
const CountDown = withInstall(_CountDown);
var stdin_default = CountDown;
import { countDownProps } from "./CountDown.mjs";
export {
  CountDown,
  countDownProps,
  stdin_default as default
};
