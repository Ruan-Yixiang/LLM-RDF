"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.forceNBody = void 0;
var d3_quadtree_1 = require("d3-quadtree");
var theta2 = 0.81; // Barnes-Hut approximation threshold
var epsilon = 0.1; // 为了防止出现除0的情况，加一个epsilon
function forceNBody(nodes, nodeMap, factor, coulombDisScale2, accArray) {
    var weightParam = factor / coulombDisScale2;
    var data = nodes.map(function (n, i) {
        // @ts-ignore
        var mappedNode = nodeMap[n.id];
        // @ts-ignore
        var nodeData = mappedNode.data, x = mappedNode.x, y = mappedNode.y, size = mappedNode.size;
        var nodeStrength = nodeData.layout.force.nodeStrength;
        return {
            x: x,
            y: y,
            size: size,
            index: i,
            vx: 0,
            vy: 0,
            weight: weightParam * nodeStrength,
        };
    });
    var tree = (0, d3_quadtree_1.quadtree)(data, function (d) { return d.x; }, function (d) { return d.y; }).visitAfter(accumulate); // init internal node
    data.forEach(function (n) {
        // @ts-ignore
        computeForce(n, tree);
    });
    data.map(function (n, i) {
        // @ts-ignore
        var mappedNode = nodeMap[nodes[i].id];
        // @ts-ignore
        var _a = mappedNode.data.layout.force.mass, mass = _a === void 0 ? 1 : _a;
        // 从 0 开始，= 初始化 + 加斥力
        accArray[2 * i] = n.vx / mass;
        accArray[2 * i + 1] = n.vy / mass;
    });
    return accArray;
}
exports.forceNBody = forceNBody;
// @ts-ignore
function accumulate(quad) {
    var accWeight = 0;
    var accX = 0;
    var accY = 0;
    if (quad.length) {
        // internal node, accumulate 4 child quads
        for (var i = 0; i < 4; i++) {
            var q = quad[i];
            if (q && q.weight) {
                accWeight += q.weight;
                accX += q.x * q.weight;
                accY += q.y * q.weight;
            }
        }
        quad.x = accX / accWeight;
        quad.y = accY / accWeight;
        quad.weight = accWeight;
    }
    else {
        // leaf node
        var q = quad;
        quad.x = q.data.x;
        quad.y = q.data.y;
        quad.weight = q.data.weight;
    }
}
// @ts-ignore
var apply = function (quad, x1, y1, x2, y2, node) {
    var dx = (node.x - quad.x) || epsilon;
    var dy = (node.y - quad.y) || epsilon;
    var width = x2 - x1;
    var len2 = dx * dx + dy * dy;
    var len3 = Math.sqrt(len2) * len2;
    // far node, apply Barnes-Hut approximation
    if ((width * width) * theta2 < len2) {
        var param = quad.weight / len3;
        node.vx += dx * param;
        node.vy += dy * param;
        return true;
    }
    // near quad, compute force directly
    if (quad.length)
        return false; // internal node, visit children
    // leaf node
    if (quad.data !== node) {
        var param = quad.data.weight / len3;
        node.vx += dx * param;
        node.vy += dy * param;
    }
};
// @ts-ignore
function computeForce(node, tree) {
    // @ts-ignore
    tree.visit(function (quad, x1, y1, x2, y2) { return apply(quad, x1, y1, x2, y2, node); });
}
//# sourceMappingURL=ForceNBody.js.map