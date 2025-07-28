export declare type StopColorType = {
    offset?: number | string;
    color: string;
    opacity?: number;
};
export declare type MHStopColorType = {
    offset?: number | string;
    value?: number;
    color: string;
    opacity?: number;
};
export declare function calculateLineGradientByScale(maxScale: number, lineGradientColor?: Array<MHStopColorType> | string): Array<StopColorType> | string | undefined;
