import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PanResponder, StyleSheet, TouchableWithoutFeedback, Platform, View } from 'react-native';
import Svg, { Text as SvgText } from 'react-native-svg';
import AnimatedCircle from "../AnimatedCircle";
import { samplingLabels } from "../SamplingLabelsHelper";
import Tooltip from "../Tooltip";
import { defaultXAxisDataOffset, defaultLabelStyle, DEFAULT_MIN_PRESS_RADIUS, DEFAULT_X_AXIS_MAX_SPLIT_NUM } from "../ChartConst";
/** dotRawPassable开启的最大点数限制 */

const MAX_POINTS_CAN_RAW_PASSABLE = 30;

/**
 * ChartInteractivity
 * @description 渲染动球和提示框，负责手势，点击交互等交互动作。点击路径经常会失效，因为也需要更为实在的点
 */
const ChartInteractivity = props => {
  const {
    initialSelectedIndex = 0,
    xAxisDataStyle,
    xAxisSelectedDataStyle,
    paddingHorizontal = 30,
    paddingBottom = 30,
    xAxisDataOffset = 30,
    xAxisData = [],
    xAxisMaxSplitNumber = DEFAULT_X_AXIS_MAX_SPLIT_NUM,
    itemAlign = 'start',
    chartPoints = [],
    dotStroke = 'blue',
    dotStrokeWidth = 2,
    dotFill = 'red',
    dotSelectedRadius = 6,
    dotRawRadius = 0,
    dotRawPassable = false,
    toolTipWidth = 95,
    toolTipHeight = 26,
    toolTipFill,
    toolTipTextColor,
    tooltipFormatter,
    showTooltip = true,
    showDot = true,
    gestureEnable = true,
    onChange,
    width,
    height
  } = props;
  /** 圆球能够检测到按压动作的半径 */

  const touchableRadius = chartPoints.length > 1 ? Math.max(width / (chartPoints.length - 1) / 2, DEFAULT_MIN_PRESS_RADIUS) : DEFAULT_MIN_PRESS_RADIUS;
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex);
  /** 是否有手势事件响应 */

  const panResponderBusyRef = useRef(false);
  /** 先前选中项索引 */

  const prevSelectedIndexRef = useRef(initialSelectedIndex);
  /** 先前初始化的选中项索引 */

  const prevInitialSelectedIndexRef = useRef(initialSelectedIndex);
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => false,
    onMoveShouldSetPanResponderCapture: () => false,
    onPanResponderGrant: () => {
      panResponderBusyRef.current = true;
    },
    onPanResponderMove: (event, gestureState) => {
      const {
        dx
      } = gestureState;

      if (Math.abs(dx) < touchableRadius) {
        return;
      }

      const numPoints = chartPoints.length;

      if (dx > 0) {
        const newSelectedIndex = Math.min(selectedIndex + 1, numPoints - 1);
        setSelectedIndex(newSelectedIndex);
      } else {
        const newSelectedIndex = Math.max(selectedIndex - 1, 0);
        setSelectedIndex(newSelectedIndex);
      }
    },
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: () => {
      panResponderBusyRef.current = false;
    }
  });
  const panHandlers = gestureEnable ? panResponder.panHandlers : undefined;
  useEffect(() => {
    // 如果组件自身状态已改变，则忽略从外部传入的变化
    // 避免在手势滑动过程中，属性改变和状态改变导致死循环
    if (prevSelectedIndexRef.current !== selectedIndex) {
      prevInitialSelectedIndexRef.current = initialSelectedIndex;
      prevSelectedIndexRef.current = selectedIndex;
      return;
    }

    if (initialSelectedIndex !== prevInitialSelectedIndexRef.current && initialSelectedIndex !== selectedIndex) {
      setSelectedIndex(initialSelectedIndex);
    }

    prevInitialSelectedIndexRef.current = initialSelectedIndex;
    prevSelectedIndexRef.current = selectedIndex;
  }, [initialSelectedIndex, selectedIndex]);
  useEffect(() => {
    if (typeof onChange === 'function') {
      onChange(selectedIndex);
    }
  }, [selectedIndex, onChange]);
  /** 点击动球的回调 */

  const handleDotPress = useCallback(newSelectedIndex => {
    if (typeof newSelectedIndex === 'number') {
      setSelectedIndex(newSelectedIndex);
    }
  }, []);
  /** 点击图表空白区域的回调 */

  const handleContainerPress = useCallback(({
    nativeEvent
  }) => {
    if (panResponderBusyRef.current) {
      return;
    }

    if (chartPoints.length < 1) {
      return;
    }

    if (chartPoints.length === 1) {
      setSelectedIndex(0);
      return;
    }

    const {
      locationX
    } = nativeEvent;
    const xAxisStart = chartPoints[0][0];
    const gapWidth = chartPoints[1][0] - chartPoints[0][0];
    const newSelectedIndex = Math.round((locationX - xAxisStart) / gapWidth);

    if (newSelectedIndex >= 0 && newSelectedIndex < chartPoints.length) {
      setSelectedIndex(newSelectedIndex);
    }
  }, [chartPoints]);
  /**
   * 生成dots
   * @description 9.5.3版本不支持Marker
   */

  const createDots = () => {
    if (!showDot || dotRawRadius === 0 && dotSelectedRadius === 0) {
      return null;
    }

    const newDotRawPassable = chartPoints.length <= MAX_POINTS_CAN_RAW_PASSABLE && dotRawPassable;

    if (dotRawRadius === 0 && newDotRawPassable !== true) {
      if (selectedIndex >= chartPoints.length || selectedIndex < 0) {
        return null;
      } // 当设置未被选中的点半径为0时，只需要渲染选中的点即可


      const [x, y] = chartPoints[selectedIndex];
      return <AnimatedCircle isSelected x={x} y={y} r={dotSelectedRadius} fill={dotFill} stroke={dotStroke} strokeWidth={dotStrokeWidth} onPress={handleDotPress} hitSlop={Math.max(touchableRadius - dotSelectedRadius, 0)} />;
    }

    const dotSelectedFill = dotFill;
    const dotSelectedStroke = dotStroke;
    const dotRawFill = newDotRawPassable && dotRawRadius === 0 ? 'transparent' : dotFill;
    const dotRawStroke = newDotRawPassable && dotRawRadius === 0 ? 'transparent' : dotStroke;
    return chartPoints.map(([x, y], idx) => {
      const isSelected = selectedIndex === idx;
      const newDotRadius = isSelected ? dotSelectedRadius : dotRawRadius;
      return <AnimatedCircle // eslint-disable-next-line react/no-array-index-key
      key={idx} identifier={idx} isSelected={isSelected} x={x} y={y} r={newDotRadius} fill={isSelected ? dotSelectedFill : dotRawFill} stroke={isSelected ? dotSelectedStroke : dotRawStroke} strokeWidth={dotStrokeWidth} onPress={handleDotPress} hitSlop={Math.max(touchableRadius - newDotRadius, 0)} />;
    });
  };

  const createTooltip = () => {
    if (!showTooltip || selectedIndex < 0 || selectedIndex >= chartPoints.length) {
      return null;
    }

    const point = chartPoints[selectedIndex]; // 计算tooltip不被遮挡的位置

    const circleRadius = dotSelectedRadius + dotStrokeWidth;
    const offsetX = circleRadius + toolTipWidth;
    const offsetY = circleRadius + toolTipHeight;
    const newLeft = Math.min(point[0], width - offsetX);
    const newTop = Math.min(point[1] - offsetY, height - offsetY);
    const toolTipText = typeof tooltipFormatter === 'function' ? tooltipFormatter(selectedIndex) : `${chartPoints[selectedIndex][1] || ''}`;
    return <Tooltip x={newLeft} y={newTop} width={toolTipWidth} height={toolTipHeight} text={toolTipText} textColor={toolTipTextColor} fill={toolTipFill} />;
  };
  /** 渲染x轴数据标签 */


  const renderXAxisData = () => {
    const newXAxisData = samplingLabels(xAxisData, xAxisMaxSplitNumber);
    /** 间隔数 */

    const newIntervals = itemAlign === 'start' ? xAxisData.length - 1 : xAxisData.length;
    const newGapWidth = (width - paddingHorizontal * 2) / Math.max(newIntervals, 1);
    const offset = itemAlign === 'start' ? 0 : newGapWidth / 2;
    return newXAxisData.map(({
      value,
      idx
    }) => {
      const newXAxisDataStyle = { ...defaultLabelStyle,
        ...(idx === selectedIndex ? xAxisSelectedDataStyle : xAxisDataStyle)
      };
      return <SvgText key={idx} {...newXAxisDataStyle} {...defaultXAxisDataOffset} x={idx * newGapWidth + paddingHorizontal + offset} y={height - paddingBottom + xAxisDataOffset}>
            {value}
          </SvgText>;
    });
  };
  /**
   * IOS需要svg在View下面，是为了防止dots点击失效
   * Amazing code
   */


  const renderIOS = () => <>
      <View style={styles.containerStyle} {...panHandlers}>
        <TouchableWithoutFeedback onPress={handleContainerPress}>
          <View style={styles.containerStyle} />
        </TouchableWithoutFeedback>
        {createTooltip()}
      </View>
      <Svg style={styles.containerStyle}>
        {renderXAxisData()}
        {createDots()}
      </Svg>
    </>;

  const renderAndroid = () => <View style={styles.containerStyle} {...panHandlers}>
      <Svg style={styles.containerStyle} onPress={handleContainerPress}>
        {renderXAxisData()}
        {createDots()}
        {createTooltip()}
      </Svg>
    </View>;

  if (chartPoints.length === 0) {
    return null;
  }

  return Platform.OS === 'ios' ? renderIOS() : renderAndroid();
};

export default ChartInteractivity;
const styles = StyleSheet.create({
  containerStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});