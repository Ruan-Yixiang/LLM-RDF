import { Graph } from "../../graph";
declare const barycenter: (g: Graph, movable: string[]) => ({
    v: string;
    barycenter?: undefined;
    weight?: undefined;
} | {
    v: string;
    barycenter: number;
    weight: number;
})[];
export default barycenter;
