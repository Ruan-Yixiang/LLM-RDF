import { Edge, Graph } from '../../graph';
declare const networkSimplex: (og: Graph) => void;
export declare const initCutValues: (t: Graph, g: Graph) => void;
export declare const calcCutValue: (t: Graph, g: Graph, child: string) => number;
export declare const initLowLimValues: (tree: Graph, root?: string) => void;
export declare const leaveEdge: (tree: Graph) => import("@antv/graphlib/lib/Graph").DefaultEdgeType<string, Partial<import("../../graph").EdgeConfig & Edge & import("../../graph").GraphEdge>> | undefined;
export declare const enterEdge: (t: Graph, g: Graph, edge: any) => import("@antv/graphlib/lib/Graph").DefaultEdgeType<string, Partial<import("../../graph").EdgeConfig & Edge & import("../../graph").GraphEdge>>;
export declare const exchangeEdges: (t: Graph, g: Graph, e: Edge, f: Edge) => void;
export default networkSimplex;
