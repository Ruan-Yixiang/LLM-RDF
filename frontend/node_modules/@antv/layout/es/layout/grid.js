/**
 * @fileOverview grid layout
 * @author shiwu.wyy@antfin.com
 * this algorithm refers to <cytoscape.js> - https://github.com/cytoscape/cytoscape.js/
 */
import { isString, getDegree, isNaN, getFuncByUnknownType, isArray } from "../util";
import { Base } from "./base";
/**
 * 网格布局
 */
export class GridLayout extends Base {
    constructor(options) {
        super();
        /** 布局起始点 */
        this.begin = [0, 0];
        /** prevents node overlap, may overflow boundingBox if not enough space */
        this.preventOverlap = true;
        /** extra spacing around nodes when preventOverlap: true */
        this.preventOverlapPadding = 10;
        /** uses all available space on false, uses minimal space on true */
        this.condense = false;
        /** a sorting function to order the nodes; e.g. function(a, b){ return a.datapublic ('weight') - b.data('weight') } */
        this.sortBy = "degree";
        this.nodes = [];
        this.edges = [];
        this.width = 300;
        this.height = 300;
        this.row = 0;
        this.col = 0;
        this.cellWidth = 0;
        this.cellHeight = 0;
        this.cellUsed = {};
        this.id2manPos = {};
        /** 迭代结束的回调函数 */
        this.onLayoutEnd = () => { };
        this.updateCfg(options);
    }
    getDefaultCfg() {
        return {
            begin: [0, 0],
            preventOverlap: true,
            preventOverlapPadding: 10,
            condense: false,
            rows: undefined,
            cols: undefined,
            position: undefined,
            sortBy: "degree",
            nodeSize: 30
        };
    }
    /**
     * 执行布局
     */
    execute() {
        const self = this;
        const { nodes, edges, begin } = self;
        const n = nodes.length;
        if (n === 0) {
            if (self.onLayoutEnd)
                self.onLayoutEnd();
            return {
                nodes,
                edges
            };
        }
        if (n === 1) {
            nodes[0].x = begin[0];
            nodes[0].y = begin[1];
            if (self.onLayoutEnd)
                self.onLayoutEnd();
            return {
                nodes,
                edges,
            };
        }
        let { sortBy, width, height } = self;
        const { condense, preventOverlapPadding, preventOverlap, nodeSpacing: paramNodeSpacing, nodeSize: paramNodeSize } = self;
        const layoutNodes = [];
        nodes.forEach((node) => {
            layoutNodes.push(node);
        });
        const nodeIdxMap = {};
        layoutNodes.forEach((node, i) => {
            nodeIdxMap[node.id] = i;
        });
        if (sortBy === "degree" ||
            !isString(sortBy) ||
            layoutNodes[0][sortBy] === undefined) {
            sortBy = "degree";
            if (isNaN(nodes[0].degree)) {
                const values = getDegree(layoutNodes.length, nodeIdxMap, edges);
                layoutNodes.forEach((node, i) => {
                    node.degree = values[i].all;
                });
            }
        }
        // sort nodes by value
        layoutNodes.sort((n1, n2) => n2[sortBy] - n1[sortBy]);
        if (!width && typeof window !== "undefined") {
            width = window.innerWidth;
        }
        if (!height && typeof window !== "undefined") {
            height = window.innerHeight;
        }
        const oRows = self.rows;
        const oCols = self.cols != null ? self.cols : self.columns;
        self.cells = n;
        // if rows or columns were set in self, use those values
        if (oRows != null && oCols != null) {
            self.rows = oRows;
            self.cols = oCols;
        }
        else if (oRows != null && oCols == null) {
            self.rows = oRows;
            self.cols = Math.ceil(self.cells / self.rows);
        }
        else if (oRows == null && oCols != null) {
            self.cols = oCols;
            self.rows = Math.ceil(self.cells / self.cols);
        }
        else {
            // otherwise use the automatic values and adjust accordingly	      // otherwise use the automatic values and adjust accordingly
            // width/height * splits^2 = cells where splits is number of times to split width
            self.splits = Math.sqrt((self.cells * self.height) / self.width);
            self.rows = Math.round(self.splits);
            self.cols = Math.round((self.width / self.height) * self.splits);
        }
        self.rows = Math.max(self.rows, 1);
        self.cols = Math.max(self.cols, 1);
        if (self.cols * self.rows > self.cells) {
            // otherwise use the automatic values and adjust accordingly
            // if rounding was up, see if we can reduce rows or columns
            const sm = self.small();
            const lg = self.large();
            // reducing the small side takes away the most cells, so try it first
            if ((sm - 1) * lg >= self.cells) {
                self.small(sm - 1);
            }
            else if ((lg - 1) * sm >= self.cells) {
                self.large(lg - 1);
            }
        }
        else {
            // if rounding was too low, add rows or columns
            while (self.cols * self.rows < self.cells) {
                const sm = self.small();
                const lg = self.large();
                // try to add to larger side first (adds less in multiplication)
                if ((lg + 1) * sm >= self.cells) {
                    self.large(lg + 1);
                }
                else {
                    self.small(sm + 1);
                }
            }
        }
        self.cellWidth = width / self.cols;
        self.cellHeight = height / self.rows;
        if (condense) {
            self.cellWidth = 0;
            self.cellHeight = 0;
        }
        if (preventOverlap || paramNodeSpacing) {
            const nodeSpacing = getFuncByUnknownType(10, paramNodeSpacing);
            const nodeSize = getFuncByUnknownType(30, paramNodeSize, false);
            layoutNodes.forEach((node) => {
                if (!node.x || !node.y) {
                    // for bb
                    node.x = 0;
                    node.y = 0;
                }
                const res = nodeSize(node) || 30;
                let nodeW;
                let nodeH;
                if (isArray(res)) {
                    nodeW = res[0];
                    nodeH = res[1];
                }
                else {
                    nodeW = res;
                    nodeH = res;
                }
                const p = nodeSpacing !== undefined ? nodeSpacing(node) : preventOverlapPadding;
                const w = nodeW + p;
                const h = nodeH + p;
                self.cellWidth = Math.max(self.cellWidth, w);
                self.cellHeight = Math.max(self.cellHeight, h);
            });
        }
        self.cellUsed = {}; // e.g. 'c-0-2' => true
        // to keep track of current cell position
        self.row = 0;
        self.col = 0;
        // get a cache of all the manual positions
        self.id2manPos = {};
        for (let i = 0; i < layoutNodes.length; i++) {
            const node = layoutNodes[i];
            let rcPos;
            if (self.position) {
                rcPos = self.position(node);
            }
            if (rcPos && (rcPos.row !== undefined || rcPos.col !== undefined)) {
                // must have at least row or col def'd
                const pos = {
                    row: rcPos.row,
                    col: rcPos.col
                };
                if (pos.col === undefined) {
                    // find unused col
                    pos.col = 0;
                    while (self.used(pos.row, pos.col)) {
                        pos.col++;
                    }
                }
                else if (pos.row === undefined) {
                    // find unused row
                    pos.row = 0;
                    while (self.used(pos.row, pos.col)) {
                        pos.row++;
                    }
                }
                self.id2manPos[node.id] = pos;
                self.use(pos.row, pos.col);
            }
            self.getPos(node);
        }
        if (self.onLayoutEnd)
            self.onLayoutEnd();
        return {
            edges,
            nodes: layoutNodes
        };
    }
    small(val) {
        const self = this;
        let res;
        const rows = self.rows || 5;
        const cols = self.cols || 5;
        if (val == null) {
            res = Math.min(rows, cols);
        }
        else {
            const min = Math.min(rows, cols);
            if (min === self.rows) {
                self.rows = val;
            }
            else {
                self.cols = val;
            }
        }
        return res;
    }
    large(val) {
        const self = this;
        let res;
        const rows = self.rows || 5;
        const cols = self.cols || 5;
        if (val == null) {
            res = Math.max(rows, cols);
        }
        else {
            const max = Math.max(rows, cols);
            if (max === self.rows) {
                self.rows = val;
            }
            else {
                self.cols = val;
            }
        }
        return res;
    }
    used(row, col) {
        const self = this;
        return self.cellUsed[`c-${row}-${col}`] || false;
    }
    use(row, col) {
        const self = this;
        self.cellUsed[`c-${row}-${col}`] = true;
    }
    moveToNextCell() {
        const self = this;
        const cols = self.cols || 5;
        self.col++;
        if (self.col >= cols) {
            self.col = 0;
            self.row++;
        }
    }
    getPos(node) {
        const self = this;
        const { begin, cellWidth, cellHeight } = self;
        let x;
        let y;
        // see if we have a manual position set
        const rcPos = self.id2manPos[node.id];
        if (rcPos) {
            x = rcPos.col * cellWidth + cellWidth / 2 + begin[0];
            y = rcPos.row * cellHeight + cellHeight / 2 + begin[1];
        }
        else {
            // otherwise set automatically
            while (self.used(self.row, self.col)) {
                self.moveToNextCell();
            }
            x = self.col * cellWidth + cellWidth / 2 + begin[0];
            y = self.row * cellHeight + cellHeight / 2 + begin[1];
            self.use(self.row, self.col);
            self.moveToNextCell();
        }
        node.x = x;
        node.y = y;
    }
    getType() {
        return "grid";
    }
}
//# sourceMappingURL=grid.js.map