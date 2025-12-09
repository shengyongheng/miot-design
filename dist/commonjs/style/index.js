"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeProvider = exports.ThemeContext = void 0;
exports.WithTheme = WithTheme;
exports.useTheme = useTheme;
var _lodash = require("lodash");
var _react = _interopRequireWildcard(require("react"));
var _default = _interopRequireDefault(require("./themes/default"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function (e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, default: e }; if (null === e || "object" != typeof e && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (const t in e) "default" !== t && {}.hasOwnProperty.call(e, t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, t)) && (i.get || i.set) ? o(f, t, i) : f[t] = e[t]); return f; })(e, t); }
const ThemeContext = exports.ThemeContext = /*#__PURE__*/(0, _react.createContext)(_default.default);
const ThemeProvider = props => {
  const {
    value,
    children
  } = props;
  const theme = (0, _react.useMemo)(() => ({
    ..._default.default,
    ...value
  }), [value]);
  return /*#__PURE__*/_react.default.createElement(ThemeContext.Provider, {
    value: theme
  }, children);
};
exports.ThemeProvider = ThemeProvider;
function customizer(objValue, srcValue) {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  } else {
    return [objValue, srcValue];
  }
}

// useTheme hook
function useTheme(props) {
  const {
    themeStyles,
    styles
  } = props;
  const theme = (0, _react.useContext)(ThemeContext);
  const themeStylesMemo = (0, _react.useMemo)(() => (0, _lodash.mergeWith)(themeStyles(theme), styles, customizer),
  // eslint-disable-next-line prettier/prettier
  [styles, theme, themeStyles]);
  return themeStylesMemo;
}
/**
 * Component can extends this props
 */
function WithTheme(props) {
  const {
    children,
    themeStyles,
    styles
  } = props;
  const cache = (0, _react.useRef)(undefined);
  const getStyles = (0, _react.useCallback)(theme => {
    if (!cache.current && themeStyles) {
      cache.current = themeStyles(theme);
    }
    if (cache.current) {
      return (0, _lodash.mergeWith)(cache.current, styles, customizer);
    }
    return styles;
  },
  // eslint-disable-next-line prettier/prettier
  [themeStyles, styles]);
  return /*#__PURE__*/_react.default.createElement(ThemeContext.Consumer, null, theme => children(getStyles(theme), theme));
}
//# sourceMappingURL=index.js.map