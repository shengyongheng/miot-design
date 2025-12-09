import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { WithTheme } from '../style/index';
import CommonCardStyles from './style';
const CommonCard = props => {
  return /*#__PURE__*/React.createElement(WithTheme, {
    styles: props.styles,
    themeStyles: CommonCardStyles
  }, _styles => {
    console.log('_styles:', _styles);
    return /*#__PURE__*/React.createElement(View, {
      style: _styles.container
    }, /*#__PURE__*/React.createElement(Text, {
      style: _styles.title
    }, "CommonCard"));
  });
};

// 定义 prop-types
CommonCard.propTypes = {
  title: PropTypes.string.isRequired,
  // 必填字符串
  count: PropTypes.number,
  // 可选数字
  isActive: PropTypes.bool,
  // 布尔值
  onClick: PropTypes.func // 函数
};

// 默认 props
CommonCard.defaultProps = {
  count: 0,
  isActive: false
};
export default CommonCard;
//# sourceMappingURL=index.js.map