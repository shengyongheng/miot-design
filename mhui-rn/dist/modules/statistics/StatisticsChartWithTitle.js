import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { ConfigContext } from "../../components/configProvider";
import StatisticsTitle from "./StatisticsTitle";
import { LineChart, BarChart } from "../../components/chart";
/** 图表类型 */

/**
 * @export
 * @author Xu Liang
 * @since 10044
 * @module statistics
 * @description 统计界面图表部分（有title）
 * @property {ChartData} chartData - 图表数据（只有一个数据系列）
 * @property {ChartConfig} chartConfig - 图表配置
 * @property {TitleConfig} titleConfig - 统计界面标题配置
 */
export default class StatisticsChartWithTitle extends PureComponent {
  static contextType = ConfigContext;
  static defaultProps = {
    chartData: []
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.selectedIndex !== prevState.selectedIndex) {
      if (typeof this.props.onChangeSelectedIndex === 'function') {
        this.props.onChangeSelectedIndex(this.state.selectedIndex);
      }
    }
  }

  onChangeSelectedIndex = index => {
    this.setState({
      selectedIndex: index
    });
  };
  /** 展示统计数据面板 */

  renderStatisticsPanel() {
    const {
      titleConfig
    } = this.props;
    return <View style={styles.header}>
        <StatisticsTitle {...titleConfig} />
      </View>;
  }

  renderChart() {
    const {
      chartType,
      chartConfig,
      chartData = []
    } = this.props;
    const {
      selectedIndex = 0
    } = this.state;

    if (chartType === 'BarChart') {
      return <BarChart {...chartConfig} dataset={chartData} initialSelectedIndex={selectedIndex} onChangeIndex={this.onChangeSelectedIndex} paddingHorizontal={27} paddingBottom={20} barWidth={15} />;
    }

    if (chartType === 'LineChart') {
      return <LineChart {...chartConfig} dataset={chartData} initialSelectedIndex={selectedIndex} onChangeIndex={this.onChangeSelectedIndex} paddingHorizontal={27} paddingBottom={20} />;
    }

    return null;
  }

  render() {
    return <View style={styles.body}>
        {this.renderStatisticsPanel()}
        <View style={styles.chartContainer}>
          {this.renderChart()}
        </View>
      </View>;
  }

}
const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: '100%'
  },
  header: {
    marginTop: 30,
    marginBottom: 82.5
  },
  chartContainer: {
    flex: 1,
    width: '100%'
  }
});