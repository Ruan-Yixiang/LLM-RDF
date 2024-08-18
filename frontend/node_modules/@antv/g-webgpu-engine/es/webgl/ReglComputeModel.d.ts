import { GLSLContext, IComputeModel } from '@antv/g-webgpu-core';
import regl from 'regl';
/**
 * adaptor for regl.DrawCommand
 */
export default class ReglComputeModel implements IComputeModel {
    private reGl;
    private context;
    private entity;
    private texFBO;
    private computeCommand;
    private textureCache;
    private outputTextureName;
    private swapOutputTextureName;
    private compiledPingpong;
    private dynamicPingpong;
    constructor(reGl: regl.Regl, context: GLSLContext);
    run(): void;
    readData(): Promise<any>;
    confirmInput(model: IComputeModel, inputName: string): void;
    updateUniform(): void;
    updateBuffer(bufferName: string, data: number[] | Float32Array | Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array, offset?: number): void;
    destroy(): void;
    private swap;
    private getOuputDataTexture;
    private createSwapOutputDataTexture;
    private cloneDataTexture;
    private calcDataTexture;
}
