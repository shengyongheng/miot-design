import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableHighlight, Image } from 'react-native';
import { AccessibilityRoles, getAccessibilityConfig } from "../../utils/accessibility-helper";
import { Styles } from "../../resources";
import { FontPrimary } from "../../constants/font";

const CommonButton = props => {
  const {
    disabled,
    title,
    titleColor = '#FFFFFF',
    titleFontSize = 16,
    titleFontFamily = styles.buttonTitle.fontFamily,
    themeColor = '#0091FF',
    underlayColor = Styles.common.underlayColor,
    width = '100%',
    height = 46,
    borderRadius = 23,
    rightIcon,
    accessible,
    accessibilityLabel,
    accessibilityHint,
    onPress
  } = props;
  const buttonTitleStyle = useMemo(() => ({ ...styles.buttonTitle,
    color: titleColor,
    fontSize: titleFontSize,
    fontFamily: titleFontFamily
  }), [titleColor, titleFontSize, titleFontFamily]);
  const buttonStyle = useMemo(() => ({ ...styles.button,
    backgroundColor: themeColor,
    width,
    height,
    borderRadius
  }), [themeColor, borderRadius, width, height]);
  return <TouchableHighlight disabled={disabled} onPress={onPress} style={buttonStyle} underlayColor={underlayColor} {...getAccessibilityConfig({
    accessible,
    accessibilityRole: AccessibilityRoles.button,
    accessibilityLabel,
    accessibilityHint,
    accessibilityState: {
      disabled
    }
  })}>
      <>
        <Text style={buttonTitleStyle}>{title}</Text>
        {rightIcon && <Image style={styles.rightIcon} source={rightIcon} />}
      </>
    </TouchableHighlight>;
};

export default CommonButton;
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    height: 46,
    backgroundColor: '#0091FF',
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonTitle: {
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 0,
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    ...FontPrimary
  },
  rightIcon: {
    marginLeft: 8,
    height: 11,
    width: 8
  }
});