import React from 'react';
export interface StatisticsPanelPropsType {
    panelTitle: string;
    children: React.ReactElement | Array<React.ReactElement>;
}
declare const StatisticsPanel: React.FC<StatisticsPanelPropsType>;
export default StatisticsPanel;
