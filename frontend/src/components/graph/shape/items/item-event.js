
function setStyle(item, nodeStyle, text, textStyle) {
  item.attr(nodeStyle);
  if (text) {
    text.attr(textStyle);
  }
}

function getItemStyle(type, group, state = 'hover') {
  const item = group.get('item');
  const attrs = group.getFirst().attr();
  const originStyle = type === 'node' ? item.get('originStyle') : item.get('originStyle')['edge-shape'];
  const activeStyle = attrs[`${type}State:${state}`];
  const defaultStyle = attrs[`${type}State:default`];

  if (type === 'edge' && defaultStyle && defaultStyle.lineWidth == null) {
    defaultStyle.lineWidth = 1;
  }

  return {
    activeStyle,
    defaultStyle,
    originStyle,
  };
}

const events = {

  
  anchorShow (value, group) {


    if (group.get('children')) {
      const { anchorControls } = group.get('children')[0].cfg.attrs;

      if (anchorControls && anchorControls.hide) return false;
    }

    if (value) {
      group.showAnchor(group);
    } else {
      group.clearAnchor(group);
    }
  },


  
  anchorActived (value, group) {

    if (group.get('children')) {
      const { anchorControls } = group.get('children')[0].cfg.attrs;

      if (anchorControls && anchorControls.hide) return false;
    }

    if (value) {
      const model = group.get('item').getModel();
      const {
        anchorPoints,
        anchorHotsoptStyles,
      } = model;

      group.showAnchor(group);

      this.getAnchorPoints({ anchorPoints }).forEach((p, i) => {
        const bbox = group.get('children')[0].getBBox();

        const hotspot = group.addShape('circle', {
          zIndex: 0,
          attrs:  {
            x:       bbox.minX + bbox.width * p[0],
            y:       bbox.minY + bbox.height * p[1],
            r:       0,
            opacity: 0.5,
            fill:    '#1890ff',
            ...anchorHotsoptStyles,
          },
          nodeId:    group.get('item').get('id'),
          className: 'node-anchor-bg',
          draggable: true,
          isAnchor:  true,
          index:     i,
        });


        hotspot.animate({ r: 11 }, {
          duration: 200,
        });

        group.sort();
        group.anchorShapes.push(hotspot);
      });

      group.anchorShapes.filter(item => {
        if (item.get('className') === 'node-anchor') {
          item.toFront();
        }
        if (item.get('className') === 'node-anchor-group') {
          item.attr({
            r: (anchorHotsoptStyles && anchorHotsoptStyles.r || 11) + 2,
          });
          item.toFront();
        }
      });
    } else {

      group.clearAnchor(group);
    }
  },


  
  nodeState (value, group) {
    if (value === false) {

      events['nodeState:default'].call(this, true, group);
    } else {
      events[`nodeState:${value}`] && events[`nodeState:${value}`].call(this, value, group);
    }
  },


  
  'nodeState:default'(value, group) {
    if (value) {
      const node = group.getChildByIndex(0);
      const text = group.getChildByIndex(1);
      const { defaultStyle } = getItemStyle.call(this, 'node', group);

      if (!defaultStyle) return;
      const textStyle = defaultStyle.labelCfg && defaultStyle.labelCfg.style ? defaultStyle.labelCfg.style : {};

      setStyle(node, defaultStyle, text, textStyle);
    }
  },


  
  'nodeState:selected'(value, group) {
    const node = group.getChildByIndex(0);
    const text = group.getChildByIndex(1);
    const { activeStyle, defaultStyle } = getItemStyle.call(this, 'node', group, 'selected');

    if (!activeStyle) return;

    if (value) {
      const textStyle = activeStyle.labelCfg && activeStyle.labelCfg.style ? activeStyle.labelCfg.style : {};

      setStyle(node, activeStyle, text, textStyle);
    } else {
      const textStyle = defaultStyle.labelCfg && defaultStyle.labelCfg.style ? defaultStyle.labelCfg.style : {};

      setStyle(node, defaultStyle, text, textStyle);
    }
  },


  
  'nodeState:hover'(value, group) {
    const node = group.getChildByIndex(0);
    const { activeStyle, defaultStyle } = getItemStyle.call(this, 'node', group, 'hover');

    if (!activeStyle) return;
    if (value) {
      setStyle(node, activeStyle);
    } else {
      setStyle(node, defaultStyle);
    }
  },


  
  edgeState (value, group) {
    if (value === false) {

      events['edgeState:default'].call(this, true, group);
    } else {
      events[`edgeState:${value}`] && events[`edgeState:${value}`].call(this, value, group);
    }
  },


  
  'edgeState:default'(value, group) {
    if (value) {
      const { activeStyle, defaultStyle, originStyle } = getItemStyle.call(this, 'edge', group);
      const edge = group.getChildByIndex(0);
      const { endArrow, startArrow } = edge.get('attrs');

      if (defaultStyle) {

        this.stopAnimate(group, activeStyle && activeStyle.animationType ? activeStyle.animationType : 'dash');
        setStyle(edge, { ...defaultStyle, animationType: activeStyle.animationType || 'dash' });

        if (endArrow) {
          edge.attr('endArrow', endArrow === true ? true : {
            path: endArrow.path,
            fill: defaultStyle.stroke || originStyle.stroke,
          });
        }
        if (startArrow) {
          edge.attr('startArrow', startArrow === true ? true : {
            path: startArrow.path,
            fill: defaultStyle.stroke || originStyle.stroke,
          });
        }
      }
    }
  },


  
  'edgeState:hover' (value, group) {
    const path = group.getChildByIndex(0);
    const { endArrow, startArrow } = path.get('attrs');
    const { activeStyle, defaultStyle, originStyle } = getItemStyle.call(this, 'edge', group, 'hover');

    if (!activeStyle) return;
    if (value) {
      if (activeStyle.animate === true) {
        this.runAnimate(group, activeStyle.animationType || 'dash');
      } else if (typeof activeStyle.animate === 'function') {
        activeStyle.animate.call(this, group);
      } else {
        setStyle(path, activeStyle);
        if (endArrow) {
          path.attr('endArrow', endArrow === true ? true : {
            path: endArrow.path,
            fill: activeStyle.stroke || originStyle.stroke,
          });
        }
        if (startArrow) {
          path.attr('startArrow', startArrow === true ? true : {
            path: startArrow.path,
            fill: activeStyle.stroke || originStyle.stroke,
          });
        }
      }
    } else {
      if (activeStyle.animate === true) {

        this.stopAnimate(group, activeStyle.animationType || 'dash');
      } else if (typeof activeStyle.animate === 'function') {
        activeStyle.animate.call(this, group, 'stop');
      } else {
        setStyle(path, defaultStyle);
        if (endArrow) {
          path.attr('endArrow', endArrow === true ? true : {
            path: endArrow.path,
            fill: defaultStyle.stroke || activeStyle.stroke || originStyle.stroke,
          });
        }
        if (startArrow) {
          path.attr('startArrow', startArrow === true ? true : {
            path: startArrow.path,
            fill: defaultStyle.stroke || activeStyle.stroke || originStyle.stroke,
          });
        }
      }
    }
  },


  
  'edgeState:selected'(value, group) {
    const path = group.getChildByIndex(0);
    const { endArrow, startArrow } = path.get('attrs');
    const { activeStyle, defaultStyle, originStyle } = getItemStyle.call(this, 'edge', group, 'selected');

    if (!activeStyle) return;
    if (value) {
      if (activeStyle.animate === true) {

        this.runAnimate(group, activeStyle.animationType || 'dash');
      } else if (typeof activeStyle.animate === 'function') {

        activeStyle.animate.call(this, group);
      } else {
        setStyle(path, activeStyle);
        if (endArrow) {
          path.attr('endArrow', endArrow === true ? true : {
            path: endArrow.path,
            fill: activeStyle.stroke || originStyle.stroke,
          });
        }
        if (startArrow) {
          path.attr('startArrow', startArrow === true ? true : {
            path: startArrow.path,
            fill: activeStyle.stroke || originStyle.stroke,
          });
        }
      }
    } else {
      if (activeStyle.animate === true) {

        this.stopAnimate(group, activeStyle.animationType || 'dash');
      } else if (typeof activeStyle.animate === 'function') {

        activeStyle.animate.call(this, group, 'stop');
      } else {
        setStyle(path, defaultStyle);
        if (endArrow) {
          path.attr('endArrow', endArrow === true ? true : {
            path: endArrow.path,
            fill: defaultStyle.stroke || activeStyle.stroke || originStyle.stroke,
          });
        }
        if (startArrow) {
          path.attr('startArrow', startArrow === true ? true : {
            path: startArrow.path,
            fill: defaultStyle.stroke || activeStyle.stroke || originStyle.stroke,
          });
        }
      }
    }
  },
};

export default events;
