import Graph, { GraphOption } from '.';

type JSONNode<NodeIDType = string, NodeType = any> = {
  id: NodeIDType;
  value?: NodeType;
  parent?: NodeIDType;
};

/**
 * @description Convert a graph's node to JSON.
 * @description.zh-CN 转换图的节点为 JSON。
 * @param graph
 * @returns
 */
const nodeToJSON = <NodeIDType = string, NodeType = any>(
  graph: Graph<NodeIDType, NodeType, any, any>,
) => {
  return graph.nodes().map((n) => {
    const value = graph.node(n);
    const parent = graph.parent(n);
    const node = {
      id: n,
      value,
      parent,
    };
    if (node.value === undefined) {
      delete node.value;
    }
    if (node.parent === undefined) {
      delete node.parent;
    }
    return node as JSONNode<NodeIDType, NodeType>;
  });
};

type JSONEdge<NodeIDType = string, EdgeType = Record<string, any>> = {
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

/**
 * @description Convert all graph's edges to JSON.
 * @description.zh-CN 转换图的所有边为 JSON。
 * @param graph
 * @returns
 */
const edgeToJSON = <NodeIDType = string, EdgeType = Record<string, any>>(
  graph: Graph<NodeIDType, any, EdgeType, any>,
) => {
  return graph.edges().map((edge) => {
    const value = graph.edge(edge);
    const e = {
      v: edge.v,
      w: edge.w,
      value,
      name: edge.name,
    };

    if (e.name === undefined) {
      delete e.name;
    }

    if (e.value === undefined) {
      delete e.value;
    }

    return e as JSONEdge<NodeIDType, EdgeType>;
  });
};

type JSONGraph<NodeIDType, NodeType, EdgeType, GraphType> = {
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
export const write = <
  NodeIDType = string,
  NodeType = Record<string, any>,
  EdgeType = Record<string, any>,
  GraphType = string,
>(
  graph: Graph<NodeIDType, NodeType, EdgeType, GraphType>,
) => {
  const json: JSONGraph<NodeIDType, NodeType, EdgeType, GraphType> = {
    options: {
      directed: graph.isDirected(),
      multigraph: graph.isMultigraph(),
      compound: graph.isCompound(),
    },
    nodes: nodeToJSON<NodeIDType, NodeType>(graph),
    edges: edgeToJSON<NodeIDType, EdgeType>(graph),
    value: graph.graph(),
  };
  if (json.value === undefined) {
    delete json.value;
  }

  return json;
};

/**
 * @description read a graph from JSON.
 * @description.zh-CN 从 JSON 读取图。
 * @param json
 * @returns
 */
export const read = <
  NodeIDType = string,
  NodeType = Record<string, any>,
  EdgeType = Record<string, any>,
  GraphType = string,
>(
  json: JSONGraph<NodeIDType, NodeType, EdgeType, GraphType>,
) => {
  const graph = new Graph<NodeIDType, NodeType, EdgeType, GraphType>(json.options);
  if (json.value !== undefined) {
    graph.setGraph(json.value);
  }
  json.nodes.forEach((entry) => {
    graph.setNode(entry.id, entry.value);
    if (entry.parent) {
      graph.setParent(entry.id, entry.parent);
    }
  });
  json.edges.forEach((entry) => {
    graph.setEdge(entry.v, entry.w, entry.value, entry.name);
  });
  return graph;
};
