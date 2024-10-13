export default G6 => {
  G6.registerBehavior('hover-node', {
    getEvents () {
      return {
        'node:mouseenter': 'onNodeEnter',
        'node:mouseleave': 'onNodeLeave',
      };
    },
    shouldBegin (e) {
      return true;
    },
    onNodeEnter (e) {
      if (!this.shouldBegin(e)) return;

      // console.log(e.item);
      e.item.setState('anchorShow', true); 
    },
    onNodeLeave (e) {
      if (!this.shouldBegin(e)) return;

      e.item.setState('anchorShow', false); 
    },
  });
};
