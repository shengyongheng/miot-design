import React, { useMemo } from 'react';
import { Path } from 'react-native-svg';
import getSvgPath, { bezierCommand, lineCommand } from "../SVGPathHelper";
import RectCoordinateSystem from "../RectCoordinateSystem";
import ChartInteractivity from "./ChartInteractivity";
const LINEAR_GRADIENT_LINE_ID = 'LINEAR_GRADIENT_LINE_ID';
const LINEAR_GRADIENT_AREA_ID = 'LINEAR_GRADIENT_AREA_ID';

const LineChartView = props => {
  const {
    width = 300,
    height = 300,
    lineStrokeWidth = 2,
    paddingHorizontal = 30,
    paddingBottom = 30,
    curveLinePoints = [],
    xAxisDataStyle,
    xAxisMaxSplitNumber,
    xAxisLineStyle,
    xAxisSelectedDataStyle = xAxisDataStyle,
    xAxisData = [],
    xAxisDataOffset = 20,
    showYAxisLabels = true,
    yAxisDataStyle,
    yAxisLabels = [],
    yAxisDataOffset = 0,
    showHorizontalSplitLine = true,
    showVerticalSplitLine = false,
    splitLineStyle,
    curveLineColor,
    showShadowArea = false,
    shadowAreaColor = 'transparent',
    smoothing = true,
    itemAlign = 'start',
    initialSelectedIndex = -1,
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
    toolTipFill,
    toolTipTextColor,
    tooltipFormatter,
    onChangeIndex
  } = props;
  const linePath = useMemo(() => {
    const command = smoothing ? bezierCommand : lineCommand;
    const truncValue = height - paddingBottom;
    return getSvgPath(curveLinePoints, command, truncValue);
  }, [curveLinePoints, smoothing, height, paddingBottom]);
  /** 创建折线 */

  const createChartLine = () => {
    if (curveLinePoints?.length < 1) {
      return null;
    }

    const stroke = typeof curveLineColor !== 'string' && typeof curveLineColor !== 'undefined' ? `url(#${LINEAR_GRADIENT_LINE_ID})` : curveLineColor;
    return <Path pointerEvents="none" d={linePath} fill="none" strokeWidth={lineStrokeWidth} stroke={stroke} />;
  };
  /** 创建阴影区域 */


  const createShadowArea = () => {
    if (curveLinePoints?.length <= 1 || !showShadowArea) {
      return null;
    }

    const startPoint = curveLinePoints[0];
    const endPoints = curveLinePoints[curveLinePoints.length - 1];
    /** 阴影部分路径（封闭） */

    const shadowAreaPath = `${linePath} 
    L${endPoints[0]}, ${height - paddingBottom}, 
    L${startPoint[0]}, ${height - paddingBottom},
    L${startPoint[0]}, ${startPoint[1]}`;
    const areaFill = typeof shadowAreaColor !== 'string' && typeof shadowAreaColor !== 'undefined' ? `url(#${LINEAR_GRADIENT_AREA_ID})` : shadowAreaColor;
    return <Path pointerEvents="none" d={shadowAreaPath} fill={areaFill} strokeWidth={0} stroke="transparent" />;
  };

  const linearGradientConfig = useMemo(() => [{
    stopColor: curveLineColor,
    id: LINEAR_GRADIENT_LINE_ID
  }, {
    stopColor: shadowAreaColor,
    id: LINEAR_GRADIENT_AREA_ID
  }], [curveLineColor, shadowAreaColor]);
  return <>
      <RectCoordinateSystem width={width} height={height} paddingHorizontal={paddingHorizontal} paddingBottom={paddingBottom} showXAxisLabels={false} xAxisDataStyle={xAxisDataStyle} xAxisMaxSplitNumber={xAxisMaxSplitNumber} xAxisLineStyle={xAxisLineStyle} xAxisData={xAxisData} xAxisDataOffset={xAxisDataOffset} showYAxisLabels={showYAxisLabels} yAxisDataStyle={yAxisDataStyle} yAxisLabels={yAxisLabels} yAxisDataOffset={yAxisDataOffset} showHorizontalSplitLine={showHorizontalSplitLine} showVerticalSplitLine={showVerticalSplitLine} splitLineStyle={splitLineStyle} itemAlign={itemAlign} linearGradientConfig={linearGradientConfig}>
        {createChartLine()}
        {createShadowArea()}
      </RectCoordinateSystem>
      <ChartInteractivity initialSelectedIndex={initialSelectedIndex} xAxisDataStyle={xAxisDataStyle} xAxisSelectedDataStyle={xAxisSelectedDataStyle} paddingHorizontal={paddingHorizontal} paddingBottom={paddingBottom} xAxisDataOffset={xAxisDataOffset} xAxisData={xAxisData} xAxisMaxSplitNumber={xAxisMaxSplitNumber} itemAlign={itemAlign} showDot={showDot} showTooltip={showTooltip} chartPoints={curveLinePoints} width={width} height={height} dotRawPassable={dotRawPassable} dotStroke={dotStroke} dotStrokeWidth={dotStrokeWidth} dotFill={dotFill} dotRawRadius={dotRawRadius} dotSelectedRadius={dotSelectedRadius} toolTipWidth={toolTipWidth} toolTipHeight={toolTipHeight} toolTipFill={toolTipFill} toolTipTextColor={toolTipTextColor} tooltipFormatter={tooltipFormatter} onChange={onChangeIndex} />
    </>;
};

const MemoLineChartView = React.memo(LineChartView);
export default MemoLineChartView;