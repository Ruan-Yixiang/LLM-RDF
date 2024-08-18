import { Graph } from "../../graph";
export type ConflictEntry = {
    i: number;
    indegree?: number;
    in?: ConflictEntry[];
    out?: ConflictEntry[];
    vs: string[];
    barycenter?: number;
    weight?: number;
    merged?: boolean;
    fixorder?: number;
    order?: number;
};
declare const resolveConflicts: (entries: {
    v: string;
    barycenter?: number;
    weight?: number;
}[], cg: Graph) => ConflictEntry[];
export default resolveConflicts;
