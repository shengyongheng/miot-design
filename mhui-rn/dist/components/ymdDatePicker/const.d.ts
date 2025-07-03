import DynamicColor from '../../styles/DynamicColor';
export declare const PanelType: Readonly<{
    DATE: string;
    MONTH: string;
}>;
export declare const AllWeeks: (string | number)[];
export declare const DefaultProp: {
    date: never[];
    multiple: boolean;
    range: boolean;
    panel: import("./types").panel;
    event: never[];
    firstDayOfWeek: number;
    allowDates: () => boolean;
    readonly: boolean;
    showAdjacentMonths: boolean;
    showWeek: boolean;
    localeFirstDayOfYear: number;
    backgroundColor: string;
    fullscreen: boolean;
    clearImmediate: boolean;
    visible: boolean;
    title: boolean;
};
export declare const Colors: {
    light: {
        Arrow: string;
        Dot: string;
    };
    dark: {
        Arrow: string;
        Dot: string;
    };
    Selected: DynamicColor;
};
