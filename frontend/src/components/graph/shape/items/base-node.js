
import itemEvents from './item-event';
import anchorEvent from './anchor-event';
import defaultStyles from '../defaultStyles';

const {
  iconStyles,
  nodeStyles,
  anchorPointStyles,
  nodeLabelStyles,
} = defaultStyles;

function getStyle (options, cfg) {
  return {
    ...cfg,

    ...nodeStyles,
    ...options,

    ...cfg.style,

    labelCfg: {
      ...nodeLabelStyles,
      ...cfg.labelCfg,
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
  G6.registerNode('base-node', {
    getShapeStyle (cfg) {
      const width = cfg.style.width || 80;
      const height = cfg.style.height || 40;

      return getStyle.call(this, {
        width,
        height,
        radius: 5,
        x:      -width / 2,
        y:      -height / 2,
      }, cfg);
    },

    drawIcon (cfg, group, attrs) {
      const { logoIcon, stateIcon } = attrs;
      const icons = [logoIcon, stateIcon];

      icons.forEach(($item, index) => {
        if ($item) {
          const className = `${attrs.type}-${index === 0 ? 'logoIcon' : 'stateIcon'}`;

          let item = group.$getItem(className);

          if (!item) {
            const icon = group.addShape($item.img ? 'image' : 'text', {
              attrs: {
                ...$item,
                ...$item.style,
              },
              draggable: true,
              className,
            });

            icon.toFront();
            item = group.$getItem(className);
          }

          if (item) {
            if ($item.show) {
              item.show();
            } else {
              item.hide();
            }
          }
        }
      });
    },

    initAnchor (cfg, group) {
      group.anchorShapes = [];
      group.showAnchor = group => {
        this.drawAnchor(cfg, group);
      };
      group.clearAnchor = group => {
        group.anchorShapes && group.anchorShapes.forEach(a => a.remove());
        group.anchorShapes = [];
      };
    },
    drawAnchor (cfg, group) {
      const { type, direction, anchorPointStyles } = group.getFirst().attr();
      const item = group.get('children')[0];
      const bBox = item.getBBox();
      const anchors = this.getAnchorPoints(cfg);


      anchors && anchors.forEach((p, i) => {
        const diff = type === 'triangle-node' ? (direction === 'up' ? 1 : 0) : 0.5;
        const x = bBox.width * (p[0] - 0.5);
        const y = bBox.height * (p[1] - diff);


        
        const anchor = group.addShape('circle', {
          attrs: {
            x,
            y,
            ...anchorPointStyles,
          },
          zIndex:    1,
          nodeId:    group.get('id'),
          className: 'node-anchor',
          draggable: true,
          isAnchor:  true,
          index:     i,
        });


        const anchorGroup = group.addShape('circle', {
          attrs: {
            x,
            y,
            r:       11,
            fill:    '#000',
            opacity: 0,
          },
          zIndex:    2,
          nodeId:    group.get('id'),
          className: 'node-anchor-group',
          draggable: true,
          isAnchor:  true,
          index:     i,
        });


        
        anchorEvent(anchorGroup, group, p);

        group.anchorShapes.push(anchor);
        group.anchorShapes.push(anchorGroup);
      });


      group.getAllAnchors = () => {
        return group.anchorShapes.filter(c => c.get('isAnchor') === true);
      };

      group.getAnchor = (i) => {
        return group.anchorShapes.filter(c => c.get('className') === 'node-anchor' && c.get('index') === i);
      };

      group.getAllAnchorBg = () => {
        return group.anchorShapes.filter(c => c.get('className') === 'node-anchor-bg');
      };
    },

    /* https://g6.antv.vision/zh/docs/manual/advanced/keyconcept/shape-and-properties/#%E6%96%87%E6%9C%AC-text */
    addLabel (cfg, group, attrs) {
      const { label, labelCfg, labels } = attrs;

      /* if (labelCfg && labelCfg.fontSize < 12) {
        labelCfg.fontSize = 12;
      } */


      if (labels) {
        labels.forEach(item => {
          const { label, labelCfg: { maxlength }, className } = item;

          let text = maxlength ? label.substr(0, maxlength) : label || '';

          if (label.length > maxlength) {
            text = `${text}...`;
          }

          group.addShape('text', {
            attrs: {
              text,
              ...item,
              ...item.labelCfg,
              ...item.labelCfg.style,
            },
            className: `node-text ${className}`,
            draggable: true,
          });
        });
      } else if (label) {
        const { maxlength } = labelCfg;

        let text = maxlength ? label.substr(0, maxlength) : label || '';

        if (label.length > maxlength) {
          text = `${text}...`;
        }

        group.addShape('text', {
            attrs: {
              text,
              x: 0,
              y: 0,
              ...labelCfg,
              ...labelCfg.style,
            },
            className: 'node-text',
            draggable: true,
          });
      }
    },
    drawModelRect (group, attrs) {
      const { preRect, width, height } = attrs;
      const $preRect = {
        show:   true, 
        width:  4,
        fill:   '#40a9ff',
        radius: 2,
      };

      if (!preRect || preRect.show !== false) {
        group.addShape('rect', {
          attrs: {
            x: -width / 2,
            y: -height / 2,
            height,
            ...$preRect,
            ...preRect,
          },
          draggable: true,
        });
      }
    },

    draw (cfg, group) {
      return this.drawShape(cfg, group);
    },

    drawShape (cfg, group) { 

      const attrs = this.getShapeStyle(cfg, group);

      const shape = group.addShape(this.shapeType, {
        className:  `${this.shapeType}-shape`,
        xShapeNode: true, 
        draggable:  true,
        attrs,
      });


      group.$getItem = className => {
        return group.get('children').find(item => item.get('className') === className);
      };

      if (this.type === 'modelRect-node') {
        this.drawModelRect(group, attrs);
      }

      this.addLabel(cfg, group, attrs);

      this.drawIcon(cfg, group, attrs);

      this.initAnchor(cfg, group);

      return shape;
    },

    update (cfg, node) {
      const model = node.get('model');
      const { attrs } = node.get('keyShape');
      const text = node.get('group').$getItem('node-text');
      const item = node.get('group').get('children')[0];


      text && text.attr({
        text: model.label,
      ...model.labelCfg.style,
      });

      item.attr({ ...attrs, ...model.style });
    },

    setState (name, value, item) {
      const buildInEvents = [
        'anchorShow',
        'anchorActived',
        'nodeState',
        'nodeState:default',
        'nodeState:selected',
        'nodeState:hover',
        'nodeOnDragStart',
        'nodeOnDrag',
        'nodeOnDragEnd',
      ];
      const group = item.getContainer();

      if (group.get('destroyed')) return;
      if (buildInEvents.includes(name)) {

        itemEvents[name].call(this, value, group);
      } else if (this.stateApplying) {
        this.stateApplying.call(this, name, value, item);
      } else {
        console.warn(`warning: ${name} not registed!\n`);
      }
    },

    getAnchorPoints (cfg) {
      return cfg.anchorPoints || [
        [0.5, 0],
        [1, 0.5],
        [0.5, 1],
        [0, 0.5],
      ];
    },
  }, 'single-node');
};
