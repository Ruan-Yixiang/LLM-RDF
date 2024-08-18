import { TreeGraphData } from '@antv/g6-core';
export type WaterMarkerConfig = Partial<{
    width: number;
    height: number;
    compatible: boolean;
    text: {
        x?: number;
        y?: number;
        lineHeight?: number;
        rotate?: number;
        fontSize?: number;
        fontFamily?: string;
        fill?: string;
        baseline?: string;
    };
    image: {
        x?: number;
        y?: number;
        width?: number;
        height: number;
        rotate?: number;
    };
}>;
export type TreeLayoutConfig = {
    type: string;
    data?: TreeGraphData;
    radial?: boolean;
    [key: string]: unknown;
};
