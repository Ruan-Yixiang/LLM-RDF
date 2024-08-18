import { gl } from './gl';
import type { IAttribute } from './IAttribute';
import type { IElements } from './IElements';
import type { IUniform } from './IUniform';
export interface IBlendOptions {
    enable: boolean;
    func: BlendingFunctionSeparate;
    equation: {
        rgb: gl.FUNC_ADD | gl.FUNC_SUBTRACT | gl.FUNC_REVERSE_SUBTRACT | gl.MIN_EXT | gl.MAX_EXT;
        alpha?: gl.FUNC_ADD | gl.FUNC_SUBTRACT | gl.FUNC_REVERSE_SUBTRACT | gl.MIN_EXT | gl.MAX_EXT;
    };
    color: [number, number, number, number];
}
declare type stencilOp = gl.ZERO | gl.KEEP | gl.REPLACE | gl.INVERT | gl.INCR | gl.DECR | gl.INCR_WRAP | gl.DECR_WRAP;
declare type BlendingFunctionSeparate = Partial<{
    srcRGB: gl.ZERO | gl.ONE | gl.SRC_COLOR | gl.ONE_MINUS_SRC_COLOR | gl.SRC_ALPHA | gl.ONE_MINUS_SRC_ALPHA | gl.DST_COLOR | gl.ONE_MINUS_DST_COLOR | gl.DST_ALPHA | gl.ONE_MINUS_DST_ALPHA | gl.CONSTANT_COLOR | gl.ONE_MINUS_CONSTANT_COLOR | gl.CONSTANT_ALPHA | gl.ONE_MINUS_CONSTANT_ALPHA | gl.SRC_ALPHA_SATURATE;
    srcAlpha: number;
    dstRGB: gl.ZERO | gl.ONE | gl.SRC_COLOR | gl.ONE_MINUS_SRC_COLOR | gl.SRC_ALPHA | gl.ONE_MINUS_SRC_ALPHA | gl.DST_COLOR | gl.ONE_MINUS_DST_COLOR | gl.DST_ALPHA | gl.ONE_MINUS_DST_ALPHA | gl.CONSTANT_COLOR | gl.ONE_MINUS_CONSTANT_COLOR | gl.CONSTANT_ALPHA | gl.ONE_MINUS_CONSTANT_ALPHA | gl.SRC_ALPHA_SATURATE;
    dstAlpha: number;
}>;
export interface IModelInitializationOptions {
    /**
     * Shader 字符串，假设此时已经经过 ShaderLib 处理
     */
    vs: string;
    fs: string;
    defines?: Record<string, number | boolean>;
    uniforms?: {
        [key: string]: IUniform;
    };
    attributes: {
        [key: string]: IAttribute;
    };
    /**
     * gl.POINTS | gl.TRIANGLES | ...
     * 默认值 gl.TRIANGLES
     */
    primitive?: gl.POINTS | gl.LINES | gl.LINE_LOOP | gl.LINE_STRIP | gl.TRIANGLES | gl.TRIANGLE_FAN | gl.TRIANGLE_STRIP;
    count?: number;
    offset?: number;
    /**
     * gl.drawElements
     */
    elements?: IElements;
    /**
     * 绘制实例数目
     */
    instances?: number;
    colorMask?: [boolean, boolean, boolean, boolean];
    /**
     * depth buffer
     */
    depth?: Partial<{
        enable: boolean;
        mask: boolean;
        func: gl.NEVER | gl.ALWAYS | gl.LESS | gl.LEQUAL | gl.GREATER | gl.GEQUAL | gl.EQUAL | gl.NOTEQUAL;
        range: [0, 1];
    }>;
    /**
     * blending
     */
    blend?: Partial<IBlendOptions>;
    /**
     * stencil
     */
    stencil?: Partial<{
        enable: boolean;
        mask: number;
        func: {
            cmp: gl.NEVER | gl.ALWAYS | gl.LESS | gl.LEQUAL | gl.GREATER | gl.GEQUAL | gl.EQUAL | gl.NOTEQUAL;
            ref: number;
            mask: number;
        };
        opFront: {
            fail: stencilOp;
            zfail: stencilOp;
            zpass: stencilOp;
        };
        opBack: {
            fail: stencilOp;
            zfail: stencilOp;
            zpass: stencilOp;
        };
    }>;
    /**
     * cull
     */
    cull?: Partial<{
        enable: boolean;
        face: gl.FRONT | gl.BACK;
    }>;
    scissor?: Partial<{
        enable: boolean;
        box: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
    }>;
}
export interface IModelDrawOptions {
    uniforms?: {
        [key: string]: IUniform;
    };
    attributes?: {
        [key: string]: IAttribute;
    };
    elements?: IElements;
    blend?: IBlendOptions;
}
/**
 * 类似 THREE.Mesh，不同之处在于可以不依赖 THREE.Scene，单独执行封装的渲染命令。
 * 这些命令包括：
 * * 执行 Shader Program
 * * 开启/控制 WebGL 状态(gl.enable)例如 depth/stencil buffer、blending、cull 等
 * * 销毁资源，例如 buffer texture 等
 */
export interface IModel {
    addUniforms(uniforms: {
        [key: string]: IUniform;
    }): void;
    draw(options: IModelDrawOptions): void;
    destroy(): void;
}
export {};
