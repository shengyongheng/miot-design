import React, { useCallback, useEffect, useState, useMemo, useRef } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import Svg, { Text as SvgText } from 'react-native-svg';
import { samplingLabels } from "../SamplingLabelsHelper";
import GroupBarItem from "./GroupBarItem";
import { defaultXAxisDataOffset, defaultLabelStyle, DEFAULT_X_AXIS_MAX_SPLIT_NUM } from "../ChartConst";

const BarChartView = props => {
  const {
    useScroll = false,
    multiple = false,
    width = 300,
    height = 300,
    paddingHorizontal = 30,
    paddingBottom = 30,
    xAxisMaxSplitNumber = DEFAULT_X_AXIS_MAX_SPLIT_NUM,
    xAxisData = [],
    itemAlign = 'start',
    barWidth = 29,
    barUnderlayColor,
    barPoints = [],
    barBorderTopRadius = 3,
    barRawFill,
    barSelectedFill = '#FFA626',
    gridUnderlayColor,
    girdActiveOpacity,
    initialSelectedIndex = -1,
    showXAxisLabels = true,
    xAxisDataStyle,
    xAxisSelectedDataStyle = xAxisDataStyle,
    xAxisDataOffset = 30,
    onChangeIndex,
    onScroll
  } = props;
  /** 是否是首次加载 */

  const isFirst = useRef(true);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  const numberOfColumns = multiple ? barPoints[0].length || 0 : barPoints.length;
  /** 初始页面中柱形条最大显示数量 */

  const fragmentSize = Math.max(1, Math.min(xAxisMaxSplitNumber, numberOfColumns));
  /** 滚动项的宽度 */

  const scrollGapWidth = (width - paddingHorizontal * 2) / fragmentSize;
  /** 同一列下的柱形条组数 */

  const numberOfGroupBars = multiple ? barPoints.length : 1;
  /** 同一列下的柱形条组的宽度。但是如果这个宽度超过滚动项的宽度，会被截断。 */

  const groupBarWidth = Math.min(barWidth * numberOfGroupBars, scrollGapWidth);
  useEffect(() => {
    setSelectedIndex(initialSelectedIndex);
  }, [initialSelectedIndex]);
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }

    if (typeof onChangeIndex === 'function') {
      onChangeIndex(selectedIndex);
    }
  }, [selectedIndex, onChangeIndex]);
  const handlePress = useCallback(dataIndex => {
    if (typeof dataIndex === 'number') {
      setSelectedIndex(dataIndex);
    }
  }, []);
  /** 获取item的布局。仅用于滚动情况 */

  const getScrollItemLayout = useCallback((data, index) => ({
    length: scrollGapWidth,
    offset: scrollGapWidth * index,
    index
  }), [scrollGapWidth]);
  /** 为给定的 item 生成一个不重复的 key。仅用于滚动情况 */

  const keyExtractor = useCallback((item, index) => `${item[0] || index}`, []);
  /** 创建固定不动的柱形条 */

  const renderStaticChartBars = () => {
    if (xAxisData === undefined || xAxisData.length === 0 || xAxisMaxSplitNumber <= 0 || barPoints.length <= 0) {
      return null;
    }

    const newXAxisData = samplingLabels(xAxisData, xAxisMaxSplitNumber);
    /** 间隔数 */

    const intervals = itemAlign === 'start' ? newXAxisData.length - 1 : newXAxisData.length;
    const gapWidth = (width - paddingHorizontal * 2) / intervals;

    if (!multiple) {
      const newBarWidth = Math.min(barWidth, gapWidth);
      const groupPoints = barPoints;
      return newXAxisData.map(({
        idx
      }, splitIndex) => <GroupBarItem key={idx} containerWidth={scrollGapWidth} containerHeight={height - paddingBottom} containerActiveOpacity={girdActiveOpacity} containerUnderlayColor={gridUnderlayColor} dy={splitIndex * gapWidth} totalWidth={newBarWidth} barHeights={height - paddingBottom - groupPoints[idx][1]} borderTopRadius={barBorderTopRadius} underlayColor={barUnderlayColor} identifier={idx} fill={selectedIndex === idx ? barSelectedFill : barRawFill} onPress={handlePress} />);
    }

    const multiGroupPoints = barPoints;
    return newXAxisData.map(({
      idx
    }, splitIndex) => {
      /** 当前x轴索引上的所有点 */
      const currentXAxisIndexPoints = multiGroupPoints.map(groupPoints => groupPoints[idx]);
      const barHeights = currentXAxisIndexPoints.map(point => height - paddingBottom - point[1]);
      return <GroupBarItem key={idx} containerWidth={scrollGapWidth} containerHeight={height - paddingBottom} containerActiveOpacity={girdActiveOpacity} containerUnderlayColor={gridUnderlayColor} dy={splitIndex * gapWidth} totalWidth={groupBarWidth} barHeights={barHeights} borderTopRadius={barBorderTopRadius} underlayColor={barUnderlayColor} identifier={idx} fill={selectedIndex === idx ? barSelectedFill : barRawFill} onPress={handlePress} />;
    });
  };
  /** 从data中挨个取出一组数据并渲染到列表中 */


  const renderScrollItem = ({
    item,
    index
  }) => {
    const underlayColor = barUnderlayColor;
    const selectedFill = barSelectedFill;
    const rawFill = barRawFill;
    const newBarWidth = Math.min(barWidth, scrollGapWidth);
    const scrollLabelStyle = selectedIndex === index ? xAxisSelectedDataStyle : xAxisDataStyle;
    return <View style={flatListItemStyle}>
        <GroupBarItem key={index} dy={0} totalWidth={newBarWidth} containerWidth={scrollGapWidth} containerHeight={height - paddingBottom} containerActiveOpacity={girdActiveOpacity} containerUnderlayColor={gridUnderlayColor} borderTopRadius={barBorderTopRadius} barHeights={height - paddingBottom - item[1]} underlayColor={underlayColor} identifier={index} fill={selectedIndex === index ? selectedFill : rawFill} onPress={handlePress} />
        <Svg style={scrollLabelContainerStyle}>
          {showXAxisLabels && <SvgText {...defaultLabelStyle} {...scrollLabelStyle} {...defaultXAxisDataOffset} x={scrollGapWidth / 2} y={xAxisDataOffset}>
                {xAxisData[index]}
              </SvgText>}
        </Svg>
      </View>;
  };
  /** 从data中挨个取出多组数据并渲染到列表中 */


  const renderScrollGroupItem = ({
    index
  }) => {
    const multiGroupPoints = barPoints;
    /** 当前x轴索引上的所有点 */

    const currentXAxisIndexPoints = multiGroupPoints.map(groupPoints => groupPoints[index]);
    const barHeights = currentXAxisIndexPoints.map(point => height - paddingBottom - point[1]);
    const scrollLabelStyle = selectedIndex === index ? xAxisSelectedDataStyle : xAxisDataStyle;
    return <View style={flatListItemStyle}>
        <GroupBarItem containerHeight={height - paddingBottom} containerWidth={scrollGapWidth} containerActiveOpacity={girdActiveOpacity} containerUnderlayColor={gridUnderlayColor} dy={0} totalWidth={groupBarWidth} barHeights={barHeights} borderTopRadius={barBorderTopRadius} underlayColor={barUnderlayColor} identifier={index} fill={selectedIndex === index ? barSelectedFill : barRawFill} onPress={handlePress} />
        <Svg style={scrollLabelContainerStyle}>
          {showXAxisLabels && <SvgText {...defaultLabelStyle} {...scrollLabelStyle} {...defaultXAxisDataOffset} x={scrollGapWidth / 2} y={xAxisDataOffset}>
                {xAxisData[index]}
              </SvgText>}
        </Svg>
      </View>;
  };
  /** 创建滚动的柱形条 */


  const renderScrollBars = () => {
    if (xAxisData === undefined || xAxisData.length === 0 || xAxisMaxSplitNumber <= 0 || barPoints.length <= 0) {
      return null;
    }

    if (!multiple) {
      const groupPoints = barPoints;
      return <FlatList style={containerStyle} alwaysBounceHorizontal={false} initialScrollIndex={selectedIndex} showsHorizontalScrollIndicator={false} scrollEventThrottle={16} horizontal data={groupPoints} renderItem={renderScrollItem} getItemLayout={getScrollItemLayout} keyExtractor={keyExtractor} onScroll={onScroll} // TODO 很难去解释为什么初始的渲染数目要在xAxisMaxSplitNumber加1
      // 但是设置为xAxisMaxSplitNumber总是导致初始的渲染少一块
      initialNumToRender={fragmentSize + 1} />;
    }

    const multiGroupPoints = barPoints;
    /** 第一组数据点集合 */

    const firstGroupPoints = multiGroupPoints[0]; // .map((groupPoints) => groupPoints[0]);

    return <FlatList style={containerStyle} alwaysBounceHorizontal={false} initialScrollIndex={selectedIndex} showsHorizontalScrollIndicator={false} scrollEventThrottle={16} horizontal data={firstGroupPoints} renderItem={renderScrollGroupItem} getItemLayout={getScrollItemLayout} keyExtractor={keyExtractor} onScroll={onScroll} // TODO 很难去解释为什么初始的渲染数目要在xAxisMaxSplitNumber加1
    // 但是设置为xAxisMaxSplitNumber总是导致初始的渲染少一块
    initialNumToRender={fragmentSize + 1} />;
  };
  /** 创建静态x轴标签 */


  const renderStaticXAxisLabels = () => {
    if (showXAxisLabels !== true || xAxisData === undefined || xAxisData.length === 0 || xAxisMaxSplitNumber <= 0) {
      return null;
    }

    const newXAxisData = samplingLabels(xAxisData, xAxisMaxSplitNumber);
    /** 间隔数 */

    const newIntervals = itemAlign === 'start' ? newXAxisData.length - 1 : newXAxisData.length;
    const newGapWidth = (width - paddingHorizontal * 2) / Math.max(newIntervals, 1);
    const offset = itemAlign === 'start' ? 0 : newGapWidth / 2;
    return <Svg style={staticXAxisLabelsContainerStyle}>
        {newXAxisData.map(({
        value,
        idx
      }, splitIndex) => {
        const newXAxisDataStyle = idx === selectedIndex ? xAxisSelectedDataStyle : xAxisDataStyle;
        return <SvgText key={idx} {...defaultLabelStyle} {...newXAxisDataStyle} {...defaultXAxisDataOffset} x={splitIndex * newGapWidth + offset} y={xAxisDataOffset}>
                {value}
              </SvgText>;
      })}
      </Svg>;
  };

  const containerStyle = useMemo(() => ({ ...styles.flatList,
    width: itemAlign === 'middle' ? width - 2 * paddingHorizontal : width,
    height,
    left: itemAlign === 'middle' ? paddingHorizontal : 0
  }), [height, paddingHorizontal, itemAlign]);
  const flatListItemStyle = useMemo(() => ({
    width: scrollGapWidth,
    height
  }), [scrollGapWidth, height, itemAlign]);
  const scrollLabelContainerStyle = useMemo(() => ({
    marginTop: height - paddingBottom,
    width: scrollGapWidth,
    height: paddingBottom + defaultXAxisDataOffset.dy
  }), [scrollGapWidth, height, paddingBottom]);
  const staticXAxisLabelsContainerStyle = useMemo(() => ({
    marginTop: height - paddingBottom,
    width: '100%',
    height: paddingBottom + defaultXAxisDataOffset.dy
  }), [height, paddingBottom]);
  return useScroll ? renderScrollBars() : <View style={containerStyle}>
        {renderStaticChartBars()}
        {renderStaticXAxisLabels()}
      </View>;
};

const MemoBarChartView = React.memo(BarChartView);
export default MemoBarChartView;
const styles = StyleSheet.create({
  container: {
    position: 'absolute'
  },
  flatList: {
    position: 'absolute'
  }
});