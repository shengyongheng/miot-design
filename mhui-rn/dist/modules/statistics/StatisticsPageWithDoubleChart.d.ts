import React from 'react';
import { ImageSourcePropType } from 'react-native';
import { DatasetGroupItemsType } from '../../components/chart/interface';
import { BarChartPropsType } from '../../components/chart/barChart';
import { LineChartPropsType } from '../../components/chart/lineChart';
import { SelectPropsType } from '../../components/select';
export interface StatisticsInfoPropsType {
    leftTitle: string | string[];
    leftUnits?: string | string[];
    rightTitle: string | string[];
    rightUnits?: string | string[];
    leftSubtitle?: string;
    rightSubtitle?: string;
}
export declare type SelectConfigType = SelectPropsType;
export declare type LineChartConfigType = Pick<LineChartPropsType, 'curveLineColor' | 'toolTipWidth' | 'toolTipHeight' | 'tooltipFormatter' | 'toolTipFill' | 'toolTipTextColor' | 'xAxisDataFormatter' | 'xAxisSelectedDataStyle'>;
export declare type BarChartConfigType = Pick<BarChartPropsType, 'onChangeIndex' | 'barRawFill' | 'barSelectedFill' | 'xAxisDataFormatter' | 'xAxisSelectedDataStyle'>;
export declare type StatisticsPageWithDoubleChartPropsType = {
    topicTitle: string;
    selectConfig: SelectConfigType;
    barTitleConfig: StatisticsInfoPropsType;
    barChartDataset: DatasetGroupItemsType;
    barChartConfig?: BarChartConfigType;
    lineChartTitle: string;
    lineChartDataset: DatasetGroupItemsType;
    lineChartConfig?: LineChartConfigType;
    showLineChart?: boolean;
    emptyDataTitle?: string;
};
declare const StatisticsPageWithDoubleChart: React.FC<StatisticsPageWithDoubleChartPropsType>;
export default StatisticsPageWithDoubleChart;
export interface EmptyContentPropsType {
    imgOfEmptyData: ImageSourcePropType;
    emptyDataTitle: string;
}
