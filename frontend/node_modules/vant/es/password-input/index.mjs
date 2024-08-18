import { withInstall } from "../utils/index.mjs";
import _PasswordInput from "./PasswordInput.mjs";
const PasswordInput = withInstall(_PasswordInput);
var stdin_default = PasswordInput;
import { passwordInputProps } from "./PasswordInput.mjs";
export {
  PasswordInput,
  stdin_default as default,
  passwordInputProps
};
