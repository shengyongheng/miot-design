/// <reference types="react" />
import { StaticLineChartViewPropsType } from './StaticLineChartView';
import { DatasetItemType, DatasetGroupItemsType, LabelStyle } from '../interface';
export interface LineChartPropsType extends Omit<StaticLineChartViewPropsType, 'width' | 'height' | 'xAxisData' | 'curveLinePoints' | 'tooltipFormatter'> {
    dataset: DatasetGroupItemsType;
    xAxisData?: Array<string | number>;
    xAxisSelectedDataStyle?: LabelStyle;
    yAxisMax?: number;
    yAxisStart?: number;
    xAxisDataFormatter?: (data: DatasetItemType, index: number) => string;
    overflow?: 'sample' | 'scroll';
    tooltipFormatter?: (data: DatasetItemType, currentIndex: number) => string;
    scrollHeaderOrFooterWidth?: number;
}
declare const LineChart: (props: LineChartPropsType) => JSX.Element;
export default LineChart;
