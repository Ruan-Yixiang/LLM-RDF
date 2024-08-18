import { BufferData, IBuffer, IBufferInitializationOptions } from '@antv/g-webgpu-core';
import regl from 'regl';
/**
 * adaptor for regl.Buffer
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#buffers
 */
export default class ReglBuffer implements IBuffer {
    private buffer;
    constructor(reGl: regl.Regl, options: IBufferInitializationOptions);
    get(): regl.Buffer;
    destroy(): void;
    subData({ data, offset }: {
        data: BufferData;
        offset: number;
    }): void;
}
