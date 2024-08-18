import dfs from './dfs';

var postorder = function postorder(graph, nodes) {
  return dfs(graph, nodes, 'post');
};

export default postorder;