/**
 * @fileOverview dagre layout
 * @author shiwu.wyy@antfin.com
 */
import dagre from './dagre/index';
import { isArray, isNumber, isObject, getEdgeTerminal, getFunc, isString, } from '../util';
import { Base } from './base';
import { Graph as DagreGraph } from './dagre/graph';
/**
 * 层次布局
 */
export class DagreLayout extends Base {
    constructor(options) {
        super();
        /** layout 方向, 可选 TB, BT, LR, RL */
        this.rankdir = 'TB';
        /** 节点水平间距(px) */
        this.nodesep = 50;
        /** 每一层节点之间间距 */
        this.ranksep = 50;
        /** 是否保留布局连线的控制点 */
        this.controlPoints = false;
        /** 每层节点是否根据节点数据中的 comboId 进行排序，以防止同层 combo 重叠 */
        this.sortByCombo = false;
        /** 是否保留每条边上的dummy node */
        this.edgeLabelSpace = true;
        /** 是否基于 dagre 进行辐射布局，若是，第一层节点将被放置在最内环上，其余层依次向外辐射 */
        this.radial = false;
        this.nodes = [];
        this.edges = [];
        /** 迭代结束的回调函数 */
        this.onLayoutEnd = () => { };
        this.layoutNode = (nodeId) => {
            const self = this;
            const { nodes } = self;
            const node = nodes.find((node) => node.id === nodeId);
            if (node) {
                const layout = node.layout !== false;
                return layout;
            }
            return true;
        };
        this.updateCfg(options);
    }
    getDefaultCfg() {
        return {
            rankdir: 'TB',
            align: undefined,
            nodeSize: undefined,
            nodesepFunc: undefined,
            ranksepFunc: undefined,
            nodesep: 50,
            ranksep: 50,
            controlPoints: false,
            radial: false,
            focusNode: null, // radial 为 true 时生效，关注的节点
        };
    }
    /**
     * 执行布局
     */
    execute() {
        var _a, _b, _c, _d;
        const self = this;
        const { nodes, nodeSize, rankdir, combos, begin, radial, comboEdges = [], vedges = [], } = self;
        if (!nodes)
            return;
        const edges = self.edges || [];
        const g = new DagreGraph({
            multigraph: true,
            compound: true,
        });
        // collect the nodes in their combo, to create virtual edges for comboEdges
        self.nodeMap = {};
        const nodeComboMap = {};
        nodes.forEach((node) => {
            self.nodeMap[node.id] = node;
            if (!node.comboId)
                return;
            nodeComboMap[node.comboId] = nodeComboMap[node.comboId] || [];
            nodeComboMap[node.comboId].push(node.id);
        });
        let sortedNodes = [];
        const visitedMap = {};
        if ((_a = self.nodeOrder) === null || _a === void 0 ? void 0 : _a.length) {
            self.nodeOrder.forEach((id) => {
                visitedMap[id] = true;
                sortedNodes.push(self.nodeMap[id]);
            });
            nodes.forEach((node) => {
                if (!visitedMap[node.id])
                    sortedNodes.push(node);
            });
        }
        else {
            sortedNodes = nodes;
        }
        let nodeSizeFunc;
        if (!nodeSize) {
            nodeSizeFunc = (d) => {
                if (d.size) {
                    if (isArray(d.size)) {
                        return d.size;
                    }
                    if (isObject(d.size)) {
                        return [d.size.width || 40, d.size.height || 40];
                    }
                    return [d.size, d.size];
                }
                return [40, 40];
            };
        }
        else if (isArray(nodeSize)) {
            nodeSizeFunc = () => nodeSize;
        }
        else {
            nodeSizeFunc = () => [nodeSize, nodeSize];
        }
        const ranksepfunc = getFunc(self.ranksep, 50, self.ranksepFunc);
        const nodesepfunc = getFunc(self.nodesep, 50, self.nodesepFunc);
        let horisep = nodesepfunc;
        let vertisep = ranksepfunc;
        if (rankdir === 'LR' || rankdir === 'RL') {
            horisep = ranksepfunc;
            vertisep = nodesepfunc;
        }
        g.setDefaultEdgeLabel(() => ({}));
        g.setGraph(self);
        const comboMap = {};
        if (this.sortByCombo && combos) {
            combos.forEach((combo) => {
                comboMap[combo.id] = combo;
                // regard the collapsed combo as a node
                if (combo.collapsed) {
                    const size = nodeSizeFunc(combo);
                    const verti = vertisep(combo);
                    const hori = horisep(combo);
                    const width = size[0] + 2 * hori;
                    const height = size[1] + 2 * verti;
                    g.setNode(combo.id, { width, height });
                }
                if (!combo.parentId)
                    return;
                if (!comboMap[combo.parentId]) {
                    g.setNode(combo.parentId, {});
                }
                g.setParent(combo.id, combo.parentId);
            });
        }
        sortedNodes
            .filter((node) => node.layout !== false)
            .forEach((node) => {
            const size = nodeSizeFunc(node);
            const verti = vertisep(node);
            const hori = horisep(node);
            const width = size[0] + 2 * hori;
            const height = size[1] + 2 * verti;
            const layer = node.layer;
            if (isNumber(layer)) {
                // 如果有layer属性，加入到node的label中
                g.setNode(node.id, { width, height, layer });
            }
            else {
                g.setNode(node.id, { width, height });
            }
            if (this.sortByCombo && node.comboId) {
                if (!comboMap[node.comboId]) {
                    comboMap[node.comboId] = { id: node.comboId };
                    g.setNode(node.comboId, {});
                }
                g.setParent(node.id, node.comboId);
            }
        });
        edges.forEach((edge) => {
            // dagrejs Wiki https://github.com/dagrejs/dagre/wiki#configuring-the-layout
            const source = getEdgeTerminal(edge, 'source');
            const target = getEdgeTerminal(edge, 'target');
            if (this.layoutNode(source) && this.layoutNode(target)) {
                g.setEdge(source, target, {
                    weight: edge.weight || 1,
                });
            }
        });
        // create virtual edges from node to node for comboEdges
        (_b = comboEdges === null || comboEdges === void 0 ? void 0 : comboEdges.concat(vedges || [])) === null || _b === void 0 ? void 0 : _b.forEach((comboEdge) => {
            var _a, _b;
            const { source, target } = comboEdge;
            const sources = ((_a = comboMap[source]) === null || _a === void 0 ? void 0 : _a.collapsed)
                ? [source]
                : nodeComboMap[source] || [source];
            const targets = ((_b = comboMap[target]) === null || _b === void 0 ? void 0 : _b.collapsed)
                ? [target]
                : nodeComboMap[target] || [target];
            sources.forEach((s) => {
                targets.forEach((t) => {
                    g.setEdge(s, t, {
                        weight: comboEdge.weight || 1,
                    });
                });
            });
        });
        // 考虑增量图中的原始图
        let prevGraph = undefined;
        if ((_c = self.preset) === null || _c === void 0 ? void 0 : _c.nodes) {
            prevGraph = new DagreGraph({
                multigraph: true,
                compound: true,
            });
            self.preset.nodes.forEach((node) => {
                prevGraph === null || prevGraph === void 0 ? void 0 : prevGraph.setNode(node.id, node);
            });
        }
        dagre.layout(g, {
            prevGraph,
            edgeLabelSpace: self.edgeLabelSpace,
            keepNodeOrder: Boolean(!!self.nodeOrder),
            nodeOrder: self.nodeOrder,
        });
        const dBegin = [0, 0];
        if (begin) {
            let minX = Infinity;
            let minY = Infinity;
            g.nodes().forEach((node) => {
                const coord = g.node(node);
                if (minX > coord.x)
                    minX = coord.x;
                if (minY > coord.y)
                    minY = coord.y;
            });
            g.edges().forEach((edge) => {
                var _a;
                const coord = g.edge(edge);
                (_a = coord.points) === null || _a === void 0 ? void 0 : _a.forEach((point) => {
                    if (minX > point.x)
                        minX = point.x;
                    if (minY > point.y)
                        minY = point.y;
                });
            });
            dBegin[0] = begin[0] - minX;
            dBegin[1] = begin[1] - minY;
        }
        const isHorizontal = rankdir === 'LR' || rankdir === 'RL';
        // 变形为辐射
        if (radial) {
            const { focusNode, ranksep, getRadialPos } = this;
            const focusId = isString(focusNode) ? focusNode : focusNode === null || focusNode === void 0 ? void 0 : focusNode.id;
            const focusLayer = focusId ? (_d = g.node(focusId)) === null || _d === void 0 ? void 0 : _d._rank : 0;
            const layers = [];
            const dim = isHorizontal ? 'y' : 'x';
            const sizeDim = isHorizontal ? 'height' : 'width';
            // 找到整个图作为环的坐标维度（dim）的最大、最小值，考虑节点宽度
            let min = Infinity;
            let max = -Infinity;
            g.nodes().forEach((node) => {
                const coord = g.node(node);
                if (!self.nodeMap[node])
                    return;
                const currentNodesep = nodesepfunc(self.nodeMap[node]);
                if (focusLayer === 0) {
                    if (!layers[coord._rank]) {
                        layers[coord._rank] = {
                            nodes: [],
                            totalWidth: 0,
                            maxSize: -Infinity,
                        };
                    }
                    layers[coord._rank].nodes.push(node);
                    layers[coord._rank].totalWidth += currentNodesep * 2 + coord[sizeDim];
                    if (layers[coord._rank].maxSize < Math.max(coord.width, coord.height)) {
                        layers[coord._rank].maxSize = Math.max(coord.width, coord.height);
                    }
                }
                else {
                    const diffLayer = coord._rank - focusLayer;
                    if (diffLayer === 0) {
                        if (!layers[diffLayer]) {
                            layers[diffLayer] = {
                                nodes: [],
                                totalWidth: 0,
                                maxSize: -Infinity,
                            };
                        }
                        layers[diffLayer].nodes.push(node);
                        layers[diffLayer].totalWidth += currentNodesep * 2 + coord[sizeDim];
                        if (layers[diffLayer].maxSize < Math.max(coord.width, coord.height)) {
                            layers[diffLayer].maxSize = Math.max(coord.width, coord.height);
                        }
                    }
                    else {
                        const diffLayerAbs = Math.abs(diffLayer);
                        if (!layers[diffLayerAbs]) {
                            layers[diffLayerAbs] = {
                                left: [],
                                right: [],
                                totalWidth: 0,
                                maxSize: -Infinity,
                            };
                        }
                        layers[diffLayerAbs].totalWidth +=
                            currentNodesep * 2 + coord[sizeDim];
                        if (layers[diffLayerAbs].maxSize < Math.max(coord.width, coord.height)) {
                            layers[diffLayerAbs].maxSize = Math.max(coord.width, coord.height);
                        }
                        if (diffLayer < 0) {
                            layers[diffLayerAbs].left.push(node);
                        }
                        else {
                            layers[diffLayerAbs].right.push(node);
                        }
                    }
                }
                const leftPos = coord[dim] - coord[sizeDim] / 2 - currentNodesep;
                const rightPos = coord[dim] + coord[sizeDim] / 2 + currentNodesep;
                if (leftPos < min)
                    min = leftPos;
                if (rightPos > max)
                    max = rightPos;
            });
            // const padding = (max - min) * 0.1; // TODO
            // 初始化为第一圈的半径，后面根据每层 ranksep 叠加
            let radius = ranksep || 50; // TODO;
            const radiusMap = {};
            // 扩大最大最小值范围，以便为环上留出接缝处的空隙
            const rangeLength = (max - min) / 0.9;
            const range = [
                (min + max - rangeLength) * 0.5,
                (min + max + rangeLength) * 0.5,
            ];
            // 根据半径、分布比例，计算节点在环上的位置，并返回该组节点中最大的 ranksep 值
            const processNodes = (layerNodes, radius, propsMaxRanksep = -Infinity, arcRange = [0, 1]) => {
                let maxRanksep = propsMaxRanksep;
                layerNodes.forEach((node) => {
                    const coord = g.node(node);
                    radiusMap[node] = radius;
                    // 获取变形为 radial 后的直角坐标系坐标
                    const { x: newX, y: newY } = getRadialPos(coord[dim], range, rangeLength, radius, arcRange);
                    // 将新坐标写入源数据
                    if (!self.nodeMap[node])
                        return;
                    self.nodeMap[node].x = newX + dBegin[0];
                    self.nodeMap[node].y = newY + dBegin[1];
                    // @ts-ignore: pass layer order to data for increment layout use
                    self.nodeMap[node]._order = coord._order;
                    // 找到本层最大的一个 ranksep，作为下一层与本层的间隙，叠加到下一层的半径上
                    const currentNodeRanksep = ranksepfunc(self.nodeMap[node]);
                    if (maxRanksep < currentNodeRanksep)
                        maxRanksep = currentNodeRanksep;
                });
                return maxRanksep;
            };
            let isFirstLevel = true;
            const lastLayerMaxNodeSize = 0;
            layers.forEach((layerNodes) => {
                var _a, _b, _c, _d, _e, _f, _g;
                if (!((_a = layerNodes === null || layerNodes === void 0 ? void 0 : layerNodes.nodes) === null || _a === void 0 ? void 0 : _a.length) &&
                    !((_b = layerNodes === null || layerNodes === void 0 ? void 0 : layerNodes.left) === null || _b === void 0 ? void 0 : _b.length) &&
                    !((_c = layerNodes === null || layerNodes === void 0 ? void 0 : layerNodes.right) === null || _c === void 0 ? void 0 : _c.length)) {
                    return;
                }
                // 第一层只有一个节点，直接放在圆心，初始半径设定为 0
                if (isFirstLevel && layerNodes.nodes.length === 1) {
                    // 将新坐标写入源数据
                    const nodeId = layerNodes.nodes[0];
                    if (!self.nodeMap[nodeId])
                        return;
                    self.nodeMap[nodeId].x = dBegin[0];
                    self.nodeMap[nodeId].y = dBegin[1];
                    radiusMap[layerNodes.nodes[0]] = 0;
                    radius = ranksepfunc(self.nodeMap[nodeId]);
                    isFirstLevel = false;
                    return;
                }
                // 为接缝留出空隙，半径也需要扩大
                radius = Math.max(radius, layerNodes.totalWidth / (2 * Math.PI)); // / 0.9;
                let maxRanksep = -Infinity;
                if (focusLayer === 0 || ((_d = layerNodes.nodes) === null || _d === void 0 ? void 0 : _d.length)) {
                    maxRanksep = processNodes(layerNodes.nodes, radius, maxRanksep, [0, 1]); // 0.8
                }
                else {
                    const leftRatio = ((_e = layerNodes.left) === null || _e === void 0 ? void 0 : _e.length) /
                        (((_f = layerNodes.left) === null || _f === void 0 ? void 0 : _f.length) + ((_g = layerNodes.right) === null || _g === void 0 ? void 0 : _g.length));
                    maxRanksep = processNodes(layerNodes.left, radius, maxRanksep, [
                        0,
                        leftRatio,
                    ]); // 接缝留出 0.05 的缝隙
                    maxRanksep = processNodes(layerNodes.right, radius, maxRanksep, [
                        leftRatio + 0.05,
                        1,
                    ]); // 接缝留出 0.05 的缝隙
                }
                radius += maxRanksep;
                isFirstLevel = false;
                lastLayerMaxNodeSize - layerNodes.maxSize;
            });
            g.edges().forEach((edge) => {
                var _a, _b, _c;
                const coord = g.edge(edge);
                const i = edges.findIndex((it) => {
                    const source = getEdgeTerminal(it, 'source');
                    const target = getEdgeTerminal(it, 'target');
                    return source === edge.v && target === edge.w;
                });
                if (i <= -1)
                    return;
                if (self.edgeLabelSpace &&
                    self.controlPoints &&
                    edges[i].type !== 'loop') {
                    const otherDim = dim === 'x' ? 'y' : 'x';
                    const controlPoints = (_a = coord === null || coord === void 0 ? void 0 : coord.points) === null || _a === void 0 ? void 0 : _a.slice(1, coord.points.length - 1);
                    const newControlPoints = [];
                    const sourceOtherDimValue = (_b = g.node(edge.v)) === null || _b === void 0 ? void 0 : _b[otherDim];
                    const otherDimDist = sourceOtherDimValue - ((_c = g.node(edge.w)) === null || _c === void 0 ? void 0 : _c[otherDim]);
                    const sourceRadius = radiusMap[edge.v];
                    const radiusDist = sourceRadius - radiusMap[edge.w];
                    controlPoints === null || controlPoints === void 0 ? void 0 : controlPoints.forEach((point) => {
                        // 根据该边的起点、终点半径，及起点、终点、控制点位置关系，确定该控制点的半径
                        const cRadius = ((point[otherDim] - sourceOtherDimValue) / otherDimDist) *
                            radiusDist +
                            sourceRadius;
                        // 获取变形为 radial 后的直角坐标系坐标
                        const newPos = getRadialPos(point[dim], range, rangeLength, cRadius);
                        newControlPoints.push({
                            x: newPos.x + dBegin[0],
                            y: newPos.y + dBegin[1],
                        });
                    });
                    edges[i].controlPoints = newControlPoints;
                }
            });
        }
        else {
            const layerCoords = new Set();
            const isInvert = rankdir === 'BT' || rankdir === 'RL';
            const layerCoordSort = isInvert
                ? (a, b) => b - a
                : (a, b) => a - b;
            g.nodes().forEach((node) => {
                const coord = g.node(node);
                if (!coord)
                    return;
                let ndata = this.nodeMap[node];
                if (!ndata) {
                    ndata = combos === null || combos === void 0 ? void 0 : combos.find((it) => it.id === node);
                }
                if (!ndata)
                    return;
                ndata.x = coord.x + dBegin[0];
                ndata.y = coord.y + dBegin[1];
                // @ts-ignore: pass layer order to data for increment layout use
                ndata._order = coord._order;
                layerCoords.add(isHorizontal ? ndata.x : ndata.y);
            });
            const layerCoordsArr = Array.from(layerCoords).sort(layerCoordSort);
            // pre-define the isHorizontal related functions to avoid redundant calc in interations
            const isDifferentLayer = isHorizontal
                ? (point1, point2) => point1.x !== point2.x
                : (point1, point2) => point1.y !== point2.y;
            const filterControlPointsOutOfBoundary = isHorizontal
                ? (ps, point1, point2) => {
                    const max = Math.max(point1.y, point2.y);
                    const min = Math.min(point1.y, point2.y);
                    return ps.filter((point) => point.y <= max && point.y >= min);
                }
                : (ps, point1, point2) => {
                    const max = Math.max(point1.x, point2.x);
                    const min = Math.min(point1.x, point2.x);
                    return ps.filter((point) => point.x <= max && point.x >= min);
                };
            g.edges().forEach((edge) => {
                var _a;
                const coord = g.edge(edge);
                const i = edges.findIndex((it) => {
                    const source = getEdgeTerminal(it, 'source');
                    const target = getEdgeTerminal(it, 'target');
                    return source === edge.v && target === edge.w;
                });
                if (i <= -1)
                    return;
                if (self.edgeLabelSpace &&
                    self.controlPoints &&
                    edges[i].type !== 'loop') {
                    (_a = coord === null || coord === void 0 ? void 0 : coord.points) === null || _a === void 0 ? void 0 : _a.forEach((point) => {
                        point.x += dBegin[0];
                        point.y += dBegin[1];
                    });
                    const sourceNode = self.nodeMap[edge.v];
                    const targetNode = self.nodeMap[edge.w];
                    edges[i].controlPoints = getControlPoints(coord === null || coord === void 0 ? void 0 : coord.points, sourceNode, targetNode, layerCoordsArr, isHorizontal, isDifferentLayer, filterControlPointsOutOfBoundary);
                }
            });
        }
        if (self.onLayoutEnd)
            self.onLayoutEnd();
        return {
            nodes,
            edges,
        };
    }
    getRadialPos(dimValue, range, rangeLength, radius, arcRange = [0, 1]) {
        // dimRatio 占圆弧的比例
        let dimRatio = (dimValue - range[0]) / rangeLength;
        // 再进一步归一化到指定的范围上
        dimRatio = dimRatio * (arcRange[1] - arcRange[0]) + arcRange[0];
        // 使用最终归一化后的范围计算角度
        const angle = dimRatio * 2 * Math.PI; // 弧度
        // 将极坐标系转换为直角坐标系
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
        };
    }
    getType() {
        return 'dagre';
    }
}
/**
 * Format controlPoints to avoid polylines crossing nodes
 * @param points
 * @param sourceNode
 * @param targetNode
 * @param layerCoordsArr
 * @param isHorizontal
 * @returns
 */
