import { PureComponent } from 'react';
export declare type SectorFillType = string | Array<{
    offset: string | number;
    stopColor: string;
    stopOpacity?: string | number;
}>;
export interface ManualAdjusterPropsType {
    sectorRadius?: number;
    sectorStrokeWidth?: number;
    sectorStroke?: string;
    innerSectorFill?: string;
    sectorPressColor?: SectorFillType;
    sectorRawColor?: SectorFillType;
    triangleOffset?: number;
    triangleSlideLength?: number;
    triangleFill?: string;
    triangleStroke?: string;
    triangleStrokeWidth?: number;
    onPress?: () => void;
}
interface ManualAdjusterState {
    pressedId: number;
}
export default class ManualAdjuster extends PureComponent<ManualAdjusterPropsType, ManualAdjusterState> {
    static defaultProps: {
        sectorRadius: number;
        sectorStrokeWidth: number;
        sectorStroke: string;
        innerSectorFill: string;
        sectorPressColor: {
            offset: number;
            stopColor: string;
        }[];
        sectorRawColor: string;
        triangleOffset: number;
        triangleSlideLength: number;
        triangleFill: string;
        triangleStroke: string;
        triangleStrokeWidth: number;
    };
    sectorsConfig: number[];
    constructor(props: ManualAdjusterPropsType);
    handlePress: (idx: number) => void;
    createSectors: () => JSX.Element[];
    createRadialGradient: (radialGradientId: string, stopColors?: string | {
        offset: string | number;
        stopColor: string;
        stopOpacity?: string | number | undefined;
    }[] | undefined) => JSX.Element | null;
    render(): JSX.Element;
}
export {};
