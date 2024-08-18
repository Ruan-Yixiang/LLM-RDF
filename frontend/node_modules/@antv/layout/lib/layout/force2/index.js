"use strict";
/**
 * @fileOverview fruchterman layout
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Force2Layout = void 0;
var base_1 = require("../base");
var util_1 = require("../../util");
var ForceNBody_1 = require("./ForceNBody");
var proccessToFunc = function (value, defaultV) {
    var func;
    if (!value) {
        func = function (d) {
            return defaultV || 1;
        };
    }
    else if ((0, util_1.isNumber)(value)) {
        func = function (d) {
            return value;
        };
    }
    else {
        func = value;
    }
    return func;
};
/**
 * graphin 中的 force 布局
 */
var Force2Layout = /** @class */ (function (_super) {
    __extends(Force2Layout, _super);
    function Force2Layout(options) {
        var _this = _super.call(this) || this;
        /** 停止迭代的最大迭代数 */
        _this.maxIteration = 1000;
        /** 是否启动 worker */
        _this.workerEnabled = false;
        /** 弹簧引力系数 */
        _this.edgeStrength = 200;
        /** 斥力系数 */
        _this.nodeStrength = 1000;
        /** 库伦系数 */
        _this.coulombDisScale = 0.005;
        /** 阻尼系数 */
        _this.damping = 0.9;
        /** 最大速度 */
        _this.maxSpeed = 500;
        /** 一次迭代的平均移动距离小于该值时停止迭代 */
        _this.minMovement = 0.4;
        /** 迭代中衰减 */
        _this.interval = 0.02;
        /** 斥力的一个系数 */
        _this.factor = 1;
        /** 理想边长 */
        _this.linkDistance = 200;
        /** 重力大小 */
        _this.gravity = 0;
        /** 节点聚类作用力系数 */
        _this.clusterNodeStrength = 20;
        /** 是否防止重叠 */
        _this.preventOverlap = true;
        /** 阈值的使用条件，mean 代表平均移动距离小于 minMovement 时停止迭代，max 代表最大移动距离大时 minMovement 时停时迭代。默认为 mean */
        _this.distanceThresholdMode = 'mean';
        /** 每次迭代结束的回调函数 */
        _this.tick = function () { };
        _this.nodes = [];
        _this.edges = [];
        _this.width = 300;
        _this.height = 300;
        _this.nodeMap = {};
        _this.nodeIdxMap = {};
        _this.judgingDistance = 0;
        /** 默认的向心配置 */
        _this.centripetalOptions = {
            leaf: 2,
            single: 2,
            others: 1,
            // eslint-disable-next-line
            center: function (n) {
                return {
                    x: _this.width / 2,
                    y: _this.height / 2,
                };
            },
        };
        var getMass = options.getMass;
        _this.propsGetMass = getMass;
        _this.updateCfg(options);
        return _this;
    }
    Force2Layout.prototype.getCentripetalOptions = function () {
        var _a = this, leafCluster = _a.leafCluster, clustering = _a.clustering, nodeClusterBy = _a.nodeClusterBy, nodes = _a.nodes, nodeMap = _a.nodeMap, propsClusterNodeStrength = _a.clusterNodeStrength;
        var getClusterNodeStrength = function (node) {
            return typeof propsClusterNodeStrength === 'function'
                ? propsClusterNodeStrength(node)
                : propsClusterNodeStrength;
        };
        var centripetalOptions = {};
        var sameTypeLeafMap;
        // 如果传入了需要叶子节点聚类
        if (leafCluster) {
            sameTypeLeafMap = this.getSameTypeLeafMap() || {};
            var relativeNodesType_1 = Array.from(new Set(nodes === null || nodes === void 0 ? void 0 : nodes.map(function (node) { return node[nodeClusterBy]; }))) || [];
            centripetalOptions = {
                single: 100,
                leaf: function (node, nodes, edges) {
                    // 找出与它关联的边的起点或终点出发的所有一度节点中同类型的叶子节点
                    var _a = sameTypeLeafMap[node.id] || {}, relativeLeafNodes = _a.relativeLeafNodes, sameTypeLeafNodes = _a.sameTypeLeafNodes;
                    // 如果都是同一类型或者每种类型只有1个，则施加默认向心力
                    if ((sameTypeLeafNodes === null || sameTypeLeafNodes === void 0 ? void 0 : sameTypeLeafNodes.length) === (relativeLeafNodes === null || relativeLeafNodes === void 0 ? void 0 : relativeLeafNodes.length) ||
                        (relativeNodesType_1 === null || relativeNodesType_1 === void 0 ? void 0 : relativeNodesType_1.length) === 1) {
                        return 1;
                    }
                    return getClusterNodeStrength(node);
                },
                others: 1,
                center: function (node, nodes, edges) {
                    var _a;
                    var degree = (((_a = node.data) === null || _a === void 0 ? void 0 : _a.layout) || {}).degree;
                    // 孤点默认给1个远离的中心点
                    if (!degree) {
                        return {
                            x: 100,
                            y: 100,
                        };
                    }
                    var centerNode;
                    if (degree === 1) {
                        // 如果为叶子节点
                        // 找出与它关联的边的起点出发的所有一度节点中同类型的叶子节点
                        var _b = (sameTypeLeafMap[node.id] || {}).sameTypeLeafNodes, sameTypeLeafNodes = _b === void 0 ? [] : _b;
                        if (sameTypeLeafNodes.length === 1) {
                            // 如果同类型的叶子节点只有1个，中心节点置为undefined
                            centerNode = undefined;
                        }
                        else if (sameTypeLeafNodes.length > 1) {
                            // 找出同类型节点平均位置节点的距离最近的节点作为中心节点
                            centerNode = (0, util_1.getAvgNodePosition)(sameTypeLeafNodes);
                        }
                    }
                    else {
                        centerNode = undefined;
                    }
                    return {
                        x: centerNode === null || centerNode === void 0 ? void 0 : centerNode.x,
                        y: centerNode === null || centerNode === void 0 ? void 0 : centerNode.y,
                    };
                },
            };
        }
        // 如果传入了全局节点聚类
        if (clustering) {
            if (!sameTypeLeafMap)
                sameTypeLeafMap = this.getSameTypeLeafMap();
            var clusters = Array.from(new Set(nodes.map(function (node, i) {
                return node[nodeClusterBy];
            }))).filter(function (item) { return item !== undefined; });
            var centerNodeInfo_1 = {};
            clusters.forEach(function (cluster) {
                var sameTypeNodes = nodes
                    .filter(function (item) { return item[nodeClusterBy] === cluster; })
                    .map(function (node) { return nodeMap[node.id]; });
                // 找出同类型节点平均位置节点的距离最近的节点作为中心节点
                centerNodeInfo_1[cluster] = (0, util_1.getAvgNodePosition)(sameTypeNodes);
            });
            centripetalOptions = {
                single: function (node) { return getClusterNodeStrength(node); },
                leaf: function (node) { return getClusterNodeStrength(node); },
                others: function (node) { return getClusterNodeStrength(node); },
                center: function (node, nodes, edges) {
                    // 找出同类型节点平均位置节点的距离最近的节点作为中心节点
                    var centerNode = centerNodeInfo_1[node[nodeClusterBy]];
                    return {
                        x: centerNode === null || centerNode === void 0 ? void 0 : centerNode.x,
                        y: centerNode === null || centerNode === void 0 ? void 0 : centerNode.y,
                    };
                },
            };
        }
        this.centripetalOptions = __assign(__assign({}, this.centripetalOptions), centripetalOptions);
        var _b = this.centripetalOptions, leaf = _b.leaf, single = _b.single, others = _b.others;
        if (leaf && typeof leaf !== 'function')
            this.centripetalOptions.leaf = function () { return leaf; };
        if (single && typeof single !== 'function')
            this.centripetalOptions.single = function () { return single; };
        if (others && typeof others !== 'function')
            this.centripetalOptions.others = function () { return others; };
    };
    Force2Layout.prototype.updateCfg = function (cfg) {
        if (cfg)
            Object.assign(this, cfg);
    };
    Force2Layout.prototype.getDefaultCfg = function () {
        return {
            maxIteration: 500,
            gravity: 10,
            enableTick: true,
            animate: true,
        };
    };
    /**
     * 执行布局
     */
    Force2Layout.prototype.execute = function () {
        var self = this;
        self.stop();
        var nodes = self.nodes, edges = self.edges, defSpringLen = self.defSpringLen;
        self.judgingDistance = 0;
        if (!nodes || nodes.length === 0) {
            self.onLayoutEnd([]);
            return;
        }
        if (!self.width && typeof window !== 'undefined') {
            self.width = window.innerWidth;
        }
        if (!self.height && typeof window !== 'undefined') {
            self.height = window.innerHeight;
        }
        if (!self.center) {
            self.center = [self.width / 2, self.height / 2];
        }
        var center = self.center;
        if (nodes.length === 1) {
            nodes[0].x = center[0];
            nodes[0].y = center[1];
            self.onLayoutEnd([__assign({}, nodes[0])]);
            return;
        }
        self.degreesMap = (0, util_1.getDegreeMap)(nodes, edges);
        if (self.propsGetMass) {
            self.getMass = self.propsGetMass;
        }
        else {
            self.getMass = function (d) {
                var massWeight = 1;
                if ((0, util_1.isNumber)(d.mass))
                    massWeight = d.mass;
                var degree = self.degreesMap[d.id].all;
                return !degree || degree < 5 ? massWeight : degree * 5 * massWeight;
            };
        }
        // node size function
        var nodeSize = self.nodeSize;
        var nodeSizeFunc;
        if (self.preventOverlap) {
            var nodeSpacing_1 = self.nodeSpacing;
            var nodeSpacingFunc_1;
            if ((0, util_1.isNumber)(nodeSpacing_1)) {
                nodeSpacingFunc_1 = function () { return nodeSpacing_1; };
            }
            else if ((0, util_1.isFunction)(nodeSpacing_1)) {
                nodeSpacingFunc_1 = nodeSpacing_1;
            }
            else {
                nodeSpacingFunc_1 = function () { return 0; };
            }
            if (!nodeSize) {
                nodeSizeFunc = function (d) {
                    if (d.size) {
                        if ((0, util_1.isArray)(d.size)) {
                            return Math.max(d.size[0], d.size[1]) + nodeSpacingFunc_1(d);
                        }
                        else if ((0, util_1.isObject)(d.size)) {
                            return Math.max(d.size.width, d.size.height) + nodeSpacingFunc_1(d);
                        }
                        return d.size + nodeSpacingFunc_1(d);
                    }
                    return 10 + nodeSpacingFunc_1(d);
                };
            }
            else if ((0, util_1.isArray)(nodeSize)) {
                nodeSizeFunc = function (d) {
                    return Math.max(nodeSize[0], nodeSize[1]) + nodeSpacingFunc_1(d);
                };
            }
            else {
                nodeSizeFunc = function (d) { return nodeSize + nodeSpacingFunc_1(d); };
            }
        }
        self.nodeSize = nodeSizeFunc;
        self.linkDistance = proccessToFunc(self.linkDistance, 1);
        self.nodeStrength = proccessToFunc(self.nodeStrength, 1);
        self.edgeStrength = proccessToFunc(self.edgeStrength, 1);
        var nodeMap = {};
        var nodeIdxMap = {};
        nodes.forEach(function (node, i) {
            if (!(0, util_1.isNumber)(node.x))
                node.x = Math.random() * self.width;
            if (!(0, util_1.isNumber)(node.y))
                node.y = Math.random() * self.height;
            var degree = self.degreesMap[node.id];
            nodeMap[node.id] = __assign(__assign({}, node), { data: __assign(__assign({}, node.data), { size: self.nodeSize(node) || 30, layout: {
                        inDegree: degree.in,
                        outDegree: degree.out,
                        degree: degree.all,
                        tDegree: degree.in,
                        sDegree: degree.out,
                        force: {
                            mass: self.getMass(node),
                            nodeStrength: self.nodeStrength(node, edges),
                        },
                    } }) });
            nodeIdxMap[node.id] = i;
        });
        self.nodeMap = nodeMap;
        self.nodeIdxMap = nodeIdxMap;
        self.edgeInfos = [];
        edges === null || edges === void 0 ? void 0 : edges.forEach(function (edge) {
            var sourceNode = nodeMap[edge.source];
            var targetNode = nodeMap[edge.target];
            if (!sourceNode || !targetNode) {
                elf.edgeInfos.push({});
            }
            else {
                self.edgeInfos.push({
                    edgeStrength: self.edgeStrength(edge),
                    linkDistance: defSpringLen
                        ? defSpringLen(__assign(__assign({}, edge), { source: sourceNode, target: targetNode }), sourceNode, targetNode)
                        : self.linkDistance(edge, sourceNode, targetNode) ||
                            1 + (nodeSize(sourceNode) + nodeSize(sourceNode) || 0) / 2,
                });
            }
        });
        this.getCentripetalOptions();
        self.onLayoutEnd = self.onLayoutEnd || (function () { });
        self.run();
    };
    Force2Layout.prototype.run = function () {
        var self = this;
        var maxIteration = self.maxIteration, nodes = self.nodes, edges = self.edges, workerEnabled = self.workerEnabled, minMovement = self.minMovement, animate = self.animate, nodeMap = self.nodeMap, height = self.height;
        self.currentMinY = 0;
        self.currentMaxY = height;
        if (!nodes)
            return;
        var velArray = [];
        nodes.forEach(function (_, i) {
            velArray[2 * i] = 0;
            velArray[2 * i + 1] = 0;
        });
        if (this.defSideCoe && typeof this.defSideCoe === 'function') {
            var relatedEdges_1 = {};
            edges.forEach(function (edge) {
                var source = edge.source, target = edge.target;
                relatedEdges_1[source] = relatedEdges_1[source] || [];
                relatedEdges_1[source].push(edge);
                relatedEdges_1[target] = relatedEdges_1[target] || [];
                relatedEdges_1[target].push(edge);
            });
            this.relatedEdges = relatedEdges_1;
        }
        var maxIter = maxIteration;
        var silence = !animate;
        if (workerEnabled || silence) {
            var usedIter = 0;
            for (var i = 0; (self.judgingDistance > minMovement || i < 1) && i < maxIter; i++) {
                usedIter = i;
                self.runOneStep(i, velArray);
            }
            self.onLayoutEnd(Object.values(nodeMap));
        }
        else {
            if (typeof window === 'undefined')
                return;
            var iter_1 = 0;
            // interval for render the result after each iteration
            this.timeInterval = window.setInterval(function () {
                if (!nodes)
                    return;
                self.runOneStep(iter_1, velArray);
                iter_1++;
                if (iter_1 >= maxIter || self.judgingDistance < minMovement) {
                    self.onLayoutEnd(Object.values(nodeMap));
                    window.clearInterval(self.timeInterval);
                }
            }, 0);
        }
    };
    Force2Layout.prototype.runOneStep = function (iter, velArray) {
        var _a;
        var self = this;
        var nodes = self.nodes, edges = self.edges, nodeMap = self.nodeMap, monitor = self.monitor;
        var accArray = [];
        if (!(nodes === null || nodes === void 0 ? void 0 : nodes.length))
            return;
        self.calRepulsive(accArray);
        if (edges)
            self.calAttractive(accArray);
        self.calGravity(accArray);
        self.attractToSide(accArray);
        var stepInterval = self.interval; // Math.max(0.02, self.interval - iter * 0.002);
        self.updateVelocity(accArray, velArray, stepInterval);
        self.updatePosition(velArray, stepInterval);
        (_a = self.tick) === null || _a === void 0 ? void 0 : _a.call(self);
        /** 如果需要监控信息，则提供给用户 */
        if (monitor) {
            var energy = this.calTotalEnergy(accArray);
            monitor({ energy: energy, nodes: nodes, edges: edges, iterations: iter });
        }
    };
    Force2Layout.prototype.calTotalEnergy = function (accArray) {
        var _a = this, nodes = _a.nodes, nodeMap = _a.nodeMap;
        if (!(nodes === null || nodes === void 0 ? void 0 : nodes.length))
            return 0;
        var energy = 0.0;
        nodes.forEach(function (node, i) {
            var vx = accArray[2 * i];
            var vy = accArray[2 * i + 1];
            var speed2 = vx * vx + vy * vy;
            var _a = nodeMap[node.id].data.layout.force.mass, mass = _a === void 0 ? 1 : _a;
            energy += mass * speed2 * 0.5; // p = 1/2*(mv^2)
        });
        return energy;
    };
    // coulombs law
    Force2Layout.prototype.calRepulsive = function (accArray) {
        var self = this;
        var nodes = self.nodes, nodeMap = self.nodeMap, factor = self.factor, coulombDisScale = self.coulombDisScale;
        var nodeSize = self.nodeSize;
        (0, ForceNBody_1.forceNBody)(nodes, nodeMap, factor, coulombDisScale * coulombDisScale, accArray);
    };
    // hooks law
    Force2Layout.prototype.calAttractive = function (accArray) {
        var self = this;
        var edges = self.edges, nodeMap = self.nodeMap, nodeIdxMap = self.nodeIdxMap, edgeInfos = self.edgeInfos;
        var nodeSize = self.nodeSize;
        edges.forEach(function (edge, i) {
            var source = (0, util_1.getEdgeTerminal)(edge, 'source');
            var target = (0, util_1.getEdgeTerminal)(edge, 'target');
            var sourceNode = nodeMap[source];
            var targetNode = nodeMap[target];
            if (!sourceNode || !targetNode)
                return;
            var vecX = targetNode.x - sourceNode.x;
            var vecY = targetNode.y - sourceNode.y;
            if (!vecX && !vecY) {
                vecX = Math.random() * 0.01;
                vecY = Math.random() * 0.01;
            }
            var vecLength = Math.sqrt(vecX * vecX + vecY * vecY);
            var direX = vecX / vecLength;
            var direY = vecY / vecLength;
            // @ts-ignore
            var _a = edgeInfos[i] || {}, _b = _a.linkDistance, linkDistance = _b === void 0 ? 200 : _b, _c = _a.edgeStrength, edgeStrength = _c === void 0 ? 200 : _c;
            var diff = linkDistance - vecLength;
            var param = diff * edgeStrength;
            var massSource = sourceNode.data.layout.force.mass || 1;
            var massTarget = targetNode.data.layout.force.mass || 1;
            // 质量占比越大，对另一端影响程度越大
            var sourceMassRatio = 1 / massSource;
            var targetMassRatio = 1 / massTarget;
            var disX = direX * param;
            var disY = direY * param;
            var sourceIdx = 2 * nodeIdxMap[source];
            var targetIdx = 2 * nodeIdxMap[target];
            accArray[sourceIdx] -= disX * sourceMassRatio;
            accArray[sourceIdx + 1] -= disY * sourceMassRatio;
            accArray[targetIdx] += disX * targetMassRatio;
            accArray[targetIdx + 1] += disY * targetMassRatio;
        });
    };
    // attract to center
    Force2Layout.prototype.calGravity = function (accArray) {
        var _a;
        var self = this;
        var nodes = self.nodes, _b = self.edges, edges = _b === void 0 ? [] : _b, nodeMap = self.nodeMap, width = self.width, height = self.height, center = self.center, defaultGravity = self.gravity, degreesMap = self.degreesMap, centripetalOptions = self.centripetalOptions;
        if (!nodes)
            return;
        var nodeLength = nodes.length;
        for (var i = 0; i < nodeLength; i++) {
            var idx = 2 * i;
            var node = nodeMap[nodes[i].id];
            var _c = node.data.layout.force.mass, mass = _c === void 0 ? 1 : _c;
            var vecX = 0;
            var vecY = 0;
            var gravity = defaultGravity;
            var _d = degreesMap[node.id], inDegree = _d.in, outDegree = _d.out, degree = _d.all;
            var forceCenter = (_a = self.getCenter) === null || _a === void 0 ? void 0 : _a.call(self, node, degree);
            if (forceCenter) {
                var centerX = forceCenter[0], centerY = forceCenter[1], strength = forceCenter[2];
                vecX = node.x - centerX;
                vecY = node.y - centerY;
                gravity = strength;
            }
            else {
                vecX = node.x - center[0];
                vecY = node.y - center[1];
            }
            if (gravity) {
                accArray[idx] -= (gravity * vecX) / mass;
                accArray[idx + 1] -= (gravity * vecY) / mass;
            }
            if (centripetalOptions) {
                var leaf = centripetalOptions.leaf, single = centripetalOptions.single, others = centripetalOptions.others, centriCenter = centripetalOptions.center;
                var _e = (centriCenter === null || centriCenter === void 0 ? void 0 : centriCenter(node, nodes, edges, width, height)) || {
                    x: 0,
                    y: 0,
                    centerStrength: 0,
                }, centriX = _e.x, centriY = _e.y, centerStrength = _e.centerStrength;
                if (!(0, util_1.isNumber)(centriX) || !(0, util_1.isNumber)(centriY))
                    continue;
                var vx = (node.x - centriX) / mass;
                var vy = (node.y - centriY) / mass;
                if (centerStrength) {
                    accArray[idx] -= centerStrength * vx;
                    accArray[idx + 1] -= centerStrength * vy;
                }
                // 孤点
                if (degree === 0) {
                    var singleStrength = single(node);
                    if (!singleStrength)
                        continue;
                    accArray[idx] -= singleStrength * vx;
                    accArray[idx + 1] -= singleStrength * vy;
                    continue;
                }
                // 没有出度或没有入度，都认为是叶子节点
                if (inDegree === 0 || outDegree === 0) {
                    var leafStrength = leaf(node, nodes, edges);
                    if (!leafStrength)
                        continue;
                    accArray[idx] -= leafStrength * vx;
                    accArray[idx + 1] -= leafStrength * vy;
                    continue;
                }
                /** others */
                var othersStrength = others(node);
                if (!othersStrength)
                    continue;
                accArray[idx] -= othersStrength * vx;
                accArray[idx + 1] -= othersStrength * vy;
            }
        }
    };
    /**
     * Attract forces to the top and bottom.
     * @param accArray
     * @returns
     */
    Force2Layout.prototype.attractToSide = function (accArray) {
        var _a = this, defSideCoe = _a.defSideCoe, height = _a.height, nodes = _a.nodes, relatedEdges = _a.relatedEdges, _b = _a.currentMinY, currentMinY = _b === void 0 ? 0 : _b, _c = _a.currentMaxY, currentMaxY = _c === void 0 ? this.height : _c;
        if (!defSideCoe || typeof defSideCoe !== 'function' || !(nodes === null || nodes === void 0 ? void 0 : nodes.length))
            return;
        nodes.forEach(function (node, i) {
            var sideCoe = defSideCoe(node, relatedEdges[node.id] || []);
            if (sideCoe === 0)
                return;
            var targetY = sideCoe < 0 ? currentMinY : currentMaxY;
            var strength = Math.abs(sideCoe);
            accArray[2 * i + 1] -= strength * (node.y - targetY);
        });
    };
    Force2Layout.prototype.updateVelocity = function (accArray, velArray, stepInterval) {
        var self = this;
        var nodes = self.nodes, damping = self.damping, maxSpeed = self.maxSpeed;
        if (!(nodes === null || nodes === void 0 ? void 0 : nodes.length))
            return;
        nodes.forEach(function (_, i) {
            var vx = (velArray[2 * i] + accArray[2 * i] * stepInterval) * damping || 0.01;
            var vy = (velArray[2 * i + 1] + accArray[2 * i + 1] * stepInterval) * damping ||
                0.01;
            var vLength = Math.sqrt(vx * vx + vy * vy);
            if (vLength > maxSpeed) {
                var param2 = maxSpeed / vLength;
                vx = param2 * vx;
                vy = param2 * vy;
            }
            velArray[2 * i] = vx;
            velArray[2 * i + 1] = vy;
        });
    };
    Force2Layout.prototype.updatePosition = function (velArray, stepInterval) {
        var self = this;
        var nodes = self.nodes, distanceThresholdMode = self.distanceThresholdMode, nodeMap = self.nodeMap;
        if (!(nodes === null || nodes === void 0 ? void 0 : nodes.length)) {
            this.judgingDistance = 0;
            return;
        }
        var sum = 0;
        if (distanceThresholdMode === 'max')
            self.judgingDistance = -Infinity;
        else if (distanceThresholdMode === 'min')
            self.judgingDistance = Infinity;
        var currentMinY = Infinity;
        var currentMaxY = -Infinity;
        nodes.forEach(function (node, i) {
            var mappedNode = nodeMap[node.id];
            if ((0, util_1.isNumber)(node.fx) && (0, util_1.isNumber)(node.fy)) {
                node.x = node.fx;
                node.y = node.fy;
                mappedNode.x = node.x;
                mappedNode.y = node.y;
                return;
            }
            var distX = velArray[2 * i] * stepInterval;
            var distY = velArray[2 * i + 1] * stepInterval;
            node.x += distX;
            node.y += distY;
            mappedNode.x = node.x;
            mappedNode.y = node.y;
            if (node.y < currentMinY)
                currentMinY = node.y;
            if (node.y > currentMaxY)
                currentMaxY = node.y;
            var distanceMagnitude = Math.sqrt(distX * distX + distY * distY);
            switch (distanceThresholdMode) {
                case 'max':
                    if (self.judgingDistance < distanceMagnitude)
                        self.judgingDistance = distanceMagnitude;
                    break;
                case 'min':
                    if (self.judgingDistance > distanceMagnitude)
                        self.judgingDistance = distanceMagnitude;
                    break;
                default:
                    sum = sum + distanceMagnitude;
                    break;
            }
        });
        this.currentMinY = currentMinY;
        this.currentMaxY = currentMaxY;
        if (!distanceThresholdMode || distanceThresholdMode === 'mean')
            self.judgingDistance = sum / nodes.length;
    };
    Force2Layout.prototype.stop = function () {
        if (this.timeInterval && typeof window !== 'undefined') {
            window.clearInterval(this.timeInterval);
        }
    };
    Force2Layout.prototype.destroy = function () {
        var self = this;
        self.stop();
        self.tick = null;
        self.nodes = null;
        self.edges = null;
        self.destroyed = true;
    };
    Force2Layout.prototype.getType = function () {
        return 'force2';
    };
    Force2Layout.prototype.getSameTypeLeafMap = function () {
        var _a = this, nodeClusterBy = _a.nodeClusterBy, nodes = _a.nodes, edges = _a.edges, nodeMap = _a.nodeMap, degreesMap = _a.degreesMap;
        if (!(nodes === null || nodes === void 0 ? void 0 : nodes.length))
            return;
        // eslint-disable-next-line
        var sameTypeLeafMap = {};
        nodes.forEach(function (node, i) {
            var degree = degreesMap[node.id].all;
            if (degree === 1) {
                sameTypeLeafMap[node.id] = (0, util_1.getCoreNodeAndRelativeLeafNodes)('leaf', node, edges, nodeClusterBy, degreesMap, nodeMap);
            }
        });
        return sameTypeLeafMap;
    };
    return Force2Layout;
}(base_1.Base));
exports.Force2Layout = Force2Layout;
//# sourceMappingURL=index.js.map