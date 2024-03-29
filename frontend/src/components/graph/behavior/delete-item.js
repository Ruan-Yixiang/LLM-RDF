export default G6 => {
  G6.registerBehavior('delete-item', {
    getEvents () {
      return {
        'keydown': 'onKeydown',
      };
    },
    shouldBegin (e) {
      return true;
    },
    onKeydown (e) {
      const { graph } = this;


      if (graph.cfg.canvas.cfg.el.getAttribute('isFocused') !== 'true') return;
      if (!this.shouldBegin(e)) return;


      
      if (e.keyCode === 8 || e.keyCode === 46) {
        const nodes = graph.findAllByState('node', 'nodeState:selected');

        if (nodes && nodes.length) {
          const $node = nodes[0].getContainer().get('item');

          graph.emit('before-node-removed', {
            target: $node,
            callback (confirm) {

              if (confirm) {
                graph.remove($node);
                graph.set('after-node-selected', []);

                graph.emit('after-node-selected');
                graph.emit('after-node-removed', $node);
              }
            },
          });
        }


        const edges = graph.findAllByState('edge', 'edgeState:selected');

        if (edges && edges.length) {
          const $edge = edges[0].getContainer().get('item');

          graph.emit('before-edge-removed', {
            target: $edge,
            callback (confirm) {
              if (confirm) {
                graph.remove($edge);
                graph.set('after-edge-selected', []);

                graph.emit('after-edge-selected');
                graph.emit('after-edge-removed', $edge);
              }
            },
          });
        }
      }
    },
  });
};
