import dfs from './dfs';
import Graph from '../Graph';

const postorder = <NodeType>(graph: Graph<NodeType, any, any, any>, nodes: NodeType | NodeType[]) =>
  dfs<NodeType>(graph, nodes, 'post');

export default postorder;
