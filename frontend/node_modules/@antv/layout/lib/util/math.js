"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoreNodeAndRelativeLeafNodes = exports.getAvgNodePosition = exports.getLayoutBBox = exports.traverseTreeUp = exports.scaleMatrix = exports.getAdjMatrix = exports.floydWarshall = exports.getDegreeMap = exports.getDegree = exports.getEdgeTerminal = void 0;
var array_1 = require("./array");
var number_1 = require("./number");
var object_1 = require("./object");
var getEdgeTerminal = function (edge, type) {
    var terminal = edge[type];
    if ((0, object_1.isObject)(terminal)) {
        return terminal.cell;
    }
    return terminal;
};
exports.getEdgeTerminal = getEdgeTerminal;
var getDegree = function (n, nodeIdxMap, edges) {
    var degrees = [];
    for (var i = 0; i < n; i++) {
        degrees[i] = {
            in: 0,
            out: 0,
            all: 0
        };
    }
    if (!edges)
        return degrees;
    edges.forEach(function (e) {
        var source = (0, exports.getEdgeTerminal)(e, 'source');
        var target = (0, exports.getEdgeTerminal)(e, 'target');
        if (source && degrees[nodeIdxMap[source]]) {
            degrees[nodeIdxMap[source]].out += 1;
            degrees[nodeIdxMap[source]].all += 1;
        }
        if (target && degrees[nodeIdxMap[target]]) {
            degrees[nodeIdxMap[target]].in += 1;
            degrees[nodeIdxMap[target]].all += 1;
        }
    });
    return degrees;
};
exports.getDegree = getDegree;
var getDegreeMap = function (nodes, edges) {
    var degreesMap = {};
    nodes.forEach(function (node) {
        degreesMap[node.id] = {
            in: 0,
            out: 0,
            all: 0
        };
    });
    if (!edges)
        return degreesMap;
    edges.forEach(function (e) {
        var source = (0, exports.getEdgeTerminal)(e, 'source');
        var target = (0, exports.getEdgeTerminal)(e, 'target');
        if (source) {
            degreesMap[source].out += 1;
            degreesMap[source].all += 1;
        }
        if (target) {
            degreesMap[target].in += 1;
            degreesMap[target].all += 1;
        }
    });
    return degreesMap;
};
exports.getDegreeMap = getDegreeMap;
var floydWarshall = function (adjMatrix) {
    // initialize
    var dist = [];
    var size = adjMatrix.length;
    for (var i = 0; i < size; i += 1) {
        dist[i] = [];
        for (var j = 0; j < size; j += 1) {
            if (i === j) {
                dist[i][j] = 0;
            }
            else if (adjMatrix[i][j] === 0 || !adjMatrix[i][j]) {
                dist[i][j] = Infinity;
            }
            else {
                dist[i][j] = adjMatrix[i][j];
            }
        }
    }
    // floyd
    for (var k = 0; k < size; k += 1) {
        for (var i = 0; i < size; i += 1) {
            for (var j = 0; j < size; j += 1) {
                if (dist[i][j] > dist[i][k] + dist[k][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                }
            }
        }
    }
    return dist;
};
exports.floydWarshall = floydWarshall;
var getAdjMatrix = function (data, directed) {
    var nodes = data.nodes, edges = data.edges;
    var matrix = [];
    // map node with index in data.nodes
    var nodeMap = {};
    if (!nodes) {
        throw new Error('invalid nodes data!');
    }
    if (nodes) {
        nodes.forEach(function (node, i) {
            nodeMap[node.id] = i;
            var row = [];
            matrix.push(row);
        });
    }
    edges === null || edges === void 0 ? void 0 : edges.forEach(function (e) {
        var source = (0, exports.getEdgeTerminal)(e, 'source');
        var target = (0, exports.getEdgeTerminal)(e, 'target');
        var sIndex = nodeMap[source];
        var tIndex = nodeMap[target];
        if (sIndex === undefined || tIndex === undefined)
            return;
        matrix[sIndex][tIndex] = 1;
        if (!directed) {
            matrix[tIndex][sIndex] = 1;
        }
    });
    return matrix;
};
exports.getAdjMatrix = getAdjMatrix;
/**
 * scale matrix
 * @param matrix [ [], [], [] ]
 * @param ratio
 */
var scaleMatrix = function (matrix, ratio) {
    var result = [];
    matrix.forEach(function (row) {
        var newRow = [];
        row.forEach(function (v) {
            newRow.push(v * ratio);
        });
        result.push(newRow);
    });
    return result;
};
exports.scaleMatrix = scaleMatrix;
/**
 * depth first traverse, from leaves to root, children in inverse order
 *  if the fn returns false, terminate the traverse
 */
var traverseUp = function (data, fn) {
    if (data && data.children) {
        for (var i = data.children.length - 1; i >= 0; i--) {
            if (!traverseUp(data.children[i], fn))
                return;
        }
    }
    if (!fn(data)) {
        return false;
    }
    return true;
};
/**
 * depth first traverse, from leaves to root, children in inverse order
 * if the fn returns false, terminate the traverse
 */
var traverseTreeUp = function (data, fn) {
    if (typeof fn !== 'function') {
        return;
    }
    traverseUp(data, fn);
};
exports.traverseTreeUp = traverseTreeUp;
/**
 * calculate the bounding box for the nodes according to their x, y, and size
 * @param nodes nodes in the layout
 * @returns
 */
var getLayoutBBox = function (nodes) {
    var minX = Infinity;
    var minY = Infinity;
    var maxX = -Infinity;
    var maxY = -Infinity;
    nodes.forEach(function (node) {
        var size = node.size;
        if ((0, array_1.isArray)(size)) {
            if (size.length === 1)
                size = [size[0], size[0]];
        }
        else if ((0, number_1.isNumber)(size)) {
            size = [size, size];
        }
        else if (size === undefined || isNaN(size)) {
            size = [30, 30];
        }
        var halfSize = [size[0] / 2, size[1] / 2];
        var left = node.x - halfSize[0];
        var right = node.x + halfSize[0];
        var top = node.y - halfSize[1];
        var bottom = node.y + halfSize[1];
        if (minX > left)
            minX = left;
        if (minY > top)
            minY = top;
        if (maxX < right)
            maxX = right;
        if (maxY < bottom)
            maxY = bottom;
    });
    return { minX: minX, minY: minY, maxX: maxX, maxY: maxY };
};
exports.getLayoutBBox = getLayoutBBox;
/**
 * 获取节点集合的平均位置信息
 * @param nodes 节点集合
 * @returns 平局内置
 */
var getAvgNodePosition = function (nodes) {
    var totalNodes = { x: 0, y: 0 };
    nodes.forEach(function (node) {
        totalNodes.x += node.x || 0;
        totalNodes.y += node.y || 0;
    });
    // 获取均值向量
    var length = nodes.length || 1;
    return {
        x: totalNodes.x / length,
        y: totalNodes.y / length,
    };
};
exports.getAvgNodePosition = getAvgNodePosition;
// 找出指定节点关联的边的起点或终点
var getCoreNode = function (type, node, edges) {
    var _a, _b;
    if (type === 'source') {
        return (((_a = edges === null || edges === void 0 ? void 0 : edges.find(function (edge) { return edge.target === node.id; })) === null || _a === void 0 ? void 0 : _a.source) || {});
    }
    return (((_b = edges === null || edges === void 0 ? void 0 : edges.find(function (edge) { return edge.source === node.id; })) === null || _b === void 0 ? void 0 : _b.target) || {});
};
// 找出指定节点为起点或终点的所有一度叶子节点
var getRelativeNodeIds = function (type, coreNode, edges) {
    var relativeNodes = [];
    switch (type) {
        case 'source':
            relativeNodes = edges === null || edges === void 0 ? void 0 : edges.filter(function (edge) { return edge.source === coreNode.id; }).map(function (edge) { return edge.target; });
            break;
        case 'target':
            relativeNodes = edges === null || edges === void 0 ? void 0 : edges.filter(function (edge) { return edge.target === coreNode.id; }).map(function (edge) { return edge.source; });
            break;
        case 'both':
            relativeNodes = edges === null || edges === void 0 ? void 0 : edges.filter(function (edge) { return edge.source === coreNode.id; }).map(function (edge) { return edge.target; }).concat(edges === null || edges === void 0 ? void 0 : edges.filter(function (edge) { return edge.target === coreNode.id; }).map(function (edge) { return edge.source; }));
            break;
        default:
            break;
    }
    // 去重
    var set = new Set(relativeNodes);
    return Array.from(set);
};
// 找出同类型的节点
var getSameTypeNodes = function (type, nodeClusterBy, node, relativeNodes, degreesMap) {
    // @ts-ignore
    var typeName = node[nodeClusterBy] || '';
    // @ts-ignore
    var sameTypeNodes = (relativeNodes === null || relativeNodes === void 0 ? void 0 : relativeNodes.filter(function (item) { return item[nodeClusterBy] === typeName; })) || [];
    if (type === 'leaf') {
        sameTypeNodes = sameTypeNodes.filter(function (node) { var _a, _b; return ((_a = degreesMap[node.id]) === null || _a === void 0 ? void 0 : _a.in) === 0 || ((_b = degreesMap[node.id]) === null || _b === void 0 ? void 0 : _b.out) === 0; });
    }
    return sameTypeNodes;
};
// 找出与指定节点关联的边的起点或终点出发的所有一度叶子节点
var getCoreNodeAndRelativeLeafNodes = function (type, node, edges, nodeClusterBy, degreesMap, nodeMap) {
    var _a = degreesMap[node.id], inDegree = _a.in, outDegree = _a.out;
    var coreNode = node;
    var relativeLeafNodes = [];
    if (inDegree === 0) {
        // 如果为没有出边的叶子节点，则找出与它关联的边的起点出发的所有一度节点
        coreNode = getCoreNode('source', node, edges);
        relativeLeafNodes = getRelativeNodeIds('both', coreNode, edges).map(function (nodeId) { return nodeMap[nodeId]; });
    }
    else if (outDegree === 0) {
        // 如果为没有入边边的叶子节点，则找出与它关联的边的起点出发的所有一度节点
        coreNode = getCoreNode('target', node, edges);
        relativeLeafNodes = getRelativeNodeIds('both', coreNode, edges).map(function (nodeId) { return nodeMap[nodeId]; });
    }
    relativeLeafNodes = relativeLeafNodes.filter(function (node) { return degreesMap[node.id] && (degreesMap[node.id].in === 0 || degreesMap[node.id].out === 0); });
    var sameTypeLeafNodes = getSameTypeNodes(type, nodeClusterBy, node, relativeLeafNodes, degreesMap);
    return { coreNode: coreNode, relativeLeafNodes: relativeLeafNodes, sameTypeLeafNodes: sameTypeLeafNodes };
};
exports.getCoreNodeAndRelativeLeafNodes = getCoreNodeAndRelativeLeafNodes;
//# sourceMappingURL=math.js.map