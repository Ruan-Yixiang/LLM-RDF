import type { IUniform } from '@antv/g-webgpu-core';
/**
 * 考虑结构体命名, eg:
 * a: { b: 1 }  ->  'a.b'
 * a: [ { b: 1 } ] -> 'a[0].b'
 */
export declare function extractUniforms(uniforms: {
    [key: string]: IUniform;
}): {
    [key: string]: IUniform;
};
