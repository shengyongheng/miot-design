import React, { PureComponent } from 'react';
import { StatisticsTitlePropType } from './StatisticsTitle';
import { RadioItemType } from './RadioGroupWithSeparator';
import { DatasetMultiGroupItemsType, DatasetGroupItemsType } from '../../components/chart/interface';
import { BarChartPropsType } from '../../components/chart';
export declare type ChartType = 'BarChart' | 'LineChart';
export interface TitleConfigType extends Omit<StatisticsTitlePropType, 'statisticValues'> {
    titleType?: '';
}
export declare type ChartConfigType = Pick<BarChartPropsType, 'xAxisDataFormatter' | 'barRawFill' | 'barSelectedFill' | 'barUnderlayColor' | 'showHorizontalSplitLine' | 'showYAxisLabels' | 'overflow' | 'xAxisMaxSplitNumber' | 'xAxisDataStyle' | 'xAxisSelectedDataStyle'>;
export interface StatisticsChartWithTitlePropType {
    dataType: RadioItemType['type'];
    chartType: ChartType;
    chartData: DatasetMultiGroupItemsType | DatasetGroupItemsType;
    titleConfig: StatisticsTitlePropType;
    chartConfig: ChartConfigType;
    onChangeSelectedIndex?: (selectedIndex: number) => void;
}
export interface StatisticsChartWithTitleState {
    selectedIndex: number;
}
export default class StatisticsChartWithTitle extends PureComponent<StatisticsChartWithTitlePropType, StatisticsChartWithTitleState> {
    static contextType: React.Context<Partial<Pick<import("../../components/configProvider").ConfigContextProps, "language" | "colorScheme" | "environment" | "media"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    static defaultProps: {
        chartData: never[];
    };
    constructor(props: StatisticsChartWithTitlePropType);
    componentDidUpdate(prevProps: StatisticsChartWithTitlePropType, prevState: StatisticsChartWithTitleState): void;
    onChangeSelectedIndex: (index: number) => void;
    renderStatisticsPanel(): JSX.Element;
    renderChart(): JSX.Element | null;
    render(): JSX.Element;
}
