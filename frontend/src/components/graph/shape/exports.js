import registerBaseNode from './items/base-node';
import registerNode from './node';

export default (G6) => {
  registerBaseNode(G6);
  registerNode(G6);
};
