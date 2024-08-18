import { withInstall } from "../utils/index.mjs";
import _Search from "./Search.mjs";
const Search = withInstall(_Search);
var stdin_default = Search;
import { searchProps } from "./Search.mjs";
export {
  Search,
  stdin_default as default,
  searchProps
};
