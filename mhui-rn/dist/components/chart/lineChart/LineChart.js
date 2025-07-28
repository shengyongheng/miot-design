import React, { useCallback, useMemo, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ScrollLineChartView from "./ScrollLineChartView";
import StaticLineChartView from "./StaticLineChartView";
import { calculateLineGradientByScale } from "../LineGradientHelper";
import RectCoordinateSystem from "../RectCoordinateSystem";
import { RATIO_OF_MAX_SCALE_MAX_DATA, DEFAULT_MAX_Y_AXIS_DATA } from "../ChartConst";
const DEFAULT_X_AXIS_MAX_SPLIT_NUM = 7;

/**
 * 折线统计图
 * @param props
 */
const LineChart = props => {
  const {
    dataset = [],
    xAxisData,
    xAxisDataStyle,
    xAxisSelectedDataStyle = xAxisDataStyle,
    yAxisLabels,
    curveLineColor,
    overflow = 'sample',
    xAxisMaxSplitNumber = DEFAULT_X_AXIS_MAX_SPLIT_NUM,
    xAxisDataOffset = 20,
    showYAxisLabels,
    yAxisDataOffset = 0,
    xAxisDataFormatter,
    paddingHorizontal = 30,
    paddingBottom = 30,
    itemAlign = 'start',
    initialSelectedIndex,
    showHorizontalSplitLine,
    showVerticalSplitLine,
    shadowAreaColor,
    showShadowArea,
    showDot,
    showTooltip,
    dotStroke = '#505763',
    dotStrokeWidth = 1,
    dotFill = '#FFFFFF',
    dotRawPassable,
    dotRawRadius = 6,
    dotSelectedRadius,
    toolTipWidth = 95,
    toolTipHeight = 26,
    toolTipTextColor,
    toolTipFill,
    tooltipFormatter,
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

  const handleTooltipFormatter = useCallback(currentIndex => {
    if (typeof tooltipFormatter === 'function') {
      return tooltipFormatter(dataset[currentIndex], currentIndex);
    }

    return dataset[currentIndex] !== undefined ? `${dataset[currentIndex][1]}` : '';
  }, [tooltipFormatter, dataset]);
  /** 是否是多组数据点集合 */

  const multiple = false; // useMemo(() => isMultiGroups(dataset), [dataset]);

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

    return runDataFormatter(dataset);
  }, [dataset, xAxisDataFormatter, xAxisData]);
  /** 提取数据点集合中所有y轴数据 */

  const seriesData = useMemo(() => {
    const runExtractSeriesData = points => {
      const filteredData = points.filter(value => !Number.isNaN(Number(`${value[1]}`)));
      return filteredData?.map(value => Number(`${value[1]}`));
    };

    return runExtractSeriesData(dataset);
  }, [multiple, dataset]);
  /** 提取数据点集合中最大的y轴数据 */

  const maxYAxisData = useMemo(() => {
    if (seriesData.length === 0) {
      return DEFAULT_MAX_Y_AXIS_DATA;
    }

    const max = Math.max(...seriesData);
    return max === 0 ? DEFAULT_MAX_Y_AXIS_DATA : max;
  }, [multiple, seriesData]);
  /** y轴最大刻度 */

  const maxYAxisScale = maxYAxisData / RATIO_OF_MAX_SCALE_MAX_DATA;
  /** 图表实际内容高度 */

  const chartContentHeight = chartLayout.height - paddingBottom;
  /** 单位刻度值 */

  const scale = maxYAxisScale > 0 ? chartContentHeight / maxYAxisScale : 1;
  /** 计算是否真正需要滑动 */

  const shouldScroll = overflow === 'scroll' && newXAxisData.length > xAxisMaxSplitNumber;
  /** 间隔数目 */

  const newIntervals = shouldScroll ? Math.max(xAxisMaxSplitNumber - 1, 1) : Math.max(newXAxisData.length - 1, 1);
  /** 相邻两点水平方向上的距离 */

  const adjacentDistance = (chartLayout.width - paddingHorizontal * 2) / newIntervals;
  /** 数据规范化 */

  const normalizePoints = useMemo(() => {
    const runNormalize = yAxisData => yAxisData.map((value, idx) => {
      const x = idx * adjacentDistance + paddingHorizontal;
      const y = chartContentHeight - value * scale;
      return [x, y];
    });

    return runNormalize(seriesData);
  }, [multiple, scale, paddingHorizontal, adjacentDistance, chartContentHeight, seriesData]);
  /** 处理后的y轴标签 */

  const newYAxisLabels = useMemo(() => {
    if (Array.isArray(yAxisLabels) && yAxisLabels.length > 0) {
      return yAxisLabels.map(({
        value,
        label
      }) => ({
        value: chartContentHeight - value * scale,
        label
      }));
    }

    const maxScaleInt = parseInt(`${maxYAxisScale}`, 10);
    /** 默认y轴数据 */

    const defaultYAxisLabels = [maxScaleInt, maxScaleInt / 2];
    return defaultYAxisLabels.map(value => ({
      value: chartContentHeight - value * scale,
      label: value
    }));
  }, [maxYAxisScale, scale, chartContentHeight, yAxisLabels]);
  const newCurveLineColor = useMemo(() => calculateLineGradientByScale(maxYAxisScale, curveLineColor), [curveLineColor, maxYAxisScale]);
  const newShadowAreaColor = useMemo(() => calculateLineGradientByScale(maxYAxisScale, shadowAreaColor), [shadowAreaColor, maxYAxisScale]);
  return <View style={styles.container} onLayout={handleLayout}>
      {!shouldScroll ? <StaticLineChartView {...reset} width={chartLayout.width} height={chartLayout.height} paddingHorizontal={paddingHorizontal} paddingBottom={paddingBottom} xAxisMaxSplitNumber={xAxisMaxSplitNumber} xAxisDataOffset={xAxisDataOffset} showYAxisLabels={showYAxisLabels} yAxisDataOffset={yAxisDataOffset} xAxisData={newXAxisData} xAxisDataStyle={xAxisDataStyle} xAxisSelectedDataStyle={xAxisSelectedDataStyle} yAxisLabels={newYAxisLabels} curveLineColor={newCurveLineColor} curveLinePoints={normalizePoints} shadowAreaColor={newShadowAreaColor} showShadowArea={showShadowArea} showHorizontalSplitLine={showHorizontalSplitLine} showVerticalSplitLine={showVerticalSplitLine} initialSelectedIndex={initialSelectedIndex} showDot={showDot} showTooltip={showTooltip} dotRawPassable={dotRawPassable} dotStroke={dotStroke} dotStrokeWidth={dotStrokeWidth} dotFill={dotFill} dotRawRadius={dotRawRadius} dotSelectedRadius={dotSelectedRadius} toolTipWidth={toolTipWidth} toolTipHeight={toolTipHeight} toolTipFill={toolTipFill} toolTipTextColor={toolTipTextColor} tooltipFormatter={handleTooltipFormatter} onChangeIndex={onChangeIndex} /> : <>
            <RectCoordinateSystem {...reset} width={chartLayout.width} height={chartLayout.height} paddingHorizontal={paddingHorizontal} paddingBottom={paddingBottom} xAxisMaxSplitNumber={xAxisMaxSplitNumber} xAxisDataOffset={xAxisDataOffset} showXAxisLabels={false} showYAxisLabels={showYAxisLabels} yAxisDataOffset={yAxisDataOffset} xAxisData={newXAxisData} yAxisLabels={newYAxisLabels} showHorizontalSplitLine={showHorizontalSplitLine} showVerticalSplitLine={showVerticalSplitLine} itemAlign={itemAlign} />

            {// 优先完成布局，等待布局完成后加载视图其他内容
      chartLayout.isLayoutComplete ? <ScrollLineChartView {...reset} width={chartLayout.width} height={chartLayout.height} paddingHorizontal={paddingHorizontal} paddingBottom={paddingBottom} xAxisMaxSplitNumber={xAxisMaxSplitNumber} xAxisDataOffset={xAxisDataOffset} showYAxisLabels={showYAxisLabels} yAxisDataOffset={yAxisDataOffset} xAxisData={newXAxisData} xAxisDataStyle={xAxisDataStyle} xAxisSelectedDataStyle={xAxisSelectedDataStyle} yAxisLabels={newYAxisLabels} curveLineColor={newCurveLineColor} curveLinePoints={normalizePoints} shadowAreaColor={newShadowAreaColor} showShadowArea={showShadowArea} showHorizontalSplitLine={showHorizontalSplitLine} showVerticalSplitLine={showVerticalSplitLine} initialSelectedIndex={initialSelectedIndex} showDot={showDot} showTooltip={showTooltip} dotStroke={dotStroke} dotStrokeWidth={dotStrokeWidth} dotFill={dotFill} dotSelectedRadius={dotSelectedRadius} toolTipWidth={toolTipWidth} toolTipHeight={toolTipHeight} toolTipFill={toolTipFill} toolTipTextColor={toolTipTextColor} tooltipFormatter={handleTooltipFormatter} onChangeIndex={onChangeIndex} /> : null}
          </>}
    </View>;
};

export default LineChart;
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#FFF'
  }
});