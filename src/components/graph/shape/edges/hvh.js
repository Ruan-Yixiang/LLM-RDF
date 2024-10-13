

export default (G6, cfg) => {
  G6.registerEdge('hvh-edge', {
    draw(cfg, group) {
      const xOffset = 40;
      const { startPoint, endPoint } = cfg;
      const Ydiff = endPoint.y - startPoint.y;

      const horizontalEndPoint = {
        x: startPoint.x,
        y: endPoint.y,
      };
      const path = Ydiff === 0 ? [
        ['M', startPoint.x, startPoint.y],
        ['L', endPoint.x, endPoint.y],
      ] : [
        ['M', startPoint.x, startPoint.y],
        ['L', startPoint.x + xOffset, startPoint.y],
        ['L', horizontalEndPoint.x + xOffset, endPoint.y > startPoint.y ? horizontalEndPoint.y - 10 : horizontalEndPoint.y + 10],
        ['Q', horizontalEndPoint.x + xOffset, horizontalEndPoint.y, horizontalEndPoint.x + xOffset + 10, horizontalEndPoint.y],
        ['L', endPoint.x, endPoint.y],
      ];


      const { edgeStyle } = cfg.sourceNode.getModel();
      const shape = group.addShape('path', {
        attrs: {

          path,
          stroke:   '#1890FF',
          endArrow: false,
          ...cfg.style,
          ...edgeStyle,
        },
        name:      'hvh-edge',
        draggable: true,
      });

      const { note } = cfg.targetMode.getModel();

      if (note) {
        const label = group.addShape('text', {
          attrs: {
            x:          horizontalEndPoint.x + xOffset + 10, // 居中
            y:          endPoint.y - 30,
            autoRotate: true,
            text:       note || '',
            fill:       '#333',
            // fill:       '#fff',
            stroke:     '#fff',
            fontSize:   16,
          },
          zIndex: 10,
        });

        group.sort();
        label.toFront();
      }

      return shape;
    },
    ...cfg,
  });
};
