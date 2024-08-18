import Graph from '../Graph';
/**
 * @description DFS traversal.
 * @description.zh-CN DFS 遍历。
 */
declare const dfs: <NodeIDType = any>(graph: Graph<NodeIDType, any, any, any>, node: NodeIDType | NodeIDType[], order: 'pre' | 'post') => NodeIDType[];
export default dfs;
