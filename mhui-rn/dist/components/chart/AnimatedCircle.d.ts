import React from 'react';
import { CircleProps } from 'react-native-svg';
export interface AnimatedCirclePropsType extends Pick<CircleProps, 'fill' | 'stroke'> {
    x?: number;
    y?: number;
    r?: number;
    hitSlop?: number;
    strokeWidth?: number;
    onPress?: (identifier?: string | number) => void;
    identifier?: string | number;
    isSelected?: boolean;
}
declare const MemoAnimatedCircle: React.MemoExoticComponent<(props: AnimatedCirclePropsType) => JSX.Element>;
export default MemoAnimatedCircle;
declare const SvgAnimatedCircle: React.FC<AnimatedCirclePropsType>;
export { SvgAnimatedCircle };
