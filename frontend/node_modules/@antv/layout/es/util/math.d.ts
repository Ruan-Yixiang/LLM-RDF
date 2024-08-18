import { Matrix, Model, IndexMap, Edge, Node, OutNode, Degree, NodeMap } from '../layout/types';
export declare const getEdgeTerminal: (edge: Edge, type: 'source' | 'target') => any;
export declare const getDegree: (n: number, nodeIdxMap: IndexMap, edges: Edge[] | null) => Degree[];
export declare const getDegreeMap: (nodes: Node[], edges: Edge[] | null) => {
    [id: string]: Degree;
};
export declare const floydWarshall: (adjMatrix: Matrix[]) => Matrix[];
export declare const getAdjMatrix: (data: Model, directed: boolean) => Matrix[];
/**
 * scale matrix
 * @param matrix [ [], [], [] ]
 * @param ratio
 */
export declare const scaleMatrix: (matrix: Matrix[], ratio: number) => Matrix[];
/**
 * depth first traverse, from leaves to root, children in inverse order
 * if the fn returns false, terminate the traverse
 */
export declare const traverseTreeUp: <T extends {
    children?: T[] | undefined;
}>(data: T, fn: (param: T) => boolean) => void;
/**
 * calculate the bounding box for the nodes according to their x, y, and size
 * @param nodes nodes in the layout
 * @returns
 */
export declare const getLayoutBBox: (nodes: OutNode[]) => {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
};
/**
 * 获取节点集合的平均位置信息
 * @param nodes 节点集合
 * @returns 平局内置
 */
export declare const getAvgNodePosition: (nodes: OutNode[]) => {
    x: number;
    y: number;
};
export declare const getCoreNodeAndRelativeLeafNodes: (type: 'leaf' | 'all', node: Node, edges: Edge[], nodeClusterBy: string, degreesMap: {
    [id: string]: Degree;
}, nodeMap: NodeMap) => {
    coreNode: Node;
    relativeLeafNodes: Node[];
    sameTypeLeafNodes: Node[];
};
