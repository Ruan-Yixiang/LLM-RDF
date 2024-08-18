import _Symbol from "core-js/library/fn/symbol/index.js";
import _Symbol$hasInstance from "core-js/library/fn/symbol/has-instance.js";
export default function _instanceof(left, right) {
  if (right != null && typeof _Symbol !== "undefined" && right[_Symbol$hasInstance]) {
    return !!right[_Symbol$hasInstance](left);
  } else {
    return left instanceof right;
  }
}