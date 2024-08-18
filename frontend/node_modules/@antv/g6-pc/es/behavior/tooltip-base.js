import { modifyCSS, createDom } from '@antv/dom-util';
export default {
  onMouseEnter: function onMouseEnter(e) {
    var item = e.item;
    this.currentTarget = item;
    this.showTooltip(e);
    this.graph.emit('tooltipchange', {
      item: e.item,
      action: 'show'
    });
  },
  onMouseMove: function onMouseMove(e) {
    if (!this.shouldUpdate(e, this)) {
      this.hideTooltip();
      return;
    }
    if (!this.currentTarget || e.item !== this.currentTarget) {
      return;
    }
    this.updatePosition(e);
  },
  onMouseLeave: function onMouseLeave(e) {
    if (!this.shouldEnd(e, this)) {
      return;
    }
    this.hideTooltip();
    this.graph.emit('tooltipchange', {
      item: this.currentTarget,
      action: 'hide'
    });
    this.currentTarget = null;
  },
  showTooltip: function showTooltip(e) {
    var container = this.container;
    if (!e.item || e.item.destroyed) {
      return;
    }
    if (!container) {
      container = this.createTooltip(this.graph.get('canvas'));
      this.container = container;
    }
    var text = this.formatText(e.item.get('model'), e);
    container.innerHTML = text;
    modifyCSS(this.container, {
      visibility: 'visible'
    });
    this.updatePosition(e);
  },
  hideTooltip: function hideTooltip() {
    modifyCSS(this.container, {
      visibility: 'hidden'
    });
  },
  updatePosition: function updatePosition(e) {
    var shouldBegin = this.get('shouldBegin');
    var _a = this,
      width = _a.width,
      height = _a.height,
      container = _a.container,
      graph = _a.graph;
    if (!shouldBegin(e, this)) {
      modifyCSS(container, {
        visibility: 'hidden'
      });
      return;
    }
    var point = graph.getPointByClient(e.clientX, e.clientY);
    var _b = graph.getCanvasByPoint(point.x, point.y),
      x = _b.x,
      y = _b.y;
    var bbox = container.getBoundingClientRect();
    if (x > width / 2) {
      x -= bbox.width;
    } else {
      x += this.offset;
    }
    if (y > height / 2) {
      y -= bbox.height;
    } else {
      y += this.offset;
    }
    var left = "".concat(x, "px");
    var top = "".concat(y, "px");
    modifyCSS(this.container, {
      left: left,
      top: top,
      visibility: 'visible'
    });
  },
  createTooltip: function createTooltip(canvas) {
    var el = canvas.get('el');
    el.style.position = 'relative';
    var container = createDom("<div class=\"g6-tooltip g6-".concat(this.item, "-tooltip\"></div>"));
    el.parentNode.appendChild(container);
    modifyCSS(container, {
      position: 'absolute',
      visibility: 'visible'
    });
    this.width = canvas.get('width');
    this.height = canvas.get('height');
    this.container = container;
    this.graph.get('tooltips').push(container);
    return container;
  }
};