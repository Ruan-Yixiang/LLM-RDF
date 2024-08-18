import tarjan from './tarjan';

var findCycles = function findCycles(graph) {
  return tarjan(graph).filter(function (cmpt) {
    return cmpt.length > 1 || cmpt.length === 1 && graph.hasEdge(cmpt[0], cmpt[0]);
  });
};

export default findCycles;