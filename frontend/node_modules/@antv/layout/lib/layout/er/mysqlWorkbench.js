"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphWidth = 1200;
var graphHeight = 800;
var OVERLAP_QUOT = 10000000;
var MIN_DIST = 10;
var M_PI = 3.14159265358979323846;
var M_PI_2 = 1.57079632679489661923;
var PI_38 = M_PI * 0.375;
var PI_58 = M_PI * 0.625;
var nodeEdgeMap = new Map();
var CELL_W = 10;
var CELL_H = 10;
var T = 0.8;
var T_MIN = 0.1;
var R = 0.5;
function distanceToNode(node1, node2, isHoriz) {
    var x11 = node1.x - node1.size[0] / 2;
    var y11 = node1.y - node1.size[1] / 2;
    var x12 = node1.x + node1.size[0] / 2;
    var y12 = node1.y + node1.size[1] / 2;
    var x21 = node2.x - node2.size[0] / 2;
    var y21 = node2.y - node2.size[1] / 2;
    var x22 = node2.x + node2.size[0] / 2;
    var y22 = node2.y + node2.size[1] / 2;
    var cx1 = node1.x;
    var cy1 = node1.y;
    var cx2 = node2.x;
    var cy2 = node2.y;
    var dcx = cx2 - cx1;
    // 两个节点间的方位角  
    var qr = Math.atan2(dcx, (cy2 - cy1));
    var dx = 0;
    var dy = 0;
    var l1 = 0;
    var l2 = 0;
    if (qr > M_PI_2) {
        dy = y11 - y22;
        dx = x21 - x12;
        l1 = parseFloat(dy ? (dy / Math.cos(qr)).toFixed(2) : (dx).toFixed(2));
        l2 = parseFloat(dx ? (dx / Math.sin(qr)).toFixed(2) : (dy).toFixed(2));
    }
    else if (0.0 < qr && qr <= M_PI_2) {
        dy = y21 - y12;
        dx = x21 - x12;
        if (dy > dx) {
            l1 = l2 = parseFloat(dy ? (dy / Math.cos(qr)).toFixed(2) : (dx).toFixed(2));
        }
        else {
            l1 = l2 = parseFloat(dx ? (dx / Math.sin(qr)).toFixed(2) : (dy).toFixed(2));
        }
    }
    else if (qr < -M_PI_2) {
        dy = y11 - y22;
        dx = -(x22 - x11);
        if (dy > dx) {
            l1 = l2 = parseFloat(dy ? (dy / Math.cos(qr)).toFixed(2) : (dx).toFixed(2));
        }
        else {
            l1 = l2 = parseFloat(dx ? (dx / Math.sin(qr)).toFixed(2) : (dy).toFixed(2));
        }
    }
    else {
        dy = y21 - y12;
        if (Math.abs(dcx) > (x12 - x11) / 2) {
            dx = x11 - x22;
        }
        else {
            dx = dcx;
        }
        if (dy > dx) {
            l1 = l2 = parseFloat(dy ? (dy / Math.cos(qr)).toFixed(2) : (dx).toFixed(2));
        }
        else {
            l1 = l2 = parseFloat((dx && qr !== 0.0) ? (dx / Math.sin(qr)).toFixed(2) : (dy).toFixed(2));
        }
    }
    var aqr = parseFloat(qr.toFixed(2));
    // 判断是否水平，角度
    var newHoriz = isHoriz;
    if (isHoriz) {
        newHoriz = PI_38 < aqr && aqr < PI_58;
    }
    return {
        distance: Math.abs(l1 < l2 ? l1 : l2),
        isHoriz: newHoriz,
    };
}
function calcNodePair(nodeA, nodeB) {
    // 确定两个节点间是否存在连线
    var edges = nodeEdgeMap.get(nodeA.id) || [];
    var isLinked = edges.find(function (edge) {
        return edge.source === nodeB.id || edge.target === nodeB.id;
    });
    var areaA = nodeA.size[0] * nodeA.size[1];
    var areaB = nodeB.size[0] * nodeB.size[1];
    var node1 = areaA > areaB ? nodeB : nodeA;
    var node2 = areaA > areaB ? nodeA : nodeB;
    var x11 = node1.x - node1.size[0] / 2;
    var y11 = node1.y - node1.size[1] / 2;
    var x12 = node1.x + node1.size[0] / 2;
    var y12 = node1.y + node1.size[1] / 2;
    var x21 = node2.x - node2.size[0] / 2;
    var y21 = node2.y - node2.size[1] / 2;
    var x22 = node2.x + node2.size[0] / 2;
    var y22 = node2.y + node2.size[1] / 2;
    var cx1 = node1.x;
    var cy1 = node1.y;
    var cx2 = node2.x;
    var cy2 = node2.y;
    // Detect if nodes overlap  检查节点之间是否存在覆盖问题
    var isoverlap = ((x12 >= x21) && (x22 >= x11) && (y12 >= y21) && (y22 >= y11));
    var e = 0;
    var distance = 0;
    if (isoverlap) {
        distance = Math.sqrt(Math.pow((cx2 - cx1), 2) + Math.pow((cy2 - cy1), 2));
        // calc area of overlap 计算重复区域的坐标和面积
        var sx1 = x11 > x21 ? x11 : x21;
        var sy1 = y11 > y21 ? y11 : y21;
        var sx2 = x12 < x22 ? x12 : x22;
        var sy2 = y12 < y22 ? y12 : y22;
        var dsx = sx2 - sx1;
        var dsy = sy2 - sy1;
        var sov = dsx * dsy;
        if (distance === 0.0) {
            distance = 0.0000001;
        }
        e = MIN_DIST * 1 / distance * 100 + sov;
        e *= OVERLAP_QUOT;
    }
    else {
        var isHoriz = false;
        var res = distanceToNode(node1, node2, isHoriz);
        distance = res.distance;
        isHoriz = res.isHoriz;
        if (distance <= MIN_DIST) {
            if (distance !== 0) {
                if (isLinked) {
                    e += MIN_DIST + OVERLAP_QUOT * 1 / distance;
                }
                else {
                    e += MIN_DIST + OVERLAP_QUOT * MIN_DIST / distance;
                }
            }
            else {
                e += OVERLAP_QUOT;
            }
        }
        else {
            e += distance;
            if (isLinked) {
                e += distance * distance;
            }
        }
    }
    return e;
}
function calcEnergy(nodes) {
    var energy = 0;
    for (var i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if ((node.x < 0) || (node.y < 0) || (node.x > graphWidth) || (node.y > graphHeight)) {
            energy += 1000000000000;
        }
        for (var j = i + 1; j < nodes.length; j++) {
            energy += calcNodePair(node, nodes[j]);
        }
    }
    return energy;
}
function isCorrectPosition(node, newPosition, nodes, edges) {
    var nodeIdxMap = new Map();
    nodes.forEach(function (o, i) {
        nodeIdxMap.set(o.id, o);
    });
    var relateEdges = edges.filter(function (edge) { return edge.source === node.id || edge.target === node.id; }) || [];
    var relateNodes = [];
    relateEdges.forEach(function (edge) {
        var otherNodeId = edge.source === node.id ? edge.target : edge.source;
        var otherNode = nodeIdxMap.get(otherNodeId);
        if (otherNode) {
            relateNodes.push(otherNode);
        }
    });
    var flag = true;
    for (var i = 0; i < relateNodes.length; i++) {
        var item = relateNodes[i];
        // 判断条件调整，节点的坐标不需要完全一致。可以根据节点间的夹角来判断
        var delta = Math.atan((node.y - item.y) / (item.x - node.y)) * 180;
        var newDelta = Math.atan((newPosition.y - item.y) / (item.x - newPosition.y)) * 180;
        var isHor = delta < 30 || delta > 150;
        var newIsHor = newDelta < 30 || newDelta > 150;
        var isVer = delta > 70 && delta < 110;
        var newIsVer = newDelta > 70 && newDelta < 110;
        // 定义四个相似角度区间，0-15度，75-90度，90到105度，165到180度。
        if (isHor && !newIsHor || ((delta * newDelta) < 0)) {
            flag = false;
            break;
        }
        else if (isVer && !newIsVer || ((delta * newDelta) < 0)) {
            flag = false;
            break;
        }
        else if ((item.x - node.x) * (item.x - newPosition.x) < 0) {
            flag = false;
            break;
        }
        else if ((item.y - node.y) * (item.y - newPosition.y) < 0) {
            flag = false;
            break;
        }
    }
    return flag;
}
function shuffle(nodes, edges) {
    var foundSmallerEnergy = false;
    // 多次测试发现step为1时的效果最佳。
    var step = 1;
    var wstep = CELL_W * step;
    var hstep = CELL_H * step;
    var wsteps = [wstep, -wstep, 0, 0,];
    var hsteps = [0, 0, hstep, -hstep,];
    for (var i = 0; i < nodes.length; ++i) {
        var node = nodes[i];
        var nodeEnergy = calcNodeEnergy(node, nodes);
        for (var ns = 0; ns < wsteps.length; ns++) {
            // 判断新位置与其他连线节点的位置关系是否违规
            var flag = isCorrectPosition(node, { x: node.x + wsteps[ns], y: node.y + hsteps[ns] }, nodes, edges);
            if (flag) {
                // 节点朝上下左右四个方向移动，找到能量最小的那个位置
                node.x += wsteps[ns];
                node.y += hsteps[ns];
                // 计算移动后节点的能量
                var energy = calcNodeEnergy(node, nodes);
                var rdm = Math.random();
                if (energy < nodeEnergy) {
                    nodeEnergy = energy;
                    foundSmallerEnergy = true;
                }
                else if (rdm < T && rdm > T_MIN) {
                    nodeEnergy = energy;
                    foundSmallerEnergy = true;
                }
                else {
                    // 回归原位
                    node.x -= wsteps[ns];
                    node.y -= hsteps[ns];
                }
            }
        }
    }
    if (T > T_MIN) {
        T *= R;
    }
    // 重新计算图整体的能量
    if (foundSmallerEnergy) {
        return calcEnergy(nodes);
    }
    return 0;
}
// 计算节点的能量，
function calcNodeEnergy(node, nodes) {
    var e = 0.0;
    if ((node.x < 0) || (node.y < 0) ||
        (node.x + node.size[0] + 20 > graphWidth) ||
        (node.y + node.size[1] + 20 > graphHeight)) {
        e += 1000000000000.0;
    }
    for (var i = 0; i < nodes.length; ++i) {
        if (node.id !== nodes[i].id) {
            e += calcNodePair(node, nodes[i]);
        }
    }
    return e;
}
function layout(nodes, edges) {
    if (nodes.length === 0) {
        return { nodes: nodes, edges: edges };
    }
    nodes.forEach(function (node) {
        var relateEdge = edges.filter(function (edge) { return edge.source === node.id || edge.target === node.id; });
        nodeEdgeMap.set(node, relateEdge);
    });
    // 1. 初始化
    // 将node按照连接数进行排序
    nodes.sort(function (node1, node2) {
        var _a, _b;
        return ((_a = nodeEdgeMap.get(node1.id)) === null || _a === void 0 ? void 0 : _a.length) - ((_b = nodeEdgeMap.get(node2.id)) === null || _b === void 0 ? void 0 : _b.length);
    });
    // 2. 计算图能量
    var minEnergy = calcEnergy(nodes);
    var deSameCount = 20; // de=0 count
    var de = 1; // energy delta
    var prevEnergy = 0;
    // 定义总的迭代次数。超过就停掉，防止死循环
    var MAX_COUNT = 50;
    var count = 0;
    while (deSameCount > 0) {
        count++;
        if (count >= MAX_COUNT) {
            break;
        }
        var ea = shuffle(nodes, edges);
        if (ea !== 0) {
            prevEnergy = ea;
        }
        de = prevEnergy - minEnergy;
        minEnergy = prevEnergy;
        if (de === 0) {
            --deSameCount;
        }
        else {
            deSameCount = 20;
        }
    }
    nodes.forEach(function (node) {
        node.x = node.x - node.size[0] / 2;
        node.y = node.y - node.size[1] / 2;
    });
    return {
        nodes: nodes,
        edges: edges,
    };
}
exports.default = layout;
//# sourceMappingURL=mysqlWorkbench.js.map