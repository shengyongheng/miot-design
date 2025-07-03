import React from 'react';
export interface GroupBarItemPropsType {
    identifier?: number;
    dy?: number;
    totalWidth: number;
    containerWidth?: number;
    containerHeight?: number;
    containerUnderlayColor?: string;
    containerActiveOpacity?: number;
    barHeights?: number[] | number;
    fill?: string[] | string;
    underlayColor?: string[] | string;
    borderTopRadius?: number;
    onPress?: (dataIndex: number, groupIndex?: number) => void;
}
declare const GroupBarItem: React.FC<GroupBarItemPropsType>;
export default GroupBarItem;
