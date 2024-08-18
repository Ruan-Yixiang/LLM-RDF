import { gl } from './gl';
import { BufferData } from './IRendererService';
export interface IBufferInitializationOptions {
    data: BufferData;
    /**
     * gl.DRAW_STATIC | gl.DYNAMIC_DRAW | gl.STREAM_DRAW
     */
    usage?: gl.STATIC_DRAW | gl.DYNAMIC_DRAW | gl.STREAM_DRAW;
    /**
     * gl.Float | gl.UNSIGNED_BYTE | ...
     */
    type?: gl.FLOAT | gl.UNSIGNED_BYTE;
    length?: number;
}
export interface IBuffer {
    /**
     * gl.bufferSubData
     */
    subData(options: {
        data: BufferData;
        offset: number;
    }): void;
    /**
     * gl.deleteBuffer
     */
    destroy(): void;
}
