import { Ref } from 'vue';
export declare function useRefs<T = Element>(): readonly [Ref<T[]>, (index: number) => (el: unknown) => void];
