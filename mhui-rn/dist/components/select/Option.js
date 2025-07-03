import React, { useCallback, useMemo } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Image } from 'react-native';
import { Styles } from "../../resources";
import { FontPrimary } from "../../constants/font";
const Option = React.memo(props => {
  const {
    optionIndex,
    disabled = false,
    title,
    value = title,
    color = styles.label.color,
    icon,
    optionWidth = 163,
    optionHeight = 50,
    onPress,
    underlayColor = Styles.common.underlayColor
  } = props;
  const handlePress = useCallback(() => {
    if (typeof onPress === 'function') {
      onPress(optionIndex, value);
    }
  }, [onPress, value, optionIndex]);
  const containerStyle = useMemo(() => ({ ...styles.container,
    width: optionWidth,
    height: optionHeight
  }), [optionWidth, optionHeight]);
  return <TouchableHighlight underlayColor={underlayColor} disabled={disabled} onPress={handlePress}>
      <View style={containerStyle}>
        <Text style={[styles.label, {
        color
      }]}>{title}</Text>
        {icon ? <Image source={icon} style={styles.icon} /> : <Text style={styles.icon} />}
      </View>
    </TouchableHighlight>;
});
export default Option;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingTop: 14.25,
    paddingBottom: 15.75,
    paddingHorizontal: 27,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 15,
    color: '#000000',
    ...FontPrimary
  },
  icon: {
    marginLeft: 27,
    width: 22,
    height: 22
  }
});