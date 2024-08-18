import type { AreaProps } from '.';
import type { PickerOption } from '../picker';
export declare const AREA_EMPTY_CODE = "000000";
export declare const INHERIT_SLOTS: readonly ["title", "cancel", "confirm", "toolbar", "columns-top", "columns-bottom"];
export declare const INHERIT_PROPS: readonly ["title", "loading", "readonly", "optionHeight", "swipeDuration", "visibleOptionNum", "cancelButtonText", "confirmButtonText"];
export declare function formatDataForCascade({ areaList, columnsNum, columnsPlaceholder: placeholder, }: AreaProps): PickerOption[];
