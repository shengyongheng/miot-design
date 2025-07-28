export declare const InitAllDate: (year: number, month: number, first?: number, adjacent?: boolean) => Date[][];
export declare const FormatDate: (date: string | number | Date, time?: boolean) => string;
export declare const GetRangeDate: (from: string | number | Date, to: string | number | Date) => Date[];
export declare const InitDates: (date: string | number | Date | (string | number | Date)[], range?: boolean) => string[];
export declare const ResortWeek: (week: (string | number)[], first: number) => (string | number)[];
export declare const GiveArrayWeek: (content: (number | Date)[][], weeks: (string | number)[], first?: number, local?: number) => void;
