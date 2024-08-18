import { VNode, InjectionKey, VNodeNormalizedChildren, ComponentPublicInstance, ComponentInternalInstance } from 'vue';
export declare function flattenVNodes(children: VNodeNormalizedChildren): VNode<import("vue").RendererNode, import("vue").RendererElement, {
    [key: string]: any;
}>[];
export declare function sortChildren(parent: ComponentInternalInstance, publicChildren: ComponentPublicInstance[], internalChildren: ComponentInternalInstance[]): void;
export declare function useChildren<Child extends ComponentPublicInstance = ComponentPublicInstance<{}, any>, ProvideValue = never>(key: InjectionKey<ProvideValue>): {
    children: Child[];
    linkChildren: (value?: ProvideValue) => void;
};
