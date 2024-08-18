import dfs from './dfs';

var preorder = function preorder(graph, nodes) {
  return dfs(graph, nodes, 'pre');
};

export default preorder;