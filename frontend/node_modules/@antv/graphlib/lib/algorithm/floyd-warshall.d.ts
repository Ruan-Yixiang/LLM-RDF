import Graph, { DefaultEdgeType } from '../Graph';
export declare function floydWarshall<NodeIDType, EdgeType>(graph: Graph<NodeIDType, any, EdgeType>, weightFn?: (node: DefaultEdgeType<NodeIDType, EdgeType>) => number, edgeFn?: (node: NodeIDType) => DefaultEdgeType<NodeIDType, EdgeType>[]): Record<string, Record<string, Entry<NodeIDType>>>;
declare type Entry<NodeIDType> = {
    distance?: number;
    predecessor?: NodeIDType;
};
export default floydWarshall;
