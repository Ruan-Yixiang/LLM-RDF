import { Entity } from '.';
declare type NonFunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends (args: unknown) => void ? never : K;
}[keyof T];
export declare type NonFunctionProperties<T> = Pick<T, NonFunctionPropertyNames<T>>;
export declare type ComponentClassType<P> = new (data: Partial<NonFunctionProperties<P>>) => Component<P> & P;
export declare abstract class Component<P> {
    constructor(data?: Partial<NonFunctionProperties<P>>);
}
/**
 * 管理某一类 Component，尽可能做到 AoS 而非 SoA
 * @see https://wickedengine.net/2019/09/29/entity-component-system/
 * @see https://github.com/turanszkij/WickedEngine/blob/master/WickedEngine/wiECS.h
 */
export declare class ComponentManager<P> {
    private clazz;
    private components;
    private entities;
    /**
     * 不在 Entity 中维护拥有的 Component 列表，反之亦然
     */
    private lookup;
    constructor(clazz: ComponentClassType<P>);
    clear(): void;
    contains(entity: Entity): boolean;
    create(entity: Entity, data?: Partial<NonFunctionProperties<P>>): Component<P> & P;
    remove(entity: Entity): void;
    removeKeepSorted(entity: Entity): void;
    moveItem(srcIndex: number, destIndex: number): void;
    getEntity(index: number): number;
    /**
     * 由于缺少类似 C++ 的重载操作符，没法通过 [下标] 直接访问。因此只能增加该方法用于遍历。
     */
    getComponent(index: number): Component<P> & P;
    getComponentByEntity(entity: Entity): (Component<P> & P) | null;
    getCount(): number;
    getEntityByComponentIndex(componentIdx: number): number;
    find(callback: (component: Component<P> & P, i: number) => boolean): (Component<P> & P) | null;
    findIndex(callback: (component: Component<P> & P, i: number) => boolean): number;
    forEach(callback: (entity: Entity, component: Component<P> & P) => void): void;
    forEachAsync(callback: (entity: Entity, component: Component<P> & P) => Promise<void>): Promise<void>;
    map(callback: (entity: Entity, component: Component<P> & P) => void): void[];
}
export {};
