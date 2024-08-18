import { withInstall } from "../utils/index.mjs";
import _Stepper from "./Stepper.mjs";
const Stepper = withInstall(_Stepper);
var stdin_default = Stepper;
import { stepperProps } from "./Stepper.mjs";
export {
  Stepper,
  stdin_default as default,
  stepperProps
};
