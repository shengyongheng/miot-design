import React, { useCallback } from 'react';
import RectCoordinateSystem from "../RectCoordinateSystem";

const ScrollLineChartItem = props => {
  const {
    startOffsetX = 0,
    width,
    height,
    viewBox,
    linearGradientConfig,
    paddingHorizontal = 0,
    paddingBottom = 0,
    onPressOffset,
    children
  } = props;
  const handlePress = useCallback(({
    nativeEvent
  }) => {
    if (typeof onPressOffset === 'function') {
      const {
        locationX
      } = nativeEvent;
      onPressOffset(startOffsetX + locationX);
    }
  }, [onPressOffset, startOffsetX]);
  return <RectCoordinateSystem width={width} height={height} showXAxisLabels={false} showYAxisLabels={false} showXAxisLine={false} paddingHorizontal={paddingHorizontal} paddingBottom={paddingBottom} viewBox={viewBox} gestureEnable={false} linearGradientConfig={linearGradientConfig} onPress={handlePress}>
      {children}
    </RectCoordinateSystem>;
};

export default ScrollLineChartItem;