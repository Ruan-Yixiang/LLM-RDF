import type { DialogOptions } from './types';
export declare function showDialog(options: DialogOptions): Promise<unknown>;
export declare const setDialogDefaultOptions: (options: DialogOptions) => void;
export declare const resetDialogDefaultOptions: () => void;
export declare const showConfirmDialog: (options: DialogOptions) => Promise<unknown>;
export declare const closeDialog: () => void;
