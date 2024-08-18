import { InjectionKey, ComponentPublicInstance, ComponentInternalInstance } from 'vue';
type ParentProvide<T> = T & {
    link(child: ComponentInternalInstance): void;
    unlink(child: ComponentInternalInstance): void;
    children: ComponentPublicInstance[];
    internalChildren: ComponentInternalInstance[];
};
export declare function useParent<T>(key: InjectionKey<ParentProvide<T>>): {
    parent: ParentProvide<T>;
    index: import("vue").ComputedRef<number>;
} | {
    parent: null;
    index: import("vue").Ref<number>;
};
export {};
