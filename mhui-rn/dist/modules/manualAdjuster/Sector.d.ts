import { PureComponent } from 'react';
declare type Point = {
    x: number;
    y: number;
};
export interface SectorPropsType {
    startAngle?: number;
    endAngle?: number;
    sectorRadius?: number;
    sectorStrokeWidth?: number;
    sectorStroke?: string;
    sectorFill?: string;
    innerSectorFill?: string;
    activeOpacity: number;
    onPress?: () => void;
}
interface SectorState {
    activeOpacity: number;
}
export default class Sector extends PureComponent<SectorPropsType, SectorState> {
    static defaultProps: {
        sectorRadius: number;
        sectorStrokeWidth: number;
        sectorStroke: string;
        sectorFill: string;
        innerSectorFill: string;
        activeOpacity: number;
    };
    constructor(props: SectorPropsType);
    createSector: (startPoint1: Point, endPoint1: Point, startPoint2: Point, endPoint2: Point) => JSX.Element;
    createInnerSector: (startPoint2: Point, endPoint2: Point) => JSX.Element;
    handlePressIn: () => void;
    handlePressOut: () => void;
    handlePress: () => void;
    render(): JSX.Element;
}
export {};
