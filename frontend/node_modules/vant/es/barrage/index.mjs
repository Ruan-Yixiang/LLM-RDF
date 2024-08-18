import { withInstall } from "../utils/index.mjs";
import _Barrage from "./Barrage.mjs";
const Barrage = withInstall(_Barrage);
var stdin_default = Barrage;
import { barrageProps } from "./Barrage.mjs";
export {
  Barrage,
  barrageProps,
  stdin_default as default
};
