import Graph, { GraphOption } from '.';
declare type JSONNode<NodeIDType = string, NodeType = any> = {
    id: NodeIDType;
    value?: NodeType;
    parent?: NodeIDType;
};
declare type JSONEdge<NodeIDType = string, EdgeType = Record<string, any>> = {
    /**
     * @description The source node id.
     * @description.zh-CN 源节点 id。
     */
    v: NodeIDType;
    /**
     * @description The target node id.
     * @description.zh-CN 目标节点 id。
     */
    w: NodeIDType;
    /**
     * @description The edge value.
     * @description.zh-CN 边的值。
     */
    value?: EdgeType;
    /**
     * @description The edge name.
     * @description.zh-CN 边的名称。
     */
    name?: string;
};
declare type JSONGraph<NodeIDType, NodeType, EdgeType, GraphType> = {
    options: GraphOption;
    nodes: JSONNode<NodeIDType, NodeType>[];
    edges: JSONEdge<NodeIDType, EdgeType>[];
    value?: GraphType;
};
/**
 * @description Convert a graph to JSON.
 * @description.zh-CN 转换图为 JSON。
 * @param graph
 * @returns
 */
export declare const write: <NodeIDType = string, NodeType = Record<string, any>, EdgeType = Record<string, any>, GraphType = string>(graph: Graph<NodeIDType, NodeType, EdgeType, GraphType>) => JSONGraph<NodeIDType, NodeType, EdgeType, GraphType>;
/**
 * @description read a graph from JSON.
 * @description.zh-CN 从 JSON 读取图。
 * @param json
 * @returns
 */
export declare const read: <NodeIDType = string, NodeType = Record<string, any>, EdgeType = Record<string, any>, GraphType = string>(json: JSONGraph<NodeIDType, NodeType, EdgeType, GraphType>) => Graph<NodeIDType, NodeType, EdgeType, GraphType>;
export {};
