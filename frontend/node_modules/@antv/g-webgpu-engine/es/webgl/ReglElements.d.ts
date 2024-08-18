import { IElements, IElementsInitializationOptions } from '@antv/g-webgpu-core';
import regl from 'regl';
/**
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#elements
 */
export default class ReglElements implements IElements {
    private elements;
    constructor(reGl: regl.Regl, options: IElementsInitializationOptions);
    get(): regl.Elements;
    subData({ data, }: {
        data: number[] | number[][] | Uint8Array | Uint16Array | Uint32Array;
    }): void;
    destroy(): void;
}
