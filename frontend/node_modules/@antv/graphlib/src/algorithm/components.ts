import Graph from '../Graph';

const components = <NodeIDType>(graph: Graph<NodeIDType>) => {
  const visited = new Set();
  const resultComponents: NodeIDType[][] = [];
  const nodes = graph.nodes();

  nodes.forEach((n) => {
    const componentsArr: NodeIDType[] = [];
    const waitingList = [n];

    while (waitingList.length > 0) {
      const node = waitingList.pop()!;
      if (!visited.has(node)) {
        visited.add(node);
        componentsArr.push(node);
        graph.successors(node)?.forEach((n) => waitingList.push(n));
        graph.predecessors(node)?.forEach((n) => waitingList.push(n));
      }
    }

    if (componentsArr.length) {
      resultComponents.push(componentsArr);
    }
  });

  return resultComponents;
};

export default components;
