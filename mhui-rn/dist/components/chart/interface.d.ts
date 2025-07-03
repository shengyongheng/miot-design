/// <reference types="react" />
import { ViewStyle, GestureResponderEvent, PanResponderGestureState } from 'react-native';
import { StopColorType } from './LineGradientHelper';
export declare type LineStyle = {
    stroke?: string;
    strokeWidth?: number;
    strokeDasharray?: number[];
};
export declare type LabelStyle = {
    fill?: string;
    stroke?: string;
    strokeWidth?: string | number;
    fontSize?: string | number;
    fontFamily?: string;
    textAnchor?: 'start' | 'middle' | 'end';
};
export declare type PositionType = ViewStyle['position'];
export declare type PointDataType = [number, number];
export declare type GroupPointsDataType = Array<PointDataType>;
export declare type MultiGroupsPointsDataType = Array<GroupPointsDataType>;
export declare type DatasetItemType = [string | number, number];
export declare type DatasetGroupItemsType = Array<DatasetItemType>;
export declare type DatasetMultiGroupItemsType = Array<DatasetGroupItemsType>;
export interface RectCoordinateSystemPropsType {
    width: number;
    height: number;
    viewBox?: string;
    gestureEnable?: boolean;
    paddingHorizontal?: number;
    paddingBottom?: number;
    showXAxisLabels?: boolean;
    xAxisDataStyle?: LabelStyle;
    xAxisLineStyle?: LineStyle;
    xAxisMaxSplitNumber?: number;
    xAxisData?: Array<string | number>;
    xAxisDataOffset?: number;
    showYAxisLabels?: boolean;
    yAxisDataStyle?: LabelStyle;
    yAxisLabels?: Array<{
        label: string | number;
        value: number;
    }>;
    yAxisDataOffset?: number;
    showXAxisLine?: boolean;
    showHorizontalSplitLine?: boolean;
    showVerticalSplitLine?: boolean;
    splitLineStyle?: LineStyle;
    itemAlign?: 'start' | 'middle';
    linearGradientConfig?: Array<{
        stopColor?: Array<StopColorType> | string;
        id: string;
    }>;
    onPress?: (e: GestureResponderEvent) => void;
    onResponderMove?: (event: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
    onResponderRelease?: (event: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
    children?: React.ReactElement | Array<React.ReactElement | null> | null;
}
