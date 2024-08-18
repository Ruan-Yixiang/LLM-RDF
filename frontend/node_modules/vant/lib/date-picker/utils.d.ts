import { type RequiredParams } from '../utils';
import type { PropType } from 'vue';
import type { PickerOption } from '../picker';
type Filter = (columnType: string, options: PickerOption[], values?: string[]) => PickerOption[];
export type TimeFilter = RequiredParams<Filter>;
type Formatter = (type: string, option: PickerOption) => PickerOption;
export declare const sharedProps: {
    loading: BooleanConstructor;
    readonly: BooleanConstructor;
    allowHtml: BooleanConstructor;
    optionHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    showToolbar: {
        type: BooleanConstructor;
        default: true;
    };
    swipeDuration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    visibleOptionNum: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
} & {
    title: StringConstructor;
    cancelButtonText: StringConstructor;
    confirmButtonText: StringConstructor;
} & {
    modelValue: {
        type: PropType<string[]>;
        default: () => never[];
    };
    filter: PropType<Filter>;
    formatter: {
        type: PropType<Formatter>;
        default: (type: string, option: PickerOption) => PickerOption;
    };
};
export declare const pickerInheritKeys: ("title" | "readonly" | "loading" | "allowHtml" | "optionHeight" | "showToolbar" | "swipeDuration" | "visibleOptionNum" | "cancelButtonText" | "confirmButtonText")[];
export declare function times<T>(n: number, iteratee: (index: number) => T): T[];
export declare const getMonthEndDay: (year: number, month: number) => number;
export declare const genOptions: <T extends string>(min: number, max: number, type: T, formatter: Formatter, filter?: Filter | TimeFilter, values?: string[]) => PickerOption[];
export declare const formatValueRange: (values: string[], columns: PickerOption[][]) => string[];
export {};
