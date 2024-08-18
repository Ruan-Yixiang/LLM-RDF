import { IRenderbuffer, IRenderbufferInitializationOptions } from '@antv/g-webgpu-core';
import regl from 'regl';
/**
 * adaptor for regl.Renderbuffer
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#renderbuffers
 */
export default class ReglRenderbuffer implements IRenderbuffer {
    private renderbuffer;
    constructor(reGl: regl.Regl, options: IRenderbufferInitializationOptions);
    get(): regl.Renderbuffer;
    destroy(): void;
    resize({ width, height }: {
        width: number;
        height: number;
    }): void;
}
