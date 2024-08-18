import type { IModel, IModelDrawOptions, IModelInitializationOptions, IUniform } from '@antv/g-webgpu-core';
import regl from 'regl';
/**
 * adaptor for regl.DrawCommand
 */
export default class ReglModel implements IModel {
    private reGl;
    private drawCommand;
    private uniforms;
    constructor(reGl: regl.Regl, options: IModelInitializationOptions);
    addUniforms(uniforms: {
        [key: string]: IUniform;
    }): void;
    draw(options: IModelDrawOptions): void;
    destroy(): void;
    /**
     * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#depth-buffer
     */
    private initDepthDrawParams;
    /**
     * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#blending
     */
    private initBlendDrawParams;
    /**
     * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#stencil
     */
    private initStencilDrawParams;
    /**
     * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#culling
     */
    private initCullDrawParams;
    private generateDefines;
}
