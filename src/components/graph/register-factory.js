
import shape from './shape/exports';
import behavior from './behavior/exports';
import registerEdges from './shape/edges/base-edge';

export default G6 => {
  shape(G6);
  behavior(G6);
  registerEdges(G6);
};
