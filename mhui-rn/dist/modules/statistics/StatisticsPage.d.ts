import React, { PureComponent } from 'react';
import { StatisticsTabsPropType } from './StatisticsTabs';
import { RadioGroupWithSeparatorPropType } from './RadioGroupWithSeparator';
import { TitleConfigType, ChartConfigType, ChartType } from './StatisticsChartWithTitle';
import { DatasetMultiGroupItemsType, DatasetGroupItemsType } from '../../components/chart/interface';
declare type TabsConfigType = Omit<StatisticsTabsPropType, 'onChange'>;
declare type RadioGroupConfigType = Omit<RadioGroupWithSeparatorPropType, 'onChangeCheck'>;
declare type SingleTabDatasetMultiGroupItemsType = Array<DatasetMultiGroupItemsType | DatasetGroupItemsType>;
declare type MultiTabsDatasetMultiGroupItemsType = Array<SingleTabDatasetMultiGroupItemsType>;
export interface StatisticsPagePropType {
    isLoading: boolean;
    statisticsData: SingleTabDatasetMultiGroupItemsType | MultiTabsDatasetMultiGroupItemsType;
    chartType: ChartType;
    showTabs?: boolean;
    multiTabs: boolean;
    titleConfig: TitleConfigType | Array<TitleConfigType>;
    radioGroupConfig: RadioGroupConfigType | Array<RadioGroupConfigType>;
    chartConfig: ChartConfigType | Array<ChartConfigType>;
    tabsConfig?: TabsConfigType | Array<TabsConfigType>;
    onChangeActiveTabKey?: (activeKey: number) => void;
    onChangeCheckedRadioId?: (checkedId: number) => void;
    onChangeSelectedIndex?: (selectedIndex: number) => void;
}
export interface StatisticsPageState {
    checkedRadioId: number;
    activeTabKey: number;
}
export default class StatisticsPage extends PureComponent<StatisticsPagePropType, StatisticsPageState> {
    static contextType: React.Context<Partial<Pick<import("../../components/configProvider").ConfigContextProps, "language" | "colorScheme" | "environment" | "media"> & {
        theme: import("../../styles/themes").ITheme;
    }>>;
    constructor(props: StatisticsPagePropType);
    onChangeActiveTabKey: (key: number) => void;
    onChangeCheck: (checkedRadioId: number) => void;
    createLoading: () => JSX.Element;
    createStatisticsChartWithTitle: () => JSX.Element;
    createStatisticsTabs(): JSX.Element | null;
    createRadioGroupWithSeparator(): JSX.Element;
    render(): JSX.Element;
}
export {};
