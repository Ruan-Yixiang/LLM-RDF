import { IFramebuffer, IFramebufferInitializationOptions } from '@antv/g-webgpu-core';
import regl from 'regl';
/**
 * adaptor for regl.Framebuffer
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#framebuffers
 */
export default class ReglFramebuffer implements IFramebuffer {
    private framebuffer;
    constructor(reGl: regl.Regl, options: IFramebufferInitializationOptions);
    get(): regl.Framebuffer;
    destroy(): void;
    resize({ width, height }: {
        width: number;
        height: number;
    }): void;
}
