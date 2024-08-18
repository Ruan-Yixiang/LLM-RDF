/**
 * @file To get graph essencial information.
 * @file.zh-CN 获取图的基本信息
 * @module essence
 */

import Graph from '../Graph';

/**
 * @description Check if the object is a graph.
 * @description.zh-CN 检查对象是否为图。
 */
export function isGraph(obj: any) {
  return obj instanceof Graph;
}

/**
 * @description Check if the graph is a simple graph.
 * @description.zh-CN 检查图是否为简单图。
 */
export function isSimpleGraph(graph: Graph<any, any, any, any>) {
  if (graph.isMultigraph()) {
    return false;
  }

  const edges = graph.edges();
  const edgeStack = new Map();

  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i];
    if (edge.v === edge.w) {
      return false;
    }
    const [v, w] = [edge.v, edge.w].sort();
    const key = `${v}-${w}`;

    if (edgeStack.has(key)) {
      return false;
    }
    edgeStack.set(key, true);
  }
  return true;
}

/**
 * @description Check if the graph is a null graph.
 * @description.zh-CN 检查图是否为空图。
 */
export function isNullGraph(graph: Graph) {
  return graph.nodes().length === 0;
}

/**
 * @description Check if the graph contains Self loops.
 * @description.zh-CN 检查图是否包含自环。
 */
export function hasSelfLoop(graph: Graph) {
  const edges = graph.edges();
  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i];
    if (edge.v === edge.w) {
      return true;
    }
  }
  return false;
}
