import React from 'react';
import { StopColorType } from '../LineGradientHelper';
interface ScrollLineChartItemPropsType {
    width: number;
    height: number;
    paddingHorizontal?: number;
    paddingBottom?: number;
    startOffsetX: number;
    viewBox?: string;
    children?: React.ReactElement | Array<React.ReactElement | null> | null;
    linearGradientConfig?: Array<{
        stopColor?: Array<StopColorType> | string;
        id: string;
    }>;
    onPressOffset?: (offset: number) => void;
}
declare const ScrollLineChartItem: React.FC<ScrollLineChartItemPropsType>;
export default ScrollLineChartItem;
