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
var util_1 = require("../util");
var enum_1 = require("./enum");
var util_2 = require("../util");
var toJSON_1 = require("./toJSON");
var defaultOption = {
    compound: false,
    multigraph: false,
    directed: true,
};
var Graph = /** @class */ (function () {
    function Graph(options) {
        var _this = this;
        if (options === void 0) { options = {}; }
        // Graph option or basic props
        this.directed = true;
        this.multigraph = false;
        this.compound = false;
        this.GRAPH_NODE = enum_1.GraphEnum.GRAPH_NODE;
        /**
         * @description Number of nodes in the graph
         * @description.zh-CN 节点的数量
         * @default 0
         */
        this.nodeCountNum = 0;
        /**
         * @description Number of edges in the graph
         * @description.zh-CN 节点的数量
         * @default 0
         */
        this.edgeCountNum = 0;
        /**
         * @description return node label with its id
         * @description.zh-CN 返回节点的默认的标签
         */
        this.defaultNodeLabelFn = function () { return undefined; };
        /**
         * @description return edge label with its id
         * @description.zh-CN 返回边的默认的标签
         */
        this.defaultEdgeLabelFn = function () { return undefined; };
        this.nodesLabelMap = new Map();
        /**
         * @description Map for edges
         * @description.zh-CN 边的映射
         */
        this.inEdgesMap = new Map();
        this.outEdgesMap = new Map();
        /**
         * @description Map for predecessors
         * @description.zh-CN 前驱节点的映射
         */
        this.predecessorsMap = new Map();
        /**
         * @description Map for successors
         * @description.zh-CN 后继节点的映射
         */
        this.successorsMap = new Map();
        /**
         * @description Map for edge object
         * @description.zh-CN 边的映射
         */
        this.edgesMap = new Map();
        /**
         * @description Map for edge label
         * @description.zh-CN 边的标签的映射
         */
        this.edgesLabelsMap = new Map();
        /**
         * @description Is the graph directed or not
         * @description.zh-CN 这个图是否是有向图
         * @default true
         */
        this.isDirected = function () { return _this.directed; };
        /**
         * @description Is this graph contains more than one graph data
         * @description.zh-CN 这个图是否包含多个图
         * @default false
         */
        this.isMultigraph = function () { return _this.multigraph; };
        /**
         * @description Is this graph a compound graph;
         * @description.zh-CN 这个图是否是复合图（包含嵌套节点的图）
         * @default false
         */
        this.isCompound = function () { return _this.compound; };
        /**
         * @description Set Graph label (Identity for graph)
         * @description.zh-CN 设置图的标识符
         * @param label
         * @returns
         */
        this.setGraph = function (label) {
            _this.label = label;
            return _this;
        };
        /**
         * @description Get Graph label (Identity for graph)
         * @description.zh-CN 获取图的标识符
         * @returns stirng | undefined
         */
        this.graph = function () { return _this.label; };
        /**
         * @description Set function that generate default label for node, if param is non-function value then default label will always be this value;
         * @description.zh-CN 设置默认获取节点Label的方法，如果传入不是函数的，那么默认label 的值只会是传入值
         * @param newDefault (node) => label | label
         * @returns this
         */
        this.setDefaultNodeLabel = function (newDefault) {
            if ((0, util_1.isFunction)(newDefault)) {
                _this.defaultNodeLabelFn = newDefault;
            }
            else {
                _this.defaultNodeLabelFn = function () { return newDefault; };
            }
            return _this;
        };
        /**
         * @description Count the nodes in graph
         * @description.zh-CN 计算图中所有节点的数量
         * @returns number
         */
        this.nodeCount = function () { return _this.nodeCountNum; };
        /**
         * @description get node label
         * @description.zh-CN 获取节点的标签
         */
        this.node = function (n) { return _this.nodesLabelMap.get(n); };
        /**
         * @description Return all nodes in graph
         * @description 返回图中所有节点
         * @returns
         */
        this.nodes = function () { return Array.from(_this.nodesLabelMap.keys()); };
        /**
         * @description Return all source nodes in graph
         * @description 返回图中所有源头节点（入度为0）
         * @returns
         */
        this.sources = function () { return _this.nodes().filter(function (n) { var _a; return !((_a = _this.inEdgesMap.get(n)) === null || _a === void 0 ? void 0 : _a.size); }); };
        /**
         * @description Return all sink nodes in graph
         * @description 返回图中所有终点节点（出度为0）
         * @returns
         */
        this.sinks = function () { return _this.nodes().filter(function (n) { var _a; return !((_a = _this.outEdgesMap.get(n)) === null || _a === void 0 ? void 0 : _a.size); }); };
        /**
         * @description Set nodes or add nodes in batch
         * @description.zh-CN 批量设置或者创建节点
         * @param nodes
         * @param value
         * @returns
         */
        this.setNodes = function (nodes, value) {
            nodes.map(function (node) { return _this.setNode(node, value); });
            return _this;
        };
        /**
         * @description Is the node in graph
         * @description.zh-CN 判断节点是否在图中
         * @param node
         * @returns
         */
        this.hasNode = function (node) { return _this.nodesLabelMap.has(node); };
        /**
         * @description if graph is not compound then throw error
         * @description.zh-CN 如果图不是复合图就报错
         */
        this.checkCompound = function () {
            if (!_this.isCompound()) {
                throw new Error('Cannot construct parent-children relations in a non-compound graph');
            }
        };
        /**
         * @description Find node's parent (compond graph only)
         * @description.zh-CN 寻找节点的父节点 (只有复合图可以使用)
         * @param node
         * @returns
         */
        this.parent = function (node) {
            var _a;
            if (_this.isCompound()) {
                var parent = (_a = _this.parentMap) === null || _a === void 0 ? void 0 : _a.get(node);
                if (parent !== _this.GRAPH_NODE) {
                    return parent;
                }
            }
        };
        /**
         * @description Remove node from its parent (compond graph only)
         * @description.zh-CN 将节点与其父节点之间的父子关系删除(只有复合图可以使用)
         * @param node
         */
        this.removeFromParentsChildList = function (node) {
            var targetParent = _this.parentMap.get(node);
            _this.childrenMap.get(targetParent).delete(node);
        };
        /**
         * @description Set node's parent(default is the graph) (compond graph only)
         * @description.zh-CN 设置节点的父节点，如果没有给定，父节点为这个图 (只有复合图可以使用)
         * @param node
         * @param parent
         * @returns
         */
        this.setParent = function (node, parent) {
            var _a, _b;
            _this.checkCompound();
            var realParent = parent === undefined ? _this.GRAPH_NODE : parent;
            var checkNode = _this.parent(realParent);
            while (checkNode) {
                if (node === checkNode) {
                    throw new Error('Setting ' + parent + ' as parent of ' + node + ' would create a cycle');
                }
                checkNode = _this.parent(checkNode);
            }
            if (parent) {
                _this.setNode(parent);
            }
            _this.setNode(node);
            _this.removeFromParentsChildList(node);
            (_a = _this.parentMap) === null || _a === void 0 ? void 0 : _a.set(node, realParent);
            var realParentChilren = _this.childrenMap.get(realParent);
            realParentChilren.set(node, true);
            (_b = _this.childrenMap) === null || _b === void 0 ? void 0 : _b.set(realParent, realParentChilren);
            return _this;
        };
        /**
         * @description get graph's or node's children
         * @description.zh-CN 获取图或者节点的字节点
         * @param node
         * @returns
         */
        this.children = function (node) {
            var _a;
            var targetNode = node === undefined ? _this.GRAPH_NODE : node;
            if (_this.isCompound()) {
                var target = (_a = _this.childrenMap) === null || _a === void 0 ? void 0 : _a.get(targetNode);
                if (target) {
                    return Array.from(target.keys());
                }
                return undefined;
            }
            if (targetNode === _this.GRAPH_NODE) {
                return _this.nodes();
            }
            if (node && _this.hasNode(node)) {
                return [];
            }
        };
        /**
         * @description get node's predecessors
         * @description.zh-CN 获取节点的所有上游节点
         * @param node
         * @returns
         */
        this.predecessors = function (node) {
            var preds = _this.predecessorsMap.get(node);
            return preds ? Array.from(preds.keys()) : undefined;
        };
        /**
         * @description get node's successors
         * @description.zh-CN 获取节点的所有下游节点
         * @param node
         * @returns
         */
        this.successors = function (node) {
            var succs = _this.successorsMap.get(node);
            return succs ? Array.from(succs.keys()) : undefined;
        };
        /**
         * @description get node's neighbors
         * @description.zh-CN 获取节点的所有邻居节点
         * @param node
         * @returns
         */
        this.neighbors = function (node) {
            var _a;
            if (!_this.hasNode(node)) {
                return undefined;
            }
            return Array.from(new Set((_a = _this.predecessors(node)) === null || _a === void 0 ? void 0 : _a.concat(_this.successors(node))));
        };
        /**
         * @description Is the node a leaf node
         * @description.zh-CN 判断节点是否为叶子节点
         * @param node
         * @returns
         */
        this.isLeaf = function (node) {
            var _a, _b;
            if (_this.isDirected()) {
                return !((_a = _this.successors(node)) === null || _a === void 0 ? void 0 : _a.length);
            }
            return !((_b = _this.neighbors(node)) === null || _b === void 0 ? void 0 : _b.length);
        };
        /**
         * @description Using node filter to create a new graph;
         * @description.zh-CN 过滤节点并创建一个新图
         * @param filter
         * @returns
         */
        this.filterNodes = function (filter) {
            var _a = _this, directed = _a.directed, multigraph = _a.multigraph, compound = _a.compound;
            var copyGraph = new Graph({
                directed: directed,
                multigraph: multigraph,
                compound: compound,
            });
            copyGraph.setGraph(_this.graph());
            _this.nodes().forEach(function (n) {
                if (filter(n)) {
                    copyGraph.setNode(n, _this.node(n));
                }
            });
            _this.edges().forEach(function (edgeObj) {
                if (copyGraph.hasNode(edgeObj.v) && copyGraph.hasNode(edgeObj.w)) {
                    copyGraph.setEdgeObj(edgeObj, _this.edge(edgeObj));
                }
            });
            if (compound) {
                var findParent_1 = function (node) {
                    var parent = _this.parent(node);
                    while (parent !== undefined && !copyGraph.hasNode(parent)) {
                        parent = _this.parent(parent);
                    }
                    return parent;
                };
                copyGraph.nodes().forEach(function (node) {
                    copyGraph.setParent(node, findParent_1(node));
                });
            }
            return copyGraph;
        };
        /**
         * @description Set function that generate default label for edge, if param is non-function value then default label will always be this value;
         * @description.zh-CN 设置默认获取边Label的方法，如果传入不是函数的，那么默认label 的值只会是传入值
         * @param newDefault
         * @returns
         */
        this.setDefaultEdgeLabel = function (newDefault) {
            if ((0, util_1.isFunction)(newDefault)) {
                _this.defaultEdgeLabelFn = newDefault;
            }
            else {
                _this.defaultEdgeLabelFn = function () { return newDefault; };
            }
            return _this;
        };
        /**
         * @description Count the edge in graph
         * @description.zh-CN 返回图中边的数量
         * @returns number
         */
        this.edgeCount = function () { return _this.edgeCountNum; };
        this.setEdgeObj = function (edgeObj, value) {
            return _this.setEdge(edgeObj.v, edgeObj.w, value, edgeObj.name);
        };
        /**
         * @description Add edge using a sorted node array ([a,b,c] => a->b b->c c->a)
         * @description.zh-CN 用一系列节点来定义一群边([a,b,c] => a->b b->c c->a)
         * @param edges
         * @param value
         * @returns
         */
        this.setPath = function (edges, value) {
            edges.reduce(function (v, w) {
                _this.setEdge(v, w, value);
                return w;
            });
            return _this;
        };
        /**
         * @description Get edge between two nodes
         * @description.zh-CN 获得两个节点中的一条边
         * @param v
         * @param w
         * @param name
         * @returns
         */
        this.edgeFromArgs = function (v, w, name) {
            return _this.edge({ v: v, w: w, name: name });
        };
        /**
         * @description Get edge between two nodes by edge object
         * @description.zh-CN 从edgeObj获得两个节点中的一条边
         * @param edgeObj
         * @returns
         */
        this.edge = function (edgeObj) {
            return _this.edgesLabelsMap.get((0, util_2.edgeObjToId)(_this.isDirected(), edgeObj));
        };
        /**
         * @description Does two nodes has a specific edge
         * @description.zh-CN 两个节点之间是否存在确定的一条边
         * @param v
         * @param w
         * @param name
         * @returns
         */
        this.hasEdge = function (v, w, name) {
            return _this.edgesLabelsMap.has((0, util_2.edgeObjToId)(_this.isDirected(), { v: v, w: w, name: name }));
        };
        /**
         * @description remove a specific edge by edge object
         * @description.zh-CN 删除一条边
         */
        this.removeEdgeObj = function (_a) {
            var v = _a.v, w = _a.w, name = _a.name;
            return _this.removeEdge(v, w, name);
        };
        /**
         * @description get all edges object in graph
         * @description.zh-CN 获得图中所有的边对象
         */
        this.edges = function () { return Array.from(_this.edgesMap.values()); };
        /**
         * @description get edges that target at the node (could be from certain node)
         * @description.zh-CN 获取所有指向节点的边，可以指定来源节点
         * @param v
         * @param u
         * @returns
         */
        this.inEdges = function (v, u) {
            var inV = _this.inEdgesMap.get(v);
            if (inV) {
                return Array.from(inV.values()).filter(function (e) { return !u || e.v === u; });
            }
            return undefined;
        };
        /**
         * @description get edges that from the node (could target at certain node)
         * @description.zh-CN 获取所有来源于节点的边，可以指定目标节点
         * @param w
         * @param u
         * @returns
         */
        this.outEdges = function (w, u) {
            var outW = _this.outEdgesMap.get(w);
            if (outW) {
                return Array.from(outW.values()).filter(function (e) { return !u || e.w === u; });
            }
            return undefined;
        };
        /**
         * @description get edges between two nodes
         * @description.zh-CN 获取两个节点间所有的节点
         * @param w
         * @param u
         * @returns
         */
        this.nodeEdges = function (v, w) {
            var _a;
            if (!_this.hasNode(v)) {
                return undefined;
            }
            return (_a = _this.inEdges(v, w)) === null || _a === void 0 ? void 0 : _a.concat(_this.outEdges(v, w));
        };
        this.toJSON = function () { return (0, toJSON_1.write)(_this); };
        // ver 2 function
        /**
         * @description Count the in edges of node
         * @description.zh-CN 计算节点的入边的数量
         */
        this.nodeInDegree = function (node) {
            var inEdges = _this.inEdgesMap.get(node);
            if (inEdges) {
                return inEdges.size;
            }
            return 0;
        };
        /**
         * @description Count the out edges of node
         * @description.zh-CN 计算节点的出边的数量
         */
        this.nodeOutDegree = function (node) {
            var outEdges = _this.outEdgesMap.get(node);
            if (outEdges) {
                return outEdges.size;
            }
            return 0;
        };
        /**
         * @description Count the total edges of node
         * @description.zh-CN 计算节点的所有边的数量
         */
        this.nodeDegree = function (node) {
            return _this.nodeInDegree(node) + _this.nodeOutDegree(node);
        };
        /**
         * @description Get the source of edge
         * @description.zh-CN 获取边的源节点
         */
        this.source = function (edge) { return edge.v; };
        /**
         * @description Get the target of edge
         * @description.zh-CN 获取边的目标节点
         */
        this.target = function (edge) { return edge.w; };
        var resultOptions = __assign(__assign({}, defaultOption), options);
        this.compound = resultOptions.compound;
        this.directed = resultOptions.directed;
        this.multigraph = resultOptions.multigraph;
        if (this.compound) {
            this.parentMap = new Map();
            this.childrenMap = new Map();
        }
    }
    /**
     * @description Set Node label in graph if node not in graph then create it
     * @description.zh-CN 设置节点的label，如果这个节点不在图中，则在图中创建这个节点
     * @param node
     * @param value
     * @returns
     */
    Graph.prototype.setNode = function (node, value) {
        var _a;
        var _b = this, nodesLabelMap = _b.nodesLabelMap, defaultNodeLabelFn = _b.defaultNodeLabelFn, isCompound = _b.isCompound, parentMap = _b.parentMap, childrenMap = _b.childrenMap, inEdgesMap = _b.inEdgesMap, outEdgesMap = _b.outEdgesMap, predecessorsMap = _b.predecessorsMap, successorsMap = _b.successorsMap;
        // 如果节点不在图中，则创建节点
        if (nodesLabelMap.has(node)) {
            if (value !== undefined) {
                nodesLabelMap.set(node, value);
            }
            return this;
        }
        nodesLabelMap.set(node, value || defaultNodeLabelFn(node));
        // 如果是复合图，则创建节点的子节点
        if (isCompound()) {
            parentMap === null || parentMap === void 0 ? void 0 : parentMap.set(node, this.GRAPH_NODE);
            childrenMap === null || childrenMap === void 0 ? void 0 : childrenMap.set(node, new Map());
            if (!(childrenMap === null || childrenMap === void 0 ? void 0 : childrenMap.has(this.GRAPH_NODE))) {
                childrenMap === null || childrenMap === void 0 ? void 0 : childrenMap.set(this.GRAPH_NODE, new Map());
            }
            (_a = childrenMap === null || childrenMap === void 0 ? void 0 : childrenMap.get(this.GRAPH_NODE)) === null || _a === void 0 ? void 0 : _a.set(node, true);
        }
        [inEdgesMap, outEdgesMap, predecessorsMap, successorsMap].forEach(function (map) {
            return map.set(node, new Map());
        });
        this.nodeCountNum += 1;
        return this;
    };
    /**
     * @description Remove node from graph
     * @description.zh-CN 将节点从图中移除
     * @param node
     * @returns
     */
    Graph.prototype.removeNode = function (node) {
        var _this = this;
        var _a, _b, _c;
        if (this.hasNode(node)) {
            var cleanEdge_1 = function (edgeObj) {
                _this.removeEdge(edgeObj.v, edgeObj.w, edgeObj.name);
            };
            var _d = this, inEdgesMap = _d.inEdgesMap, outEdgesMap = _d.outEdgesMap, predecessorsMap = _d.predecessorsMap, successorsMap = _d.successorsMap, nodesLabelMap = _d.nodesLabelMap;
            if (this.isCompound()) {
                this.removeFromParentsChildList(node);
                (_a = this.parentMap) === null || _a === void 0 ? void 0 : _a.delete(node);
                (_b = this.children(node)) === null || _b === void 0 ? void 0 : _b.forEach(function (n) { return _this.setParent(n); });
                (_c = this.childrenMap) === null || _c === void 0 ? void 0 : _c.delete(node);
            }
            var inE = inEdgesMap.get(node);
            var outE = outEdgesMap.get(node);
            Array.from(inE.values()).forEach(function (edge) { return cleanEdge_1(edge); });
            Array.from(outE.values()).forEach(function (edge) { return cleanEdge_1(edge); });
            nodesLabelMap.delete(node);
            inEdgesMap.delete(node);
            outEdgesMap.delete(node);
            predecessorsMap.delete(node);
            successorsMap.delete(node);
            this.nodeCountNum -= 1;
        }
        return this;
    };
    /**
     * @description set edge value, if nodes or edges not exsit then add to graph
     * @description.zh-CN 设置边的属性，如果边或节点不存在，那么将他们加入这个图
     * @param v
     * @param w
     * @param value
     * @param name
     * @returns
     */
    Graph.prototype.setEdge = function (v_, w_, value, name) {
        var _a, _b;
        var edgeObj = (0, util_2.edgeArgsToObj)(this.isDirected(), v_, w_, name);
        var edgeId = (0, util_2.edgeObjToId)(this.isDirected(), edgeObj);
        var v = edgeObj.v, w = edgeObj.w;
        if (this.edgesLabelsMap.has(edgeId)) {
            this.edgesLabelsMap.set(edgeId, value);
            return this;
        }
        if (name !== undefined && !this.isMultigraph()) {
            throw new Error('Cannot set a named edge when isMultigraph = false');
        }
        this.setNode(v);
        this.setNode(w);
        this.edgesLabelsMap.set(edgeId, value || this.defaultEdgeLabelFn(v, w, name));
        Object.freeze(edgeObj);
        this.edgesMap.set(edgeId, edgeObj);
        var preds = this.predecessorsMap.get(w);
        var succs = this.successorsMap.get(v);
        (0, util_2.incrementOrInitEntry)(preds, v);
        (0, util_2.incrementOrInitEntry)(succs, w);
        (_a = this.inEdgesMap.get(w)) === null || _a === void 0 ? void 0 : _a.set(edgeId, edgeObj);
        (_b = this.outEdgesMap.get(v)) === null || _b === void 0 ? void 0 : _b.set(edgeId, edgeObj);
        this.edgeCountNum += 1;
        return this;
    };
    /**
     * @description remove a specific edge
     * @description.zh-CN 删除一条边
     * @param v
     * @param w
     * @param name
     * @returns
     */
    Graph.prototype.removeEdge = function (v_, w_, name) {
        var edgeId = (0, util_1.edgeArgsToId)(this.isDirected(), v_, w_, name);
        var edgeObj = this.edgesMap.get(edgeId);
        if (edgeObj) {
            var _a = (0, util_2.edgeArgsToObj)(this.isDirected(), v_, w_, name), v = _a.v, w = _a.w;
            this.edgesLabelsMap.delete(edgeId);
            this.edgesMap.delete(edgeId);
            var preds = this.predecessorsMap.get(w);
            var succs = this.successorsMap.get(v);
            (0, util_2.decrementOrRemoveEntry)(preds, v);
            (0, util_2.decrementOrRemoveEntry)(succs, w);
            this.inEdgesMap.get(w).delete(edgeId);
            this.outEdgesMap.get(v).delete(edgeId);
            this.edgeCountNum -= 1;
        }
        return this;
    };
    Graph.fromJSON = toJSON_1.read;
    return Graph;
}());
exports.default = Graph;
