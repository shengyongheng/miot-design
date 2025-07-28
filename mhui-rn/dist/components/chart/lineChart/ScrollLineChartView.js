import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import Svg, { Path, Text as SvgText } from 'react-native-svg';
import { bezierCommand, lineCommand, getSvgPathFragments } from "../SVGPathHelper";
import ScrollLineChartItem from "./ScrollLineChartItem";
import { SvgAnimatedCircle } from "../AnimatedCircle";
import Tooltip from "../Tooltip";
import { defaultXAxisDataOffset, defaultLabelStyle, DEFAULT_MIN_PRESS_RADIUS } from "../ChartConst";
const LINEAR_GRADIENT_LINE_ID = 'LINEAR_GRADIENT_LINE_ID';
const LINEAR_GRADIENT_AREA_ID = 'LINEAR_GRADIENT_AREA_ID';

const ScrollLineChartView = props => {
  const {
    initialSelectedIndex = -1,
    width = 300,
    height = 300,
    lineStrokeWidth = 2,
    paddingHorizontal = 30,
    paddingBottom = 30,
    curveLinePoints = [],
    xAxisDataStyle,
    xAxisSelectedDataStyle = xAxisDataStyle,
    xAxisMaxSplitNumber = 7,
    xAxisData = [],
    xAxisDataOffset = 20,
    curveLineColor,
    showShadowArea = false,
    shadowAreaColor = 'transparent',
    smoothing = true,
    onChangeIndex,
    showDot = true,
    dotStroke = 'blue',
    dotStrokeWidth = 2,
    dotFill = 'red',
    dotSelectedRadius = 6,
    toolTipWidth = 95,
    toolTipHeight = 26,
    toolTipFill,
    toolTipTextColor,
    tooltipFormatter,
    showTooltip = true,
    scrollHeaderOrFooterWidth = 20
  } = props;
  /** 是否是首次加载 */

  const isFirst = useRef(true);
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  /** 是否滚动 */

  const [scrolling, setScrolling] = useState(false);
  /** 记录每次滚动的偏移量 */

  const scrollOffsetXRef = useRef(0);
  /** 圆球能够检测到按压动作的半径 */

  const touchableRadius = curveLinePoints.length > 1 ? Math.max(width / (curveLinePoints.length - 1) / 2, DEFAULT_MIN_PRESS_RADIUS) : DEFAULT_MIN_PRESS_RADIUS;
  /** 每个片段大小 */

  const fragmentSize = Math.max(1, Math.min(xAxisMaxSplitNumber, curveLinePoints.length));
  /** 相邻片段的间距 */

  const adjacentDistance = width - paddingHorizontal * 2;
  /** 相邻坐标点在x轴方向上的间距 */

  const scrollPointGapWidth = (width - paddingHorizontal * 2) / Math.max(fragmentSize - 1, 1);
  /** 滚动头部1组件或尾部组件的样式 */

  const scrollHeaderOrFooterStyle = useMemo(() => ({
    height,
    width: scrollHeaderOrFooterWidth
  }), [height, scrollHeaderOrFooterWidth]);
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
  /** 每次滚动完成，记录在x轴方向上的滚动距离 */

  const handleScroll = useCallback(({
    nativeEvent
  }) => {
    const {
      contentOffset: {
        x
      }
    } = nativeEvent;
    scrollOffsetXRef.current = x;
  }, []);
  const handlePressOffset = useCallback(offsetX => {
    const index = Math.round(offsetX / scrollPointGapWidth);
    setSelectedIndex(index);
  }, [scrollPointGapWidth]);
  const handleMomentumScrollBegin = useCallback(() => {
    setScrolling(true);
  }, []);
  const handleMomentumScrollEnd = useCallback(() => {
    setScrolling(false);
  }, []);
  const handlePressFirst = useCallback(() => {
    setSelectedIndex(0);
  }, []);
  const handlePressLast = useCallback(() => {
    const lastIndex = Math.max(0, curveLinePoints.length - 1);
    setSelectedIndex(lastIndex);
  }, [curveLinePoints.length]);
  /**
   * 生成折线片段。选择合适片段大小，使得一个片段恰好占据滚动区域，避免FlatList渲染时，相邻列表项之间会出现空白区域
   * https://stackoverflow.com/questions/63502135/a-lot-of-white-space-between-items-of-a-flat-list-in-react-native
   */

  const fragmentItems = useMemo(() => {
    const command = smoothing ? bezierCommand : lineCommand;
    const truncValue = height - paddingBottom;
    return getSvgPathFragments(curveLinePoints, command, fragmentSize, truncValue);
  }, [curveLinePoints, smoothing, height, paddingBottom, fragmentSize]);
  /** 通过折线片段绘制Path */

  const chartLinePaths = useMemo(() => {
    if (curveLinePoints?.length < 1) {
      return [];
    }

    const stroke = typeof curveLineColor !== 'string' && typeof curveLineColor !== 'undefined' ? `url(#${LINEAR_GRADIENT_LINE_ID})` : curveLineColor;
    return fragmentItems.map(fragment => <Path pointerEvents="none" d={fragment} fill="none" strokeWidth={lineStrokeWidth} stroke={stroke} />);
  }, [fragmentItems, curveLineColor, curveLinePoints, lineStrokeWidth]);
  /** 创建阴影区域 */

  const createShadowArea = (linePath, startPoint, endPoint) => {
    if (!showShadowArea) {
      return null;
    }
    /** 阴影部分路径（封闭） */


    const shadowAreaPath = `${linePath} 
    L${endPoint[0]}, ${height - paddingBottom}, 
    L${startPoint[0]}, ${height - paddingBottom},
    L${startPoint[0]}, ${startPoint[1]}`;
    const areaFill = typeof shadowAreaColor !== 'string' && typeof shadowAreaColor !== 'undefined' ? `url(#${LINEAR_GRADIENT_AREA_ID})` : shadowAreaColor;
    return <Path pointerEvents="none" d={shadowAreaPath} fill={areaFill} strokeWidth={0} stroke="transparent" />;
  };
  /** 获取item的布局。仅用于滚动情况 */


  const getScrollLinePathItemLayout = useCallback((items, index) => ({
    length: adjacentDistance,
    offset: adjacentDistance * index,
    index
  }), [adjacentDistance]);
  /** 为给定的 item 生成一个不重复的 key。仅用于滚动情况 */

  const keyExtractor = useCallback((item, index) => `${item}_${index}`, []);
  /** 渲染空白头部组件。目前仅用于辅助折线图显示完整 */

  const renderListHeaderComponent = useCallback(() => {
    if (xAxisData.length <= 0) {
      return null;
    }

    const newXAxisDataStyle = selectedIndex === 0 ? xAxisSelectedDataStyle : xAxisDataStyle;
    return <Svg style={scrollHeaderOrFooterStyle} onPress={handlePressFirst}>
        <SvgText {...defaultLabelStyle} {...newXAxisDataStyle} {...defaultXAxisDataOffset} x={scrollHeaderOrFooterStyle.width} y={height - paddingBottom + xAxisDataOffset}>
          {xAxisData[0]}
        </SvgText>
      </Svg>;
  }, [selectedIndex, xAxisData, xAxisDataOffset, height, paddingBottom, scrollHeaderOrFooterStyle]);
  /** 渲染空白尾部组件。目前仅用于辅助折线图显示完整 */

  const renderListFooterComponent = useCallback(() => {
    if (xAxisData.length <= 0) {
      return null;
    }

    const newXAxisDataStyle = selectedIndex === xAxisData.length - 1 ? xAxisSelectedDataStyle : xAxisDataStyle;
    return <Svg style={scrollHeaderOrFooterStyle} onPress={handlePressLast}>
        <SvgText {...defaultLabelStyle} {...newXAxisDataStyle} {...defaultXAxisDataOffset} x={0} y={height - paddingBottom + xAxisDataOffset}>
          {xAxisData[xAxisData.length - 1]}
        </SvgText>
      </Svg>;
  }, [selectedIndex, xAxisData, xAxisDataOffset, paddingBottom, height, scrollHeaderOrFooterStyle]);
  /** 从data中挨个取出多组折线片段并渲染到列表中。为了让折线连贯，除了要渲染当前的折线片段，也要渲染前后的折线片段 */

  const renderScrollLinePathItem = ({
    index
  }) => {
    const newChartLineFragments = chartLinePaths;
    const startIndex = index * (fragmentSize - 1);
    const endIndex = Math.min((index + 1) * (fragmentSize - 1), curveLinePoints.length - 1);
    const itemWidth = curveLinePoints[endIndex][0] - curveLinePoints[startIndex][0];
    /** x轴数据。防止被截断。 */

    const newXAxisData = xAxisData.slice(Math.max(startIndex - 0, 0), Math.min(endIndex + 1, curveLinePoints.length));
    return <>
        <ScrollLineChartItem startOffsetX={adjacentDistance * index} onPressOffset={handlePressOffset} width={itemWidth} height={height} paddingHorizontal={paddingHorizontal} paddingBottom={paddingBottom} viewBox={`${adjacentDistance * index + paddingHorizontal} 0 ${itemWidth} ${height}`} linearGradientConfig={linearGradientConfig}>
          {index - 1 >= 0 ? newChartLineFragments[index - 1] : null}
          {newChartLineFragments[index]}
          {index + 1 < curveLinePoints.length ? newChartLineFragments[index + 1] : null}
          {createShadowArea(fragmentItems[index], curveLinePoints[startIndex], curveLinePoints[endIndex])}
        </ScrollLineChartItem>
        <Svg style={[scrollLabelContainerStyle, {
        width: itemWidth
      }]}>
          {newXAxisData.map((axisValue, axisDataIndex) => {
          const newXAxisDataStyle = selectedIndex === startIndex + axisDataIndex ? xAxisSelectedDataStyle : xAxisDataStyle;
          return <SvgText // eslint-disable-next-line react/no-array-index-key
          key={axisDataIndex} {...defaultLabelStyle} {...newXAxisDataStyle} {...defaultXAxisDataOffset} x={axisDataIndex * scrollPointGapWidth} y={xAxisDataOffset}>
                  {axisValue}
                </SvgText>;
        })}
        </Svg>
      </>;
  };
  /**
   * 生成dot。无限滚动时，只支持渲染一个球。
   */


  const renderDot = () => {
    if (!showDot || dotSelectedRadius === 0 || scrolling || selectedIndex >= curveLinePoints.length || selectedIndex < 0) {
      return null;
    }

    const [x, y] = curveLinePoints[selectedIndex];
    const newX = x + scrollHeaderOrFooterWidth; // 边界限制

    if (newX + dotSelectedRadius / 2 - scrollOffsetXRef.current < paddingHorizontal || newX - dotSelectedRadius / 2 - scrollOffsetXRef.current > width - paddingHorizontal) {
      return null;
    }

    return <SvgAnimatedCircle isSelected x={newX - scrollOffsetXRef.current} y={y} r={dotSelectedRadius} fill={dotFill} stroke={dotStroke} strokeWidth={dotStrokeWidth} hitSlop={Math.max(touchableRadius - dotSelectedRadius, 0)} />;
  };
  /** 渲染提示框 */


  const renderTooltip = () => {
    if (!showTooltip || scrolling || selectedIndex < 0 || selectedIndex >= curveLinePoints.length) {
      return null;
    }

    const [x, y] = curveLinePoints[selectedIndex];
    const newX = x + scrollHeaderOrFooterWidth; // 计算tooltip不被遮挡的位置

    const circleRadius = dotSelectedRadius + dotStrokeWidth;
    const offsetX = circleRadius + toolTipWidth;
    const offsetY = circleRadius + toolTipHeight;
    const newLeft = Math.min(newX - scrollOffsetXRef.current, width - offsetX);
    const newTop = Math.min(y - offsetY, height - offsetY); // 边界限制

    if (newX + dotSelectedRadius / 2 - scrollOffsetXRef.current < paddingHorizontal || newX - dotSelectedRadius / 2 - scrollOffsetXRef.current > width - paddingHorizontal) {
      return null;
    }

    const toolTipText = typeof tooltipFormatter === 'function' ? tooltipFormatter(selectedIndex) : `${curveLinePoints[selectedIndex][1] || ''}`;
    return <Tooltip x={newLeft} y={newTop} width={toolTipWidth} height={toolTipHeight} text={toolTipText} textColor={toolTipTextColor} fill={toolTipFill} />;
  };
  /** 滚动区域样式 */


  const scrollLineChartContainerStyle = useMemo(() => ({
    position: 'absolute',
    left: paddingHorizontal,
    right: paddingHorizontal,
    height,
    width: width - 2 * paddingHorizontal
  }), [paddingHorizontal, width, height]);
  /** x轴滚动标签样式 */

  const scrollLabelContainerStyle = useMemo(() => ({
    position: 'absolute',
    marginTop: height - paddingBottom,
    height: paddingBottom + defaultXAxisDataOffset.dy
  }), [height, paddingBottom]);
  /** 线性渐变配置 */

  const linearGradientConfig = useMemo(() => [{
    stopColor: curveLineColor,
    id: LINEAR_GRADIENT_LINE_ID
  }, {
    stopColor: shadowAreaColor,
    id: LINEAR_GRADIENT_AREA_ID
  }], [curveLineColor, shadowAreaColor]);
  /** 折线片段滚动所需要数据。FlatList的data需是平凡数组类型。 */

  const scrollLineChartData = useMemo(() => Array(chartLinePaths.length).fill(0), [chartLinePaths.length]);
  return <>
      <FlatList style={scrollLineChartContainerStyle} removeClippedSubviews={false} showsHorizontalScrollIndicator={false} alwaysBounceHorizontal={false} horizontal scrollEventThrottle={16} data={scrollLineChartData} initialNumToRender={1} ListHeaderComponent={renderListHeaderComponent} ListFooterComponent={renderListFooterComponent} ItemSeparatorComponent={null} renderItem={renderScrollLinePathItem} keyExtractor={keyExtractor} getItemLayout={getScrollLinePathItemLayout} onScroll={handleScroll} onScrollBeginDrag={handleMomentumScrollBegin} onMomentumScrollEnd={handleMomentumScrollEnd} />
      {renderDot()}
      {renderTooltip()}
    </>;
};

export default ScrollLineChartView;