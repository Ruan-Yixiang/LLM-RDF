import { Graph, Node } from "../graph";
export declare const addDummyNode: (g: Graph, type: string, attrs: Node<Record<string, any>>, name: string) => string;
export declare const simplify: (g: Graph) => Graph;
export declare const asNonCompoundGraph: (g: Graph) => Graph;
export declare const zipObject: <T = any>(keys: string[], values: T[]) => Record<string, T>;
export declare const successorWeights: (g: Graph) => Record<string, Record<string, number>>;
export declare const predecessorWeights: (g: Graph) => Record<string, Record<string, number>>;
export declare const intersectRect: (rect: {
    x?: number | undefined;
    y?: number | undefined;
    width?: number | undefined;
    height?: number | undefined;
}, point: {
    x?: number | undefined;
    y?: number | undefined;
}) => {
    x: number;
    y: number;
};
export declare const buildLayerMatrix: (g: Graph) => string[][];
export declare const normalizeRanks: (g: Graph) => void;
export declare const removeEmptyRanks: (g: Graph) => void;
export declare const addBorderNode: (g: Graph, prefix: string, rank?: number, order?: number) => string;
export declare const maxRank: (g: Graph) => number;
export declare const partition: <T = any>(collection: T[], fn: (val: T) => boolean) => {
    lhs: T[];
    rhs: T[];
};
export declare const time: (name: string, fn: () => void) => void;
export declare const notime: (name: string, fn: () => void) => void;
export declare const minBy: <T = any>(array: T[], func: (param: T) => number) => T;
