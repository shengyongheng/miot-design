import { PureComponent } from 'react';
declare type Point = {
    x: number;
    y: number;
};
export interface EquilateralTrianglePropsType {
    centre?: Point;
    triangleSlideLength?: number;
    triangleFill?: string;
    triangleStroke?: string;
    triangleStrokeWidth?: number;
    activeOpacity: number;
    onPress?: () => void;
}
interface EquilateralTriangleState {
    activeOpacity: number;
}
export default class EquilateralTriangle extends PureComponent<EquilateralTrianglePropsType, EquilateralTriangleState> {
    static defaultProps: {
        centre: {
            x: number;
            y: number;
        };
        triangleSlideLength: number;
        triangleFill: string;
        triangleStroke: string;
        triangleStrokeWidth: number;
        activeOpacity: number;
    };
    constructor(props: EquilateralTriangleState);
    handlePressIn: () => void;
    handlePress: () => void;
    handlePressOut: () => void;
    render(): JSX.Element;
}
export {};
