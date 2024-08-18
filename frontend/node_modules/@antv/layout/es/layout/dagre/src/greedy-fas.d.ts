import { Edge, Graph } from "../graph";
declare const greedyFAS: (g: Graph, weightFn?: ((e: Edge) => number) | undefined) => (import("@antv/graphlib/lib/Graph").DefaultEdgeType<string, Partial<import("../graph").EdgeConfig & Edge & import("../graph").GraphEdge>> | undefined)[];
export default greedyFAS;
