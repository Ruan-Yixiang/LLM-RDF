
export default G6 => {
  G6.registerBehavior('select-node', {

    getDefaultCfg () {
      return {

        multiple: false,
      };
    },

    getEvents () {
      return {
        'node:click':      'onNodeClick',
        'node:dblclick':   'ondblClick',
        'canvas:click':    'onCanvasClick',
        'node:mouseenter': 'onNodeMouseEnter',
        'node:mousemove':  'onNodeMouseMove',
        'node:mouseleave': 'onNodeMouseLeave',
      };
    },
    shouldBegin (e) {
      return true;
    },

    onNodeClick (e) {
      if (!this.shouldBegin(e)) return;

      this._clearSelected();
      e.item.toFront();

      e.item.setState('nodeState', 'selected');

      this.graph.emit('after-node-selected', e);
    },
    ondblClick (e) {
      if (!this.shouldBegin(e)) return;

      this._clearSelected();
      e.item.toFront();

      e.item.setState('nodeState', 'selected');

      this.graph.emit('after-node-dblclick', e);
    },
    onCanvasClick (e) {
      if (!this.shouldBegin(e)) return;
      this._clearSelected();
      this.graph.emit('on-canvas-click', e);
    },
    // hover node
    onNodeMouseEnter (e) {
      if (!this.shouldBegin(e)) return;
      if (!e.item.hasState('nodeState:selected')) {
        e.item.setState('nodeState', 'hover');
      }
      this.graph.emit('on-node-mouseenter', e);
    },
    onNodeMouseMove (e) {
      if (!this.shouldBegin(e)) return;
      this.graph.emit('on-node-mousemove', e);
    },

    onNodeMouseLeave (e) {
      if (!this.shouldBegin(e)) return;

      if (!e.item.hasState('nodeState:selected')) {
        e.item.clearStates('nodeState:hover');
      }
      this.graph.emit('on-node-mouseleave', e);
    },

    _clearSelected () {
      const selectedNodes = this.graph.findAllByState('node', 'nodeState:selected');

      selectedNodes.forEach(node => {
        node.clearStates(['nodeState:selected', 'nodeState:hover']);
      });

      const selectedEdges = this.graph.findAllByState('edge', 'edgeState:selected');

      selectedEdges.forEach(edge => {
        edge.clearStates(['edgeState:selected', 'edgeState:hover']);
      });
      this.graph.emit('after-node-selected');
    },
  });
};
