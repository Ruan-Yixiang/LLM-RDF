import { isSimpleGraph } from '../essence';
import Graph from '../Graph';
/**
 * @description Get the graph's complement
 * @description.zh-CN 获取图的补图
 */

export var getGraphComplement = function getGraphComplement(originGraph) {
  if (!isSimpleGraph(originGraph)) {
    return null;
  }

  var nodeCount = originGraph.nodeCount();
  var complementGraph = new Graph({
    compound: originGraph.isCompound(),
    directed: originGraph.isDirected(),
    multigraph: originGraph.isMultigraph()
  });
  var nodes = originGraph.nodes();

  for (var i = 0; i < nodeCount; i++) {
    var nodei = nodes[i];
    complementGraph.setNode(nodei, originGraph.node(nodei));

    for (var j = i + 1; j < nodeCount; j++) {
      var nodej = nodes[j];

      if (!originGraph.hasEdge(nodei, nodej)) {
        complementGraph.setEdge(nodei, nodej);
      }
    }
  }

  return complementGraph;
};