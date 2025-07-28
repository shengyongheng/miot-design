import React from 'react';
import { ViewStyle } from 'react-native';
export interface CircleLoadingPropType {
    style?: ViewStyle;
    radius?: number;
    timeout?: number;
    onTimeout?: () => void;
}
export interface CircleLoadingRefType {
    onAnimationStop: () => void;
    onClose: () => void;
}
declare const CircleLoadingRef: React.ForwardRefExoticComponent<CircleLoadingPropType & React.RefAttributes<CircleLoadingRefType>>;
export default CircleLoadingRef;
