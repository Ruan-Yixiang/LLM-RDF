import dfs from './dfs';
import Graph from '../Graph';

const preorder = <NodeType>(graph: Graph<NodeType, any, any, any>, nodes: NodeType | NodeType[]) =>
  dfs<NodeType>(graph, nodes, 'pre');

export default preorder;
