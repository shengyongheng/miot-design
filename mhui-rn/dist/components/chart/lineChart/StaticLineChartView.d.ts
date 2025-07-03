import React from 'react';
import { RectCoordinateSystemPropsType, LabelStyle } from '../interface';
import { StopColorType } from '../LineGradientHelper';
export interface StaticLineChartViewPropsType extends RectCoordinateSystemPropsType {
    xAxisSelectedDataStyle?: LabelStyle;
    smoothing?: boolean;
    curveLinePoints: Array<Array<number>>;
    lineStrokeWidth?: number;
    curveLineColor?: Array<StopColorType> | string;
    showShadowArea?: boolean;
    shadowAreaColor?: Array<StopColorType> | string;
    showTooltip?: boolean;
    showDot?: boolean;
    dotFill?: string;
    dotStroke?: string;
    dotStrokeWidth?: number;
    dotRawPassable?: boolean;
    dotRawRadius?: number;
    dotSelectedRadius?: number;
    onChangeIndex?: (idx: number) => void;
    toolTipWidth?: number;
    toolTipHeight?: number;
    toolTipFill?: string;
    toolTipTextColor?: string;
    tooltipFormatter?: (currentIndex: number) => string;
    initialSelectedIndex?: number;
}
declare const MemoLineChartView: React.MemoExoticComponent<(props: StaticLineChartViewPropsType) => JSX.Element>;
export default MemoLineChartView;
