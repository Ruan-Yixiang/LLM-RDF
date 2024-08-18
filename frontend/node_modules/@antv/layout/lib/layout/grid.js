"use strict";
/**
 * @fileOverview grid layout
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
exports.GridLayout = void 0;
var util_1 = require("../util");
var base_1 = require("./base");
/**
 * 网格布局
 */
var GridLayout = /** @class */ (function (_super) {
    __extends(GridLayout, _super);
    function GridLayout(options) {
        var _this = _super.call(this) || this;
        /** 布局起始点 */
        _this.begin = [0, 0];
        /** prevents node overlap, may overflow boundingBox if not enough space */
        _this.preventOverlap = true;
        /** extra spacing around nodes when preventOverlap: true */
        _this.preventOverlapPadding = 10;
        /** uses all available space on false, uses minimal space on true */
        _this.condense = false;
        /** a sorting function to order the nodes; e.g. function(a, b){ return a.datapublic ('weight') - b.data('weight') } */
        _this.sortBy = "degree";
        _this.nodes = [];
        _this.edges = [];
        _this.width = 300;
        _this.height = 300;
        _this.row = 0;
        _this.col = 0;
        _this.cellWidth = 0;
        _this.cellHeight = 0;
        _this.cellUsed = {};
        _this.id2manPos = {};
        /** 迭代结束的回调函数 */
        _this.onLayoutEnd = function () { };
        _this.updateCfg(options);
        return _this;
    }
    GridLayout.prototype.getDefaultCfg = function () {
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
    };
    /**
     * 执行布局
     */
    GridLayout.prototype.execute = function () {
        var self = this;
        var nodes = self.nodes, edges = self.edges, begin = self.begin;
        var n = nodes.length;
        if (n === 0) {
            if (self.onLayoutEnd)
                self.onLayoutEnd();
            return {
                nodes: nodes,
                edges: edges
            };
        }
        if (n === 1) {
            nodes[0].x = begin[0];
            nodes[0].y = begin[1];
            if (self.onLayoutEnd)
                self.onLayoutEnd();
            return {
                nodes: nodes,
                edges: edges,
            };
        }
        var sortBy = self.sortBy, width = self.width, height = self.height;
        var condense = self.condense, preventOverlapPadding = self.preventOverlapPadding, preventOverlap = self.preventOverlap, paramNodeSpacing = self.nodeSpacing, paramNodeSize = self.nodeSize;
        var layoutNodes = [];
        nodes.forEach(function (node) {
            layoutNodes.push(node);
        });
        var nodeIdxMap = {};
        layoutNodes.forEach(function (node, i) {
            nodeIdxMap[node.id] = i;
        });
        if (sortBy === "degree" ||
            !(0, util_1.isString)(sortBy) ||
            layoutNodes[0][sortBy] === undefined) {
            sortBy = "degree";
            if ((0, util_1.isNaN)(nodes[0].degree)) {
                var values_1 = (0, util_1.getDegree)(layoutNodes.length, nodeIdxMap, edges);
                layoutNodes.forEach(function (node, i) {
                    node.degree = values_1[i].all;
                });
            }
        }
        // sort nodes by value
        layoutNodes.sort(function (n1, n2) { return n2[sortBy] - n1[sortBy]; });
        if (!width && typeof window !== "undefined") {
            width = window.innerWidth;
        }
        if (!height && typeof window !== "undefined") {
            height = window.innerHeight;
        }
        var oRows = self.rows;
        var oCols = self.cols != null ? self.cols : self.columns;
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
            var sm = self.small();
            var lg = self.large();
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
                var sm = self.small();
                var lg = self.large();
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
            var nodeSpacing_1 = (0, util_1.getFuncByUnknownType)(10, paramNodeSpacing);
            var nodeSize_1 = (0, util_1.getFuncByUnknownType)(30, paramNodeSize, false);
            layoutNodes.forEach(function (node) {
                if (!node.x || !node.y) {
                    // for bb
                    node.x = 0;
                    node.y = 0;
                }
                var res = nodeSize_1(node) || 30;
                var nodeW;
                var nodeH;
                if ((0, util_1.isArray)(res)) {
                    nodeW = res[0];
                    nodeH = res[1];
                }
                else {
                    nodeW = res;
                    nodeH = res;
                }
                var p = nodeSpacing_1 !== undefined ? nodeSpacing_1(node) : preventOverlapPadding;
                var w = nodeW + p;
                var h = nodeH + p;
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
        for (var i = 0; i < layoutNodes.length; i++) {
            var node = layoutNodes[i];
            var rcPos = void 0;
            if (self.position) {
                rcPos = self.position(node);
            }
            if (rcPos && (rcPos.row !== undefined || rcPos.col !== undefined)) {
                // must have at least row or col def'd
                var pos = {
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
            edges: edges,
            nodes: layoutNodes
        };
    };
    GridLayout.prototype.small = function (val) {
        var self = this;
        var res;
        var rows = self.rows || 5;
        var cols = self.cols || 5;
        if (val == null) {
            res = Math.min(rows, cols);
        }
        else {
            var min = Math.min(rows, cols);
            if (min === self.rows) {
                self.rows = val;
            }
            else {
                self.cols = val;
            }
        }
        return res;
    };
    GridLayout.prototype.large = function (val) {
        var self = this;
        var res;
        var rows = self.rows || 5;
        var cols = self.cols || 5;
        if (val == null) {
            res = Math.max(rows, cols);
        }
        else {
            var max = Math.max(rows, cols);
            if (max === self.rows) {
                self.rows = val;
            }
            else {
                self.cols = val;
            }
        }
        return res;
    };
    GridLayout.prototype.used = function (row, col) {
        var self = this;
        return self.cellUsed["c-".concat(row, "-").concat(col)] || false;
    };
    GridLayout.prototype.use = function (row, col) {
        var self = this;
        self.cellUsed["c-".concat(row, "-").concat(col)] = true;
    };
    GridLayout.prototype.moveToNextCell = function () {
        var self = this;
        var cols = self.cols || 5;
        self.col++;
        if (self.col >= cols) {
            self.col = 0;
            self.row++;
        }
    };
    GridLayout.prototype.getPos = function (node) {
        var self = this;
        var begin = self.begin, cellWidth = self.cellWidth, cellHeight = self.cellHeight;
        var x;
        var y;
        // see if we have a manual position set
        var rcPos = self.id2manPos[node.id];
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
    };
    GridLayout.prototype.getType = function () {
        return "grid";
    };
    return GridLayout;
}(base_1.Base));
exports.GridLayout = GridLayout;
//# sourceMappingURL=grid.js.map