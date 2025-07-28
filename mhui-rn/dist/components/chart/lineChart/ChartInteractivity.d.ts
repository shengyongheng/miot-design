/// <reference types="react" />
import { LabelStyle } from '../interface';
export interface ChartInteractivityPropsType {
    initialSelectedIndex?: number;
    xAxisDataStyle?: LabelStyle;
    xAxisSelectedDataStyle?: LabelStyle;
    paddingHorizontal?: number;
    paddingBottom?: number;
    xAxisDataOffset?: number;
    xAxisMaxSplitNumber?: number;
    xAxisData?: Array<string | number>;
    itemAlign?: 'start' | 'middle';
    showTooltip?: boolean;
    showDot?: boolean;
    width: number;
    height: number;
    chartPoints?: Array<number[]>;
    dotFill?: string;
    dotStroke?: string;
    dotStrokeWidth?: number;
    dotRawPassable?: boolean;
    dotRawRadius?: number;
    dotSelectedRadius?: number;
    onChange?: (idx: number) => void;
    toolTipWidth?: number;
    toolTipHeight?: number;
    toolTipFill?: string;
    toolTipTextColor?: string;
    tooltipFormatter?: (currentIndex: number) => string;
    gestureEnable?: boolean;
}
declare const ChartInteractivity: (props: ChartInteractivityPropsType) => JSX.Element | null;
export default ChartInteractivity;
