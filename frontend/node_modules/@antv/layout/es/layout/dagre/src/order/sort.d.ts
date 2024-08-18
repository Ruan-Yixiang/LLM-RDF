import { ConflictEntry } from "./resolve-conflicts";
declare const sort: (entries: ConflictEntry[], biasRight?: boolean, usePrev?: boolean, keepNodeOrder?: boolean) => {
    vs: string[];
    barycenter?: number | undefined;
    weight?: number | undefined;
};
export default sort;
