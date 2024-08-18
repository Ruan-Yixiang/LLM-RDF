export declare function createTranslate(name: string): (path: string, ...args: unknown[]) => any;
export type Translate = ReturnType<typeof createTranslate>;
export type Mod = string | {
    [key: string]: any;
};
export type Mods = Mod | Mod[];
/**
 * bem helper
 * b() // 'button'
 * b('text') // 'button__text'
 * b({ disabled }) // 'button button--disabled'
 * b('text', { disabled }) // 'button__text button__text--disabled'
 * b(['disabled', 'primary']) // 'button button--disabled button--primary'
 */
export declare function createBEM(name: string): (el?: Mods, mods?: Mods) => Mods;
export type BEM = ReturnType<typeof createBEM>;
export declare function createNamespace(name: string): readonly [string, (el?: Mods | undefined, mods?: Mods | undefined) => Mods, (path: string, ...args: unknown[]) => any];
