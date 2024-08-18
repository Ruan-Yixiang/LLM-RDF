import _Object$freeze from "core-js/library/fn/object/freeze.js";
import _Object$defineProperties from "core-js/library/fn/object/define-properties.js";
export default function _taggedTemplateLiteral(strings, raw) {
  if (!raw) {
    raw = strings.slice(0);
  }
  return _Object$freeze(_Object$defineProperties(strings, {
    raw: {
      value: _Object$freeze(raw)
    }
  }));
}