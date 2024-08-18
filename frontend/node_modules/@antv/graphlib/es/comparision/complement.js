import { isSimpleGraph } from '../essence';
import { containAllSameNodes, containSameEdges } from './contain';
/**
 * @description Check if one graph is the complement of another graph.
 * @description.zh-CN 检查一个图是否是另一个图的补图。
 */

export var isGraphComplement = function isGraphComplement(originGraph, targetGraph) {
  if (!isSimpleGraph(originGraph) || !isSimpleGraph(targetGraph)) {
    return false;
  }

  if (!containAllSameNodes(originGraph, targetGraph)) {
    return false;
  }

  if (containSameEdges(originGraph, targetGraph)) {
    return false;
  }

  var nodeCount = originGraph.nodeCount();
  return originGraph.edgeCount() + targetGraph.edgeCount() === nodeCount * (nodeCount - 1) / 2;
};