import { ITexture2D, ITexture2DInitializationOptions } from '@antv/g-webgpu-core';
import regl from 'regl';
/**
 * adaptor for regl.Buffer
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#buffers
 */
export default class ReglTexture2D implements ITexture2D {
    private texture;
    private width;
    private height;
    constructor(reGl: regl.Regl, options: ITexture2DInitializationOptions);
    get(): regl.Texture2D;
    update(): void;
    resize({ width, height }: {
        width: number;
        height: number;
    }): void;
    destroy(): void;
}
