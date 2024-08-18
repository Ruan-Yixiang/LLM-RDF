/**
 * render w/ regl
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md
 */
import { GLSLContext, IAttribute, IAttributeInitializationOptions, IBuffer, IBufferInitializationOptions, IClearOptions, IComputeModel, IElements, IElementsInitializationOptions, IFramebuffer, IFramebufferInitializationOptions, IModel, IModelInitializationOptions, IReadPixelsOptions, IRendererConfig, IRendererService, ITexture2D, ITexture2DInitializationOptions } from '@antv/g-webgpu-core';
import ReglFramebuffer from './ReglFramebuffer';
/**
 * regl renderer
 */
export declare class WebGLEngine implements IRendererService {
    supportWebGPU: boolean;
    useWGSL: boolean;
    private $canvas;
    private gl;
    private inited;
    init(cfg: IRendererConfig): Promise<void>;
    isFloatSupported(): any;
    createModel: (options: IModelInitializationOptions) => Promise<IModel>;
    createAttribute: (options: IAttributeInitializationOptions) => IAttribute;
    createBuffer: (options: IBufferInitializationOptions) => IBuffer;
    createElements: (options: IElementsInitializationOptions) => IElements;
    createTexture2D: (options: ITexture2DInitializationOptions) => ITexture2D;
    createFramebuffer: (options: IFramebufferInitializationOptions) => ReglFramebuffer;
    useFramebuffer: (framebuffer: IFramebuffer | null, drawCommands: () => void) => void;
    createComputeModel: (context: GLSLContext) => Promise<IComputeModel>;
    clear: (options: IClearOptions) => void;
    setScissor: (scissor: Partial<{
        enable: boolean;
        box: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
    }>) => void;
    viewport: ({ x, y, width, height, }: {
        x: number;
        y: number;
        width: number;
        height: number;
    }) => void;
    readPixels: (options: IReadPixelsOptions) => Uint8Array;
    getCanvas: () => HTMLCanvasElement;
    getGLContext: () => WebGLRenderingContext;
    destroy: () => void;
    beginFrame(): void;
    endFrame(): void;
}
