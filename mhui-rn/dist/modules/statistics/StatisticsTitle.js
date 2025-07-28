import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FontPrimary } from "../../constants/font";

/**
 * @export
 * @author Xu Liang
 * @since 10044
 * @module statistics
 * @description 统计界面标题
 * @property {string | number} subtitleWithData
 * @property {DynamicColor} titleColor - 标题颜色
 * @property {DynamicColor} subtitleColor - 副标题颜色
 */
const StatisticsTitle = React.memo(props => {
  const {
    statistics = [],
    valueColor = '#000000',
    nameColor = '#999999',
    emptyValue = '--',
    emptyName = 'no data'
  } = props;

  const renderStatisticItem = ({
    name,
    value
  }) => <View style={styles.statisticItem} key={name}>
      <Text style={[styles.statisticValue, {
      color: valueColor
    }]}>{value}</Text>
      <Text style={[styles.statisticName, {
      color: nameColor
    }]}>{name}</Text>
    </View>;

  const renderEmpty = () => {
    if (statistics.length === 0) {
      return <View style={styles.statisticEmptyItem}>
          <Text style={styles.statisticValue}>{emptyValue}</Text>
          <Text style={styles.statisticName}>{emptyName}</Text>
        </View>;
    }

    return null;
  };

  return <View style={styles.statisticContainer}>
      {statistics.map(item => renderStatisticItem(item))}
      {renderEmpty()}
    </View>;
});
export default StatisticsTitle;
const styles = StyleSheet.create({
  statisticContainer: {
    paddingHorizontal: 27.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  statisticItem: {},
  statisticEmptyItem: {
    width: '100%'
  },
  statisticValue: {
    fontFamily: 'Mitype2018-70',
    fontSize: 42,
    color: '#999999',
    letterSpacing: -1.72,
    textAlign: 'center'
  },
  statisticName: {
    marginTop: 2,
    fontSize: 13,
    color: '#999999',
    letterSpacing: 0,
    textAlign: 'center',
    ...FontPrimary
  }
});