export declare const SMOOTH_RATIO = 0.2;
declare const lineCommand: (point: number[]) => string;
declare const bezierCommand: (point: number[], i: number, a: number[][], truncValue?: number | undefined) => string;
declare const getSvgPath: (points: number[][], command: (...args: any[]) => string, truncValue?: number | undefined) => string;
declare const getSvgPathFragments: (points: number[][], command: (...args: any[]) => string, fragmentSize?: number, truncValue?: number | undefined) => string[];
export default getSvgPath;
export { lineCommand, bezierCommand, getSvgPathFragments };
