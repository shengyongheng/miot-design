import React from 'react';
import { Text, useWindowDimensions, StyleSheet } from 'react-native';

const MHText = props => {
  const {
    text = '',
    style,
    ...reset
  } = props;
  const {
    width: windowWidth
  } = useWindowDimensions();
  const newStyle = {
    width: windowWidth - 54,
    marginLeft: 27,
    marginTop: 10
  };
  Object.assign(newStyle, styles.textStyle);
  return <Text style={[newStyle, style]} {...reset}>{text}</Text>;
};
/**
 * 米家文本内容
 * @description 属性继承自ReactNative的Text组件
 * @property {string} text - 文本内容
 */


const MemoText = React.memo(MHText);
export default MemoText;
const styles = StyleSheet.create({
  textStyle: {
    justifyContent: 'center',
    fontFamily: 'MILanPro--GB1-4',
    fontSize: 12,
    color: '#999999',
    letterSpacing: 0
  }
});