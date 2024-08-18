"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var grid_1 = __importDefault(require("./grid"));
function layout(data, options) {
    if (!data.nodes || data.nodes.length === 0)
        return data;
    var width = options.width;
    var height = options.height;
    var nodeMinGap = options.nodeMinGap;
    // 2. 网格布局
    var CELL_W = 10000;
    var CELL_H = 10000;
    data.nodes.forEach(function (node) {
        var nodeWidth = node.size[0] || 50;
        var nodeHeight = node.size[1] || 50;
        CELL_W = Math.min(nodeWidth, CELL_W);
        CELL_H = Math.min(nodeHeight, CELL_H);
    });
    var grid = new grid_1.default();
    grid.init(width, height, {
        CELL_H: CELL_H,
        CELL_W: CELL_W,
    });
    data.nodes.forEach(function (d) {
        var gridpoint = grid.occupyNearest(d);
        if (gridpoint) {
            gridpoint.node = {
                id: d.id,
                size: d.size,
            };
            d.x = gridpoint.x;
            d.y = gridpoint.y;
            d.dx = gridpoint.dx;
            d.dy = gridpoint.dy;
        }
    });
    // 加入节点size
    for (var i = 0; i < data.nodes.length; i++) {
        //  节点宽度大于网格宽度，则往当前网格的右边插入列
        var node = data.nodes[i];
        var result = grid.findGridByNodeId(node.id);
        if (!result)
            throw new Error("can not find node cell");
        var column = result.column, row = result.row;
        if ((node.size[0] + nodeMinGap) > CELL_W) {
            var addGridSize = Math.ceil((node.size[0] + nodeMinGap) / CELL_W) - 1;
            var realAdd = addGridSize;
            // 优化，假设同一列，不同行存在两个size为2的节点，遍历到第一个节点的时候，会往右插入两列，遍历到第二个节点，又往右插入。就会导致多余的网格
            for (var j = 0; j < addGridSize; j++) {
                var hasColumn = grid.additionColumn.indexOf(column + j + 1) > -1;
                if (hasColumn && !grid.cells[column + j + 1][row].node) {
                    realAdd--;
                }
                else {
                    break;
                }
            }
            grid.insertColumn(column, realAdd);
        }
        // 节点高度大于网格宽度，则往当前网格的下边插入行
        if ((node.size[1] + nodeMinGap) > CELL_H) {
            var addGridSize = Math.ceil((node.size[1] + nodeMinGap) / CELL_H) - 1;
            var realAdd = addGridSize;
            for (var j = 0; j < addGridSize; j++) {
                var hasColumn = grid.additionRow.indexOf(row + j + 1) > -1;
                if (hasColumn && !grid.cells[column][row + j + 1].node) {
                    realAdd--;
                }
                else {
                    break;
                }
            }
            grid.insertRow(row, realAdd);
        }
    }
    // 同步节点坐标
    for (var i = 0; i < grid.columnNum; i++) {
        var _loop_1 = function (j) {
            var cell = grid.cells[i][j];
            if (cell.node) {
                var node = data.nodes.find(function (node) { var _a; return node.id === ((_a = cell === null || cell === void 0 ? void 0 : cell.node) === null || _a === void 0 ? void 0 : _a.id); });
                if (node) {
                    node.x = cell.x + node.size[0] / 2;
                    node.y = cell.y + node.size[1] / 2;
                }
            }
        };
        for (var j = 0; j < grid.rowNum; j++) {
            _loop_1(j);
        }
    }
}
exports.default = layout;
//# sourceMappingURL=forceGrid.js.map