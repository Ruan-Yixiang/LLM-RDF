/**
 * @file Functions that used to find similar element between two graph
 * @file.zh-CN 在两个图中查找相似元素的函数
 */

import { isSimpleGraph } from '../essence';
import Graph from '../Graph';

/**
 * @description Check if two graphs are contains the same nodes.
 * @description.zh-CN 检查两个图是否包含相同的节点。
 */
export const containSameNodes = <NodeIDType = any>(
  aGraph: Graph<NodeIDType>,
  bGraph: Graph<NodeIDType>,
) => {
  const aNodes = aGraph.nodes();
  for (let i = 0; i < aNodes.length; i++) {
    const aNode = aNodes[i];
    if (bGraph.hasNode(aNode)) {
      return true;
    }
  }
  return false;
};

/**
 * @description Check if two graphs are contains the same edges.
 * @description.zh-CN 检查两个图是否包含相同的边。
 */
export const containSameEdges = <NodeIDType = any>(
  aGraph: Graph<NodeIDType, any, any>,
  bGraph: Graph<NodeIDType, any, any>,
) => {
  const aEdges = aGraph.edges();
  for (let i = 0; i < aEdges.length; i++) {
    const aEdge = aEdges[i];
    if (bGraph.hasEdge(aEdge.v, aEdge.w, aEdge.name)) {
      return true;
    }
  }
  return false;
};

/**
 * @description get same nodes in two graphs.
 * @description.zh-CN 获取两个图中相同的节点。
 */
export const getSameNodes = <NodeIDType = any>(
  aGraph: Graph<NodeIDType>,
  bGraph: Graph<NodeIDType>,
) => {
  const aNodes = aGraph.nodes();
  const sameNodes = aNodes.filter((aNode) => bGraph.hasNode(aNode));
  return sameNodes;
};

/**
 * @description get same edges in two graphs.
 * @description.zh-CN 获取两个图中相同的边。
 */
export const getSameEdges = <NodeIDType = any, EdgeType = any>(
  aGraph: Graph<NodeIDType, any, EdgeType, any>,
  bGraph: Graph<NodeIDType, any, EdgeType, any>,
) => {
  const aEdges = aGraph.edges();
  const sameEdges = aEdges.filter((aEdge) => bGraph.hasEdge(aEdge.v, aEdge.w, aEdge.name));
  return sameEdges;
};

/**
 * @description Check if two graphs'option are the same.
 * @description.zh-CN 检查两个图的选项是否相同。
 */
export const isGraphOptionSame = <NodeIDType = any, EdgeType = any>(
  aGraph: Graph<NodeIDType, any, EdgeType, any>,
  bGraph: Graph<NodeIDType, any, EdgeType, any>,
) => {
  return (
    aGraph.isCompound() === bGraph.isCompound() &&
    aGraph.isDirected() === bGraph.isDirected() &&
    aGraph.isMultigraph() === bGraph.isMultigraph()
  );
};

/**
 * @description Check if a graph contains all nodes in another graph.
 * @description.zh-CN 检查一个图是否包含另一个图的所有节点。
 */
export const containAllSameNodes = <NodeIDType = any>(
  aGraph: Graph<NodeIDType, any, any, any>,
  bGraph: Graph<NodeIDType, any, any, any>,
) => {
  const sameNodes = getSameNodes(aGraph, bGraph);
  return sameNodes.length === aGraph.nodes().length;
};

/**
 * @description Check if a graph contains all edges in another graph.
 * @description.zh-CN 检查一个图是否包含另一个图的所有边。
 */
export const containAllSameEdges = <NodeIDType = any, EdgeType = any>(
  aGraph: Graph<NodeIDType, any, EdgeType, any>,
  bGraph: Graph<NodeIDType, any, EdgeType, any>,
) => {
  const sameEdges = getSameEdges(aGraph, bGraph);
  return sameEdges.length === aGraph.edges().length;
};

/**
 * @description Check if two graphs are the same.
 * @description.zh-CN 检查两个图是否相同。
 */
export const isGraphSame = <NodeIDType = any, EdgeType = any>(
  aGraph: Graph<NodeIDType, any, EdgeType, any>,
  bGraph: Graph<NodeIDType, any, EdgeType, any>,
) => {
  return (
    isGraphOptionSame(aGraph, bGraph) &&
    aGraph.nodeCount() === bGraph.nodeCount() &&
    containAllSameNodes<NodeIDType>(aGraph, bGraph) &&
    aGraph.edgeCount() === bGraph.edgeCount() &&
    containAllSameEdges(aGraph, bGraph)
  );
};

/**
 * @description Check if one graph is the subgraph of another graph.
 * @description.zh-CN 检查一个图是否是另一个图的子图。
 */
export const isGraphContainsAnother = <NodeIDType = any, EdgeType = any>(
  originGraph: Graph<NodeIDType, any, EdgeType, any>,
  targetGraph: Graph<NodeIDType, any, EdgeType, any>,
) => {
  return (
    containAllSameNodes<NodeIDType>(originGraph, targetGraph) &&
    containAllSameEdges(originGraph, targetGraph)
  );
};
