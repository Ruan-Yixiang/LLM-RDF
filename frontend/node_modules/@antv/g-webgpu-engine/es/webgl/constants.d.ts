import regl from 'regl';
export declare const primitiveMap: {
    [key: string]: 'points' | 'lines' | 'line loop' | 'line strip' | 'triangles' | 'triangle strip' | 'triangle fan';
};
export declare const usageMap: {
    [key: string]: 'static' | 'dynamic' | 'stream';
};
export declare const dataTypeMap: {
    [key: string]: 'int8' | 'int16' | 'int32' | 'uint8' | 'uint16' | 'uint32' | 'float';
};
export declare const formatMap: {
    [key: string]: 'alpha' | 'luminance' | 'luminance alpha' | 'rgb' | 'rgba' | 'rgba4' | 'rgb5 a1' | 'rgb565' | 'depth' | 'depth stencil';
};
export declare const mipmapMap: {
    [key: string]: 'dont care' | 'nice' | 'fast';
};
export declare const filterMap: {
    [key: string]: 'nearest' | 'linear' | 'mipmap' | 'nearest mipmap linear' | 'linear mipmap nearest' | 'nearest mipmap nearest';
};
export declare const wrapModeMap: {
    [key: string]: 'repeat' | 'clamp' | 'mirror';
};
export declare const colorSpaceMap: {
    [key: string]: 'none' | 'browser';
};
export declare const depthFuncMap: {
    [key: string]: 'never' | 'always' | 'less' | 'lequal' | 'greater' | 'gequal' | 'equal' | 'notequal';
};
export declare const blendEquationMap: {
    [key: string]: regl.BlendingEquation;
};
export declare const blendFuncMap: {
    [key: string]: regl.BlendingFunction;
};
export declare const stencilFuncMap: {
    [key: string]: regl.ComparisonOperatorType;
};
export declare const stencilOpMap: {
    [key: string]: regl.StencilOperationType;
};
export declare const cullFaceMap: {
    [key: string]: regl.FaceOrientationType;
};
