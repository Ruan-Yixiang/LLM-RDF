import { ComputedRef, InjectionKey } from 'vue';
export declare const TAB_STATUS_KEY: InjectionKey<ComputedRef<boolean>>;
export declare const useTabStatus: () => ComputedRef<boolean> | null;
