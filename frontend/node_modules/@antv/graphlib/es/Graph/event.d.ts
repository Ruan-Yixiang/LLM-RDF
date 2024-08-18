import Graph from '.';
declare type GraphEventType = 'nodeAdd' | 'nodeRemove' | 'edgeAdd' | 'edgeRemove';
export declare class GraphWithEvent<NodeIDType = string, NodeType = Record<string, any>, EdgeType = Record<string, any>, GraphType = string> extends Graph<NodeIDType, NodeType, EdgeType, GraphType> {
    /**
     * @description a pool of event listeners.
     * @description.zh-CN 事件监听器池。
     */
    private eventPool;
    /**
     * @description Add an event listener.
     * @description.zh-CN 添加事件监听器。
     */
    appendEvent(type: GraphEventType, callback: Function): void;
    /**
     * @description remove an event listener.
     * @description.zh-CN 移除事件监听器。
     */
    removeEvent(type: GraphEventType, callback: Function): void;
    /**
     * @description trigger an event.
     * @description.zh-CN 触发事件。
     */
    emitEvent(type: GraphEventType, ...args: any[]): void;
    setNode(node: NodeIDType, value?: NodeType): this;
    removeNode(node: NodeIDType): this;
    setEdge(v_: NodeIDType, w_: NodeIDType, value?: any, name?: string | undefined): this;
    removeEdge(v_: NodeIDType, w_: NodeIDType, name?: any): this;
}
export {};
