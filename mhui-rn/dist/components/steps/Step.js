import React, { useMemo } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

/** 未选中时的图标宽度（或高度） */
const RAW_ICON_WIDTH = 6;
/** 选中时的图标宽度（或高度） */

const SELECTED_ICON_WIDTH = 8;

const Step = props => {
  const {
    stepIndex = 0,
    title,
    disabled,
    status = 'wait',
    iconBackgroundColor,
    titleColor,
    onStepPress
  } = props;
  const iconStyle = useMemo(() => {
    const iconClassName = `${status}Icon`;
    const defaultIconStyle = styles[iconClassName];
    return { ...defaultIconStyle,
      backgroundColor: iconBackgroundColor || defaultIconStyle.backgroundColor
    };
  }, [status, iconBackgroundColor]);
  const titleStyle = useMemo(() => {
    const titleClassName = `${status}Title`;
    const defaultTitleStyle = styles[titleClassName];
    return { ...defaultTitleStyle,
      color: titleColor || defaultTitleStyle.color
    };
  }, [status, titleColor]);

  const renderIcon = () => <View style={styles.iconContainer}>
      <View style={iconStyle} />
    </View>;

  const renderTitle = () => <TouchableOpacity disabled={disabled} onPress={handleStepPress} style={styles.titleContainer}>
      <Text style={titleStyle}>
        {title}
      </Text>
    </TouchableOpacity>;

  const handleStepPress = () => {
    if (typeof onStepPress === 'function') {
      onStepPress(stepIndex);
    }
  };

  return <View style={styles.container}>
      {renderIcon()}
      {renderTitle()}
    </View>;
};

export default Step;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SELECTED_ICON_WIDTH,
    height: SELECTED_ICON_WIDTH
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: SELECTED_ICON_WIDTH,
    height: SELECTED_ICON_WIDTH,
    overflow: 'visible'
  },
  waitIcon: {
    width: RAW_ICON_WIDTH,
    height: RAW_ICON_WIDTH,
    borderRadius: RAW_ICON_WIDTH / 2,
    backgroundColor: '#D8D8D8'
  },
  processIcon: {
    width: SELECTED_ICON_WIDTH,
    height: SELECTED_ICON_WIDTH,
    borderRadius: SELECTED_ICON_WIDTH / 2,
    backgroundColor: '#0091FF'
  },
  finishIcon: {
    width: RAW_ICON_WIDTH,
    height: RAW_ICON_WIDTH,
    borderRadius: RAW_ICON_WIDTH / 2,
    backgroundColor: '#D8D8D8'
  },
  titleContainer: {
    position: 'absolute',
    marginLeft: 12.5,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center'
  },
  finishTitle: {
    lineHeight: 22,
    fontFamily: 'MILanPro--GB1-4',
    fontSize: 17,
    color: '#B2B2B2'
  },
  waitTitle: {
    lineHeight: 22,
    fontFamily: 'MILanPro--GB1-4',
    fontSize: 17,
    color: '#B2B2B2'
  },
  processTitle: {
    fontFamily: 'MILanPro_MEDIUM--GB1-4',
    fontSize: 22,
    color: '#0082E6',
    fontWeight: 'bold'
  }
});