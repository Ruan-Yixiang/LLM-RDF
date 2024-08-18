"use strict";
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
var Grid = /** @class */ (function () {
    function Grid() {
        this.cells = [];
        this.columnNum = 0;
        this.rowNum = 0;
        this.additionColumn = [];
        this.additionRow = [];
    }
    Grid.prototype.init = function (width, height, gridSize) {
        this.cells = [];
        this.CELL_W = gridSize.CELL_W || Grid.DEFAULT_CELL_W;
        this.CELL_H = gridSize.CELL_H || Grid.DEFAULT_CELL_H;
        this.columnNum = Math.ceil(width / this.CELL_W);
        this.rowNum = Math.ceil(height / this.CELL_H);
        Grid.MIN_DIST = Math.pow(width, 2) + Math.pow(height, 2);
        for (var i = 0; i < this.columnNum; i++) {
            var tmp = [];
            for (var j = 0; j < this.rowNum; j++) {
                var cell = {
                    dx: i,
                    dy: j,
                    x: i * this.CELL_W,
                    y: j * this.CELL_H,
                    occupied: false
                };
                tmp.push(cell);
            }
            this.cells.push(tmp);
        }
    };
    Grid.prototype.findGridByNodeId = function (nodeId) {
        var _a, _b;
        for (var i = 0; i < this.columnNum; i++) {
            for (var j = 0; j < this.rowNum; j++) {
                if (this.cells[i][j].node) {
                    if (((_b = (_a = this.cells[i][j]) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.id) === nodeId) {
                        return { column: i, row: j };
                    }
                }
            }
        }
        return null;
    };
    Grid.prototype.sqdist = function (a, b) {
        return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
    };
    Grid.prototype.occupyNearest = function (p) {
        var minDist = Grid.MIN_DIST;
        var d;
        var candidate = null;
        for (var i = 0; i < this.columnNum; i++) {
            for (var j = 0; j < this.rowNum; j++) {
                if (!this.cells[i][j].occupied && (d = this.sqdist(p, this.cells[i][j])) < minDist) {
                    minDist = d;
                    candidate = this.cells[i][j];
                }
            }
        }
        if (candidate) {
            candidate.occupied = true;
        }
        return candidate;
    };
    Grid.prototype.insertColumn = function (columnIndex, length) {
        if (length <= 0)
            return;
        // 插入空列
        for (var i = 0; i < length; i++) {
            this.cells[i + this.columnNum] = [];
            for (var j = 0; j < this.rowNum; j++) {
                this.cells[i + this.columnNum][j] = {
                    dx: i,
                    dy: j,
                    x: i * this.CELL_W,
                    y: j * this.CELL_H,
                    occupied: false,
                    node: null,
                };
            }
        }
        // 交换数据
        for (var i = (this.columnNum - 1); i > columnIndex; i--) {
            for (var j = 0; j < this.rowNum; j++) {
                this.cells[i + length][j] = __assign(__assign({}, this.cells[i][j]), { x: (i + length) * this.CELL_W, y: j * this.CELL_H });
                this.cells[i][j] = {
                    x: i * this.CELL_W,
                    y: j * this.CELL_H,
                    occupied: true,
                    node: null,
                };
            }
        }
        // 已有行列的处理
        for (var j = 0; j < this.additionColumn.length; j++) {
            if (this.additionColumn[j] >= columnIndex) {
                this.additionColumn[j] += length;
            }
        }
        // 记录新增的行列
        for (var i = 0; i < length; i++) {
            this.additionColumn.push(columnIndex + i + 1);
        }
        this.columnNum += length;
    };
    Grid.prototype.insertRow = function (rowIndex, length) {
        if (length <= 0)
            return;
        // 插入空行
        for (var j = 0; j < length; j++) {
            for (var i = 0; i < this.columnNum; i++) {
                this.cells[i][j + this.rowNum] = {
                    dx: i,
                    dy: j,
                    x: i * this.CELL_W,
                    y: j * this.CELL_H,
                    occupied: false,
                    node: null,
                };
            }
        }
        // 交换数据
        for (var i = 0; i < this.columnNum; i++) {
            for (var j = (this.rowNum - 1); j > rowIndex; j--) {
                this.cells[i][j + length] = __assign(__assign({}, this.cells[i][j]), { dx: i, dy: j + length, x: i * this.CELL_W, y: (j + length) * this.CELL_H });
                this.cells[i][j] = {
                    dx: i,
                    dy: j,
                    x: i * this.CELL_W,
                    y: j * this.CELL_H,
                    occupied: false,
                    node: null,
                };
            }
        }
        // 已有行列的处理
        for (var j = 0; j < this.additionRow.length; j++) {
            if (this.additionRow[j] >= rowIndex) {
                this.additionRow[j] += length;
            }
        }
        // 记录新增的行列
        for (var i = 0; i < length; i++) {
            this.additionRow.push(rowIndex + i + 1);
        }
        this.rowNum += length;
    };
    Grid.prototype.getNodes = function () {
        var nodes = [];
        for (var i = 0; i < this.columnNum; i++) {
            for (var j = 0; j < this.rowNum; j++) {
                if (this.cells[i][j].node) {
                    nodes.push(this.cells[i][j]);
                }
            }
        }
        return nodes;
    };
    Grid.MIN_DIST = 50;
    Grid.DEFAULT_CELL_W = 80;
    Grid.DEFAULT_CELL_H = 80;
    return Grid;
}());
exports.default = Grid;
//# sourceMappingURL=grid.js.map