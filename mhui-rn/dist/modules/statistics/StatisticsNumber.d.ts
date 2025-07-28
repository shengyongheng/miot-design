import React from 'react';
import { ViewStyle } from 'react-native';
export declare type StatisticsNumberType = {
    value: React.ReactText;
    name: string;
    valueColor?: string;
    nameColor?: string;
    itemStyle?: ViewStyle;
};
declare const StatisticsNumber: React.FC<StatisticsNumberType>;
export default StatisticsNumber;
