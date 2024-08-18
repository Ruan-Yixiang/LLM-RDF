import { gl } from './gl';
export interface ITexture2DInitializationOptions {
    /**
     * 纹理尺寸
     */
    width: number;
    height: number;
    /**
     * 纹理格式
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texImage2D
     */
    format?: gl.ALPHA | gl.LUMINANCE | gl.LUMINANCE_ALPHA | gl.RGB | gl.RGBA | gl.RGBA4 | gl.RGB5_A1 | gl.RGB565 | gl.DEPTH_COMPONENT | gl.DEPTH_STENCIL;
    /**
     * 纹理数据类型，可能需要引入扩展，例如 ext.HALF_FLOAT_OES
     */
    type?: gl.UNSIGNED_BYTE | gl.UNSIGNED_SHORT | gl.UNSIGNED_INT | gl.FLOAT;
    /**
     * 纹理 pixel source
     */
    data?: undefined | HTMLCanvasElement | HTMLImageElement | number[] | number[][] | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray;
    /**
     * 纹理参数
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/texParameter
     */
    mag?: gl.NEAREST | gl.LINEAR;
    min?: gl.NEAREST | gl.LINEAR | gl.LINEAR_MIPMAP_LINEAR | gl.NEAREST_MIPMAP_LINEAR | gl.LINEAR_MIPMAP_NEAREST | gl.NEAREST_MIPMAP_NEAREST;
    wrapS?: gl.REPEAT | gl.CLAMP_TO_EDGE | gl.MIRRORED_REPEAT;
    wrapT?: gl.REPEAT | gl.CLAMP_TO_EDGE | gl.MIRRORED_REPEAT;
    aniso?: number;
    /**
     * 以下为 gl.pixelStorei 参数
     * @see https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/pixelStorei
     */
    flipY?: boolean;
    alignment?: 1 | 2 | 4 | 8;
    premultiplyAlpha?: boolean;
    colorSpace?: gl.NONE | gl.BROWSER_DEFAULT_WEBGL;
    mipmap?: boolean | gl.DONT_CARE | gl.NICEST | gl.FASTEST;
    usage?: gl.COPY_DST | gl.COPY_SRC | gl.RENDER_ATTACHMENT | gl.STORAGE | gl.SAMPLED;
}
export interface ITexture2D {
    get(): unknown;
    update(): void;
    resize(options: {
        width: number;
        height: number;
    }): void;
    /**
     * 写入 subimage
     * gl.texSubImage2D gl.copyTexSubImage2D
     */
    /**
     * gl.deleteTexture
     */
    destroy(): void;
}
