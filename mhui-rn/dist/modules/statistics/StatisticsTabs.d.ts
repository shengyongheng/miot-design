import React from 'react';
declare type TabItem = {
    key: number;
    value: number | string;
};
export declare type TabItemsType = Array<TabItem>;
export interface StatisticsTabsPropType {
    tabItems: TabItemsType;
    inactiveTabsColor?: string;
    activeTabColor?: string;
    onChange?: (key: number) => void;
    activeKey?: number;
}
declare const StatisticsTabs: React.MemoExoticComponent<(props: StatisticsTabsPropType) => JSX.Element>;
export default StatisticsTabs;
