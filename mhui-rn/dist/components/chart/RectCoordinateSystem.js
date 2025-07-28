import React, { useMemo, useRef, useCallback } from 'react';
import { StyleSheet, PanResponder } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Line, Text as SvgText, Rect } from 'react-native-svg';
import { samplingLabels } from "./SamplingLabelsHelper";
import { extractViewBox } from "./Utils";
/** 最小点击区域 */

const DEFAULT_MIN_PRESS_RADIUS = 10;

const RectCoordinateSystem = props => {
  const {
    width = 300,
    height = 300,
    viewBox,
    paddingHorizontal = 30,
    paddingBottom = 30,
    xAxisDataStyle,
    xAxisMaxSplitNumber = DEFAULT_X_AXIS_MAX_SPLIT_NUM,
    xAxisLineStyle,
    xAxisData = [],
    xAxisDataOffset = 20,
    showXAxisLabels = true,
    showYAxisLabels = true,
    yAxisDataStyle,
    yAxisLabels = [],
    yAxisDataOffset = 0,
    showHorizontalSplitLine = true,
    showVerticalSplitLine = false,
    showXAxisLine = true,
    splitLineStyle,
    linearGradientConfig = [],
    itemAlign = 'start',
    gestureEnable = true,
    onResponderMove,
    onPress,
    children
  } = props;
  /** 圆球能够检测到按压动作的半径 */

  const touchableRadius = xAxisData.length > 1 ? Math.max(width / (xAxisData.length - 1) / 2, DEFAULT_MIN_PRESS_RADIUS) : DEFAULT_MIN_PRESS_RADIUS;
  /** 是否有手势事件响应 */

  const panResponderBusyRef = useRef(false);
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

      if (typeof onResponderMove === 'function') {
        onResponderMove(event, gestureState);
      }
    },
    onMoveShouldSetPanResponder: () => true,
    onPanResponderRelease: () => {
      panResponderBusyRef.current = false;
    }
  });
  /** 点击图表空白区域的回调 */

  const handlePress = useCallback(event => {
    if (panResponderBusyRef.current === true) {
      return;
    }

    if (typeof onPress === 'function') {
      onPress(event);
    }
  }, [onPress]);
  /** 创建分割线 */

  const createHorizontalSplitLine = () => {
    if (!showHorizontalSplitLine) {
      return null;
    }

    const newSplitLineStyle = { ...defaultLineStyle,
      ...splitLineStyle
    };
    return (// eslint-disable-next-line react/no-array-index-key
      yAxisLabels.map(({
        value
      }, idx) => <Line key={idx} x1={paddingHorizontal} y1={value} x2={width - paddingHorizontal} y2={value} {...newSplitLineStyle} />)
    );
  };
  /** 创建分割线 */


  const createVerticalSplitLine = () => {
    if (!showVerticalSplitLine) {
      return null;
    }

    if (xAxisData === undefined || xAxisData.length <= 1 || xAxisMaxSplitNumber <= 1) {
      return null;
    }

    const newXAxisData = samplingLabels(xAxisData, xAxisMaxSplitNumber);
    /** 间隔数 */

    const newIntervals = itemAlign === 'start' ? newXAxisData.length - 1 : newXAxisData.length;
    const newGapWidth = (width - paddingHorizontal * 2) / newIntervals;
    const newSplitLineStyle = { ...defaultLineStyle,
      ...splitLineStyle
    };
    return Array(newXAxisData.length + 1).fill(0).map((_value, idx) => <Line // eslint-disable-next-line react/no-array-index-key
    key={idx} x1={idx * newGapWidth + paddingHorizontal} y1={0} x2={idx * newGapWidth + paddingHorizontal} y2={height - paddingBottom} {...newSplitLineStyle} />);
  };
  /** 创建x轴线 */


  const createXAxisLine = () => {
    if (!showXAxisLine) {
      return null;
    }

    const newXAxisLineStyle = { ...defaultLineStyle,
      ...xAxisLineStyle
    };
    return <Line x1={paddingHorizontal} y1={height - paddingBottom} x2={width - paddingHorizontal} y2={height - paddingBottom} {...newXAxisLineStyle} />;
  };
  /** 创建x轴标签 */


  const createXAxisLabels = () => {
    if (showXAxisLabels !== true || xAxisData === undefined || xAxisData.length === 0 || xAxisMaxSplitNumber <= 0) {
      return null;
    }

    const newXAxisData = samplingLabels(xAxisData, xAxisMaxSplitNumber);
    /** 间隔数 */

    const newIntervals = itemAlign === 'start' ? newXAxisData.length - 1 : newXAxisData.length;
    const newGapWidth = (width - paddingHorizontal * 2) / Math.max(newIntervals, 1);
    const offset = itemAlign === 'start' ? 0 : newGapWidth / 2;
    const newXAxisDataStyle = { ...defaultLabelStyle,
      ...xAxisDataStyle
    };
    return newXAxisData.map(({
      value,
      idx
    }, splitIndex) => <SvgText key={idx} {...newXAxisDataStyle} {...defaultXAxisDataOffset} x={splitIndex * newGapWidth + paddingHorizontal + offset} y={height - paddingBottom + xAxisDataOffset}>
          {value}
        </SvgText>);
  };
  /** 创建y轴 */


  const createYAxisLabels = () => {
    if (!showYAxisLabels) {
      return null;
    }

    const newYAxisDataStyle = { ...defaultLabelStyle,
      ...yAxisDataStyle
    };
    return yAxisLabels.map(({
      value,
      label
    }) => <SvgText key={value} fill="none" {...newYAxisDataStyle} {...defaultYAxisDataOffset} x={paddingHorizontal + yAxisDataOffset} y={value}>
          {label}
        </SvgText>);
  };
  /** 创建渐变色 */


  const createLinearGradient = useCallback((linearGradientId, stopColors) => {
    if (Array.isArray(stopColors) && stopColors.length > 0) {
      return <LinearGradient key={linearGradientId} id={linearGradientId} gradientUnits="userSpaceOnUse" x1={paddingHorizontal} y1={height - paddingBottom} x2={paddingHorizontal} y2={paddingBottom}>
          {stopColors?.map(({
          offset,
          color,
          opacity
        }) => <Stop key={`${offset}-${color}`} offset={offset} stopColor={color} stopOpacity={opacity} />)}
        </LinearGradient>;
    }

    return null;
  }, [paddingHorizontal, paddingBottom, height]);
  const defLinearGradients = useMemo(() => linearGradientConfig.map(({
    stopColor,
    id
  }) => createLinearGradient(id, stopColor)), [linearGradientConfig, createLinearGradient]);
  const panHandlers = gestureEnable ? panResponder.panHandlers : undefined;
  const [viewBoxX = 0, viewBoxY = 0] = extractViewBox(viewBox) || [];
  return <>
      <Svg height={height} width={width} viewBox={viewBox} onPress={handlePress} {...panHandlers}>
        <Defs>{defLinearGradients}</Defs>
        <Rect x={viewBoxX} y={viewBoxY} width={width} height={height} fill="none" strokeWidth={0} // 解决Svg在IOS上点击可能会无效的BUG
      onPress={handlePress} />
        {createHorizontalSplitLine()}
        {createVerticalSplitLine()}
        {createXAxisLine()}
        {createXAxisLabels()}
        {createYAxisLabels()}
        {children}
      </Svg>

    </>;
};

const MemoRectCoordinateSystem = React.memo(RectCoordinateSystem);
export default MemoRectCoordinateSystem;
const DEFAULT_X_AXIS_MAX_SPLIT_NUM = 7;
/** 默认x轴数据距离x轴偏移量 */

const defaultXAxisDataOffset = {
  dx: 0,
  dy: -5
};
/** 默认y轴数据距离x轴偏移量 */

const defaultYAxisDataOffset = {
  dx: 0,
  dy: 10
};
/** 默认分割线样式 */

const defaultLineStyle = {
  stroke: 'rgba(0,0,0,0.20)',
  strokeWidth: StyleSheet.hairlineWidth,
  strokeDasharray: [10, 5]
};
/** 默认标签样式 */

const defaultLabelStyle = {
  fill: '#B2B2B2',
  strokeWidth: '0.5',
  fontSize: '10',
  // '10', // '10',
  fontFamily: 'MILanPro--GB1-4',
  textAnchor: 'middle' // 'start',

};