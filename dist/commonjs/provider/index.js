"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Provider;
var _react = _interopRequireDefault(require("react"));
var _style = require("../style");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function Provider({
  theme,
  children
}) {
  return /*#__PURE__*/_react.default.createElement(_style.ThemeProvider, {
    value: theme
  }, children);
}
//# sourceMappingURL=index.js.map