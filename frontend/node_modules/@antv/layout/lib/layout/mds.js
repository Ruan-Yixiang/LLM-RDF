"use strict";
/**
 * @fileOverview MDS layout
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
exports.MDSLayout = void 0;
var ml_matrix_1 = require("ml-matrix");
var util_1 = require("../util");
var base_1 = require("./base");
/**
 * mds 布局
 */
var MDSLayout = /** @class */ (function (_super) {
    __extends(MDSLayout, _super);
    function MDSLayout(options) {
        var _this = _super.call(this) || this;
        /** 布局中心 */
        _this.center = [0, 0];
        /** 边长度 */
        _this.linkDistance = 50;
        _this.nodes = [];
        _this.edges = [];
        /** 迭代结束的回调函数 */
        _this.onLayoutEnd = function () { };
        _this.updateCfg(options);
        return _this;
    }
    MDSLayout.prototype.getDefaultCfg = function () {
        return {
            center: [0, 0],
            linkDistance: 50
        };
    };
    /**
     * 执行布局
     */
    MDSLayout.prototype.execute = function () {
        var self = this;
        var nodes = self.nodes, _a = self.edges, edges = _a === void 0 ? [] : _a;
        var center = self.center;
        if (!nodes || nodes.length === 0) {
            if (self.onLayoutEnd)
                self.onLayoutEnd();
            return;
        }
        if (nodes.length === 1) {
            nodes[0].x = center[0];
            nodes[0].y = center[1];
            if (self.onLayoutEnd)
                self.onLayoutEnd();
            return;
        }
        var linkDistance = self.linkDistance;
        // the graph-theoretic distance (shortest path distance) matrix
        var adjMatrix = (0, util_1.getAdjMatrix)({ nodes: nodes, edges: edges }, false);
        var distances = (0, util_1.floydWarshall)(adjMatrix);
        self.handleInfinity(distances);
        // scale the ideal edge length acoording to linkDistance
        var scaledD = (0, util_1.scaleMatrix)(distances, linkDistance);
        self.scaledDistances = scaledD;
        // get positions by MDS
        var positions = self.runMDS();
        self.positions = positions;
        positions.forEach(function (p, i) {
            nodes[i].x = p[0] + center[0];
            nodes[i].y = p[1] + center[1];
        });
        if (self.onLayoutEnd)
            self.onLayoutEnd();
        return {
            nodes: nodes,
            edges: edges
        };
    };
    /**
     * mds 算法
     * @return {array} positions 计算后的节点位置数组
     */
    MDSLayout.prototype.runMDS = function () {
        var self = this;
        var dimension = 2;
        var distances = self.scaledDistances;
        // square distances
        var M = ml_matrix_1.Matrix.mul(ml_matrix_1.Matrix.pow(distances, 2), -0.5);
        // double centre the rows/columns
        var rowMeans = M.mean("row");
        var colMeans = M.mean("column");
        var totalMean = M.mean();
        M.add(totalMean)
            .subRowVector(rowMeans)
            .subColumnVector(colMeans);
        // take the SVD of the double centred matrix, and return the
        // points from it
        var ret = new ml_matrix_1.SingularValueDecomposition(M);
        var eigenValues = ml_matrix_1.Matrix.sqrt(ret.diagonalMatrix).diagonal();
        return ret.leftSingularVectors.toJSON().map(function (row) {
            return ml_matrix_1.Matrix.mul([row], [eigenValues])
                .toJSON()[0]
                .splice(0, dimension);
        });
    };
    MDSLayout.prototype.handleInfinity = function (distances) {
        var maxDistance = -999999;
        distances.forEach(function (row) {
            row.forEach(function (value) {
                if (value === Infinity) {
                    return;
                }
                if (maxDistance < value) {
                    maxDistance = value;
                }
            });
        });
        distances.forEach(function (row, i) {
            row.forEach(function (value, j) {
                if (value === Infinity) {
                    distances[i][j] = maxDistance;
                }
            });
        });
    };
    MDSLayout.prototype.getType = function () {
        return "mds";
    };
    return MDSLayout;
}(base_1.Base));
exports.MDSLayout = MDSLayout;
//# sourceMappingURL=mds.js.map