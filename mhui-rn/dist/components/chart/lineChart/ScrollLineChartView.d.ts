import React from 'react';
import { RectCoordinateSystemPropsType, LabelStyle } from '../interface';
import { StopColorType } from '../LineGradientHelper';
export interface ScrollLineChartViewPropsType extends RectCoordinateSystemPropsType {
    xAxisSelectedDataStyle?: LabelStyle;
    smoothing?: boolean;
    curveLinePoints: Array<Array<number>>;
    lineStrokeWidth?: number;
    curveLineColor?: Array<StopColorType> | string;
    showShadowArea?: boolean;
    shadowAreaColor?: Array<StopColorType> | string;
    scrollHeaderOrFooterWidth?: number;
    showTooltip?: boolean;
    showDot?: boolean;
    dotFill?: string;
    dotStroke?: string;
    dotStrokeWidth?: number;
    dotSelectedRadius?: number;
    onChangeIndex?: (idx: number) => void;
    toolTipWidth?: number;
    toolTipHeight?: number;
    toolTipFill?: string;
    toolTipTextColor?: string;
    tooltipFormatter?: (currentIndex: number) => string;
    initialSelectedIndex?: number;
}
declare const ScrollLineChartView: React.FC<ScrollLineChartViewPropsType>;
export default ScrollLineChartView;
