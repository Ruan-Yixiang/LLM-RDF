import { InjectionKey, Ref } from 'vue';
export type CustomFieldInjectionValue = {
    customValue: Ref<(() => unknown) | undefined>;
    resetValidation: () => void;
    validateWithTrigger: (trigger: 'onBlur' | 'onChange' | 'onSubmit') => void;
};
export declare const CUSTOM_FIELD_INJECTION_KEY: InjectionKey<CustomFieldInjectionValue>;
export declare function useCustomFieldValue(customValue: () => unknown): void;
