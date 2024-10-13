
import registerFactory from './register-factory';

export default (G6, config) => {
  const options = Object.assign({
    container:      'canvasPanel',
    width:          window.innerWidth,
    height:         window.innerHeight,
    // renderer:       'svg',
    fitViewPadding: -20,
    animate:        true,
    animateCfg:     {
      duration: 500,
      easing:   'easeLinear',
    },
    layout: {
      type:    'dagre',
      // rankdir: 'LR',
      nodesep: 30,
      ranksep: 30,
    },
    modes: {
      default: [
        'drag-canvas', 
        // 'zoom-canvas',
        /* {
            type:    'click-select',
            trigger: 'ctrl',
        }, */
        /* {
            type:           'drag-node',
            enableDelegate: true,
        }, */
        // 'activate-relations',
        'canvas-event', 
        'delete-item',
        'select-node',
        'hover-node',
        'drag-shadow-node',
        'active-edge',
      ],
    },
    defaultNode: {
      type:  'rect-node',
      style: {
        radius: 10,
      },
    },
    defaultEdge: {
      type:  'polyline-edge', // polyline
      style: {
        radius:          6,
        offset:          15,
        stroke:          '#aab7c3',
        lineAppendWidth: 5, 
        /* startArrow:      {
            path: 'M 0,0 L 8,4 L 7,0 L 8,-4 Z',
            fill: '#aab7c3',
        }, */
        endArrow:        {
          path:   'M 0,0 L 8,4 L 7,0 L 8,-4 Z',
          fill:   '#aab7c3',
          stroke: '#aab7c3',
        },
      },
    },
    nodeStateStyles: {
      'nodeState:default': {
        fill:   '#E7F7FE',
        stroke: '#1890FF',
      },
      'nodeState:hover': {
        fill: '#d5f1fd',
      },
      'nodeState:selected': {
        fill:   '#caebf9',
        stroke: '#1890FF',
      },
    },
    edgeStateStyles: {
      'edgeState:default': {
        stroke:   '#aab7c3',
        endArrow: {
          path:   'M 0,0 L 8,4 L 7,0 L 8,-4 Z',
          fill:   '#aab7c3',
          stroke: '#aab7c3',
        },

      },
      'edgeState:selected': {
        stroke: '#1890FF',
      },
      'edgeState:hover': {
        stroke: '#1890FF',
      },
    },
  }, config);

  const el = typeof options.container === 'string' ? document.getElementById(options.container) : options.container;

  if (el) {
    setTimeout(() => {
      for (let i = 0; i < el.children.length; i++) {
        const dom = el.children[i];

        if (dom.nodeName === 'CANVAS') {
          dom.$id = `${options.container}-canvas`;

          document.addEventListener('click', e => {
            dom.setAttribute('isFocused', e.target.$id === dom.$id);
          });
          break;
        }
      }
    });

    registerFactory(G6);
  } else {
    console.warn('not found node!');
  }

  return options;
};
