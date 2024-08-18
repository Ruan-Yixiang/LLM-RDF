import Graph from '.';

type GraphEventType = 'nodeAdd' | 'nodeRemove' | 'edgeAdd' | 'edgeRemove';

export class GraphWithEvent<
  NodeIDType = string,
  NodeType = Record<string, any>,
  EdgeType = Record<string, any>,
  GraphType = string,
> extends Graph<NodeIDType, NodeType, EdgeType, GraphType> {
  /**
   * @description a pool of event listeners.
   * @description.zh-CN 事件监听器池。
   */
  private eventPool: Record<string, Function[]> = {};

  /**
   * @description Add an event listener.
   * @description.zh-CN 添加事件监听器。
   */
  public appendEvent(type: GraphEventType, callback: Function) {
    if (!this.eventPool[type]) {
      this.eventPool[type] = [];
    }
    this.eventPool[type].push(callback);
  }

  /**
   * @description remove an event listener.
   * @description.zh-CN 移除事件监听器。
   */
  public removeEvent(type: GraphEventType, callback: Function) {
    if (!this.eventPool[type]) {
      return;
    }
    const index = this.eventPool[type].indexOf(callback);
    if (index > -1) {
      this.eventPool[type].splice(index, 1);
    }
  }

  /**
   * @description trigger an event.
   * @description.zh-CN 触发事件。
   */
  public emitEvent(type: GraphEventType, ...args: any[]) {
    if (!this.eventPool[type]) {
      return;
    }
    this.eventPool[type].forEach((callback) => {
      callback(...args);
    });
  }

  setNode(node: NodeIDType, value?: NodeType) {
    super.setNode(node, value);
    this.emitEvent('nodeAdd', node, value);
    return this;
  }

  removeNode(node: NodeIDType) {
    super.removeNode(node);
    this.emitEvent('nodeRemove', node);
    return this;
  }

  setEdge(v_: NodeIDType, w_: NodeIDType, value?: any, name?: string | undefined) {
    super.setEdge(v_, w_, value, name);
    this.emitEvent('edgeAdd', v_, w_, value, name);
    return this;
  }

  removeEdge(v_: NodeIDType, w_: NodeIDType, name?: any) {
    super.removeEdge(v_, w_, name);
    this.emitEvent('edgeRemove', v_, w_, name);
    return this;
  }
}
