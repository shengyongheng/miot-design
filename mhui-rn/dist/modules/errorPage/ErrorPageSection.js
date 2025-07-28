import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/** 错误页面某个分组 */
const ErrorPageSection = props => {
  const {
    title,
    content,
    contentItemDelimiter = '\n',
    contentItemFormatter
  } = props;

  const renderTitle = () => {
    if (typeof title !== 'undefined') {
      return <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>{title}</Text>;
    }

    return null;
  };

  const renderContent = () => {
    const contentItems = Array.isArray(content) ? content : [content];
    const contentText = contentItems.map((itemText, idx) => {
      if (typeof contentItemFormatter === 'function') {
        return contentItemFormatter(itemText, idx, contentItems);
      }

      return itemText;
    }).join(contentItemDelimiter);
    return <Text style={styles.content}>{contentText}</Text>;
  };

  return <View style={styles.container}>
      {renderTitle()}
      {renderContent()}
    </View>;
};

export default ErrorPageSection;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 24
  },
  title: {
    fontFamily: 'MILanPro_DEMIBOLD--GB1-4',
    fontSize: 16,
    color: '#000000',
    letterSpacing: 0,
    fontWeight: 'bold',
    marginBottom: 10
  },
  content: {
    fontFamily: 'MILanPro--GB1-4',
    fontSize: 14,
    color: '#999999',
    textAlign: 'justify',
    lineHeight: 24,
    fontWeight: '400'
  }
});