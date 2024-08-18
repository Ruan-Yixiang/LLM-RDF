import { Graph as RawGraph } from "@antv/graphlib";
import { Graph } from "../../graph";
declare class BlockGraph extends RawGraph<string, string, number> {
}
type Conflicts = Record<string, Record<string, boolean>>;
export declare const findType1Conflicts: (g: Graph, layering?: string[][]) => {};
export declare const findType2Conflicts: (g: Graph, layering?: string[][]) => {};
export declare const findOtherInnerSegmentNode: (g: Graph, v: string) => string | undefined;
export declare const addConflict: (conflicts: Conflicts, v: string, w: string) => void;
export declare const hasConflict: (conflicts: Conflicts, v: string, w: string) => boolean;
export declare const verticalAlignment: (g: Graph, layering: string[][], conflicts: Conflicts, neighborFn: (v: string) => string[]) => {
    root: Record<string, string>;
    align: Record<string, string>;
};
export declare const horizontalCompaction: (g: Graph, layering: string[][], root: Record<string, string>, align: Record<string, string>, reverseSep?: boolean) => Record<string, number>;
export declare const buildBlockGraph: (g: Graph, layering: string[][], root: Record<string, string>, reverseSep?: boolean) => BlockGraph;
export declare const findSmallestWidthAlignment: (g: Graph, xss: Record<string, Record<string, number>>) => Record<string, number>;
export declare function alignCoordinates(xss: Record<string, Record<string, number>>, alignTo: Record<string, number>): void;
export declare const balance: (xss: Record<string, Record<string, number>>, align?: string) => Record<string, number>;
export declare const positionX: (g: Graph) => Record<string, number>;
export declare const sep: (nodeSep: number, edgeSep: number, reverseSep: boolean) => (g: Graph, v: string, w: string) => number;
export declare const width: (g: Graph, v: string) => number;
export {};
