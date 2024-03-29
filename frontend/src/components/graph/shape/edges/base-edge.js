

import animation from './edge-animations';
import itemEvents from '../items/item-event';
import hvh_h from './hvh-h.js';
import hvh from './hvh.js';



function drawShape (cfg, group) {
  group.running = false;
  group.runners = [];

  const shapeStyle = Object.assign({}, this.getShapeStyle(cfg), {
    ...cfg.edgeStateStyles,
  });

  const keyShape = group.addShape('path', {
    className: 'edge-shape',
    name:      'edge-shape',
    attrs:     shapeStyle,
  });

  return keyShape;
}

function setState (name, value, item) {
  const buildInEvents = [
    'edgeState',
    'edgeState:default',
    'edgeState:selected',
    'edgeState:hover',
  ];
  const group = item.getContainer();

  if (group.get('destroyed')) return;
  if (buildInEvents.includes(name)) {

    itemEvents[name].call(this, value, group);
  } else if (this.stateApplying) {
    this.stateApplying.call(this, name, value, item);
  } else {
    console.warn(`warning: edge ${name} 事件回调未注册!`);
  }
}

function runAnimate (group, animationType) {
  if (group.running) return;
  // group.running = true;
  // group.toFront();
  // animation[animationType].run.call(this, group);
}
// function runAnimate (group, animationType) {
//   if (group.running) return;
//   group.running = true;
//   group.toFront();
//   animation[animationType].run.call(this, group);
// }


function stopAnimate (group, animationType) {
  animation[animationType].stop.call(this, group);
}

// function stopAnimate (group, animationType) {
//   animation[animationType].stop.call(this, group);
// }


function inheritEdge (G6, name) {
  G6.registerEdge(`${name}-edge`, {
    drawShape,
    setState,
    runAnimate,
    stopAnimate,
  }, name);
}

export default (G6) => {
  const edgeArray = ['line', 'polyline', 'quadratic', 'cubic', 'arc'];

  edgeArray.forEach(edge => {
    inheritEdge(G6, edge);
  });

  hvh(G6, {
    drawShape,
    setState,
    runAnimate,
    stopAnimate,
  });
  hvh_h(G6, {
    drawShape,
    setState,
    runAnimate,
    stopAnimate,
  });
};
