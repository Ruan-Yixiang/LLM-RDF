import Graph from '../Graph';
import topsort, { CycleException } from './topsort';

const isAcyclic = (graph: Graph) => {
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
