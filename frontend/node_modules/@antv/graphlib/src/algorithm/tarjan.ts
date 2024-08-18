import Graph from '../Graph';

type Entry = {
  onStack: boolean;
  lowlink: number;
  index: number;
};

/**
 * @description Tarjan's algorithm for finding the strongly connected components of a graph.
 * @description https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm
 * @description.zh-CN Tarjan 算法用于找到图的强连通子图。
 * @param graph
 * @returns
 */
const tarjan = <NodeIDType>(graph: Graph<NodeIDType>) => {
  let index = 0;
  const stack: NodeIDType[] = [];
  const visited = new Map<NodeIDType, Entry>(); // node id -> { onStack, lowlink, index }
  const results: NodeIDType[][] = [];

  function dfs(v: NodeIDType) {
    const entry = {
      onStack: true,
      lowlink: index,
      index,
    };
    visited.set(v, entry);
    index += 1;
    stack.push(v);

    graph.successors(v)?.forEach(function (w) {
      // 如果 w 没有被访问过，则继续访问 w
      if (!visited.has(w)) {
        dfs(w);
        const wEntry = visited.get(w);
        entry.lowlink = Math.min(entry.lowlink, wEntry!.lowlink);
        // 如果 w 在栈顶，则说明 w 和 v 不是强连通的
      } else if (visited.get(w)?.onStack) {
        const wEntry = visited.get(w);
        // 如果 w 在栈中，则说明 w 在当前访问的路径上
        entry.lowlink = Math.min(entry.lowlink, wEntry!.index);
      }
    });

    // 如果 v 的 lowlink 不等于 v 的 index，则说明 v 和 v 的 lowlink 不是强连通的
    if (entry.lowlink === entry.index) {
      const cmpt = [];
      let w;
      do {
        // 将 w 出栈，并将 w 的所有邻接点加入强连通子图
        w = stack.pop()!;
        const wEntry = visited.get(w)!;
        wEntry.onStack = false;
        cmpt.push(w);
      } while (v !== w);
      results.push(cmpt);
    }
  }

  graph.nodes().forEach(function (v) {
    if (!visited.has(v)) {
      dfs(v);
    }
  });

  return results;
};

export default tarjan;
