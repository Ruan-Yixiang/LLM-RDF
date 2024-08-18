import { withInstall } from "../utils/index.mjs";
import _Cell from "./Cell.mjs";
const Cell = withInstall(_Cell);
var stdin_default = Cell;
import { cellProps } from "./Cell.mjs";
export {
  Cell,
  cellProps,
  stdin_default as default
};
