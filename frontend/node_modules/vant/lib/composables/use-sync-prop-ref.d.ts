import { Ref } from 'vue';
export declare const useSyncPropRef: <T>(getProp: () => T, setProp: (value: T) => void) => Ref<T>;
