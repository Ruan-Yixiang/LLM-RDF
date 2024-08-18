export default class Grid {
    constructor() {
        this.cells = [];
        this.columnNum = 0;
        this.rowNum = 0;
        this.additionColumn = [];
        this.additionRow = [];
    }
    init(width, height, gridSize) {
        this.cells = [];
        this.CELL_W = gridSize.CELL_W || Grid.DEFAULT_CELL_W;
        this.CELL_H = gridSize.CELL_H || Grid.DEFAULT_CELL_H;
        this.columnNum = Math.ceil(width / this.CELL_W);
        this.rowNum = Math.ceil(height / this.CELL_H);
        Grid.MIN_DIST = Math.pow(width, 2) + Math.pow(height, 2);
        for (let i = 0; i < this.columnNum; i++) {
            const tmp = [];
            for (let j = 0; j < this.rowNum; j++) {
                const cell = {
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
    }
    findGridByNodeId(nodeId) {
        var _a, _b;
        for (let i = 0; i < this.columnNum; i++) {
            for (let j = 0; j < this.rowNum; j++) {
                if (this.cells[i][j].node) {
                    if (((_b = (_a = this.cells[i][j]) === null || _a === void 0 ? void 0 : _a.node) === null || _b === void 0 ? void 0 : _b.id) === nodeId) {
                        return { column: i, row: j };
                    }
                }
            }
        }
        return null;
    }
    sqdist(a, b) {
        return Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2);
    }
    occupyNearest(p) {
        let minDist = Grid.MIN_DIST;
        let d;
        let candidate = null;
        for (let i = 0; i < this.columnNum; i++) {
            for (let j = 0; j < this.rowNum; j++) {
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
    }
    insertColumn(columnIndex, length) {
        if (length <= 0)
            return;
        // 插入空列
        for (let i = 0; i < length; i++) {
            this.cells[i + this.columnNum] = [];
            for (let j = 0; j < this.rowNum; j++) {
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
        for (let i = (this.columnNum - 1); i > columnIndex; i--) {
            for (let j = 0; j < this.rowNum; j++) {
                this.cells[i + length][j] = Object.assign(Object.assign({}, this.cells[i][j]), { x: (i + length) * this.CELL_W, y: j * this.CELL_H });
                this.cells[i][j] = {
                    x: i * this.CELL_W,
                    y: j * this.CELL_H,
                    occupied: true,
                    node: null,
                };
            }
        }
        // 已有行列的处理
        for (let j = 0; j < this.additionColumn.length; j++) {
            if (this.additionColumn[j] >= columnIndex) {
                this.additionColumn[j] += length;
            }
        }
        // 记录新增的行列
        for (let i = 0; i < length; i++) {
            this.additionColumn.push(columnIndex + i + 1);
        }
        this.columnNum += length;
    }
    insertRow(rowIndex, length) {
        if (length <= 0)
            return;
        // 插入空行
        for (let j = 0; j < length; j++) {
            for (let i = 0; i < this.columnNum; i++) {
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
        for (let i = 0; i < this.columnNum; i++) {
            for (let j = (this.rowNum - 1); j > rowIndex; j--) {
                this.cells[i][j + length] = Object.assign(Object.assign({}, this.cells[i][j]), { dx: i, dy: j + length, x: i * this.CELL_W, y: (j + length) * this.CELL_H });
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
        for (let j = 0; j < this.additionRow.length; j++) {
            if (this.additionRow[j] >= rowIndex) {
                this.additionRow[j] += length;
            }
        }
        // 记录新增的行列
        for (let i = 0; i < length; i++) {
            this.additionRow.push(rowIndex + i + 1);
        }
        this.rowNum += length;
    }
    getNodes() {
        const nodes = [];
        for (let i = 0; i < this.columnNum; i++) {
            for (let j = 0; j < this.rowNum; j++) {
                if (this.cells[i][j].node) {
                    nodes.push(this.cells[i][j]);
                }
            }
        }
        return nodes;
    }
}
Grid.MIN_DIST = 50;
Grid.DEFAULT_CELL_W = 80;
Grid.DEFAULT_CELL_H = 80;
//# sourceMappingURL=grid.js.map