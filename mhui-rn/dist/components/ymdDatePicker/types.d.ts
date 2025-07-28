export declare type date = string | Date | number;
export declare type panel = 'date' | 'month';
export interface DatePickerEvent {
    date: date;
    color?: string;
}
export interface DatePickerProps {
    date: date | date[];
    onSelected: Function;
    multiple: boolean;
    range: boolean;
    readonly: boolean;
    showWeek: boolean;
    week: boolean;
    panel: panel;
    max: date;
    min: date;
    allowDates: (s: string) => boolean;
    event: (date | DatePickerEvent)[];
    firstDayOfWeek: number | string;
    showAdjacentMonths: boolean;
    onChangePanelBefore: Function;
    onChangePanelTypeBefore: Function;
    localeFirstDayOfYear: number;
    backgroundColor: string;
    button: {
        confirm?: string;
        cancel?: string;
    };
    buttonColor: {
        confirm?: string;
        cancel?: string;
    };
    fullscreen: boolean;
    theme: string;
    closeImmediately: boolean;
    visible: boolean;
    title: boolean | string;
    hideOverlay: boolean;
    persistent: boolean;
    overlayOpacity: number;
    overlayColor: string;
    onCancel: Function;
}
