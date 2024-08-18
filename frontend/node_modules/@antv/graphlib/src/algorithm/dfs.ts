import Graph from '../Graph';

/**
 * @description DFS traversal.
 * @description.zh-CN DFS 遍历。
 */
const doDFS = <NodeIDType = any>(
  graph: Graph<NodeIDType>,
  node: NodeIDType,
  postorder: boolean,
  visited: NodeIDType[],
  navigator: (n: NodeIDType) => NodeIDType[],
  result: NodeIDType[],
) => {
  if (!visited.includes(node)) {
    visited.push(node);
    if (!postorder) {
      result.push(node);
    }
    navigator(node).forEach((n) =>
      doDFS<NodeIDType>(graph, n, postorder, visited, navigator, result),
    );
    if (postorder) {
      result.push(node);
    }
  }
};

/**
 * @description DFS traversal.
 * @description.zh-CN DFS 遍历。
 */
const dfs = <NodeIDType = any>(
  graph: Graph<NodeIDType, any, any, any>,
  node: NodeIDType | NodeIDType[],
  order: 'pre' | 'post',
) => {
  const nodes = Array.isArray(node) ? node : [node];
  const navigator = (n: NodeIDType) =>
    (graph.isDirected() ? graph.successors(n) : graph.neighbors(n))!;
  const results: NodeIDType[] = [];
  const visited: NodeIDType[] = [];
  nodes.forEach((node) => {
    if (!graph.hasNode(node)) {
      throw new Error('Graph does not have node: ' + node);
    } else {
      doDFS(graph, node, order === 'post', visited, navigator, results);
    }
  });

  return results;
};

export default dfs;
