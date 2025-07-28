import React, { useMemo } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
const MARGIN_TOP_WITH_ICON = 20.94;
const MARGIN_TOP_WITHOUT_ICON = 24;
const PADDING_BOTTOM_WITH_SUBTITLE = 24;
const PADDING_BOTTOM_WITHOUT_SUBTITLE = 21;

const ErrorPageHeader = props => {
  const {
    icon,
    title,
    subtitle
  } = props;

  if (typeof icon === 'undefined' && typeof title === 'undefined' && typeof subtitle === 'undefined') {
    return null;
  }

  const containerStyle = useMemo(() => ({ ...styles.container,
    paddingBottom: typeof subtitle === 'undefined' ? PADDING_BOTTOM_WITHOUT_SUBTITLE : PADDING_BOTTOM_WITH_SUBTITLE
  }), [icon]);
  const titleStyle = useMemo(() => ({ ...styles.title,
    marginTop: typeof icon === 'undefined' ? MARGIN_TOP_WITHOUT_ICON : MARGIN_TOP_WITH_ICON
  }), [icon]);

  const renderIcon = () => {
    if (typeof icon !== 'undefined') {
      return <Image style={styles.icon} source={icon} />;
    }

    return null;
  };

  const renderTitle = () => {
    if (typeof title !== 'undefined') {
      return <Text style={titleStyle}>
          {title}
        </Text>;
    }

    return null;
  };

  const renderSubtitle = () => {
    if (typeof subtitle !== 'undefined') {
      return <Text style={styles.subtitle}>
          {subtitle}
        </Text>;
    }

    return null;
  };

  return <View style={containerStyle}>
      {renderIcon()}
      {renderTitle()}
      {renderSubtitle()}
    </View>;
};

export default ErrorPageHeader;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  content: {
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  icon: {
    marginTop: 40.01,
    width: 178.05,
    height: 178.05,
    opacity: 0.3,
    backgroundColor: '#00B7FF'
  },
  title: {
    paddingHorizontal: 10,
    marginTop: 20.94,
    fontFamily: 'MILanPro_DEMIBOLD--GB1-4',
    fontSize: 20,
    color: '#FF6200',
    letterSpacing: 0.69,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  subtitle: {
    marginTop: 1,
    fontFamily: ' MILanPro--GB1-4',
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    fontWeight: '400'
  }
});