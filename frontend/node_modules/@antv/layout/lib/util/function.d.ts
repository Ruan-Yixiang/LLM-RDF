export declare const isFunction: (val: unknown) => val is Function;
export declare const getFunc: (value: number, defaultValue: number, func?: ((d?: any) => number) | undefined) => Function;
export declare const getFuncByUnknownType: (defaultValue: number, value?: number | number[] | {
    width: number;
    height: number;
} | ((d?: any) => number) | undefined, resultIsNumber?: boolean) => (d?: any) => number | number[];
