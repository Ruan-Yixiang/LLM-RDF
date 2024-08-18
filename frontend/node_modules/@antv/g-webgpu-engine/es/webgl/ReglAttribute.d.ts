import { BufferData, IAttribute, IAttributeInitializationOptions } from '@antv/g-webgpu-core';
import regl from 'regl';
/**
 * @see https://github.com/regl-project/regl/blob/gh-pages/API.md#attributes
 */
export default class ReglAttribute implements IAttribute {
    private attribute;
    private buffer;
    constructor(gl: regl.Regl, options: IAttributeInitializationOptions);
    get(): regl.Attribute;
    updateBuffer(options: {
        data: BufferData;
        offset: number;
    }): void;
    destroy(): void;
}
