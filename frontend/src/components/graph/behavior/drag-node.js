export default G6 => {
  G6.registerBehavior('drag-shadow-node', {
    getDefaultCfg() {
      return {
        isGragging:        false,
        sourceAnchorIndex: 0,

        dragTarget:        'node',
        dragStartNode:     {},
        distance:          [], 
      };
    },
    getEvents() {
      return {
        'node:mousedown': 'onMousedown',
        'node:mouseup':   'onMouseup',
        'node:dragstart': 'onDragStart',
        'node:drag':      'onDrag',
        'node:dragend':   'onDragEnd',
        'node:drop':      'onDrop',
      };
    },
    shouldBegin(e) {
      return true;
    },

    onMousedown(e) {
      if (!this.shouldBegin(e)) return;
      this._clearSelected(e);
      if (e.target.cfg.isAnchor) {

        this.dragTarget = 'anchor';
        this.dragStartNode = {
          ...e.item._cfg,
          anchorIndex: e.target.cfg.index,
        };
        const nodes = this.graph.findAll('node', node => node);

        nodes.forEach(node => {
          node.setState('anchorActived', true);
        });
      }
      this.graph.emit('on-node-mousedown', e);
    },
    onMouseup(e) {
      if (!this.shouldBegin(e)) return;
      if (this.dragTarget === 'anchor') {
        const nodes = this.graph.findAll('node', node => node);

        nodes.forEach(node => {
          node.clearStates('anchorActived');
        });
      }
      this.graph.emit('on-node-mouseup', e);
    },

    onDragStart(e) {
      if (!this.shouldBegin(e)) return;
      const group = e.item.getContainer();

      this.isGragging = true;
      this.origin = {
        x: e.x,
        y: e.y,
      };
      if (e.target.get('isAnchor')) {

        this.sourceAnchorIndex = e.target.get('index');
      } else if (group.getFirst().cfg.xShapeNode) {

        e.item.toFront();
        this.dragTarget = 'node';
        this._nodeOnDragStart(e, group);
      }
      this.graph.emit('on-node-dragstart', e);
    },

    onDrag (e) {
      if (!this.shouldBegin(e)) return;
      if (this.isGragging) {
        const group = e.item.getContainer();

        if (this.dragTarget === 'node' && group.getFirst().cfg.xShapeNode) {
          this._nodeOnDrag(e, e.item.getContainer());
        }
        this.graph.emit('on-node-drag', e);
      }
    },

    onDragEnd(e) {
      if (!this.shouldBegin(e)) return;
      const group = e.item.getContainer();

      this.isGragging = false;
      if (this.dragTarget === 'anchor') {
        const nodes = this.graph.findAll('node', node => node);

        nodes.forEach(node => {
          node.clearStates('anchorActived');
        });
      } else if (
        this.dragTarget === 'node' &&
        group.getFirst().cfg.xShapeNode
      ) {
        this._nodeOnDragEnd(e, group);
      }
      this.graph.emit('on-node-dragend', e);
    },

    onDrop(e) {
      if (!this.shouldBegin(e)) return;

      if (
        this.dragStartNode.id &&
        e.target.cfg.isAnchor &&
        this.dragStartNode.id !== e.target.cfg.nodeId
      ) {
        const sourceNode = this.dragStartNode.group.get('item');
        const { singleEdge } = sourceNode.getModel(); 
        const targetAnchorIndex = e.target.get('index');
        const edges = sourceNode.getOutEdges();

        const hasLinked = edges.find(edge => {
          // sourceAnchorIndex === targetAnchorIndex, edge.source.id === source.id, edget.target.id === target.id
          if (
            (edge.get('source').get('id') === sourceNode.get('id') &&
              edge.get('target').get('id') === e.target.cfg.nodeId &&
              edge.get('sourceAnchorIndex') === this.sourceAnchorIndex &&
              edge.get('targetAnchorIndex') === targetAnchorIndex) ||
            (singleEdge &&
              edge.get('target').get('id') === e.target.cfg.nodeId)
          ) {
            return true;
          }
        });

        if (!hasLinked) {
          this.graph.emit('before-edge-add', {
            source:       sourceNode,
            target:       e.item.getContainer().get('item'),
            sourceAnchor: this.dragStartNode.anchorIndex,
            targetAnchor: e.target.cfg.index,
          });
        }
      }
      this.graph.emit('on-node-drop', e);
    },


    
    _dragNodeModeCheck() {
      const currentMode = this.graph.get('modes')[this.graph.getCurrentMode()];

      if (currentMode.includes('drag-node')) {
        console.warn(
          'Behavior drag-shadow-node 与内置 Behavior drag-node 在行为上有冲突, 请考虑改用 setMode 来分开两种错误, 或在以上两种行为的入参 shouldBegin 方法中添加逻辑处理来避免冲突',
        );
        return true;
      }
      return false;
    },


    
    _nodeOnDragStart(e, group) {
      this._dragNodeModeCheck();
      this._addShadowNode(e, group);
    },


    
    _addShadowNode(e, group) {
      const item = group.get('item');
      const model = item.get('model');
      const { radius } = item.get('originStyle');
      const currentShape = item.get('currentShape');
      const { width, height, centerX, centerY } = item.getBBox();
      const shapes = item.get('shapeFactory')[currentShape];

      let { shapeType } = shapes || {},
        attrs = {
          fillOpacity: 0.1,
          fill:        '#1890FF',
          stroke:      '#1890FF',
          cursor:      'move',
          lineDash:    [4, 4],
          width,
          height,
          x:           model.x,
          y:           model.y,
        };

      switch (shapeType) {
        case 'circle':
          this.distance = [e.x - centerX, e.y - centerY];
          attrs = {
            ...attrs,
            r: width / 2,
          };
          break;
        case 'rect':
          this.distance = [
            e.x - centerX + width / 2,
            e.y - centerY + height / 2,
          ];
          attrs = {
            ...attrs,
            x: -width / 2,
            y: -height / 2,
            r: width / 2,
          };
          if (radius) attrs.radius = radius;
          break;
        case 'ellipse':
          this.distance = [e.x - centerX, e.y - centerY];
          attrs = {
            ...attrs,
            rx: width / 2,
            ry: height / 2,
          };
          break;
        case 'path':
          this.distance = [e.x - centerX, e.y - centerY];
          attrs.path = item.get('keyShape').attrs.path;
          attrs.size = [width, height];
          break;
        case 'modelRect':
          this.distance = [
            e.x - centerX + width / 2,
            e.y - centerY + height / 2,
          ];
          attrs = {
            ...attrs,
            x: -width / 2,
            y: -height / 2,
            r: width / 2,
          };
          shapeType = 'rect';
          break;
        default:
          shapeType = 'circle';
          break;
      }

      const shadowNode = group.addShape(shapeType, {
        className: 'shadow-node',
        attrs,
      });

      shadowNode.toFront();
    },

    
    _nodeOnDrag(e, group) {

      const item = group.get('item');
      const pathAttrs = group.getFirst();
      const { width, height, centerX, centerY } = item.getBBox();
      const shadowNode = pathAttrs.cfg.xShapeNode
        ? group.$getItem('shadow-node')
        : null;
      const shapes = item.get('shapeFactory')[item.get('currentShape')];
      const { shapeType } = shapes || {};

      if (!shadowNode) {
        return console.warn('暂未支持拖拽内置节点');
      }
      if (shapeType === 'path') {
        const { type, direction } = pathAttrs.get('attrs');
        const dx = e.x - centerX - this.distance[0];
        const dy = e.y - centerY - this.distance[1];
        const path = [['Z']];

        switch (type) {
          case 'diamond-node':
            path.unshift(
              ['M', dx, dy - height / 2], 
              ['L', dx + width / 2, dy], 
              ['L', dx, dy + height / 2], 
              ['L', dx - width / 2, dy],
            );
            break;
          case 'triangle-node':
            path.unshift(
              ['L', dx + width / 2, dy], 
              ['L', dx - width / 2, dy], 
            );
            if (direction === 'up') {
              path.unshift(
                ['M', dx, dy - height], 
              );
            } else {
              path.unshift(
                ['M', dx, dy + height], 
              );
            }
            break;
        }

        shadowNode.attr({
          path,
        });
      } else {
        shadowNode.attr({
          x: e.x - centerX - this.distance[0],
          y: e.y - centerY - this.distance[1],
        });
      }

      shadowNode.toFront();
    },


    _nodeOnDragEnd(e, group) {
      const { graph } = this;
      const model = e.item.getModel();
      const shadowNode = group.getFirst().cfg.xShapeNode
        ? group.$getItem('shadow-node')
        : null;

      if (shadowNode) {
        const x = e.x - this.origin.x + model.x;
        const y = e.y - this.origin.y + model.y;
        const pos = {
          x,
          y,
        };

        shadowNode.remove();

        if (!this._dragNodeModeCheck()) {

          graph.updateItem(e.item, pos);
        }
      }
    },

    _clearSelected(e) {
      const selectedEdges = this.graph.findAllByState(
        'edge',
        'edgeState:selected',
      );

      selectedEdges.forEach(edge => {
        edge.clearStates(['edgeState:selected', 'edgeState:hover']);
      });
    },
  });
};
