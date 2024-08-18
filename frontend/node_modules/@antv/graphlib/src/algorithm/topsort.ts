import Graph from '../Graph';

export class CycleException extends Error {}

function topsort<NodeIDType>(graph: Graph<NodeIDType>) {
  var visited = new Set<NodeIDType>();
  var stack = new Set<NodeIDType>();
  var results: NodeIDType[] = [];

  function visit(node: NodeIDType) {
    if (stack.has(node)) {
      throw new CycleException();
    }

    if (!visited.has(node)) {
      stack.add(node);
      visited.add(node);
      graph.predecessors(node)?.forEach(visit);
      stack.delete(node);
      results.push(node);
    }
  }
  graph.sinks().forEach(visit);

  if (visited.size !== graph.nodeCount()) {
    throw new CycleException();
  }

  return results;
}

export default topsort;
