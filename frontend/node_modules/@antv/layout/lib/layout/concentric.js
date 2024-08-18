"use strict";
/**
 * @fileOverview concentric layout
 * @author shiwu.wyy@antfin.com
 * this algorithm refers to <cytoscape.js> - https://github.com/cytoscape/cytoscape.js/
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
exports.ConcentricLayout = void 0;
var util_1 = require("../util");
var base_1 = require("./base");
/**
 * 同心圆布局
 */
var ConcentricLayout = /** @class */ (function (_super) {
    __extends(ConcentricLayout, _super);
    function ConcentricLayout(options) {
        var _this = _super.call(this) || this;
        _this.nodeSize = 30;
        /** min spacing between outside of nodes (used for radius adjustment) */
        _this.minNodeSpacing = 10;
        /** same as minNodeSpacing. min spacing between outside of nodes (used for radius adjustment) */
        _this.nodeSpacing = 10;
        /** prevents node overlap, may overflow boundingBox if not enough space */
        _this.preventOverlap = false;
        /** whether levels have an equal radial distance betwen them, may cause bounding box overflow */
        _this.equidistant = false;
        /** where nodes start in radians */
        _this.startAngle = (3 / 2) * Math.PI;
        /** whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false) */
        _this.clockwise = true;
        /** 根据 sortBy 指定的属性进行排布，数值高的放在中心，如果是 sortBy 则会计算节点度数，度数最高的放在中心 */
        _this.sortBy = "degree";
        _this.nodes = [];
        _this.edges = [];
        _this.width = 300;
        _this.height = 300;
        /** 迭代结束的回调函数 */
        _this.onLayoutEnd = function () { };
        _this.updateCfg(options);
        return _this;
    }
    ConcentricLayout.prototype.getDefaultCfg = function () {
        return {
            nodeSize: 30,
            minNodeSpacing: 10,
            nodeSpacing: 10,
            preventOverlap: false,
            sweep: undefined,
            equidistant: false,
            startAngle: (3 / 2) * Math.PI,
            clockwise: true,
            maxLevelDiff: undefined,
            sortBy: "degree"
        };
    };
    /**
     * 执行布局
     */
    ConcentricLayout.prototype.execute = function () {
        var _a, _b;
        var self = this;
        var nodes = self.nodes, edges = self.edges;
        var n = nodes.length;
        if (n === 0) {
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
        if (n === 1) {
            nodes[0].x = center[0];
            nodes[0].y = center[1];
            (_b = self.onLayoutEnd) === null || _b === void 0 ? void 0 : _b.call(self);
            return;
        }
        var nodeSize = self.nodeSize, nodeSpacing = self.nodeSpacing;
        var layoutNodes = [];
        var maxNodeSize;
        var maxNodeSpacing = 0;
        if ((0, util_1.isArray)(nodeSize)) {
            maxNodeSize = Math.max(nodeSize[0], nodeSize[1]);
        }
        else {
            maxNodeSize = nodeSize;
        }
        if ((0, util_1.isArray)(nodeSpacing)) {
            maxNodeSpacing = Math.max(nodeSpacing[0], nodeSpacing[1]);
        }
        else if ((0, util_1.isNumber)(nodeSpacing)) {
            maxNodeSpacing = nodeSpacing;
        }
        nodes.forEach(function (node) {
            layoutNodes.push(node);
            var nodeSize = maxNodeSize;
            if ((0, util_1.isArray)(node.size)) {
                nodeSize = Math.max(node.size[0], node.size[1]);
            }
            else if ((0, util_1.isNumber)(node.size)) {
                nodeSize = node.size;
            }
            else if ((0, util_1.isObject)(node.size)) {
                nodeSize = Math.max(node.size.width, node.size.height);
            }
            maxNodeSize = Math.max(maxNodeSize, nodeSize);
            if ((0, util_1.isFunction)(nodeSpacing)) {
                maxNodeSpacing = Math.max(nodeSpacing(node), maxNodeSpacing);
            }
        });
        self.clockwise =
            self.counterclockwise !== undefined
                ? !self.counterclockwise
                : self.clockwise;
        // layout
        var nodeMap = {};
        var indexMap = {};
        layoutNodes.forEach(function (node, i) {
            nodeMap[node.id] = node;
            indexMap[node.id] = i;
        });
        // get the node degrees
        if (self.sortBy === "degree" ||
            !(0, util_1.isString)(self.sortBy) ||
            layoutNodes[0][self.sortBy] === undefined) {
            self.sortBy = "degree";
            if (!(0, util_1.isNumber)(nodes[0].degree)) {
                var values_1 = (0, util_1.getDegree)(nodes.length, indexMap, edges);
                layoutNodes.forEach(function (node, i) {
                    node.degree = values_1[i].all;
                });
            }
        }
        // sort nodes by value
        layoutNodes.sort(function (n1, n2) {
            return n2[self.sortBy] - n1[self.sortBy];
        });
        self.maxValueNode = layoutNodes[0];
        self.maxLevelDiff =
            self.maxLevelDiff || self.maxValueNode[self.sortBy] / 4;
        // put the values into levels
        var levels = [[]];
        var currentLevel = levels[0];
        layoutNodes.forEach(function (node) {
            if (currentLevel.length > 0) {
                var diff = Math.abs(currentLevel[0][self.sortBy] - node[self.sortBy]);
                if (self.maxLevelDiff && diff >= self.maxLevelDiff) {
                    currentLevel = [];
                    levels.push(currentLevel);
                }
            }
            currentLevel.push(node);
        });
        // create positions for levels
        var minDist = maxNodeSize + (maxNodeSpacing || self.minNodeSpacing); // min dist between nodes
        if (!self.preventOverlap) {
            // then strictly constrain to bb
            var firstLvlHasMulti = levels.length > 0 && levels[0].length > 1;
            var maxR = Math.min(self.width, self.height) / 2 - minDist;
            var rStep = maxR / (levels.length + (firstLvlHasMulti ? 1 : 0));
            minDist = Math.min(minDist, rStep);
        }
        // find the metrics for each level
        var r = 0;
        levels.forEach(function (level) {
            var sweep = self.sweep;
            if (sweep === undefined) {
                sweep = 2 * Math.PI - (2 * Math.PI) / level.length;
            }
            var dTheta = (level.dTheta = sweep / Math.max(1, level.length - 1));
            // calculate the radius
            if (level.length > 1 && self.preventOverlap) {
                // but only if more than one node (can't overlap)
                var dcos = Math.cos(dTheta) - Math.cos(0);
                var dsin = Math.sin(dTheta) - Math.sin(0);
                var rMin = Math.sqrt((minDist * minDist) / (dcos * dcos + dsin * dsin)); // s.t. no nodes overlapping
                r = Math.max(rMin, r);
            }
            level.r = r;
            r += minDist;
        });
        if (self.equidistant) {
            var rDeltaMax_1 = 0;
            var rr_1 = 0;
            for (var i = 0; i < levels.length; i++) {
                var level = levels[i];
                var rDelta = level.r - rr_1;
                rDeltaMax_1 = Math.max(rDeltaMax_1, rDelta);
            }
            rr_1 = 0;
            levels.forEach(function (level, i) {
                if (i === 0) {
                    rr_1 = level.r;
                }
                level.r = rr_1;
                rr_1 += rDeltaMax_1;
            });
        }
        // calculate the node positions
        levels.forEach(function (level) {
            var dTheta = level.dTheta;
            var rr = level.r;
            level.forEach(function (node, j) {
                var theta = self.startAngle + (self.clockwise ? 1 : -1) * dTheta * j;
                node.x = center[0] + rr * Math.cos(theta);
                node.y = center[1] + rr * Math.sin(theta);
            });
        });
        if (self.onLayoutEnd)
            self.onLayoutEnd();
        return {
            nodes: nodes,
            edges: edges
        };
    };
    ConcentricLayout.prototype.getType = function () {
        return "concentric";
    };
    return ConcentricLayout;
}(base_1.Base));
exports.ConcentricLayout = ConcentricLayout;
//# sourceMappingURL=concentric.js.map