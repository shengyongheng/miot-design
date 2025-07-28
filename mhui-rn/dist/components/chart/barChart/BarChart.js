import React, { useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import RectCoordinateSystem from "../RectCoordinateSystem";
import BarChartView from "./BarChartView";
import { isMultiGroups } from "../Utils";
import { RATIO_OF_MAX_SCALE_MAX_DATA, DEFAULT_MAX_Y_AXIS_DATA } from "../ChartConst";
/** 图表布局信息 */

/**
 * 柱形统计图
 * @param props
 */
const BarChart = React.memo(props => {
  const {
    dataset = [],
    yAxisLabels,
    showXAxisLabels = true,
    xAxisMaxSplitNumber = 7,
    xAxisDataStyle,
    xAxisSelectedDataStyle = xAxisDataStyle,
    xAxisDataOffset = 20,
    showYAxisLabels,
    yAxisDataOffset = 0,
    xAxisData,
    xAxisDataFormatter,
    paddingHorizontal = 30,
    paddingBottom = 30,
    showHorizontalSplitLine,
    showVerticalSplitLine,
    itemAlign = 'middle',
    overflow = 'sample',
    barWidth = 29,
    barUnderlayColor,
    barBorderTopRadius = 3,
    barRawFill,
    barSelectedFill = '#FFA626',
    gridUnderlayColor,
    girdActiveOpacity,
    initialSelectedIndex = -1,
    onChangeIndex,
    ...reset
  } = props;
  const [chartLayout, setChartLayout] = useState({
    width: 0,
    height: 0,
    isLayoutComplete: false
  });

  const handleLayout = ({
    nativeEvent
  }) => {
    const {
      layout: {
        width,
        height
      }
    } = nativeEvent;
    setChartLayout({
      width,
      height,
      isLayoutComplete: true
    });
  };
  /** 是否是多组数据点集合 */


  const multiple = useMemo(() => isMultiGroups(dataset), [dataset]);
  /** 格式化x轴数据 */

  const newXAxisData = useMemo(() => {
    const runDataFormatter = points => points.map((value, index) => {
      if (typeof xAxisDataFormatter === 'function') {
        return xAxisDataFormatter(value, index);
      }

      return `${value[0]}`;
    });

    if (Array.isArray(xAxisData)) {
      return xAxisData;
    }

    if (multiple) {
      const multiGroupPoints = dataset;
      return runDataFormatter(multiGroupPoints[0]);
    }

    const groupPoints = dataset;
    return runDataFormatter(groupPoints);
  }, [dataset, xAxisDataFormatter, xAxisData]);
  /** 提取数据点集合中所有y轴数据 */

  const seriesData = useMemo(() => {
    const runExtractSeriesData = points => {
      const filteredData = points.filter(value => !Number.isNaN(Number(`${value[1]}`)));
      return filteredData?.map(value => Number(`${value[1]}`));
    };

    if (multiple) {
      const multiGroupPoints = dataset;
      return multiGroupPoints.map(groupPoints => runExtractSeriesData(groupPoints));
    }

    const groupPoints = dataset;
    return runExtractSeriesData(groupPoints);
  }, [multiple, dataset]);
  /** 提取数据点集合中最大的y轴数据 */

  const maxYAxisData = useMemo(() => {
    if (seriesData.length === 0) {
      return DEFAULT_MAX_Y_AXIS_DATA;
    }

    if (multiple) {
      const multiGroupsSeriesData = seriesData;
      return Math.max(...multiGroupsSeriesData.flat());
    }

    const groupSeriesData = seriesData;
    return Math.max(...groupSeriesData);
  }, [multiple, seriesData]);
  /** y轴最大刻度 */

  const maxYAxisScale = maxYAxisData / RATIO_OF_MAX_SCALE_MAX_DATA;
  /** 图表实际内容高度 */

  const chartContentHeight = chartLayout.height - paddingBottom;
  /** 单位刻度值 */

  const heightOfPerScale = maxYAxisScale > 0 ? chartContentHeight / maxYAxisScale : 1;
  /** 相邻两点水平方向上的距离 */

  const adjacentDistance = newXAxisData.length <= 1 ? chartLayout.width - paddingHorizontal * 2 : (chartLayout.width - paddingHorizontal * 2) / (newXAxisData.length - 1);
  /** 数据规范化 */

  const normalizePoints = useMemo(() => {
    const runNormalize = yAxisData => yAxisData.map((value, idx) => {
      const x = idx * adjacentDistance + paddingHorizontal;
      const y = chartContentHeight - value * heightOfPerScale;
      return [x, y];
    });

    if (multiple) {
      const multiGroupsSeriesData = seriesData;
      return multiGroupsSeriesData.map(yAxisData => runNormalize(yAxisData));
    }

    const groupSeriesData = seriesData;
    return runNormalize(groupSeriesData);
  }, [multiple, heightOfPerScale, paddingHorizontal, adjacentDistance, chartContentHeight, seriesData]);
  /** 处理后的y轴标签 */

  const newYAxisLabels = useMemo(() => {
    if (Array.isArray(yAxisLabels) && yAxisLabels.length > 0) {
      return yAxisLabels.map(({
        value,
        label
      }) => ({
        value: chartContentHeight - value * heightOfPerScale,
        label
      }));
    }

    const maxScaleInt = parseInt(`${maxYAxisScale}`, 10);
    /** 默认y轴数据 */

    const defaultYAxisLabels = [maxScaleInt, maxScaleInt / 2];
    return defaultYAxisLabels.map(value => ({
      value: chartContentHeight - value * heightOfPerScale,
      label: value
    }));
  }, [maxYAxisScale, heightOfPerScale, chartContentHeight, yAxisLabels]);
  /** 计算是否真正需要滑动 */

  const shouldScroll = overflow === 'scroll' && newXAxisData.length > xAxisMaxSplitNumber;
  return <View style={styles.container} onLayout={handleLayout}>
      <RectCoordinateSystem {...reset} width={chartLayout.width} height={chartLayout.height} paddingHorizontal={paddingHorizontal} paddingBottom={paddingBottom} xAxisMaxSplitNumber={xAxisMaxSplitNumber} xAxisDataOffset={xAxisDataOffset} showYAxisLabels={showYAxisLabels} yAxisDataOffset={yAxisDataOffset} xAxisData={newXAxisData} yAxisLabels={newYAxisLabels} showXAxisLabels={false} showHorizontalSplitLine={showHorizontalSplitLine} showVerticalSplitLine={showVerticalSplitLine} itemAlign={itemAlign} />
      {// 优先完成布局，等待布局完成后加载视图其他内容
    chartLayout.isLayoutComplete ? <BarChartView useScroll={shouldScroll} multiple={multiple} barPoints={normalizePoints} width={chartLayout.width} height={chartLayout.height} paddingHorizontal={paddingHorizontal} paddingBottom={paddingBottom} xAxisMaxSplitNumber={xAxisMaxSplitNumber} xAxisData={newXAxisData} itemAlign={itemAlign} barWidth={barWidth} barBorderTopRadius={barBorderTopRadius} barUnderlayColor={barUnderlayColor} barRawFill={barRawFill} barSelectedFill={barSelectedFill} gridUnderlayColor={gridUnderlayColor} girdActiveOpacity={girdActiveOpacity} initialSelectedIndex={initialSelectedIndex} showXAxisLabels={showXAxisLabels} xAxisDataStyle={xAxisDataStyle} xAxisSelectedDataStyle={xAxisSelectedDataStyle} xAxisDataOffset={xAxisDataOffset} onChangeIndex={onChangeIndex} /> : null}
    </View>;
});
export default BarChart;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF'
  }
});