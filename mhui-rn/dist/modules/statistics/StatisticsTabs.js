import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { FontPrimary } from "../../constants/font";
/** 默认的处于活动状态的tabs文字颜色 */

const DEFAULT_ACTIVE_TABS_COLOR = '#000000'; // new DynamicColor('#000000', 'rgba(255,255,255,0.90)');

/** 默认的处于不活动状态的tab文字颜色 */

const DEFAULT_INACTIVE_TABS_COLOR = '#999999'; // new DynamicColor('#999999', '#rgba(255,255,255,0.40)');

const DEFAULT_TAB_ITEMS = [{
  key: 0,
  value: 'VOC'
}, {
  key: 1,
  value: 'PM2.5'
}];

/**
 * @export
 * @author Xu Liang
 * @since 10044
 * @module statistics
 * @description 统计界面Tabs
 * @property {Array<tabItem>} tabItems - tabs item文本内容
 * @property {string} inactiveTabsColor - 处于不活动状态的tabs文字颜色（适配黑暗模式）
 * @property {string} activeTabColor - 处于活动状态的tab文字颜色（适配黑暗模式）
 * @property {function} onChange -  改变时的回调
 * @property {number} activeKey - 初始的激活 tab 面板的 key
 */
const StatisticsTabs = React.memo(props => {
  const {
    tabItems = DEFAULT_TAB_ITEMS,
    inactiveTabsColor = DEFAULT_INACTIVE_TABS_COLOR,
    activeTabColor = DEFAULT_ACTIVE_TABS_COLOR,
    activeKey: defaultActiveKey = 0,
    onChange
  } = props;
  const isFirst = useRef(true);
  const [activeKey, setActiveKey] = useState(defaultActiveKey);
  useEffect(() => {
    if (!isFirst.current) {
      isFirst.current = false;
      return;
    }

    if (typeof onChange === 'function') {
      onChange(activeKey);
    }
  }, [onChange, activeKey]);

  const handleChangeTab = key => {
    setActiveKey(key);
  };
  /** 创建tabs */


  const createTabs = () => {
    const activeTabTextStyle = [styles.activeTabText, {
      color: activeTabColor
    }];
    const inactiveTabTextStyle = [styles.inactiveTabText, {
      color: inactiveTabsColor
    }];
    const tabs = tabItems.map((tabItem, idx) => {
      const {
        value,
        key = idx
      } = tabItem;
      const tabTextStyle = key === activeKey ? activeTabTextStyle : inactiveTabTextStyle;
      return <TouchableOpacity key={key} onPress={() => handleChangeTab(key)}>
          <Text style={tabTextStyle}>{value}</Text>
        </TouchableOpacity>;
    });
    return tabs;
  };

  return <View style={styles.container}>
      {createTabs()}
    </View>;
});
export default StatisticsTabs;
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45
  },
  inactiveTabText: {
    fontSize: 16,
    color: '#999999',
    letterSpacing: 0,
    textAlign: 'center',
    width: 106,
    ...FontPrimary
  },
  activeTabText: {
    fontSize: 16,
    color: '#000000',
    letterSpacing: 0,
    textAlign: 'center',
    width: 106,
    ...FontPrimary
  }
});