import { Graph } from "../../graph";
declare const buildLayerGraph: (g: Graph, rank: number, relationship: "inEdges" | "outEdges") => Graph;
export default buildLayerGraph;
