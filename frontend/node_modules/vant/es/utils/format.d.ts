import type { CSSProperties } from 'vue';
import { type Numeric } from './basic';
export declare function addUnit(value?: Numeric): string | undefined;
export declare function getSizeStyle(originSize?: Numeric | Numeric[]): CSSProperties | undefined;
export declare function getZIndexStyle(zIndex?: Numeric): CSSProperties;
export declare function unitToPx(value: Numeric): number;
export declare const camelize: (str: string) => string;
export declare const kebabCase: (str: string) => string;
export declare function padZero(num: Numeric, targetLength?: number): string;
/** clamps number within the inclusive lower and upper bounds */
export declare const clamp: (num: number, min: number, max: number) => number;
export declare function formatNumber(value: string, allowDot?: boolean, allowMinus?: boolean): string;
export declare function addNumber(num1: number, num2: number): number;
