import Graph from '../Graph';
export declare class CycleException extends Error {
}
declare function topsort<NodeIDType>(graph: Graph<NodeIDType>): NodeIDType[];
export default topsort;
