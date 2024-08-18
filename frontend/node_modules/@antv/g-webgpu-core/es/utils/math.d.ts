import { mat3, mat4, vec3, vec4 } from 'gl-matrix';
export declare function getAngle(angle: number | undefined): number;
export declare function createVec3(x: number | vec3 | vec4, y?: number, z?: number): vec3;
export declare function getRotationScale(matrix: mat4, result: mat3): mat3;
export declare function decodePickingColor(color: Uint8Array): number;
export declare function encodePickingColor(featureIdx: number): [number, number, number];
