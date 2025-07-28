import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { StyleSheet, Animated, TouchableHighlight } from 'react-native';

/**
 * @export
 * @author Xu Liang
 * @since 10049
 * @module BarChart
 * @description 柱形图中一列图形。用于GroupBarItem中，宽度自适应。
 * @param {number} height - 图形的高度
 * @param {function} onPress - 图形被点击时的回调
 * @param {boolean} labelShow - 是否显示图形标签。默认不显示。
 * @param {string|number} label - 图形标签。如果未开启labelShow，则忽略此属性。
 * @param {StyleProp<ViewStyle>} labelStyle - 图形标签的样式。如果未开启labelShow，则忽略此属性。
 * @param {color} underlayColor - 图形被触摸时显示出来的底层的颜色
 * @param {StyleProp<ViewStyle>} style - 图形总体样式
 */
const BarItem = React.memo(props => {
  const {
    identifier,
    height = 30,
    width = '100%',
    fill = '#FFE4BD',
    underlayColor,
    borderTopRadius = 3,
    onPress
  } = props;
  const heightAnim = useRef(new Animated.Value(height));
  useEffect(() => {
    heightAnim.current.setValue(height);
    Animated.spring(heightAnim.current, {
      toValue: 0,
      tension: 20,
      useNativeDriver: true
    }).start();
  }, [height]);
  const handlePress = useCallback(() => {
    if (typeof onPress === 'function') {
      onPress(identifier);
    }
  }, [identifier, onPress]);
  const barWrapperStyle = useMemo(() => ({ ...styles.barWrapper,
    width,
    borderTopLeftRadius: borderTopRadius,
    borderTopRightRadius: borderTopRadius
  }), [borderTopRadius, width]);
  const barStyle = useMemo(() => ({
    height,
    backgroundColor: fill,
    borderTopLeftRadius: borderTopRadius,
    borderTopRightRadius: borderTopRadius,
    transform: [{
      translateY: heightAnim.current
    }]
  }), [height, fill, borderTopRadius]);
  return <TouchableHighlight style={barWrapperStyle} underlayColor={underlayColor} onPress={handlePress}>
      <Animated.View style={barStyle} />
    </TouchableHighlight>;
});
export default BarItem;
const styles = StyleSheet.create({
  barWrapper: {// flex: 1,
  }
});