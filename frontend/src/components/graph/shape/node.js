
import defaultStyles from './defaultStyles';

const {
  iconStyles,
  nodeStyles,
  anchorPointStyles,
  nodeLabelStyles,
} = defaultStyles;

function getStyle(options, cfg) {
  return {
    ...cfg,
    ...nodeStyles,
    ...options,

    ...cfg.style,

    labelCfg: {
      ...nodeLabelStyles,
      ...cfg.labelCfg,
      style: {
        ...nodeLabelStyles.style,
        ...(cfg.labelCfg ? cfg.labelCfg.style : {}),
      },
    },

    iconStyles: {
      ...iconStyles,
      ...cfg.iconStyles,
    },

    anchorPointStyles: {
      ...anchorPointStyles,
      ...cfg.anchorPointStyles,
    },
    ...cfg.nodeStateStyles,

    anchorHotsoptStyles: cfg.anchorHotsoptStyles,
  };
}

export default G6 => {
  G6.registerNode(
    'circle-node-green',
    {
      getShapeStyle(cfg) {
        const r = cfg.style.r || 35;
        return getStyle.call(this, {
          shadowColor: '#1890FF',
          shadowBlur: 3,
          lineWidth: 3,
          r,
          x: 0,
          y: 0,
        }, cfg);
      },
      getAnchorPoints(cfg) {
        return cfg.anchorPoints || [
          // [0.5, 0],
          // [0, 1],
          // [1, 1],
          [0.5, 0],
          [0, 0.5],
          [1, 0.5],
          [0.5, 1],
        ];
      },
      afterDraw(cfg, group) {
        const r = cfg.style.r || 35;
        const back3 = group.addShape('circle', {
          zIndex: 1,
          attrs: {
            x: 0,
            y: 0,
            r,
            fill: 'green',
            opacity: 0.6,
          },
          name: 'circle-shape3',
        });
        group.sort();
        back3.animate(
          {
            opacity: 0.1,
          },
          {
            repeat: true,
            duration: 500,
            easing: 'easeCubic',
            delay: 0,
          },
        );
      },
    },
    'circle',
  );
  G6.registerNode(
    'circle-node-red',
    {
      getShapeStyle(cfg) {
        const r = cfg.style.r || 35;
        return getStyle.call(this, {
          shadowColor: '#1890FF',
          shadowBlur: 3,
          lineWidth: 3,
          r,
          x: 0,
          y: 0,
        }, cfg);
      },
      getAnchorPoints(cfg) {
        return cfg.anchorPoints || [
          // [0.5, 0],
          // [0, 1],
          // [1, 1],
          [0.5, 0],
          [0, 0.5],
          [1, 0.5],
          [0.5, 1],
        ];
      },
      afterDraw(cfg, group) {
        const r = cfg.style.r || 35;
        const back3 = group.addShape('circle', {
          zIndex: 1,
          attrs: {
            x: 0,
            y: 0,
            r,
            fill: 'red',
            opacity: 0.6,
          },
          name: 'circle-shape3',
        });
        group.sort();
        back3.animate(
          {
            opacity: 0.1,
          },
          {
            repeat: true,
            duration: 500,
            easing: 'easeCubic',
            delay: 0,
          },
        );
      },
    },
    'circle',
  );

  G6.registerNode('circle-node', {
    shapeType: 'circle',
    getShapeStyle(cfg) {
      const r = cfg.style.r || 35;
      return getStyle.call(this, {
        shadowColor: '#1890FF',
        shadowBlur: 3,
        lineWidth: 3,
        r,
        x: 0,
        y: 0,
      }, cfg);
    },
    getAnchorPoints(cfg) {
      return cfg.anchorPoints || [
        // [0.5, 0],
        // [0, 1],
        // [1, 1],
        [0.5, 0],
        [0, 0.5],
        [1, 0.5],
        [0.5, 1],
      ];
    },
  }, 'base-node');

  //
  G6.registerNode('donut-node', {
    shapeType: 'star',
    getShapeStyle(cfg) {
      const r = cfg.style.r || 35;
      return getStyle.call(this, {
        shadowColor: '#1890FF',
        shadowBlur: 3,
        lineWidth: 3,
        r,
        x: 0,
        y: 0,
      }, cfg);
    },
  }, 'base-node');

  G6.registerNode('rect-node-red', {
    shapeType: 'rect',
    getShapeStyle(cfg) {
      const width = cfg.style.width || 80;
      const height = cfg.style.height || 40;

      return getStyle.call(this, {
        shadowColor: '#1890FF',
        shadowBlur: 3,
        lineWidth: 3,
        width,
        height,
        radius: 5,
        x: -width / 2,
        y: -height / 2,
      }, cfg);
    },
    afterDraw(cfg, group) {
      const width = cfg.style.width || 80;
      const height = cfg.style.height || 40;
      const back3 = group.addShape('rect', {
        zIndex: 3,
        attrs: {
          width,
          height,
          radius: 5,
          x: -width / 2,
          y: -height / 2,
          fill: 'red',
          opacity: 0.6,
        },
        name: 'rect-shape3',
      });
      group.sort();
      back3.animate(
        {
          opacity: 0.1,
        },
        {
          repeat: true,
          duration: 500,
          delay: 0,
        },
      );
    },
  }, 'base-node');
  G6.registerNode('rect-node-green', {
    shapeType: 'rect',
    getShapeStyle(cfg) {
      const width = cfg.style.width || 80;
      const height = cfg.style.height || 40;

      return getStyle.call(this, {
        shadowColor: '#1890FF',
        shadowBlur: 3,
        lineWidth: 3,
        width,
        height,
        radius: 5,
        x: -width / 2,
        y: -height / 2,
      }, cfg);
    },
    afterDraw(cfg, group) {
      const width = cfg.style.width || 80;
      const height = cfg.style.height || 40;
      const back3 = group.addShape('rect', {
        zIndex: 3,
        attrs: {
          width,
          height,
          radius: 5,
          x: -width / 2,
          y: -height / 2,
          fill: 'green',
          opacity: 0.6,
        },
        name: 'rect-shape3',
      });
      group.sort();
      back3.animate(
        {
          opacity: 0.1,
        },
        {
          repeat: true,
          duration: 500,
          delay: 0,
        },
      );
    },
  }, 'base-node');


  G6.registerNode('rect-node', {
    shapeType: 'rect',
    getShapeStyle(cfg) {
      const width = cfg.style.width || 80;
      const height = cfg.style.height || 40;

      return getStyle.call(this, {
        shadowColor: '#1890FF',
        shadowBlur: 3,
        lineWidth: 3,
        width,
        height,
        radius: 5,

        x: -width / 2,
        y: -height / 2,
      }, cfg);
    },
  }, 'base-node');

  G6.registerNode('circle-node2', {
    shapeType: 'circle',
    drawText(cfg) {
      this.addShape('text', {
        attrs: {
          text: cfg.label,
          ...cfg.label.style,
        }
      })
    },
    getShapeStyle(cfg) {
      const r = cfg.style.r || 100;
      return getStyle.call(this, {
        r,
        x: 0,
        y: 0,
      }, cfg);
    },
  }, 'base-node');

  G6.registerNode('ellipse-node-green', {
    shapeType: 'ellipse',
    getShapeStyle(cfg) {
      return getStyle.call(this, {
        shadowColor: '#1890FF',
        shadowBlur: 3,
        lineWidth: 3,
        rx: 50,
        ry: 30,
        x: 0,
        y: 0,
      }, cfg);
    },
    afterDraw(cfg, group) {
      const rx = cfg.style.rx || 50;
      const ry = cfg.style.ry || 30;
      const back3 = group.addShape('ellipse', {
        zIndex: 3,
        attrs: {
          rx,
          ry,
          x: 0,
          y: 0,
          fill: 'green',
          opacity: 0.6,
        },
        name: 'shape3',
      });
      group.sort();
      back3.animate(
        {
          opacity: 0.1,
        },
        {
          repeat: true,
          duration: 500,
          delay: 0,
        },
      );
    },
  }, 'base-node');
  G6.registerNode('ellipse-node-red', {
    shapeType: 'ellipse',
    getShapeStyle(cfg) {
      return getStyle.call(this, {
        shadowColor: '#1890FF',
        shadowBlur: 3,
        lineWidth: 3,
        rx: 50,
        ry: 30,
        x: 0,
        y: 0,
      }, cfg);
    },
    afterDraw(cfg, group) {
      const rx = cfg.style.rx || 50;
      const ry = cfg.style.ry || 30;
      const back3 = group.addShape('ellipse', {
        zIndex: 3,
        attrs: {
          rx,
          ry,
          x: 0,
          y: 0,
          fill: 'red',
          opacity: 0.6,
        },
        name: 'shape3',
      });
      group.sort();
      back3.animate(
        {
          opacity: 0.1,
        },
        {
          repeat: true,
          duration: 500,
          delay: 0,
        },
      );
    },
  }, 'base-node');

  G6.registerNode('ellipse-node', {
    shapeType: 'ellipse',
    getShapeStyle(cfg) {
      return getStyle.call(this, {
        shadowColor: '#1890FF',
        shadowBlur: 3,
        lineWidth: 3,
        rx: 50,
        ry: 30,
        x: 0,
        y: 0,
      }, cfg);
    },
  }, 'base-node');

  G6.registerNode('modelRect-node', {
    shapeType: 'rect',
    getShapeStyle(cfg) {
      const width = cfg.style.width || 200;
      const height = cfg.style.height || 80;
      return getStyle.call(this, {
        shadowColor: '#1890FF',
        shadowBlur: 3,
        lineWidth: 3,
        width,
        height,
        radius: 5,

        x: -width / 2,
        y: -height / 2,
      }, cfg);
    },
  }, 'base-node');


  G6.registerNode('diamond-node', {
    shapeType: 'path',
    getShapeStyle(cfg) {
      const path = this.getPath(cfg);
      return getStyle.call(this, {
        shadowColor: '#1890FF',
        shadowBlur: 3,
        lineWidth: 3,
        path,
        x: 0,
        y: 0,
      }, cfg);
    },
    getPath(cfg) {
      const size = cfg.style.size || [100, 80];
      const width = size[0];
      const height = size[1];
      //  / 1 \
      // 4     2
      //  \ 3 /
      return [
        ['M', 0, -height / 2],
        ['L', width / 2, 0],
        ['L', 0, height / 2],
        ['L', -width / 2, 0],
        ['Z'],
      ];
    },
  }, 'base-node');


  G6.registerNode('diamond-node-green', {
    shapeType: 'path',
    getShapeStyle(cfg) {
      const path = this.getPath(cfg);
      return getStyle.call(this, {
        shadowColor: '#1890FF',
        shadowBlur: 3,
        lineWidth: 3,
        path,
        x: 0,
        y: 0,
      }, cfg);
    },
    getPath(cfg) {
      const size = cfg.style.size || [100, 80];
      const width = size[0];
      const height = size[1];
      return [
        ['M', 0, -height / 2],
        ['L', width / 2, 0],
        ['L', 0, height / 2],
        ['L', -width / 2, 0],
        ['Z'],
      ];
    },
    afterDraw(cfg, group) {
      const path = this.getPath(cfg);
      const back3 = group.addShape('path', {
        zIndex: 3,
        attrs: {
          path,
          x: 0,
          y: 0,
          fill: 'green',
          opacity: 0.6,
        },
        name: 'shape3',
      });
      group.sort();
      back3.animate(
        {
          opacity: 0.1,
        },
        {
          repeat: true,
          duration: 500,
          delay: 0,
        },
      );
    },
  }, 'base-node');

  G6.registerNode('diamond-node-red', {
    shapeType: 'path',
    getShapeStyle(cfg) {
      const path = this.getPath(cfg);
      return getStyle.call(this, {
        shadowColor: '#1890FF',
        shadowBlur: 3,
        lineWidth: 3,
        path,
        x: 0,
        y: 0,
      }, cfg);
    },
    getPath(cfg) {
      const size = cfg.style.size || [100, 80];
      const width = size[0];
      const height = size[1];
      return [
        ['M', 0, -height / 2],
        ['L', width / 2, 0],
        ['L', 0, height / 2],
        ['L', -width / 2, 0],
        ['Z'],
      ];
    },
    afterDraw(cfg, group) {
      const path = this.getPath(cfg);
      const back3 = group.addShape('path', {
        zIndex: 3,
        attrs: {
          path,
          x: 0,
          y: 0,
          fill: 'red',
          opacity: 0.6,
        },
        name: 'shape3',
      });
      group.sort();
      back3.animate(
        {
          opacity: 0.1,
        },
        {
          repeat: true,
          duration: 500,
          delay: 0,
        },
      );
    },
  }, 'base-node');

  G6.registerNode('triangle-node', {
    shapeType: 'path',
    labelCfg: {position: 'center'},
    getShapeStyle(cfg) {
      const path = this.getPath(cfg);

      return getStyle.call(this, {
        shadowColor: '#1890FF',
        shadowBlur: 3,
        lineWidth: 3,
        direction: cfg.direction || 'up',
        path,
        x: 0,
        y: 0,
      }, cfg);
    },
    getPath(cfg) {
      const direction = cfg.direction || 'up';
      const size = cfg.style.size || [80, 120];
      const width = size[0];
      const height = size[1];

      const path = [
        ['Z'],
      ];

      if (direction === 'up') {
        path.unshift(
          ['M', 0, -height / 2],
          ['L', -width / 2, 0],
          ['L', width / 2, 0],
        );
      } else {
        path.unshift(
          ['M', 0, height / 2],
          ['L', -width / 2, 0],
          ['L', width / 2, 0],
        );
      }

      return path;
    },
    getAnchorPoints(cfg) {
      return cfg.anchorPoints || [
        // [0.5, 0],
        // [0, 1],
        // [1, 1],
        [0.5, 0],
        [0.25, 0.55],
        [0.75, 0.55],
      ];
    },
  }, 'base-node');
  G6.registerNode('triangle-node-green', {
    shapeType: 'path',
    labelCfg: {position: 'center'},
    getShapeStyle(cfg) {
      const path = this.getPath(cfg);

      return getStyle.call(this, {
        shadowColor: '#1890FF',
        shadowBlur: 3,
        lineWidth: 3,
        direction: cfg.direction || 'up',
        path,
        x: 0,
        y: 0,
      }, cfg);
    },
    getPath(cfg) {
      const direction = cfg.direction || 'up';
      const size = cfg.style.size || [80, 120];
      const width = size[0];
      const height = size[1];

      const path = [
        ['Z'],
      ];

      if (direction === 'up') {
        path.unshift(
          ['M', 0, -height / 2],
          ['L', -width / 2, 0],
          ['L', width / 2, 0],
        );
      } else {
        path.unshift(
          ['M', 0, height / 2],
          ['L', -width / 2, 0],
          ['L', width / 2, 0],
        );
      }

      return path;
    },
    getAnchorPoints(cfg) {
      return cfg.anchorPoints || [
        // [0.5, 0],
        // [0, 1],
        // [1, 1],
        [0.5, 0],
        [0.25, 0.55],
        [0.75, 0.55],
      ];
    },
    afterDraw(cfg, group) {
      const path = this.getPath(cfg);
      const back3 = group.addShape('path', {
        zIndex: 3,
        attrs: {
          path,
          x: 0,
          y: 0,
          fill: 'green',
          opacity: 0.6,
        },
        name: 'shape3',
      });
      group.sort();
      back3.animate(
        {
          opacity: 0.1,
        },
        {
          repeat: true,
          duration: 500,
          delay: 0,
        },
      );
    },
  }, 'base-node');
  G6.registerNode('triangle-node-red', {
    shapeType: 'path',
    labelCfg: {position: 'center'},
    getShapeStyle(cfg) {
      const path = this.getPath(cfg);

      return getStyle.call(this, {
        shadowColor: '#1890FF',
        shadowBlur: 3,
        lineWidth: 3,
        direction: cfg.direction || 'up',
        path,
        x: 0,
        y: 0,
      }, cfg);
    },
    getPath(cfg) {
      const direction = cfg.direction || 'up';
      const size = cfg.style.size || [80, 120];
      const width = size[0];
      const height = size[1];

      const path = [
        ['Z'],
      ];

      if (direction === 'up') {
        path.unshift(
          ['M', 0, -height / 2],
          ['L', -width / 2, 0],
          ['L', width / 2, 0],
        );
      } else {
        path.unshift(
          ['M', 0, height / 2],
          ['L', -width / 2, 0],
          ['L', width / 2, 0],
        );
      }

      return path;
    },
    getAnchorPoints(cfg) {
      return cfg.anchorPoints || [
        // [0.5, 0],
        // [0, 1],
        // [1, 1],
        [0.5, 0],
        [0.25, 0.55],
        [0.75, 0.55],
      ];
    },
    afterDraw(cfg, group) {
      const path = this.getPath(cfg);
      const back3 = group.addShape('path', {
        zIndex: 3,
        attrs: {
          path,
          x: 0,
          y: 0,
          fill: 'red',
          opacity: 0.6,
        },
        name: 'shape3',
      });
      group.sort();
      back3.animate(
        {
          opacity: 0.1,
        },
        {
          repeat: true,
          duration: 500,
          delay: 0,
        },
      );
    },
  }, 'base-node');
};
