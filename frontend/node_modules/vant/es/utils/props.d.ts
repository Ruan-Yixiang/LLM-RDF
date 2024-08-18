/**
 * prop type helpers
 * help us to write less code and reduce bundle size
 */
import type { PropType } from 'vue';
export declare const unknownProp: PropType<unknown>;
export declare const numericProp: (NumberConstructor | StringConstructor)[];
export declare const truthProp: {
    type: BooleanConstructor;
    default: true;
};
export declare const makeRequiredProp: <T>(type: T) => {
    type: T;
    required: true;
};
export declare const makeArrayProp: <T>() => {
    type: PropType<T[]>;
    default: () => never[];
};
export declare const makeNumberProp: <T>(defaultVal: T) => {
    type: NumberConstructor;
    default: T;
};
export declare const makeNumericProp: <T>(defaultVal: T) => {
    type: (NumberConstructor | StringConstructor)[];
    default: T;
};
export declare const makeStringProp: <T>(defaultVal: T) => {
    type: PropType<T>;
    default: T;
};
