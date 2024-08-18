import Graph from '../Graph';
import tarjan from './tarjan';

const findCycles = <NodeType>(graph: Graph<NodeType>) => {
  return tarjan<NodeType>(graph).filter(
    (cmpt) => cmpt.length > 1 || (cmpt.length === 1 && graph.hasEdge(cmpt[0], cmpt[0])),
  );
};

export default findCycles;
