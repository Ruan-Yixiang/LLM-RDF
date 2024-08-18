import { type Numeric } from './basic';
export declare const isDef: <T>(val: T) => val is NonNullable<T>;
export declare const isFunction: (val: unknown) => val is Function;
export declare const isObject: (val: unknown) => val is Record<any, any>;
export declare const isPromise: <T = any>(val: unknown) => val is Promise<T>;
export declare const isDate: (val: unknown) => val is Date;
export declare function isMobile(value: string): boolean;
export declare const isNumeric: (val: Numeric) => val is string;
export declare const isIOS: () => boolean;
