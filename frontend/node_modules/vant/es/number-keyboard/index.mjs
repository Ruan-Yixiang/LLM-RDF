import { withInstall } from "../utils/index.mjs";
import _NumberKeyboard from "./NumberKeyboard.mjs";
const NumberKeyboard = withInstall(_NumberKeyboard);
var stdin_default = NumberKeyboard;
import { numberKeyboardProps } from "./NumberKeyboard.mjs";
export {
  NumberKeyboard,
  stdin_default as default,
  numberKeyboardProps
};
