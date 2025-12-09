"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireDefault(require("react"));
var _reactNative = require("react-native");
var _index = require("../style/index");
var _style = _interopRequireDefault(require("./style"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const CommonCard = props => {
  return /*#__PURE__*/_react.default.createElement(_index.WithTheme, {
    styles: props.styles,
    themeStyles: _style.default
  }, _styles => {
    console.log('_styles:', _styles);
    return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
      style: _styles.container
    }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
      style: _styles.title
    }, "CommonCard"));
  });
};

// 定义 prop-types
CommonCard.propTypes = {
  title: _propTypes.default.string.isRequired,
  // 必填字符串
  count: _propTypes.default.number,
  // 可选数字
  isActive: _propTypes.default.bool,
  // 布尔值
  onClick: _propTypes.default.func // 函数
};

// 默认 props
CommonCard.defaultProps = {
  count: 0,
  isActive: false
};
var _default = exports.default = CommonCard;
//# sourceMappingURL=index.js.map