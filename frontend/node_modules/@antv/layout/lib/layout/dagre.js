"use strict";
/**
 * @fileOverview dagre layout
 * @author shiwu.wyy@antfin.com
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DagreLayout = void 0;
var index_1 = __importDefault(require("./dagre/index"));
var util_1 = require("../util");
var base_1 = require("./base");
var graph_1 = require("./dagre/graph");
/**
 * 层次布局
 */
var DagreLayout = /** @class */ (function (_super) {
    __extends(DagreLayout, _super);
    function DagreLayout(options) {
        var _this = _super.call(this) || this;
        /** layout 方向, 可选 TB, BT, LR, RL */
        _this.rankdir = 'TB';
        /** 节点水平间距(px) */
        _this.nodesep = 50;
        /** 每一层节点之间间距 */
        _this.ranksep = 50;
        /** 是否保留布局连线的控制点 */
        _this.controlPoints = false;
        /** 每层节点是否根据节点数据中的 comboId 进行排序，以防止同层 combo 重叠 */
        _this.sortByCombo = false;
        /** 是否保留每条边上的dummy node */
        _this.edgeLabelSpace = true;
        /** 是否基于 dagre 进行辐射布局，若是，第一层节点将被放置在最内环上，其余层依次向外辐射 */
        _this.radial = false;
        _this.nodes = [];
        _this.edges = [];
        /** 迭代结束的回调函数 */
        _this.onLayoutEnd = function () { };
        _this.layoutNode = function (nodeId) {
            var self = _this;
            var nodes = self.nodes;
            var node = nodes.find(function (node) { return node.id === nodeId; });
            if (node) {
                var layout = node.layout !== false;
                return layout;
            }
            return true;
        };
        _this.updateCfg(options);
        return _this;
    }
    DagreLayout.prototype.getDefaultCfg = function () {
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
    };
    /**
     * 执行布局
     */
    DagreLayout.prototype.execute = function () {
        var _this = this;
        var _a, _b, _c, _d;
        var self = this;
        var nodes = self.nodes, nodeSize = self.nodeSize, rankdir = self.rankdir, combos = self.combos, begin = self.begin, radial = self.radial, _e = self.comboEdges, comboEdges = _e === void 0 ? [] : _e, _f = self.vedges, vedges = _f === void 0 ? [] : _f;
        if (!nodes)
            return;
        var edges = self.edges || [];
        var g = new graph_1.Graph({
            multigraph: true,
            compound: true,
        });
        // collect the nodes in their combo, to create virtual edges for comboEdges
        self.nodeMap = {};
        var nodeComboMap = {};
        nodes.forEach(function (node) {
            self.nodeMap[node.id] = node;
            if (!node.comboId)
                return;
            nodeComboMap[node.comboId] = nodeComboMap[node.comboId] || [];
            nodeComboMap[node.comboId].push(node.id);
        });
        var sortedNodes = [];
        var visitedMap = {};
        if ((_a = self.nodeOrder) === null || _a === void 0 ? void 0 : _a.length) {
            self.nodeOrder.forEach(function (id) {
                visitedMap[id] = true;
                sortedNodes.push(self.nodeMap[id]);
            });
            nodes.forEach(function (node) {
                if (!visitedMap[node.id])
                    sortedNodes.push(node);
            });
        }
        else {
            sortedNodes = nodes;
        }
        var nodeSizeFunc;
        if (!nodeSize) {
            nodeSizeFunc = function (d) {
                if (d.size) {
                    if ((0, util_1.isArray)(d.size)) {
                        return d.size;
                    }
                    if ((0, util_1.isObject)(d.size)) {
                        return [d.size.width || 40, d.size.height || 40];
                    }
                    return [d.size, d.size];
                }
                return [40, 40];
            };
        }
        else if ((0, util_1.isArray)(nodeSize)) {
            nodeSizeFunc = function () { return nodeSize; };
        }
        else {
            nodeSizeFunc = function () { return [nodeSize, nodeSize]; };
        }
        var ranksepfunc = (0, util_1.getFunc)(self.ranksep, 50, self.ranksepFunc);
        var nodesepfunc = (0, util_1.getFunc)(self.nodesep, 50, self.nodesepFunc);
        var horisep = nodesepfunc;
        var vertisep = ranksepfunc;
        if (rankdir === 'LR' || rankdir === 'RL') {
            horisep = ranksepfunc;
            vertisep = nodesepfunc;
        }
        g.setDefaultEdgeLabel(function () { return ({}); });
        g.setGraph(self);
        var comboMap = {};
        if (this.sortByCombo && combos) {
            combos.forEach(function (combo) {
                comboMap[combo.id] = combo;
                // regard the collapsed combo as a node
                if (combo.collapsed) {
                    var size = nodeSizeFunc(combo);
                    var verti = vertisep(combo);
                    var hori = horisep(combo);
                    var width = size[0] + 2 * hori;
                    var height = size[1] + 2 * verti;
                    g.setNode(combo.id, { width: width, height: height });
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
            .filter(function (node) { return node.layout !== false; })
            .forEach(function (node) {
            var size = nodeSizeFunc(node);
            var verti = vertisep(node);
            var hori = horisep(node);
            var width = size[0] + 2 * hori;
            var height = size[1] + 2 * verti;
            var layer = node.layer;
            if ((0, util_1.isNumber)(layer)) {
                // 如果有layer属性，加入到node的label中
                g.setNode(node.id, { width: width, height: height, layer: layer });
            }
            else {
                g.setNode(node.id, { width: width, height: height });
            }
            if (_this.sortByCombo && node.comboId) {
                if (!comboMap[node.comboId]) {
                    comboMap[node.comboId] = { id: node.comboId };
                    g.setNode(node.comboId, {});
                }
                g.setParent(node.id, node.comboId);
            }
        });
        edges.forEach(function (edge) {
            // dagrejs Wiki https://github.com/dagrejs/dagre/wiki#configuring-the-layout
            var source = (0, util_1.getEdgeTerminal)(edge, 'source');
            var target = (0, util_1.getEdgeTerminal)(edge, 'target');
            if (_this.layoutNode(source) && _this.layoutNode(target)) {
                g.setEdge(source, target, {
                    weight: edge.weight || 1,
                });
            }
        });
        // create virtual edges from node to node for comboEdges
        (_b = comboEdges === null || comboEdges === void 0 ? void 0 : comboEdges.concat(vedges || [])) === null || _b === void 0 ? void 0 : _b.forEach(function (comboEdge) {
            var _a, _b;
            var source = comboEdge.source, target = comboEdge.target;
            var sources = ((_a = comboMap[source]) === null || _a === void 0 ? void 0 : _a.collapsed)
                ? [source]
                : nodeComboMap[source] || [source];
            var targets = ((_b = comboMap[target]) === null || _b === void 0 ? void 0 : _b.collapsed)
                ? [target]
                : nodeComboMap[target] || [target];
            sources.forEach(function (s) {
                targets.forEach(function (t) {
                    g.setEdge(s, t, {
                        weight: comboEdge.weight || 1,
                    });
                });
            });
        });
        // 考虑增量图中的原始图
        var prevGraph = undefined;
        if ((_c = self.preset) === null || _c === void 0 ? void 0 : _c.nodes) {
            prevGraph = new graph_1.Graph({
                multigraph: true,
                compound: true,
            });
            self.preset.nodes.forEach(function (node) {
                prevGraph === null || prevGraph === void 0 ? void 0 : prevGraph.setNode(node.id, node);
            });
        }
        index_1.default.layout(g, {
            prevGraph: prevGraph,
            edgeLabelSpace: self.edgeLabelSpace,
            keepNodeOrder: Boolean(!!self.nodeOrder),
            nodeOrder: self.nodeOrder,
        });
        var dBegin = [0, 0];
        if (begin) {
            var minX_1 = Infinity;
            var minY_1 = Infinity;
            g.nodes().forEach(function (node) {
                var coord = g.node(node);
                if (minX_1 > coord.x)
                    minX_1 = coord.x;
                if (minY_1 > coord.y)
                    minY_1 = coord.y;
            });
            g.edges().forEach(function (edge) {
                var _a;
                var coord = g.edge(edge);
                (_a = coord.points) === null || _a === void 0 ? void 0 : _a.forEach(function (point) {
                    if (minX_1 > point.x)
                        minX_1 = point.x;
                    if (minY_1 > point.y)
                        minY_1 = point.y;
                });
            });
            dBegin[0] = begin[0] - minX_1;
            dBegin[1] = begin[1] - minY_1;
        }
        var isHorizontal = rankdir === 'LR' || rankdir === 'RL';
        // 变形为辐射
        if (radial) {
            var _g = this, focusNode = _g.focusNode, ranksep = _g.ranksep, getRadialPos_1 = _g.getRadialPos;
            var focusId = (0, util_1.isString)(focusNode) ? focusNode : focusNode === null || focusNode === void 0 ? void 0 : focusNode.id;
            var focusLayer_1 = focusId ? (_d = g.node(focusId)) === null || _d === void 0 ? void 0 : _d._rank : 0;
            var layers_1 = [];
            var dim_1 = isHorizontal ? 'y' : 'x';
            var sizeDim_1 = isHorizontal ? 'height' : 'width';
            // 找到整个图作为环的坐标维度（dim）的最大、最小值，考虑节点宽度
            var min_1 = Infinity;
            var max_1 = -Infinity;
            g.nodes().forEach(function (node) {
                var coord = g.node(node);
                if (!self.nodeMap[node])
                    return;
                var currentNodesep = nodesepfunc(self.nodeMap[node]);
                if (focusLayer_1 === 0) {
                    if (!layers_1[coord._rank]) {
                        layers_1[coord._rank] = {
                            nodes: [],
                            totalWidth: 0,
                            maxSize: -Infinity,
                        };
                    }
                    layers_1[coord._rank].nodes.push(node);
                    layers_1[coord._rank].totalWidth += currentNodesep * 2 + coord[sizeDim_1];
                    if (layers_1[coord._rank].maxSize < Math.max(coord.width, coord.height)) {
                        layers_1[coord._rank].maxSize = Math.max(coord.width, coord.height);
                    }
                }
                else {
                    var diffLayer = coord._rank - focusLayer_1;
                    if (diffLayer === 0) {
                        if (!layers_1[diffLayer]) {
                            layers_1[diffLayer] = {
                                nodes: [],
                                totalWidth: 0,
                                maxSize: -Infinity,
                            };
                        }
                        layers_1[diffLayer].nodes.push(node);
                        layers_1[diffLayer].totalWidth += currentNodesep * 2 + coord[sizeDim_1];
                        if (layers_1[diffLayer].maxSize < Math.max(coord.width, coord.height)) {
                            layers_1[diffLayer].maxSize = Math.max(coord.width, coord.height);
                        }
                    }
                    else {
                        var diffLayerAbs = Math.abs(diffLayer);
                        if (!layers_1[diffLayerAbs]) {
                            layers_1[diffLayerAbs] = {
                                left: [],
                                right: [],
                                totalWidth: 0,
                                maxSize: -Infinity,
                            };
                        }
                        layers_1[diffLayerAbs].totalWidth +=
                            currentNodesep * 2 + coord[sizeDim_1];
                        if (layers_1[diffLayerAbs].maxSize < Math.max(coord.width, coord.height)) {
                            layers_1[diffLayerAbs].maxSize = Math.max(coord.width, coord.height);
                        }
                        if (diffLayer < 0) {
                            layers_1[diffLayerAbs].left.push(node);
                        }
                        else {
                            layers_1[diffLayerAbs].right.push(node);
                        }
                    }
                }
                var leftPos = coord[dim_1] - coord[sizeDim_1] / 2 - currentNodesep;
                var rightPos = coord[dim_1] + coord[sizeDim_1] / 2 + currentNodesep;
                if (leftPos < min_1)
                    min_1 = leftPos;
                if (rightPos > max_1)
                    max_1 = rightPos;
            });
            // const padding = (max - min) * 0.1; // TODO
            // 初始化为第一圈的半径，后面根据每层 ranksep 叠加
            var radius_1 = ranksep || 50; // TODO;
            var radiusMap_1 = {};
            // 扩大最大最小值范围，以便为环上留出接缝处的空隙
            var rangeLength_1 = (max_1 - min_1) / 0.9;
            var range_1 = [
                (min_1 + max_1 - rangeLength_1) * 0.5,
                (min_1 + max_1 + rangeLength_1) * 0.5,
            ];
            // 根据半径、分布比例，计算节点在环上的位置，并返回该组节点中最大的 ranksep 值
            var processNodes_1 = function (layerNodes, radius, propsMaxRanksep, arcRange) {
                if (propsMaxRanksep === void 0) { propsMaxRanksep = -Infinity; }
                if (arcRange === void 0) { arcRange = [0, 1]; }
                var maxRanksep = propsMaxRanksep;
                layerNodes.forEach(function (node) {
                    var coord = g.node(node);
                    radiusMap_1[node] = radius;
                    // 获取变形为 radial 后的直角坐标系坐标
                    var _a = getRadialPos_1(coord[dim_1], range_1, rangeLength_1, radius, arcRange), newX = _a.x, newY = _a.y;
                    // 将新坐标写入源数据
                    if (!self.nodeMap[node])
                        return;
                    self.nodeMap[node].x = newX + dBegin[0];
                    self.nodeMap[node].y = newY + dBegin[1];
                    // @ts-ignore: pass layer order to data for increment layout use
                    self.nodeMap[node]._order = coord._order;
                    // 找到本层最大的一个 ranksep，作为下一层与本层的间隙，叠加到下一层的半径上
                    var currentNodeRanksep = ranksepfunc(self.nodeMap[node]);
                    if (maxRanksep < currentNodeRanksep)
                        maxRanksep = currentNodeRanksep;
                });
                return maxRanksep;
            };
            var isFirstLevel_1 = true;
            var lastLayerMaxNodeSize_1 = 0;
            layers_1.forEach(function (layerNodes) {
                var _a, _b, _c, _d, _e, _f, _g;
                if (!((_a = layerNodes === null || layerNodes === void 0 ? void 0 : layerNodes.nodes) === null || _a === void 0 ? void 0 : _a.length) &&
                    !((_b = layerNodes === null || layerNodes === void 0 ? void 0 : layerNodes.left) === null || _b === void 0 ? void 0 : _b.length) &&
                    !((_c = layerNodes === null || layerNodes === void 0 ? void 0 : layerNodes.right) === null || _c === void 0 ? void 0 : _c.length)) {
                    return;
                }
                // 第一层只有一个节点，直接放在圆心，初始半径设定为 0
                if (isFirstLevel_1 && layerNodes.nodes.length === 1) {
                    // 将新坐标写入源数据
                    var nodeId = layerNodes.nodes[0];
                    if (!self.nodeMap[nodeId])
                        return;
                    self.nodeMap[nodeId].x = dBegin[0];
                    self.nodeMap[nodeId].y = dBegin[1];
                    radiusMap_1[layerNodes.nodes[0]] = 0;
                    radius_1 = ranksepfunc(self.nodeMap[nodeId]);
                    isFirstLevel_1 = false;
                    return;
                }
                // 为接缝留出空隙，半径也需要扩大
                radius_1 = Math.max(radius_1, layerNodes.totalWidth / (2 * Math.PI)); // / 0.9;
                var maxRanksep = -Infinity;
                if (focusLayer_1 === 0 || ((_d = layerNodes.nodes) === null || _d === void 0 ? void 0 : _d.length)) {
                    maxRanksep = processNodes_1(layerNodes.nodes, radius_1, maxRanksep, [0, 1]); // 0.8
                }
                else {
                    var leftRatio = ((_e = layerNodes.left) === null || _e === void 0 ? void 0 : _e.length) /
                        (((_f = layerNodes.left) === null || _f === void 0 ? void 0 : _f.length) + ((_g = layerNodes.right) === null || _g === void 0 ? void 0 : _g.length));
                    maxRanksep = processNodes_1(layerNodes.left, radius_1, maxRanksep, [
                        0,
                        leftRatio,
                    ]); // 接缝留出 0.05 的缝隙
                    maxRanksep = processNodes_1(layerNodes.right, radius_1, maxRanksep, [
                        leftRatio + 0.05,
                        1,
                    ]); // 接缝留出 0.05 的缝隙
                }
                radius_1 += maxRanksep;
                isFirstLevel_1 = false;
                lastLayerMaxNodeSize_1 - layerNodes.maxSize;
            });
            g.edges().forEach(function (edge) {
                var _a, _b, _c;
                var coord = g.edge(edge);
                var i = edges.findIndex(function (it) {
                    var source = (0, util_1.getEdgeTerminal)(it, 'source');
                    var target = (0, util_1.getEdgeTerminal)(it, 'target');
                    return source === edge.v && target === edge.w;
                });
                if (i <= -1)
                    return;
                if (self.edgeLabelSpace &&
                    self.controlPoints &&
                    edges[i].type !== 'loop') {
                    var otherDim_1 = dim_1 === 'x' ? 'y' : 'x';
                    var controlPoints = (_a = coord === null || coord === void 0 ? void 0 : coord.points) === null || _a === void 0 ? void 0 : _a.slice(1, coord.points.length - 1);
                    var newControlPoints_1 = [];
                    var sourceOtherDimValue_1 = (_b = g.node(edge.v)) === null || _b === void 0 ? void 0 : _b[otherDim_1];
                    var otherDimDist_1 = sourceOtherDimValue_1 - ((_c = g.node(edge.w)) === null || _c === void 0 ? void 0 : _c[otherDim_1]);
                    var sourceRadius_1 = radiusMap_1[edge.v];
                    var radiusDist_1 = sourceRadius_1 - radiusMap_1[edge.w];
                    controlPoints === null || controlPoints === void 0 ? void 0 : controlPoints.forEach(function (point) {
                        // 根据该边的起点、终点半径，及起点、终点、控制点位置关系，确定该控制点的半径
                        var cRadius = ((point[otherDim_1] - sourceOtherDimValue_1) / otherDimDist_1) *
                            radiusDist_1 +
                            sourceRadius_1;
                        // 获取变形为 radial 后的直角坐标系坐标
                        var newPos = getRadialPos_1(point[dim_1], range_1, rangeLength_1, cRadius);
                        newControlPoints_1.push({
                            x: newPos.x + dBegin[0],
                            y: newPos.y + dBegin[1],
                        });
                    });
                    edges[i].controlPoints = newControlPoints_1;
                }
            });
        }
        else {
            var layerCoords_1 = new Set();
            var isInvert = rankdir === 'BT' || rankdir === 'RL';
            var layerCoordSort = isInvert
                ? function (a, b) { return b - a; }
                : function (a, b) { return a - b; };
            g.nodes().forEach(function (node) {
                var coord = g.node(node);
                if (!coord)
                    return;
                var ndata = _this.nodeMap[node];
                if (!ndata) {
                    ndata = combos === null || combos === void 0 ? void 0 : combos.find(function (it) { return it.id === node; });
                }
                if (!ndata)
                    return;
                ndata.x = coord.x + dBegin[0];
                ndata.y = coord.y + dBegin[1];
                // @ts-ignore: pass layer order to data for increment layout use
                ndata._order = coord._order;
                layerCoords_1.add(isHorizontal ? ndata.x : ndata.y);
            });
            var layerCoordsArr_1 = Array.from(layerCoords_1).sort(layerCoordSort);
            // pre-define the isHorizontal related functions to avoid redundant calc in interations
            var isDifferentLayer_1 = isHorizontal
                ? function (point1, point2) { return point1.x !== point2.x; }
                : function (point1, point2) { return point1.y !== point2.y; };
            var filterControlPointsOutOfBoundary_1 = isHorizontal
                ? function (ps, point1, point2) {
                    var max = Math.max(point1.y, point2.y);
                    var min = Math.min(point1.y, point2.y);
                    return ps.filter(function (point) { return point.y <= max && point.y >= min; });
                }
                : function (ps, point1, point2) {
                    var max = Math.max(point1.x, point2.x);
                    var min = Math.min(point1.x, point2.x);
                    return ps.filter(function (point) { return point.x <= max && point.x >= min; });
                };
            g.edges().forEach(function (edge) {
                var _a;
                var coord = g.edge(edge);
                var i = edges.findIndex(function (it) {
                    var source = (0, util_1.getEdgeTerminal)(it, 'source');
                    var target = (0, util_1.getEdgeTerminal)(it, 'target');
                    return source === edge.v && target === edge.w;
                });
                if (i <= -1)
                    return;
                if (self.edgeLabelSpace &&
                    self.controlPoints &&
                    edges[i].type !== 'loop') {
                    (_a = coord === null || coord === void 0 ? void 0 : coord.points) === null || _a === void 0 ? void 0 : _a.forEach(function (point) {
                        point.x += dBegin[0];
                        point.y += dBegin[1];
                    });
                    var sourceNode = self.nodeMap[edge.v];
                    var targetNode = self.nodeMap[edge.w];
                    edges[i].controlPoints = getControlPoints(coord === null || coord === void 0 ? void 0 : coord.points, sourceNode, targetNode, layerCoordsArr_1, isHorizontal, isDifferentLayer_1, filterControlPointsOutOfBoundary_1);
                }
            });
        }
        if (self.onLayoutEnd)
            self.onLayoutEnd();
        return {
            nodes: nodes,
            edges: edges,
        };
    };
    DagreLayout.prototype.getRadialPos = function (dimValue, range, rangeLength, radius, arcRange) {
        if (arcRange === void 0) { arcRange = [0, 1]; }
        // dimRatio 占圆弧的比例
        var dimRatio = (dimValue - range[0]) / rangeLength;
        // 再进一步归一化到指定的范围上
        dimRatio = dimRatio * (arcRange[1] - arcRange[0]) + arcRange[0];
        // 使用最终归一化后的范围计算角度
        var angle = dimRatio * 2 * Math.PI; // 弧度
        // 将极坐标系转换为直角坐标系
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
        };
    };
    DagreLayout.prototype.getType = function () {
        return 'dagre';
    };
    return DagreLayout;
}(base_1.Base));
exports.DagreLayout = DagreLayout;
/**
 * Format controlPoints to avoid polylines crossing nodes
 * @param points
 * @param sourceNode
 * @param targetNode
 * @param layerCoordsArr
 * @param isHorizontal
 * @returns
 */
var getControlPoints = function (points, sourceNode, targetNode, layerCoordsArr, isHorizontal, isDifferentLayer, filterControlPointsOutOfBoundary) {
    var controlPoints = (points === null || points === void 0 ? void 0 : points.slice(1, points.length - 1)) || []; // 去掉头尾
    // 酌情增加控制点，使折线不穿过跨层的节点
    if (sourceNode && targetNode) {
        var sourceX = sourceNode.x, sourceY = sourceNode.y;
        var targetX = targetNode.x, targetY = targetNode.y;
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
            var sourceLayer = layerCoordsArr.indexOf(sourceY);
            var sourceNextLayerCoord = layerCoordsArr[sourceLayer + 1];
            if (sourceNextLayerCoord) {
                var firstControlPoint = controlPoints[0];
                var insertStartControlPoint = isHorizontal
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
            var targetLayer = layerCoordsArr.indexOf(targetY);
            var layerDiff = Math.abs(targetLayer - sourceLayer);
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
                var targetLastLayerCoord = layerCoordsArr[targetLayer - 1];
                if (targetLastLayerCoord) {
                    var lastControlPoints = controlPoints[controlPoints.length - 1];
                    var insertEndControlPoint = isHorizontal
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