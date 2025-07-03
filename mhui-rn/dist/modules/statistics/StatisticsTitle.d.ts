import React from 'react';
export interface StatisticsTitlePropType {
    valueColor?: string;
    nameColor?: string;
    statistics: Array<{
        name: string | number;
        value: string | number;
    }>;
    emptyValue?: string;
    emptyName?: string;
}
declare const StatisticsTitle: React.MemoExoticComponent<(props: StatisticsTitlePropType) => JSX.Element>;
export default StatisticsTitle;
