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
Object.defineProperty(exports, "__esModule", { value: true });
exports.GForceLayout = void 0;
var base_1 = require("./base");
var util_1 = require("../util");
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
var GForceLayout = /** @class */ (function (_super) {
    __extends(GForceLayout, _super);
    function GForceLayout(options) {
        var _this = _super.call(this) || this;
        /** 停止迭代的最大迭代数 */
        _this.maxIteration = 500;
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
        _this.maxSpeed = 1000;
        /** 一次迭代的平均移动距离小于该值时停止迭代 */
        _this.minMovement = 0.5;
        /** 迭代中衰减 */
        _this.interval = 0.02;
        /** 斥力的一个系数 */
        _this.factor = 1;
        /** 理想边长 */
        _this.linkDistance = 1;
        /** 重力大小 */
        _this.gravity = 10;
        /** 是否防止重叠 */
        _this.preventOverlap = true;
        /** 防止重叠的力大小参数 */
        _this.collideStrength = 1;
        /** 每次迭代结束的回调函数 */
        _this.tick = function () { };
        _this.nodes = [];
        _this.edges = [];
        _this.width = 300;
        _this.height = 300;
        _this.nodeMap = {};
        _this.nodeIdxMap = {};
        /** 是否使用 window.setInterval 运行迭代 */
        _this.animate = true;
        _this.updateCfg(options);
        return _this;
    }
    GForceLayout.prototype.getDefaultCfg = function () {
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
    GForceLayout.prototype.execute = function () {
        var _a, _b;
        var self = this;
        var nodes = self.nodes;
        if (self.timeInterval !== undefined && typeof window !== "undefined") {
            window.clearInterval(self.timeInterval);
        }
        if (!nodes || nodes.length === 0) {
            (_a = self.onLayoutEnd) === null || _a === void 0 ? void 0 : _a.call(self);
            return;
        }
        if (!self.width && typeof window !== "undefined") {
            self.width = window.innerWidth;
        }
        if (!self.height && typeof window !== "undefined") {
            self.height = window.innerHeight;
        }
        if (!self.center) {
            self.center = [self.width / 2, self.height / 2];
        }
        var center = self.center;
        if (nodes.length === 1) {
            nodes[0].x = center[0];
            nodes[0].y = center[1];
            (_b = self.onLayoutEnd) === null || _b === void 0 ? void 0 : _b.call(self);
            return;
        }
        var nodeMap = {};
        var nodeIdxMap = {};
        nodes.forEach(function (node, i) {
            if (!(0, util_1.isNumber)(node.x))
                node.x = Math.random() * self.width;
            if (!(0, util_1.isNumber)(node.y))
                node.y = Math.random() * self.height;
            nodeMap[node.id] = node;
            nodeIdxMap[node.id] = i;
        });
        self.nodeMap = nodeMap;
        self.nodeIdxMap = nodeIdxMap;
        self.linkDistance = proccessToFunc(self.linkDistance, 1);
        self.nodeStrength = proccessToFunc(self.nodeStrength, 1);
        self.edgeStrength = proccessToFunc(self.edgeStrength, 1);
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
                        if ((0, util_1.isObject)(d.size)) {
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
        var edges = self.edges;
        self.degrees = (0, util_1.getDegree)(nodes.length, self.nodeIdxMap, edges);
        if (!self.getMass) {
            self.getMass = function (d) {
                var mass = d.mass || self.degrees[self.nodeIdxMap[d.id]].all || 1;
                return mass;
            };
        }
        // layout
        self.run();
    };
    GForceLayout.prototype.run = function () {
        var _a;
        var self = this;
        var maxIteration = self.maxIteration, nodes = self.nodes, workerEnabled = self.workerEnabled, minMovement = self.minMovement, animate = self.animate;
        if (!nodes)
            return;
        if (workerEnabled || !animate) {
            for (var i = 0; i < maxIteration; i++) {
                var previousPos = self.runOneStep(i);
                if (self.reachMoveThreshold(nodes, previousPos, minMovement)) {
                    break;
                }
            }
            (_a = self.onLayoutEnd) === null || _a === void 0 ? void 0 : _a.call(self);
        }
        else {
            if (typeof window === "undefined")
                return;
            var iter_1 = 0;
            // interval for render the result after each iteration
            this.timeInterval = window.setInterval(function () {
                var _a, _b;
                if (!nodes)
                    return;
                var previousPos = self.runOneStep(iter_1) || [];
                if (self.reachMoveThreshold(nodes, previousPos, minMovement)) {
                    (_a = self.onLayoutEnd) === null || _a === void 0 ? void 0 : _a.call(self);
                    window.clearInterval(self.timeInterval);
                }
                iter_1++;
                if (iter_1 >= maxIteration) {
                    (_b = self.onLayoutEnd) === null || _b === void 0 ? void 0 : _b.call(self);
                    window.clearInterval(self.timeInterval);
                }
            }, 0);
        }
    };
    GForceLayout.prototype.reachMoveThreshold = function (nodes, previousPos, minMovement) {
        // whether to stop the iteration
        var movement = 0;
        nodes.forEach(function (node, j) {
            var vx = node.x - previousPos[j].x;
            var vy = node.y - previousPos[j].y;
            movement += Math.sqrt(vx * vx + vy * vy);
        });
        movement /= nodes.length;
        return movement < minMovement;
    };
    GForceLayout.prototype.runOneStep = function (iter) {
        var _a;
        var self = this;
        var nodes = self.nodes, edges = self.edges;
        var accArray = [];
        var velArray = [];
        if (!nodes)
            return;
        nodes.forEach(function (_, i) {
            accArray[2 * i] = 0;
            accArray[2 * i + 1] = 0;
            velArray[2 * i] = 0;
            velArray[2 * i + 1] = 0;
        });
        self.calRepulsive(accArray, nodes);
        if (edges)
            self.calAttractive(accArray, edges);
        self.calGravity(accArray, nodes);
        var stepInterval = Math.max(0.02, self.interval - iter * 0.002);
        self.updateVelocity(accArray, velArray, stepInterval, nodes);
        var previousPos = [];
        nodes.forEach(function (node) {
            previousPos.push({
                x: node.x,
                y: node.y
            });
        });
        self.updatePosition(velArray, stepInterval, nodes);
        (_a = self.tick) === null || _a === void 0 ? void 0 : _a.call(self);
        return previousPos;
    };
    GForceLayout.prototype.calRepulsive = function (accArray, nodes) {
        var self = this;
        var getMass = self.getMass, factor = self.factor, coulombDisScale = self.coulombDisScale, preventOverlap = self.preventOverlap, _a = self.collideStrength, collideStrength = _a === void 0 ? 1 : _a;
        var nodeStrength = self.nodeStrength;
        var nodeSize = self.nodeSize;
        nodes.forEach(function (ni, i) {
            var massi = getMass ? getMass(ni) : 1;
            nodes.forEach(function (nj, j) {
                if (i >= j)
                    return;
                // if (!accArray[j]) accArray[j] = 0;
                var vecX = ni.x - nj.x;
                var vecY = ni.y - nj.y;
                if (vecX === 0 && vecY === 0) {
                    vecX = Math.random() * 0.01;
                    vecY = Math.random() * 0.01;
                }
                var lengthSqr = vecX * vecX + vecY * vecY;
                var vecLength = Math.sqrt(lengthSqr);
                var nVecLength = (vecLength + 0.1) * coulombDisScale;
                var direX = vecX / vecLength;
                var direY = vecY / vecLength;
                var param = (((nodeStrength(ni) + nodeStrength(nj)) * 0.5) * factor) /
                    (nVecLength * nVecLength);
                var massj = getMass ? getMass(nj) : 1;
                accArray[2 * i] += (direX * param);
                accArray[2 * i + 1] += (direY * param);
                accArray[2 * j] -= (direX * param);
                accArray[2 * j + 1] -= (direY * param);
                if (preventOverlap && (nodeSize(ni) + nodeSize(nj)) / 2 > vecLength) {
                    var paramOverlap = collideStrength * (nodeStrength(ni) + nodeStrength(nj)) * 0.5 / lengthSqr;
                    accArray[2 * i] += (direX * paramOverlap) / massi;
                    accArray[2 * i + 1] += (direY * paramOverlap) / massi;
                    accArray[2 * j] -= (direX * paramOverlap) / massj;
                    accArray[2 * j + 1] -= (direY * paramOverlap) / massj;
                }
            });
        });
    };
    GForceLayout.prototype.calAttractive = function (accArray, edges) {
        var self = this;
        var nodeMap = self.nodeMap, nodeIdxMap = self.nodeIdxMap, linkDistance = self.linkDistance, edgeStrength = self.edgeStrength;
        var nodeSize = self.nodeSize;
        var getMass = self.getMass;
        edges.forEach(function (edge, i) {
            var source = (0, util_1.getEdgeTerminal)(edge, 'source');
            var target = (0, util_1.getEdgeTerminal)(edge, 'target');
            var sourceNode = nodeMap[source];
            var targetNode = nodeMap[target];
            var vecX = targetNode.x - sourceNode.x;
            var vecY = targetNode.y - sourceNode.y;
            if (vecX === 0 && vecY === 0) {
                vecX = Math.random() * 0.01;
                vecY = Math.random() * 0.01;
            }
            var vecLength = Math.sqrt(vecX * vecX + vecY * vecY);
            var direX = vecX / vecLength;
            var direY = vecY / vecLength;
            var length = linkDistance(edge, sourceNode, targetNode) || 1 + ((nodeSize(sourceNode) + nodeSize(targetNode)) || 0) / 2;
            var diff = length - vecLength;
            var param = diff * edgeStrength(edge);
            var sourceIdx = nodeIdxMap[source];
            var targetIdx = nodeIdxMap[target];
            var massSource = getMass ? getMass(sourceNode) : 1;
            var massTarget = getMass ? getMass(targetNode) : 1;
            accArray[2 * sourceIdx] -= (direX * param) / massSource;
            accArray[2 * sourceIdx + 1] -= (direY * param) / massSource;
            accArray[2 * targetIdx] += (direX * param) / massTarget;
            accArray[2 * targetIdx + 1] += (direY * param) / massTarget;
        });
    };
    GForceLayout.prototype.calGravity = function (accArray, nodes) {
        var self = this;
        // const nodes = self.nodes;
        var center = self.center;
        var defaultGravity = self.gravity;
        var degrees = self.degrees;
        var nodeLength = nodes.length;
        for (var i = 0; i < nodeLength; i++) {
            var node = nodes[i];
            var vecX = node.x - center[0];
            var vecY = node.y - center[1];
            var gravity = defaultGravity;
            if (self.getCenter) {
                var customCenterOpt = self.getCenter(node, degrees[i].all);
                if (customCenterOpt &&
                    (0, util_1.isNumber)(customCenterOpt[0]) &&
                    (0, util_1.isNumber)(customCenterOpt[1]) &&
                    (0, util_1.isNumber)(customCenterOpt[2])) {
                    vecX = node.x - customCenterOpt[0];
                    vecY = node.y - customCenterOpt[1];
                    gravity = customCenterOpt[2];
                }
            }
            if (!gravity)
                continue;
            accArray[2 * i] -= gravity * vecX;
            accArray[2 * i + 1] -= gravity * vecY;
        }
    };
    GForceLayout.prototype.updateVelocity = function (accArray, velArray, stepInterval, nodes) {
        var self = this;
        var param = stepInterval * self.damping;
        // const nodes = self.nodes;
        nodes.forEach(function (node, i) {
            var vx = accArray[2 * i] * param || 0.01;
            var vy = accArray[2 * i + 1] * param || 0.01;
            var vLength = Math.sqrt(vx * vx + vy * vy);
            if (vLength > self.maxSpeed) {
                var param2 = self.maxSpeed / vLength;
                vx = param2 * vx;
                vy = param2 * vy;
            }
            velArray[2 * i] = vx;
            velArray[2 * i + 1] = vy;
        });
    };
    GForceLayout.prototype.updatePosition = function (velArray, stepInterval, nodes) {
        nodes.forEach(function (node, i) {
            if ((0, util_1.isNumber)(node.fx) && (0, util_1.isNumber)(node.fy)) {
                node.x = node.fx;
                node.y = node.fy;
                return;
            }
            var distX = velArray[2 * i] * stepInterval;
            var distY = velArray[2 * i + 1] * stepInterval;
            node.x += distX;
            node.y += distY;
        });
    };
    GForceLayout.prototype.stop = function () {
        if (this.timeInterval && typeof window !== "undefined") {
            window.clearInterval(this.timeInterval);
        }
    };
    GForceLayout.prototype.destroy = function () {
        var self = this;
        self.stop();
        self.tick = null;
        self.nodes = null;
        self.edges = null;
        self.destroyed = true;
    };
    GForceLayout.prototype.getType = function () {
        return "gForce";
    };
    return GForceLayout;
}(base_1.Base));
exports.GForceLayout = GForceLayout;
//# sourceMappingURL=gForce.js.map