import { isSimpleGraph } from '../essence';
import Graph from '../Graph';

/**
 * @description Get the graph's complement
 * @description.zh-CN 获取图的补图
 */
export const getGraphComplement = <NodeIDType = any, EdgeType = any>(
  originGraph: Graph<NodeIDType, any, EdgeType, any>,
) => {
  if (!isSimpleGraph(originGraph)) {
    return null;
  }
  const nodeCount = originGraph.nodeCount();
  const complementGraph = new Graph<NodeIDType, any, EdgeType, any>({
    compound: originGraph.isCompound(),
    directed: originGraph.isDirected(),
    multigraph: originGraph.isMultigraph(),
  });
  const nodes = originGraph.nodes();
  for (let i = 0; i < nodeCount; i++) {
    const nodei = nodes[i];
    complementGraph.setNode(nodei, originGraph.node(nodei));
    for (let j = i + 1; j < nodeCount; j++) {
      const nodej = nodes[j];
      if (!originGraph.hasEdge(nodei, nodej)) {
        complementGraph.setEdge(nodei, nodej);
      }
    }
  }
  return complementGraph;
};
