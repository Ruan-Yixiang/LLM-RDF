export function remove(arr: any, item: any): any;
export function getBestSelectionFromSrcset(el: any, scale: any): string | undefined;
export function supportWebp(): boolean;
export function throttle(action: any, delay: any): (...args: any[]) => void;
export function on(el: any, type: any, func: any): void;
export function off(el: any, type: any, func: any): void;
export const hasIntersectionObserver: boolean;
export namespace modeType {
    const event: string;
    const observer: string;
}
export function getDPR(scale?: number): number;
export function loadImageAsync(item: any, resolve: any, reject: any): any;
export class ImageCache {
    constructor({ max }: {
        max: any;
    });
    options: {
        max: any;
    };
    caches: any[];
    has(key: any): boolean;
    add(key: any): void;
    free(): void;
}
