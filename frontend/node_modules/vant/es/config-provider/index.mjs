import { withInstall } from "../utils/index.mjs";
import _ConfigProvider from "./ConfigProvider.mjs";
const ConfigProvider = withInstall(_ConfigProvider);
var stdin_default = ConfigProvider;
import { configProviderProps } from "./ConfigProvider.mjs";
export {
  ConfigProvider,
  configProviderProps,
  stdin_default as default
};
