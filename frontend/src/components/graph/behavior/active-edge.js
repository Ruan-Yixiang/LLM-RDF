
export default G6 => {
  G6.registerBehavior('active-edge', {
    getDefaultCfg() {
      return {
        // editMode: false, 
      };
    },
    getEvents() {
      return {
        'canvas:click':    'onCanvasClick',
        'edge:click':      'onEdgeClick',
        'edge:dblclick':   'ondblEdgeClick',
        'edge:mouseenter': 'onMouseEnter',
        'edge:mousemove':  'onMouseMove',
        'edge:mouseleave': 'onMouseLeave',
      };
    },
    shouldBegin (e) {
      return true;
    },
    onCanvasClick(e) {
      this._clearSelected();
    },
    onEdgeClick (e) {
      if (!this.shouldBegin(e)) return;

      this._clearSelected();

      e.item.setState('edgeState', 'selected');
      // this.graph.setItemState(e.item, 'edgeState', 'selected');

      this.graph.emit('after-edge-selected', e);
    },
    ondblEdgeClick (e) {
      if (!this.shouldBegin(e)) return;

      this._clearSelected();

      e.item.setState('edgeState', 'selected');

      this.graph.emit('after-edge-dblclick', e);
    },
    // hover edge
    onMouseEnter (e) {
      if (!this.shouldBegin(e)) return;

      if (!e.item.hasState('edgeState:hover') && !e.item.hasState('edgeState:selected')) {
        e.item.setState('edgeState', 'hover');
      }
      this.graph.emit('on-edge-mouseenter', e);
    },
    onMouseMove (e) {
      if (!this.shouldBegin(e)) return;

      this.graph.emit('on-edge-mousemove', e);
    },
    // out edge
    onMouseLeave (e) {
      if (!this.shouldBegin(e)) return;

      if (!e.item.hasState('edgeState:selected')) {
        e.item.setState('edgeState', 'default');
      }
      this.graph.emit('on-edge-mouseleave', e);
    },

    _clearSelected() {
      const selectedNodes = this.graph.findAllByState('node', 'nodeState:selected');

      selectedNodes.forEach(node => {
        node.clearStates('nodeState:selected');
      });

      const selectedEdges = this.graph.findAllByState('edge', 'edgeState:selected');

      selectedEdges.forEach(edge => {
        edge.clearStates('edgeState:selected');
      });
      this.graph.emit('after-edge-selected');
    },
  });
};
