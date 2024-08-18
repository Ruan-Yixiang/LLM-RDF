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
exports.FruchtermanLayout = void 0;
var base_1 = require("./base");
var util_1 = require("../util");
var SPEED_DIVISOR = 800;
/**
 * fruchterman 布局
 */
var FruchtermanLayout = /** @class */ (function (_super) {
    __extends(FruchtermanLayout, _super);
    function FruchtermanLayout(options) {
        var _this = _super.call(this) || this;
        /** 停止迭代的最大迭代数 */
        _this.maxIteration = 1000;
        /** 是否启动 worker */
        _this.workerEnabled = false;
        /** 重力大小，影响图的紧凑程度 */
        _this.gravity = 10;
        /** 速度 */
        _this.speed = 5;
        /** 是否产生聚类力 */
        _this.clustering = false;
        /** 聚类力大小 */
        _this.clusterGravity = 10;
        _this.nodes = [];
        _this.edges = [];
        _this.width = 300;
        _this.height = 300;
        _this.nodeMap = {};
        _this.nodeIdxMap = {};
        /** 迭代结束的回调函数 */
        _this.onLayoutEnd = function () { };
        /** 每次迭代结束的回调函数 */
        _this.tick = function () { };
        /** 是否使用 window.setInterval 运行迭代 */
        _this.animate = true;
        _this.updateCfg(options);
        return _this;
    }
    FruchtermanLayout.prototype.getDefaultCfg = function () {
        return {
            maxIteration: 1000,
            gravity: 10,
            speed: 1,
            clustering: false,
            clusterGravity: 10,
            animate: true
        };
    };
    /**
     * 执行布局
     */
    FruchtermanLayout.prototype.execute = function () {
        var _this = this;
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
                node.x = Math.random() * _this.width;
            if (!(0, util_1.isNumber)(node.y))
                node.y = Math.random() * _this.height;
            nodeMap[node.id] = node;
            nodeIdxMap[node.id] = i;
        });
        self.nodeMap = nodeMap;
        self.nodeIdxMap = nodeIdxMap;
        // layout
        return self.run();
    };
    FruchtermanLayout.prototype.run = function () {
        var _a;
        var self = this;
        var nodes = self.nodes;
        if (!nodes)
            return;
        var edges = self.edges, maxIteration = self.maxIteration, workerEnabled = self.workerEnabled, clustering = self.clustering, animate = self.animate;
        var clusterMap = {};
        if (clustering) {
            nodes.forEach(function (n) {
                if (clusterMap[n.cluster] === undefined) {
                    clusterMap[n.cluster] = {
                        name: n.cluster,
                        cx: 0,
                        cy: 0,
                        count: 0
                    };
                }
            });
        }
        if (workerEnabled || !animate) {
            for (var i = 0; i < maxIteration; i++) {
                self.runOneStep(clusterMap);
            }
            (_a = self.onLayoutEnd) === null || _a === void 0 ? void 0 : _a.call(self);
        }
        else {
            if (typeof window === "undefined")
                return;
            var iter_1 = 0;
            // interval for render the result after each iteration
            this.timeInterval = window.setInterval(function () {
                var _a;
                self.runOneStep(clusterMap);
                iter_1++;
                if (iter_1 >= maxIteration) {
                    (_a = self.onLayoutEnd) === null || _a === void 0 ? void 0 : _a.call(self);
                    window.clearInterval(self.timeInterval);
                }
            }, 0);
        }
        return {
            nodes: nodes,
            edges: edges
        };
    };
    FruchtermanLayout.prototype.runOneStep = function (clusterMap) {
        var _a;
        var self = this;
        var nodes = self.nodes;
        if (!nodes)
            return;
        var edges = self.edges, center = self.center, gravity = self.gravity, speed = self.speed, clustering = self.clustering;
        var area = self.height * self.width;
        var maxDisplace = Math.sqrt(area) / 10;
        var k2 = area / (nodes.length + 1);
        var k = Math.sqrt(k2);
        var displacements = [];
        nodes.forEach(function (_, j) {
            displacements[j] = { x: 0, y: 0 };
        });
        self.applyCalculate(nodes, edges, displacements, k, k2);
        // gravity for clusters
        if (clustering) {
            // re-compute the clustering centers
            for (var key in clusterMap) {
                clusterMap[key].cx = 0;
                clusterMap[key].cy = 0;
                clusterMap[key].count = 0;
            }
            nodes.forEach(function (n) {
                var c = clusterMap[n.cluster];
                if ((0, util_1.isNumber)(n.x)) {
                    c.cx += n.x;
                }
                if ((0, util_1.isNumber)(n.y)) {
                    c.cy += n.y;
                }
                c.count++;
            });
            for (var key in clusterMap) {
                clusterMap[key].cx /= clusterMap[key].count;
                clusterMap[key].cy /= clusterMap[key].count;
            }
            // compute the cluster gravity forces
            var clusterGravity_1 = self.clusterGravity || gravity;
            nodes.forEach(function (n, j) {
                if (!(0, util_1.isNumber)(n.x) || !(0, util_1.isNumber)(n.y))
                    return;
                var c = clusterMap[n.cluster];
                var distLength = Math.sqrt((n.x - c.cx) * (n.x - c.cx) + (n.y - c.cy) * (n.y - c.cy));
                var gravityForce = k * clusterGravity_1;
                displacements[j].x -= (gravityForce * (n.x - c.cx)) / distLength;
                displacements[j].y -= (gravityForce * (n.y - c.cy)) / distLength;
            });
        }
        // gravity
        nodes.forEach(function (n, j) {
            if (!(0, util_1.isNumber)(n.x) || !(0, util_1.isNumber)(n.y))
                return;
            var gravityForce = 0.01 * k * gravity;
            displacements[j].x -= gravityForce * (n.x - center[0]);
            displacements[j].y -= gravityForce * (n.y - center[1]);
        });
        // move
        nodes.forEach(function (n, j) {
            if ((0, util_1.isNumber)(n.fx) && (0, util_1.isNumber)(n.fy)) {
                n.x = n.fx;
                n.y = n.fy;
                return;
            }
            if (!(0, util_1.isNumber)(n.x) || !(0, util_1.isNumber)(n.y))
                return;
            var distLength = Math.sqrt(displacements[j].x * displacements[j].x +
                displacements[j].y * displacements[j].y);
            if (distLength > 0) {
                // && !n.isFixed()
                var limitedDist = Math.min(maxDisplace * (speed / SPEED_DIVISOR), distLength);
                n.x += (displacements[j].x / distLength) * limitedDist;
                n.y += (displacements[j].y / distLength) * limitedDist;
            }
        });
        (_a = self.tick) === null || _a === void 0 ? void 0 : _a.call(self);
    };
    FruchtermanLayout.prototype.applyCalculate = function (nodes, edges, displacements, k, k2) {
        var self = this;
        self.calRepulsive(nodes, displacements, k2);
        if (edges)
            self.calAttractive(edges, displacements, k);
    };
    FruchtermanLayout.prototype.calRepulsive = function (nodes, displacements, k2) {
        nodes.forEach(function (v, i) {
            displacements[i] = { x: 0, y: 0 };
            nodes.forEach(function (u, j) {
                if (i === j) {
                    return;
                }
                if (!(0, util_1.isNumber)(v.x) ||
                    !(0, util_1.isNumber)(u.x) ||
                    !(0, util_1.isNumber)(v.y) ||
                    !(0, util_1.isNumber)(u.y)) {
                    return;
                }
                var vecX = v.x - u.x;
                var vecY = v.y - u.y;
                var vecLengthSqr = vecX * vecX + vecY * vecY;
                if (vecLengthSqr === 0) {
                    vecLengthSqr = 1;
                    var sign = i > j ? 1 : -1;
                    vecX = 0.01 * sign;
                    vecY = 0.01 * sign;
                }
                var common = k2 / vecLengthSqr;
                displacements[i].x += vecX * common;
                displacements[i].y += vecY * common;
            });
        });
    };
    FruchtermanLayout.prototype.calAttractive = function (edges, displacements, k) {
        var _this = this;
        edges.forEach(function (e) {
            var source = (0, util_1.getEdgeTerminal)(e, 'source');
            var target = (0, util_1.getEdgeTerminal)(e, 'target');
            if (!source || !target)
                return;
            var uIndex = _this.nodeIdxMap[source];
            var vIndex = _this.nodeIdxMap[target];
            if (uIndex === vIndex) {
                return;
            }
            var u = _this.nodeMap[source];
            var v = _this.nodeMap[target];
            if (!(0, util_1.isNumber)(v.x) || !(0, util_1.isNumber)(u.x) || !(0, util_1.isNumber)(v.y) || !(0, util_1.isNumber)(u.y)) {
                return;
            }
            var vecX = v.x - u.x;
            var vecY = v.y - u.y;
            var vecLength = Math.sqrt(vecX * vecX + vecY * vecY);
            var common = (vecLength * vecLength) / k;
            displacements[vIndex].x -= (vecX / vecLength) * common;
            displacements[vIndex].y -= (vecY / vecLength) * common;
            displacements[uIndex].x += (vecX / vecLength) * common;
            displacements[uIndex].y += (vecY / vecLength) * common;
        });
    };
    FruchtermanLayout.prototype.stop = function () {
        if (this.timeInterval && typeof window !== "undefined") {
            window.clearInterval(this.timeInterval);
        }
    };
    FruchtermanLayout.prototype.destroy = function () {
        var self = this;
        self.stop();
        self.tick = null;
        self.nodes = null;
        self.edges = null;
        self.destroyed = true;
    };
    FruchtermanLayout.prototype.getType = function () {
        return "fruchterman";
    };
    return FruchtermanLayout;
}(base_1.Base));
exports.FruchtermanLayout = FruchtermanLayout;
//# sourceMappingURL=fruchterman.js.map