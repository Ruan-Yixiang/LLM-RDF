import topsort, { CycleException } from './topsort';

var isAcyclic = function isAcyclic(graph) {
  try {
    topsort(graph);
  } catch (e) {
    if (e instanceof CycleException) {
      return false;
    }

    throw e;
  }

  return true;
};

export default isAcyclic;