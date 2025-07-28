import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FontSecondary } from "../../constants/font";

const StatisticsNumber = props => {
  const {
    value = '-',
    name = '-',
    valueColor = styles.itemValue.color,
    nameColor = styles.itemName.color,
    itemStyle
  } = props;
  return <View style={itemStyle}>
      <View style={styles.item}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.itemValue, {
        color: valueColor
      }]}>{value}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={[styles.itemName, {
        color: nameColor
      }]}>{name}</Text>
      </View>
    </View>;
};

export default StatisticsNumber;
const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemValue: {
    fontSize: 26,
    color: '#000000',
    letterSpacing: 0,
    ...FontSecondary
  },
  itemName: {
    marginTop: 1,
    fontSize: 12,
    color: '#999999',
    letterSpacing: 0,
    ...FontSecondary
  }
});