const getControlPoints = (points, sourceNode, targetNode, layerCoordsArr, isHorizontal, isDifferentLayer, filterControlPointsOutOfBoundary) => {
    let controlPoints = (points === null || points === void 0 ? void 0 : points.slice(1, points.length - 1)) || []; // 去掉头尾
    // 酌情增加控制点，使折线不穿过跨层的节点
    if (sourceNode && targetNode) {
        let { x: sourceX, y: sourceY } = sourceNode;
        let { x: targetX, y: targetY } = targetNode;
        if (isHorizontal) {
            sourceX = sourceNode.y;
            sourceY = sourceNode.x;
            targetX = targetNode.y;
            targetY = targetNode.x;
        }
        // 为跨层级的边增加第一个控制点。忽略垂直的/横向的边。
        // 新控制点 = {
        //   x: 终点x,
        //   y: (起点y + 下一层y) / 2,   #下一层y可能不等于终点y
        // }
        if (targetY !== sourceY && sourceX !== targetX) {
            const sourceLayer = layerCoordsArr.indexOf(sourceY);
            const sourceNextLayerCoord = layerCoordsArr[sourceLayer + 1];
            if (sourceNextLayerCoord) {
                const firstControlPoint = controlPoints[0];
                const insertStartControlPoint = isHorizontal
                    ? {
                        x: (sourceY + sourceNextLayerCoord) / 2,
                        y: (firstControlPoint === null || firstControlPoint === void 0 ? void 0 : firstControlPoint.y) || targetX,
                    }
                    : {
                        x: (firstControlPoint === null || firstControlPoint === void 0 ? void 0 : firstControlPoint.x) || targetX,
                        y: (sourceY + sourceNextLayerCoord) / 2,
                    };
                // 当新增的控制点不存在（!=当前第一个控制点）时添加
                if (!firstControlPoint ||
                    isDifferentLayer(firstControlPoint, insertStartControlPoint)) {
                    controlPoints.unshift(insertStartControlPoint);
                }
            }
            const targetLayer = layerCoordsArr.indexOf(targetY);
            const layerDiff = Math.abs(targetLayer - sourceLayer);
            if (layerDiff === 1) {
                controlPoints = filterControlPointsOutOfBoundary(controlPoints, sourceNode, targetNode);
                // one controlPoint at least
                if (!controlPoints.length) {
                    controlPoints.push(isHorizontal
                        ? {
                            x: (sourceY + targetY) / 2,
                            y: sourceX,
                        }
                        : {
                            x: sourceX,
                            y: (sourceY + targetY) / 2,
                        });
                }
            }
            else if (layerDiff > 1) {
                const targetLastLayerCoord = layerCoordsArr[targetLayer - 1];
                if (targetLastLayerCoord) {
                    const lastControlPoints = controlPoints[controlPoints.length - 1];
                    const insertEndControlPoint = isHorizontal
                        ? {
                            x: (targetY + targetLastLayerCoord) / 2,
                            y: (lastControlPoints === null || lastControlPoints === void 0 ? void 0 : lastControlPoints.y) || targetX,
                        }
                        : {
                            x: (lastControlPoints === null || lastControlPoints === void 0 ? void 0 : lastControlPoints.x) || sourceX,
                            y: (targetY + targetLastLayerCoord) / 2,
                        };
                    // 当新增的控制点不存在（!=当前最后一个控制点）时添加
                    if (!lastControlPoints ||
                        isDifferentLayer(lastControlPoints, insertEndControlPoint)) {
                        controlPoints.push(insertEndControlPoint);
                    }
                }
            }
        }
    }
    return controlPoints;
};
//# sourceMappingURL=dagre.js.map