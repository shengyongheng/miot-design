/*
 * StatisticsPanel 统计面板
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontPrimary } from "../../constants/font";

const StatisticsPanel = props => {
  const {
    panelTitle,
    children
  } = props;
  return <View>
      <Text style={styles.panelTitle}>{panelTitle}</Text>
      <View style={styles.container}>
        {children}
      </View>
    </View>;
};

export default StatisticsPanel;
const styles = StyleSheet.create({
  panelTitle: {
    paddingTop: 15,
    paddingBottom: 22,
    fontSize: 13,
    color: '#000000',
    letterSpacing: 0,
    ...FontPrimary
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'flex-start'
  }
});