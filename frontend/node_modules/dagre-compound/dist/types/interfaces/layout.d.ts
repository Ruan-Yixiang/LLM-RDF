import { Align, RankDir } from './common';
export interface DagreLayoutParams {
    nodesep: number;
    ranksep: number;
    edgesep: number;
    align?: Align;
}
export interface LayoutConfig {
    graph: {
        meta: {
            rankDir: RankDir;
            nodeSep: number;
            rankSep: number;
            edgeSep: number;
            align?: 'UL' | 'UR' | 'DL' | 'DR';
        };
    };
    subScene: {
        meta: {
            paddingTop: number;
            paddingBottom: number;
            paddingLeft: number;
            paddingRight: number;
            labelHeight: number;
        };
    };
    nodeSize: {
        meta: {
            width: number;
            maxLabelWidth: number;
            height: number;
        };
        node: {
            width: number;
            height: number;
            labelOffset: number;
            maxLabelWidth: number;
        };
        bridge: {
            width: number;
            height: number;
            radius: number;
            labelOffset: number;
        };
    };
}
export interface Point {
    x: number;
    y: number;
}
