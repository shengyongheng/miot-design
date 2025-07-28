import React from 'react';
export interface BarItemPropsType {
    identifier?: string | number;
    height: number;
    width: number | string;
    fill?: string;
    underlayColor?: string;
    borderTopRadius?: number;
    onPress?: (identifier?: string | number) => void;
}
declare const BarItem: React.MemoExoticComponent<(props: BarItemPropsType) => JSX.Element>;
export default BarItem;
