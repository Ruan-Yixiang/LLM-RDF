import { Graph } from "../../graph";
declare const sortSubgraph: (g: Graph, v: string, cg: Graph, biasRight?: boolean, usePrev?: boolean, keepNodeOrder?: boolean) => {
    vs: string[];
    barycenter?: number | undefined;
    weight?: number | undefined;
};
export default sortSubgraph;
