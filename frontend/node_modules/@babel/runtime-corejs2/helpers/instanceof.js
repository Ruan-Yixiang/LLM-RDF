var _Symbol = require("core-js/library/fn/symbol/index.js");
var _Symbol$hasInstance = require("core-js/library/fn/symbol/has-instance.js");
function _instanceof(left, right) {
  if (right != null && typeof _Symbol !== "undefined" && right[_Symbol$hasInstance]) {
    return !!right[_Symbol$hasInstance](left);
  } else {
    return left instanceof right;
  }
}
module.exports = _instanceof, module.exports.__esModule = true, module.exports["default"] = module.exports;