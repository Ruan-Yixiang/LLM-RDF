import { HTMLAttributes, InputHTMLAttributes } from 'vue';
import type { FieldRule, FieldType, FieldAutosizeConfig } from './types';
export declare function isEmptyValue(value: unknown): boolean;
export declare function runSyncRule(value: unknown, rule: FieldRule): boolean;
export declare function runRuleValidator(value: unknown, rule: FieldRule): Promise<unknown>;
export declare function getRuleMessage(value: unknown, rule: FieldRule): string;
export declare function startComposing({ target }: Event): void;
export declare function endComposing({ target }: Event): void;
export declare function resizeTextarea(input: HTMLInputElement, autosize: true | FieldAutosizeConfig): void;
export declare function mapInputType(type: FieldType): {
    type: InputHTMLAttributes['type'];
    inputmode?: HTMLAttributes['inputmode'];
};
export declare function getStringLength(str: string): number;
export declare function cutString(str: string, maxlength: number): string;
