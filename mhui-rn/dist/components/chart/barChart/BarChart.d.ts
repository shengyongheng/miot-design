import React from 'react';
import { RectCoordinateSystemPropsType, LabelStyle, DatasetItemType, DatasetGroupItemsType, DatasetMultiGroupItemsType } from '../interface';
export interface BarChartPropsType extends Omit<RectCoordinateSystemPropsType, 'width' | 'height' | 'xAxisData'> {
    dataset: DatasetMultiGroupItemsType | DatasetGroupItemsType;
    xAxisData?: Array<string | number>;
    xAxisSelectedDataStyle?: LabelStyle;
    barWidth?: number;
    barBorderTopRadius?: number;
    barRawFill?: string | string[];
    barSelectedFill?: string | string[];
    barUnderlayColor?: string | string[];
    gridUnderlayColor?: string;
    girdActiveOpacity?: number;
    xAxisDataFormatter?: (data: DatasetItemType, dataIndex: number) => string;
    onChangeIndex?: (identifier: number) => void;
    initialSelectedIndex?: number;
    overflow?: 'sample' | 'scroll';
}
declare const BarChart: React.MemoExoticComponent<(props: BarChartPropsType) => JSX.Element>;
export default BarChart;
