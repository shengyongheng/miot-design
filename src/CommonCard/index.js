import PropTypes from 'prop-types';
import React from 'react';
import { Text, View } from 'react-native';
import { WithTheme } from '../style/index';
import CommonCardStyles from './style';

const CommonCard = (props) => {
  return (
    <WithTheme styles={props.styles} themeStyles={CommonCardStyles}>
      {(styles) => {
        console.log('styles:', styles);
        return (
          <View style={styles.backgroundColor}>
            <Text style={styles.color}>CommonCard</Text>
          </View>
        );
      }}
    </WithTheme>
  );
};

// 定义 prop-types
CommonCard.propTypes = {
  title: PropTypes.string.isRequired, // 必填字符串
  count: PropTypes.number, // 可选数字
  isActive: PropTypes.bool, // 布尔值
  onClick: PropTypes.func, // 函数
};

// 默认 props
CommonCard.defaultProps = {
  count: 0,
  isActive: false,
};

export default CommonCard;
