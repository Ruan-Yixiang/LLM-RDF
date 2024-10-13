
export default {

  nodeStyles: {
    fill:      '#ecf3ff', 
    stroke:    '#1890FF', 
    lineWidth: 1,
  },

  nodeStateStyles: {
    'nodeState:default': {
      fill: '#ecf3ff',
    },

    'nodeState:hover': {
      cursor:        'pointer',
      shadowOffsetX: 0,
      shadowOffsetY: 4,
      shadowBlur:    10,
      opacity:       0.8,
    },

    'nodeState:selected': {
      // fill:   '#f9f9f9',
      stroke: '#1890FF',
      cursor: 'default',
    },
  },

  nodeLabelStyles: {
    style: {
      fontSize:     12,
      fill:         '#666',
      textAlign:    'center',
      textBaseline: 'middle',
      cursor:       'default',
    },
  },

  nodeLabelStateStyles: {
    'nodeLabelState:default': {

    },
    'nodeLabelState:hover': {

    },
    'nodeLabelState:selected': {

    },
  },

  iconStyles: {
    width:  20,
    height: 20,
    x:      0,
    y:      0,
  },

  edgeStyles: {
    stroke:          '#aab7c3',
    lineAppendWidth: 10,
    startArrow:      {
      path: 'M 0,0 L 8,4 L 7,0 L 8,-4 Z',
      fill: '#aab7c3',
    },
    endArrow: {
      path: 'M 0,0 L 8,4 L 7,0 L 8,-4 Z',
      fill: '#aab7c3',
    },
  },
  edgeStateStyles: {
    selected: {
      stroke: '#aab7c3',
    },
    hover: {
      stroke: '#aab7c3',
    },
  },
  anchorPointStyles: {
    r:         4,
    fill:      '#fff',
    stroke:    '#1890FF',
    lineWidth: 1,
  },
};
