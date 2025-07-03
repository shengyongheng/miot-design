import React from 'react';
import { TextStyle } from 'react-native';
export interface TooltipPropsType extends TextStyle {
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    text?: string;
    textColor?: string;
    fill?: string;
}
declare const Tooltip: React.MemoExoticComponent<(props: TooltipPropsType) => JSX.Element>;
export default Tooltip;
