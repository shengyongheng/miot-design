import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import StatisticsTabs from "./StatisticsTabs";
import RadioGroupWithSeparator from "./RadioGroupWithSeparator";
import { adjustSize } from "../../utils/sizes";
import { ConfigContext } from "../../components/configProvider";
import CircleLoading from "../../components/loading/CircleLoading";
import StatisticsChartWithTitle from "./StatisticsChartWithTitle";

/**
 * @export
 * @author Xu Liang
 * @since 10044
 * @module statistics
 * @description 统计界面
 * @property {boolean} showTabs - 是否显示tabs。默认不显示
 * @property {ChartType} chartType - 图表类型
 * @property {dataSourceConfig} dataSourceConfig - 数据源配置
 * @property {TitleConfig} titleConfig - 统计界面标题配置
 * @property {RadioGroupConfig} radioGroupConfig - RadioGroup配置
 * @property {TabsConfig} tabsConfig tabs配置
 */
export default class StatisticsPage extends PureComponent {
  static contextType = ConfigContext;

  constructor(props) {
    super(props);
    this.state = {
      activeTabKey: 0,
      // tabsConfig?.activeTabKey || this.tabItems[0]?.key || 0,
      checkedRadioId: 0
    };
  }

  onChangeActiveTabKey = key => {
    const {
      radioGroupConfig
    } = this.props;
    const {
      checkedRadioId
    } = this.state;
    const curRadioGroups = Array.isArray(radioGroupConfig) ? radioGroupConfig[key] : radioGroupConfig;
    const newRadioItems = curRadioGroups?.radioOptions || []; // 如果当前checkId大于等于新的radioOptions长度，就会触发越界，因此要重置checkId

    const newCheckId = checkedRadioId >= newRadioItems.length ? 0 : checkedRadioId;
    this.setState({
      activeTabKey: key,
      checkedRadioId: newCheckId
    }, () => {
      if (typeof this.props.onChangeActiveTabKey === 'function') {
        this.props.onChangeActiveTabKey(key);
      }
    });
  };
  onChangeCheck = checkedRadioId => {
    this.setState({
      checkedRadioId
    }, () => {
      if (typeof this.props.onChangeCheckedRadioId === 'function') {
        this.props.onChangeCheckedRadioId(checkedRadioId);
      }
    });
  };
  createLoading = () => {
    const radius = adjustSize(129); // 43

    return <View style={styles.loading}>
        <CircleLoading radius={radius} />
      </View>;
  };
  createStatisticsChartWithTitle = () => {
    const {
      statisticsData = [],
      chartType,
      titleConfig,
      radioGroupConfig,
      chartConfig,
      multiTabs,
      onChangeSelectedIndex
    } = this.props;
    const {
      activeTabKey,
      checkedRadioId
    } = this.state;
    const curRadioGroups = Array.isArray(radioGroupConfig) ? radioGroupConfig[activeTabKey] : radioGroupConfig;
    const newRadioItems = curRadioGroups?.radioOptions || [];
    const dataType = newRadioItems[checkedRadioId]?.type || 'day';
    const currentTitleConfig = Array.isArray(titleConfig) ? titleConfig[activeTabKey] : titleConfig;
    const currentChartConfig = Array.isArray(chartConfig) ? chartConfig[activeTabKey] : chartConfig;

    if (multiTabs) {
      const dataSource = statisticsData;
      return <StatisticsChartWithTitle dataType={dataType} chartType={chartType} chartData={dataSource[activeTabKey][checkedRadioId]} titleConfig={currentTitleConfig} chartConfig={currentChartConfig} onChangeSelectedIndex={onChangeSelectedIndex} />;
    }

    const dataSource = statisticsData;
    return <StatisticsChartWithTitle dataType={dataType} chartType={chartType} chartData={dataSource[checkedRadioId] || []} titleConfig={currentTitleConfig} chartConfig={currentChartConfig} onChangeSelectedIndex={onChangeSelectedIndex} />;
  };

  createStatisticsTabs() {
    const {
      tabsConfig,
      showTabs = true
    } = this.props;
    const {
      activeTabKey
    } = this.state;
    const curTabConfig = Array.isArray(tabsConfig) ? tabsConfig[activeTabKey] : tabsConfig;

    if (showTabs) {
      return <StatisticsTabs {...curTabConfig} activeKey={activeTabKey} onChange={this.onChangeActiveTabKey} tabItems={curTabConfig?.tabItems || []} />;
    }

    return null;
  }

  createRadioGroupWithSeparator() {
    const {
      radioGroupConfig
    } = this.props;
    const {
      activeTabKey,
      checkedRadioId
    } = this.state;
    const curRadioGroups = Array.isArray(radioGroupConfig) ? radioGroupConfig[activeTabKey] : radioGroupConfig;
    const newRadioOptions = curRadioGroups?.radioOptions || [];
    return <RadioGroupWithSeparator {...radioGroupConfig} checkedId={checkedRadioId} onChangeCheck={this.onChangeCheck} radioOptions={newRadioOptions} />;
  }

  render() {
    const {
      isLoading
    } = this.props;
    return <View style={styles.container}>
        {this.createStatisticsTabs()}
        {isLoading ? this.createLoading() : this.createStatisticsChartWithTitle()}
        {this.createRadioGroupWithSeparator()}
      </View>;
  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});