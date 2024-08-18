"use strict";
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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DagreCompoundLayout = void 0;
var base_1 = require("./base");
var dagre_compound_1 = require("dagre-compound");
var util_1 = require("../util");
var DagreCompoundLayout = /** @class */ (function (_super) {
    __extends(DagreCompoundLayout, _super);
    function DagreCompoundLayout(options) {
        var _this = _super.call(this) || this;
        /** layout 方向, 可选 TB, BT, LR, RL */
        _this.rankdir = 'TB';
        /** 节点水平间距(px) */
        _this.nodesep = 50;
        /** 边水平间距(px) */
        _this.edgesep = 5;
        /** 每一层节点之间间距 */
        _this.ranksep = 50;
        /** 是否保留布局连线的控制点 */
        _this.controlPoints = true;
        /** 是否保留使用布局计算的锚点 */
        _this.anchorPoint = true;
        _this.nodes = [];
        _this.edges = [];
        _this.combos = [];
        /** 迭代结束的回调函数 */
        _this.onLayoutEnd = function () { };
        _this.updateCfg(options);
        return _this;
    }
    DagreCompoundLayout.prototype.getDefaultCfg = function () {
        return {
            rankdir: 'TB',
            align: undefined,
            begin: undefined,
            nodeSize: undefined,
            nodesep: 50,
            ranksep: 50,
            controlPoints: true,
            anchorPoint: true // 是否使用布局计算的锚点
        };
    };
    DagreCompoundLayout.prototype.init = function (data) {
        var hiddenNodes = data.hiddenNodes || []; // 被隐藏的节点
        var hiddenEdges = data.hiddenEdges || []; // 被隐藏的边
        var hiddenCombos = data.hiddenCombos || []; // 赋值 hiddenCombos
        // 确保此次排序按照用户输入顺序
        this.nodes = this.getDataByOrder((data.nodes || []).concat(hiddenNodes));
        this.edges = this.getDataByOrder((data.edges || []).concat(hiddenEdges));
        this.combos = (data.combos || []).concat(hiddenCombos.map(function (hc) { return (__assign(__assign({}, hc), { collapsed: true })); }));
    };
    DagreCompoundLayout.prototype.execute = function () {
        var self = this;
        var nodes = self.nodes, edges = self.edges;
        if (!nodes)
            return;
        var _a = self.getLayoutConfig(), graphDef = _a.graphDef, graphOption = _a.graphOption, graphSettings = _a.graphSettings;
        var renderInfo = (0, dagre_compound_1.buildGraph)(graphDef, graphOption, graphSettings);
        var flattenedRenderInfo = (0, dagre_compound_1.flatGraph)(renderInfo, true); // 打平数据进行遍历
        this.updatePosition(flattenedRenderInfo);
        if (self.onLayoutEnd)
            self.onLayoutEnd();
        return {
            nodes: nodes,
            edges: edges
        };
    };
    /**
     * combo 模式下查找节点完整路径
     * @param nodeId
     * @private
     */
    DagreCompoundLayout.prototype.getNodePath = function (nodeId) {
        var self = this;
        var nodes = self.nodes, combos = self.combos;
        var targetNode = nodes.find(function (n) { return n.id === nodeId; });
        var findPath = function (comboId, fullPath) {
            if (fullPath === void 0) { fullPath = []; }
            var combo = combos.find(function (c) { return c.id === comboId; });
            if (combo) {
                fullPath.unshift(comboId);
                if (combo.parentId) {
                    return findPath(combo.parentId, fullPath);
                }
                return fullPath;
            }
            return fullPath;
        };
        if (targetNode && targetNode.comboId) {
            return findPath(targetNode.comboId, [nodeId]);
        }
        return [nodeId];
    };
    /** 准备 dagre-compound 布局参数 */
    DagreCompoundLayout.prototype.getLayoutConfig = function () {
        var _a, _b, _c;
        var self = this;
        var nodes = self.nodes, edges = self.edges, combos = self.combos, nodeSize = self.nodeSize, rankdir = self.rankdir, align = self.align, edgesep = self.edgesep, nodesep = self.nodesep, ranksep = self.ranksep, settings = self.settings;
        var compound = (combos || []).reduce(function (pre, cur) {
            var matchedNodes = nodes.filter(function (n) { return n.comboId === cur.id; }).map(function (n) { return n.id; });
            var matchedCombos = (combos || []).filter(function (n) { return n.parentId === cur.id; }).map(function (n) { return n.id; });
            if (matchedNodes.length || matchedCombos.length) {
                pre[cur.id] = __spreadArray(__spreadArray([], matchedNodes, true), matchedCombos, true);
            }
            return pre;
        }, {});
        /** 计算 nodeSize */
        var nodeSizeFunc;
        if (!nodeSize) {
            nodeSizeFunc = function (d) {
                if (d && d.size) {
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
        /** 计算 comboSize */
        var comboSizeFunc = function (d) {
            if (d && d.size) {
                if ((0, util_1.isArray)(d.size)) {
                    return d.size;
                }
                return [d.size, d.size];
            }
            return [80, 40];
        };
        // 接受 defaultCombo 设置的 size
        var _d = comboSizeFunc(combos === null || combos === void 0 ? void 0 : combos[0]), metaWidth = _d[0], metaHeight = _d[1];
        // 初始化 padding
        var subSceneMeta = (_b = (_a = self.graphSettings) === null || _a === void 0 ? void 0 : _a.subScene) === null || _b === void 0 ? void 0 : _b.meta;
        var _e = ((_c = combos.find(function (c) { return !c.collapsed; })) === null || _c === void 0 ? void 0 : _c.padding) || [20, 20, 20, 20], paddingTop = _e[0], paddingRight = _e[1], paddingBottom = _e[2], paddingLeft = _e[3];
        var graphDef = {
            compound: compound,
            nodes: __spreadArray([], (nodes || []).map(function (n) {
                var size = nodeSizeFunc(n);
                var width = size[0];
                var height = size[1];
                return __assign(__assign({}, n), { width: width, height: height });
            }), true),
            edges: __spreadArray([], (edges || []).map(function (e) { return (__assign(__assign({}, e), { v: e.source, w: e.target })); }), true)
        };
        // 需要展开的节点
        var graphOption = {
            expanded: (combos || []).filter(function (c) { return !c.collapsed; }).map(function (c) { return c.id; })
        };
        // dagre-compound 布局参数
        var graphMetaConfig = {
            graph: {
                meta: {
                    align: align,
                    rankDir: rankdir,
                    nodeSep: nodesep,
                    edgeSep: edgesep,
                    rankSep: ranksep
                }
            },
            subScene: {
                meta: {
                    paddingTop: paddingTop || (subSceneMeta === null || subSceneMeta === void 0 ? void 0 : subSceneMeta.paddingTop) || 20,
                    paddingRight: paddingRight || (subSceneMeta === null || subSceneMeta === void 0 ? void 0 : subSceneMeta.paddingRight) || 20,
                    paddingBottom: paddingBottom || (subSceneMeta === null || subSceneMeta === void 0 ? void 0 : subSceneMeta.paddingBottom) || 20,
                    paddingLeft: paddingLeft || (subSceneMeta === null || subSceneMeta === void 0 ? void 0 : subSceneMeta.paddingLeft) || 20,
                    labelHeight: 0
                }
            },
            nodeSize: {
                meta: {
                    width: metaWidth,
                    height: metaHeight
                }
            }
        };
        // 合并用户输入的内容
        var graphSettings = (0, dagre_compound_1.mergeConfig)(settings, __assign({}, (0, dagre_compound_1.mergeConfig)(graphMetaConfig, dagre_compound_1.LAYOUT_CONFIG)));
        self.graphSettings = graphSettings;
        return {
            graphDef: graphDef,
            graphOption: graphOption,
            graphSettings: graphSettings
        };
    };
    /** 更新节点与边位置 */
    DagreCompoundLayout.prototype.updatePosition = function (flattenedGraph) {
        var nodes = flattenedGraph.nodes, edges = flattenedGraph.edges;
        this.updateNodePosition(nodes, edges);
        this.updateEdgePosition(nodes, edges);
    };
    DagreCompoundLayout.prototype.getBegin = function (flattenedNodes, flattenedEdges) {
        var self = this;
        var begin = self.begin;
        var dBegin = [0, 0];
        if (begin) {
            var minX_1 = Infinity;
            var minY_1 = Infinity;
            flattenedNodes.forEach(function (node) {
                if (minX_1 > node.x)
                    minX_1 = node.x;
                if (minY_1 > node.y)
                    minY_1 = node.y;
            });
            flattenedEdges.forEach(function (edge) {
                edge.points.forEach(function (point) {
                    if (minX_1 > point.x)
                        minX_1 = point.x;
                    if (minY_1 > point.y)
                        minY_1 = point.y;
                });
            });
            dBegin[0] = begin[0] - minX_1;
            dBegin[1] = begin[1] - minY_1;
        }
        return dBegin;
    };
    DagreCompoundLayout.prototype.updateNodePosition = function (flattenedNodes, flattenedEdges) {
        var self = this;
        var combos = self.combos, nodes = self.nodes, edges = self.edges, anchorPoint = self.anchorPoint, graphSettings = self.graphSettings;
        var dBegin = this.getBegin(flattenedNodes, flattenedEdges);
        flattenedNodes.forEach(function (node) {
            var _a;
            var x = node.x, y = node.y, id = node.id, type = node.type, coreBox = node.coreBox;
            if (type === dagre_compound_1.HierarchyNodeType.META && id !== dagre_compound_1.ROOT_NAME) {
                var i = combos.findIndex(function (item) { return item.id === id; });
                var subSceneMeta = (_a = graphSettings === null || graphSettings === void 0 ? void 0 : graphSettings.subScene) === null || _a === void 0 ? void 0 : _a.meta;
                // 将布局生成的 combo 位置暂存至 offsetX offsetY
                combos[i].offsetX = x + dBegin[0];
                combos[i].offsetY = y + dBegin[1];
                combos[i].fixSize = [coreBox.width, coreBox.height];
                combos[i].fixCollapseSize = [coreBox.width, coreBox.height];
                // 如果设置了收起时隐藏 padding，则手动优化 combo padding 信息，展开的话则恢复
                if (!node.expanded) {
                    combos[i].padding = [0, 0, 0, 0];
                }
                else {
                    combos[i].padding = [
                        subSceneMeta === null || subSceneMeta === void 0 ? void 0 : subSceneMeta.paddingTop,
                        subSceneMeta === null || subSceneMeta === void 0 ? void 0 : subSceneMeta.paddingRight,
                        subSceneMeta === null || subSceneMeta === void 0 ? void 0 : subSceneMeta.paddingBottom,
                        subSceneMeta === null || subSceneMeta === void 0 ? void 0 : subSceneMeta.paddingLeft
                    ];
                }
            }
            else if (type === dagre_compound_1.HierarchyNodeType.OP) {
                var i = nodes.findIndex(function (item) { return item.id === id; });
                nodes[i].x = x + dBegin[0];
                nodes[i].y = y + dBegin[1];
                if (anchorPoint) {
                    var anchorPoints_1 = [];
                    var outEdges = flattenedEdges.filter(function (e) { return e.v === id; });
                    var inEdges = flattenedEdges.filter(function (e) { return e.w === id; });
                    // 指定出边锚点，锚点中心点为 [0.5, 0.5]
                    if (outEdges.length > 0) {
                        outEdges.forEach(function (outEdge) {
                            var firstPoint = outEdge.points[0];
                            var anchorPointX = (firstPoint.x - x) / node.width + 0.5;
                            var anchorPointY = (firstPoint.y - y) / node.height + 0.5;
                            anchorPoints_1.push([anchorPointX, anchorPointY]);
                            // 出边对应 source 边锚点
                            outEdge.baseEdgeList.forEach(function (baseEdge) {
                                var edge = edges.find(function (e) { return e.source === baseEdge.v && e.target === baseEdge.w; });
                                if (edge) {
                                    edge.sourceAnchor = anchorPoints_1.length - 1;
                                }
                            });
                        });
                    }
                    // 指定入边锚点
                    if (inEdges.length > 0) {
                        inEdges.forEach(function (inEdge) {
                            var lastPoint = inEdge.points[inEdge.points.length - 1];
                            var anchorPointX = (lastPoint.x - x) / node.width + 0.5;
                            var anchorPointY = (lastPoint.y - y) / node.height + 0.5;
                            anchorPoints_1.push([anchorPointX, anchorPointY]);
                            // 出边对应 source 锚点
                            inEdge.baseEdgeList.forEach(function (baseEdge) {
                                var edge = edges.find(function (e) { return e.source === baseEdge.v && e.target === baseEdge.w; });
                                if (edge) {
                                    edge.targetAnchor = anchorPoints_1.length - 1;
                                }
                            });
                        });
                    }
                    nodes[i].anchorPoints = anchorPoints_1.length > 0 ? anchorPoints_1 : nodes[i].anchorPoints || [];
                }
            }
        });
    };
    DagreCompoundLayout.prototype.updateEdgePosition = function (flattenedNodes, flattenedEdges) {
        var self = this;
        var combos = self.combos, edges = self.edges, controlPoints = self.controlPoints;
        var dBegin = this.getBegin(flattenedNodes, flattenedEdges);
        if (controlPoints) {
            combos.forEach(function (combo) {
                combo.inEdges = [];
                combo.outEdges = [];
            });
            edges.forEach(function (sourceEdge) {
                var _a, _b, _c, _d;
                var sourceNode = flattenedNodes.find(function (v) { return v.id === sourceEdge.source; });
                var targetNode = flattenedNodes.find(function (v) { return v.id === sourceEdge.target; });
                // Combo 收起状态，dagre-compound 不会渲染该节点，边需要使用到 group 的边作为补充
                var points = [];
                var sortedEdges = [];
                if (sourceNode && targetNode) {
                    sortedEdges = (0, dagre_compound_1.getEdges)(sourceNode === null || sourceNode === void 0 ? void 0 : sourceNode.id, targetNode === null || targetNode === void 0 ? void 0 : targetNode.id, flattenedNodes);
                }
                else if (!sourceNode || !targetNode) {
                    /** 存在收起节点时，需要重新计算边的 controlPoints，确保线正常 */
                    // 情况1：目标节点被收起了，向上寻找该节点最近一个存在的父节点
                    var sourceNodePath = self.getNodePath(sourceEdge.source);
                    var targetNodePath = self.getNodePath(sourceEdge.target);
                    var lastExistingSource_1 = sourceNodePath
                        .reverse()
                        .slice(!sourceNode ? 1 : 0)
                        .find(function (parentId) { return flattenedNodes.find(function (fNode) { return fNode.id === parentId; }); });
                    var lastExistingTarget_1 = targetNodePath
                        .reverse()
                        .slice(!targetNode ? 1 : 0)
                        .find(function (parentId) { return flattenedNodes.find(function (fNode) { return fNode.id === parentId; }); });
                    sourceNode = flattenedNodes.find(function (v) { return v.id === lastExistingSource_1; });
                    targetNode = flattenedNodes.find(function (v) { return v.id === lastExistingTarget_1; });
                    sortedEdges = (0, dagre_compound_1.getEdges)(sourceNode === null || sourceNode === void 0 ? void 0 : sourceNode.id, targetNode === null || targetNode === void 0 ? void 0 : targetNode.id, flattenedNodes, { v: sourceEdge.source, w: sourceEdge.target });
                }
                points = sortedEdges.reduce(function (pre, cur) {
                    return __spreadArray(__spreadArray([], pre, true), cur.points.map(function (p) {
                        return __assign(__assign({}, p), { x: p.x + dBegin[0], y: p.y + dBegin[1] });
                    }), true);
                }, []);
                // 取消首尾节点
                points = points.slice(1, -1);
                sourceEdge.controlPoints = points;
                if ((targetNode === null || targetNode === void 0 ? void 0 : targetNode.type) === dagre_compound_1.NodeType.META) {
                    // combo 节点控制点
                    var i = combos.findIndex(function (item) { return item.id === (targetNode === null || targetNode === void 0 ? void 0 : targetNode.id); });
                    if (!combos[i] || ((_a = combos[i].inEdges) === null || _a === void 0 ? void 0 : _a.some(function (inEdge) { return inEdge.source === sourceNode.id && inEdge.target === targetNode.id; }))) {
                        return;
                    }
                    (_b = combos[i].inEdges) === null || _b === void 0 ? void 0 : _b.push({
                        source: sourceNode.id,
                        target: targetNode.id,
                        controlPoints: points
                    });
                }
                if ((sourceNode === null || sourceNode === void 0 ? void 0 : sourceNode.type) === dagre_compound_1.NodeType.META) {
                    var i = combos.findIndex(function (item) { return item.id === (sourceNode === null || sourceNode === void 0 ? void 0 : sourceNode.id); });
                    if (!combos[i] || ((_c = combos[i].outEdges) === null || _c === void 0 ? void 0 : _c.some(function (oedge) { return oedge.source === sourceNode.id && oedge.target === targetNode.id; }))) {
                        return;
                    }
                    (_d = combos[i].outEdges) === null || _d === void 0 ? void 0 : _d.push({
                        source: sourceNode.id,
                        target: targetNode.id,
                        controlPoints: points
                    });
                }
            });
        }
    };
    DagreCompoundLayout.prototype.getType = function () {
        return 'dagreCompound';
    };
    /**
     * 确保布局使用的数据与用户输入数据顺序一致
     * 通过 layoutOrder 排序 节点 与 边
     * @param list
     * @private
     */
    DagreCompoundLayout.prototype.getDataByOrder = function (list) {
        if (list.every(function (n) { return n.layoutOrder !== undefined; })) {
            // 所有数据均设置过索引，表示仅布局，数据未变化，无需处理
        }
        else {
            // 首次布局或动态添加删减节点时重新赋值
            list.forEach(function (n, i) {
                n.layoutOrder = i;
            });
        }
        // 按照 layoutOrder 排序
        return list.sort(function (pre, cur) { return pre.layoutOrder - cur.layoutOrder; });
    };
    return DagreCompoundLayout;
}(base_1.Base));
exports.DagreCompoundLayout = DagreCompoundLayout;
//# sourceMappingURL=dagreCompound.js.map