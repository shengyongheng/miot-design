import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
const Tooltip = React.memo(props => {
  const {
    x = 0,
    y = 0,
    width = 95,
    height = 26,
    text = '',
    textColor = styles.textStyle.color,
    fill = 'gray'
  } = props;
  const textStyle = useMemo(() => ({ ...styles.textStyle,
    color: textColor
  }), [textColor]);
  return <View style={[styles.containerStyle, {
    left: x,
    top: y,
    width,
    height,
    backgroundColor: fill
  }]}>
      <Text style={textStyle}>{text}</Text>
    </View>;
});
export default Tooltip;
const styles = StyleSheet.create({
  containerStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#363D4A',
    borderRadius: 13,
    zIndex: 9999
  },
  textStyle: {
    opacity: 0.9,
    fontFamily: 'MILanPro_MEDIUM--GB1-4',
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center'
  }
});