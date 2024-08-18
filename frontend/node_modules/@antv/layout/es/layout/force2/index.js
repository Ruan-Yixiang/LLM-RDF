/**
 * @fileOverview fruchterman layout
 * @author shiwu.wyy@antfin.com
 */
import { Base } from '../base';
import { isNumber, isFunction, isArray, getDegreeMap, isObject, getEdgeTerminal, getAvgNodePosition, getCoreNodeAndRelativeLeafNodes, } from '../../util';
import { forceNBody } from './ForceNBody';
const proccessToFunc = (value, defaultV) => {
    let func;
    if (!value) {
        func = (d) => {
            return defaultV || 1;
        };
    }
    else if (isNumber(value)) {
        func = (d) => {
            return value;
        };
    }
    else {
        func = value;
    }
    return func;
};
/**
 * graphin 中的 force 布局
 */
export class Force2Layout extends Base {
    constructor(options) {
        super();
        /** 停止迭代的最大迭代数 */
        this.maxIteration = 1000;
        /** 是否启动 worker */
        this.workerEnabled = false;
        /** 弹簧引力系数 */
        this.edgeStrength = 200;
        /** 斥力系数 */
        this.nodeStrength = 1000;
        /** 库伦系数 */
        this.coulombDisScale = 0.005;
        /** 阻尼系数 */
        this.damping = 0.9;
        /** 最大速度 */
        this.maxSpeed = 500;
        /** 一次迭代的平均移动距离小于该值时停止迭代 */
        this.minMovement = 0.4;
        /** 迭代中衰减 */
        this.interval = 0.02;
        /** 斥力的一个系数 */
        this.factor = 1;
        /** 理想边长 */
        this.linkDistance = 200;
        /** 重力大小 */
        this.gravity = 0;
        /** 节点聚类作用力系数 */
        this.clusterNodeStrength = 20;
        /** 是否防止重叠 */
        this.preventOverlap = true;
        /** 阈值的使用条件，mean 代表平均移动距离小于 minMovement 时停止迭代，max 代表最大移动距离大时 minMovement 时停时迭代。默认为 mean */
        this.distanceThresholdMode = 'mean';
        /** 每次迭代结束的回调函数 */
        this.tick = () => { };
        this.nodes = [];
        this.edges = [];
        this.width = 300;
        this.height = 300;
        this.nodeMap = {};
        this.nodeIdxMap = {};
        this.judgingDistance = 0;
        /** 默认的向心配置 */
        this.centripetalOptions = {
            leaf: 2,
            single: 2,
            others: 1,
            // eslint-disable-next-line
            center: (n) => {
                return {
                    x: this.width / 2,
                    y: this.height / 2,
                };
            },
        };
        const { getMass } = options;
        this.propsGetMass = getMass;
        this.updateCfg(options);
    }
    getCentripetalOptions() {
        const { leafCluster, clustering, nodeClusterBy, nodes, nodeMap, clusterNodeStrength: propsClusterNodeStrength, } = this;
        const getClusterNodeStrength = (node) => typeof propsClusterNodeStrength === 'function'
            ? propsClusterNodeStrength(node)
            : propsClusterNodeStrength;
        let centripetalOptions = {};
        let sameTypeLeafMap;
        // 如果传入了需要叶子节点聚类
        if (leafCluster) {
            sameTypeLeafMap = this.getSameTypeLeafMap() || {};
            const relativeNodesType = Array.from(new Set(nodes === null || nodes === void 0 ? void 0 : nodes.map((node) => node[nodeClusterBy]))) || [];
            centripetalOptions = {
                single: 100,
                leaf: (node, nodes, edges) => {
                    // 找出与它关联的边的起点或终点出发的所有一度节点中同类型的叶子节点
                    const { relativeLeafNodes, sameTypeLeafNodes } = sameTypeLeafMap[node.id] || {};
                    // 如果都是同一类型或者每种类型只有1个，则施加默认向心力
                    if ((sameTypeLeafNodes === null || sameTypeLeafNodes === void 0 ? void 0 : sameTypeLeafNodes.length) === (relativeLeafNodes === null || relativeLeafNodes === void 0 ? void 0 : relativeLeafNodes.length) ||
                        (relativeNodesType === null || relativeNodesType === void 0 ? void 0 : relativeNodesType.length) === 1) {
                        return 1;
                    }
                    return getClusterNodeStrength(node);
                },
                others: 1,
                center: (node, nodes, edges) => {
                    var _a;
                    const { degree } = ((_a = node.data) === null || _a === void 0 ? void 0 : _a.layout) || {};
                    // 孤点默认给1个远离的中心点
                    if (!degree) {
                        return {
                            x: 100,
                            y: 100,
                        };
                    }
                    let centerNode;
                    if (degree === 1) {
                        // 如果为叶子节点
                        // 找出与它关联的边的起点出发的所有一度节点中同类型的叶子节点
                        const { sameTypeLeafNodes = [] } = sameTypeLeafMap[node.id] || {};
                        if (sameTypeLeafNodes.length === 1) {
                            // 如果同类型的叶子节点只有1个，中心节点置为undefined
                            centerNode = undefined;
                        }
                        else if (sameTypeLeafNodes.length > 1) {
                            // 找出同类型节点平均位置节点的距离最近的节点作为中心节点
                            centerNode = getAvgNodePosition(sameTypeLeafNodes);
                        }
                    }
                    else {
                        centerNode = undefined;
                    }
                    return {
                        x: centerNode === null || centerNode === void 0 ? void 0 : centerNode.x,
                        y: centerNode === null || centerNode === void 0 ? void 0 : centerNode.y,
                    };
                },
            };
        }
        // 如果传入了全局节点聚类
        if (clustering) {
            if (!sameTypeLeafMap)
                sameTypeLeafMap = this.getSameTypeLeafMap();
            const clusters = Array.from(new Set(nodes.map((node, i) => {
                return node[nodeClusterBy];
            }))).filter((item) => item !== undefined);
            const centerNodeInfo = {};
            clusters.forEach((cluster) => {
                const sameTypeNodes = nodes
                    .filter((item) => item[nodeClusterBy] === cluster)
                    .map((node) => nodeMap[node.id]);
                // 找出同类型节点平均位置节点的距离最近的节点作为中心节点
                centerNodeInfo[cluster] = getAvgNodePosition(sameTypeNodes);
            });
            centripetalOptions = {
                single: (node) => getClusterNodeStrength(node),
                leaf: (node) => getClusterNodeStrength(node),
                others: (node) => getClusterNodeStrength(node),
                center: (node, nodes, edges) => {
                    // 找出同类型节点平均位置节点的距离最近的节点作为中心节点
                    const centerNode = centerNodeInfo[node[nodeClusterBy]];
                    return {
                        x: centerNode === null || centerNode === void 0 ? void 0 : centerNode.x,
                        y: centerNode === null || centerNode === void 0 ? void 0 : centerNode.y,
                    };
                },
            };
        }
        this.centripetalOptions = Object.assign(Object.assign({}, this.centripetalOptions), centripetalOptions);
        const { leaf, single, others } = this.centripetalOptions;
        if (leaf && typeof leaf !== 'function')
            this.centripetalOptions.leaf = () => leaf;
        if (single && typeof single !== 'function')
            this.centripetalOptions.single = () => single;
        if (others && typeof others !== 'function')
            this.centripetalOptions.others = () => others;
    }
    updateCfg(cfg) {
        if (cfg)
            Object.assign(this, cfg);
    }
    getDefaultCfg() {
        return {
            maxIteration: 500,
            gravity: 10,
            enableTick: true,
            animate: true,
        };
    }
    /**
     * 执行布局
     */
    execute() {
        const self = this;
        self.stop();
        const { nodes, edges, defSpringLen } = self;
        self.judgingDistance = 0;
        if (!nodes || nodes.length === 0) {
            self.onLayoutEnd([]);
            return;
        }
        if (!self.width && typeof window !== 'undefined') {
            self.width = window.innerWidth;
        }
        if (!self.height && typeof window !== 'undefined') {
            self.height = window.innerHeight;
        }
        if (!self.center) {
            self.center = [self.width / 2, self.height / 2];
        }
        const center = self.center;
        if (nodes.length === 1) {
            nodes[0].x = center[0];
            nodes[0].y = center[1];
            self.onLayoutEnd([Object.assign({}, nodes[0])]);
            return;
        }
        self.degreesMap = getDegreeMap(nodes, edges);
        if (self.propsGetMass) {
            self.getMass = self.propsGetMass;
        }
        else {
            self.getMass = (d) => {
                let massWeight = 1;
                if (isNumber(d.mass))
                    massWeight = d.mass;
                const degree = self.degreesMap[d.id].all;
                return !degree || degree < 5 ? massWeight : degree * 5 * massWeight;
            };
        }
        // node size function
        const nodeSize = self.nodeSize;
        let nodeSizeFunc;
        if (self.preventOverlap) {
            const nodeSpacing = self.nodeSpacing;
            let nodeSpacingFunc;
            if (isNumber(nodeSpacing)) {
                nodeSpacingFunc = () => nodeSpacing;
            }
            else if (isFunction(nodeSpacing)) {
                nodeSpacingFunc = nodeSpacing;
            }
            else {
                nodeSpacingFunc = () => 0;
            }
            if (!nodeSize) {
                nodeSizeFunc = (d) => {
                    if (d.size) {
                        if (isArray(d.size)) {
                            return Math.max(d.size[0], d.size[1]) + nodeSpacingFunc(d);
                        }
                        else if (isObject(d.size)) {
                            return Math.max(d.size.width, d.size.height) + nodeSpacingFunc(d);
                        }
                        return d.size + nodeSpacingFunc(d);
                    }
                    return 10 + nodeSpacingFunc(d);
                };
            }
            else if (isArray(nodeSize)) {
                nodeSizeFunc = (d) => {
                    return Math.max(nodeSize[0], nodeSize[1]) + nodeSpacingFunc(d);
                };
            }
            else {
                nodeSizeFunc = (d) => nodeSize + nodeSpacingFunc(d);
            }
        }
        self.nodeSize = nodeSizeFunc;
        self.linkDistance = proccessToFunc(self.linkDistance, 1);
        self.nodeStrength = proccessToFunc(self.nodeStrength, 1);
        self.edgeStrength = proccessToFunc(self.edgeStrength, 1);
        const nodeMap = {};
        const nodeIdxMap = {};
        nodes.forEach((node, i) => {
            if (!isNumber(node.x))
                node.x = Math.random() * self.width;
            if (!isNumber(node.y))
                node.y = Math.random() * self.height;
            const degree = self.degreesMap[node.id];
            nodeMap[node.id] = Object.assign(Object.assign({}, node), { data: Object.assign(Object.assign({}, node.data), { size: self.nodeSize(node) || 30, layout: {
                        inDegree: degree.in,
                        outDegree: degree.out,
                        degree: degree.all,
                        tDegree: degree.in,
                        sDegree: degree.out,
                        force: {
                            mass: self.getMass(node),
                            nodeStrength: self.nodeStrength(node, edges),
                        },
                    } }) });
            nodeIdxMap[node.id] = i;
        });
        self.nodeMap = nodeMap;
        self.nodeIdxMap = nodeIdxMap;
        self.edgeInfos = [];
        edges === null || edges === void 0 ? void 0 : edges.forEach((edge) => {
            const sourceNode = nodeMap[edge.source];
            const targetNode = nodeMap[edge.target];
            if (!sourceNode || !targetNode) {
                elf.edgeInfos.push({});
            }
            else {
                self.edgeInfos.push({
                    edgeStrength: self.edgeStrength(edge),
                    linkDistance: defSpringLen
                        ? defSpringLen(Object.assign(Object.assign({}, edge), { source: sourceNode, target: targetNode }), sourceNode, targetNode)
                        : self.linkDistance(edge, sourceNode, targetNode) ||
                            1 + (nodeSize(sourceNode) + nodeSize(sourceNode) || 0) / 2,
                });
            }
        });
        this.getCentripetalOptions();
        self.onLayoutEnd = self.onLayoutEnd || (() => { });
        self.run();
    }
    run() {
        const self = this;
        const { maxIteration, nodes, edges, workerEnabled, minMovement, animate, nodeMap, height, } = self;
        self.currentMinY = 0;
        self.currentMaxY = height;
        if (!nodes)
            return;
        const velArray = [];
        nodes.forEach((_, i) => {
            velArray[2 * i] = 0;
            velArray[2 * i + 1] = 0;
        });
        if (this.defSideCoe && typeof this.defSideCoe === 'function') {
            const relatedEdges = {};
            edges.forEach((edge) => {
                const { source, target } = edge;
                relatedEdges[source] = relatedEdges[source] || [];
                relatedEdges[source].push(edge);
                relatedEdges[target] = relatedEdges[target] || [];
                relatedEdges[target].push(edge);
            });
            this.relatedEdges = relatedEdges;
        }
        const maxIter = maxIteration;
        const silence = !animate;
        if (workerEnabled || silence) {
            let usedIter = 0;
            for (let i = 0; (self.judgingDistance > minMovement || i < 1) && i < maxIter; i++) {
                usedIter = i;
                self.runOneStep(i, velArray);
            }
            self.onLayoutEnd(Object.values(nodeMap));
        }
        else {
            if (typeof window === 'undefined')
                return;
            let iter = 0;
            // interval for render the result after each iteration
            this.timeInterval = window.setInterval(() => {
                if (!nodes)
                    return;
                self.runOneStep(iter, velArray);
                iter++;
                if (iter >= maxIter || self.judgingDistance < minMovement) {
                    self.onLayoutEnd(Object.values(nodeMap));
                    window.clearInterval(self.timeInterval);
                }
            }, 0);
        }
    }
    runOneStep(iter, velArray) {
        var _a;
        const self = this;
        const { nodes, edges, nodeMap, monitor } = self;
        const accArray = [];
        if (!(nodes === null || nodes === void 0 ? void 0 : nodes.length))
            return;
        self.calRepulsive(accArray);
        if (edges)
            self.calAttractive(accArray);
        self.calGravity(accArray);
        self.attractToSide(accArray);
        const stepInterval = self.interval; // Math.max(0.02, self.interval - iter * 0.002);
        self.updateVelocity(accArray, velArray, stepInterval);
        self.updatePosition(velArray, stepInterval);
        (_a = self.tick) === null || _a === void 0 ? void 0 : _a.call(self);
        /** 如果需要监控信息，则提供给用户 */
        if (monitor) {
            const energy = this.calTotalEnergy(accArray);
            monitor({ energy, nodes, edges, iterations: iter });
        }
    }
    calTotalEnergy(accArray) {
        const { nodes, nodeMap } = this;
        if (!(nodes === null || nodes === void 0 ? void 0 : nodes.length))
            return 0;
        let energy = 0.0;
        nodes.forEach((node, i) => {
            const vx = accArray[2 * i];
            const vy = accArray[2 * i + 1];
            const speed2 = vx * vx + vy * vy;
            const { mass = 1 } = nodeMap[node.id].data.layout.force;
            energy += mass * speed2 * 0.5; // p = 1/2*(mv^2)
        });
        return energy;
    }
    // coulombs law
    calRepulsive(accArray) {
        const self = this;
        const { nodes, nodeMap, factor, coulombDisScale } = self;
        const nodeSize = self.nodeSize;
        forceNBody(nodes, nodeMap, factor, coulombDisScale * coulombDisScale, accArray);
    }
    // hooks law
    calAttractive(accArray) {
        const self = this;
        const { edges, nodeMap, nodeIdxMap, edgeInfos } = self;
        const nodeSize = self.nodeSize;
        edges.forEach((edge, i) => {
            const source = getEdgeTerminal(edge, 'source');
            const target = getEdgeTerminal(edge, 'target');
            const sourceNode = nodeMap[source];
            const targetNode = nodeMap[target];
            if (!sourceNode || !targetNode)
                return;
            let vecX = targetNode.x - sourceNode.x;
            let vecY = targetNode.y - sourceNode.y;
            if (!vecX && !vecY) {
                vecX = Math.random() * 0.01;
                vecY = Math.random() * 0.01;
            }
            const vecLength = Math.sqrt(vecX * vecX + vecY * vecY);
            const direX = vecX / vecLength;
            const direY = vecY / vecLength;
            // @ts-ignore
            const { linkDistance = 200, edgeStrength = 200 } = edgeInfos[i] || {};
            const diff = linkDistance - vecLength;
            const param = diff * edgeStrength;
            const massSource = sourceNode.data.layout.force.mass || 1;
            const massTarget = targetNode.data.layout.force.mass || 1;
            // 质量占比越大，对另一端影响程度越大
            const sourceMassRatio = 1 / massSource;
            const targetMassRatio = 1 / massTarget;
            const disX = direX * param;
            const disY = direY * param;
            const sourceIdx = 2 * nodeIdxMap[source];
            const targetIdx = 2 * nodeIdxMap[target];
            accArray[sourceIdx] -= disX * sourceMassRatio;
            accArray[sourceIdx + 1] -= disY * sourceMassRatio;
            accArray[targetIdx] += disX * targetMassRatio;
            accArray[targetIdx + 1] += disY * targetMassRatio;
        });
    }
    // attract to center
    calGravity(accArray) {
        var _a;
        const self = this;
        const { nodes, edges = [], nodeMap, width, height, center, gravity: defaultGravity, degreesMap, centripetalOptions, } = self;
        if (!nodes)
            return;
        const nodeLength = nodes.length;
        for (let i = 0; i < nodeLength; i++) {
            const idx = 2 * i;
            const node = nodeMap[nodes[i].id];
            const { mass = 1 } = node.data.layout.force;
            let vecX = 0;
            let vecY = 0;
            let gravity = defaultGravity;
            const { in: inDegree, out: outDegree, all: degree } = degreesMap[node.id];
            const forceCenter = (_a = self.getCenter) === null || _a === void 0 ? void 0 : _a.call(self, node, degree);
            if (forceCenter) {
                const [centerX, centerY, strength] = forceCenter;
                vecX = node.x - centerX;
                vecY = node.y - centerY;
                gravity = strength;
            }
            else {
                vecX = node.x - center[0];
                vecY = node.y - center[1];
            }
            if (gravity) {
                accArray[idx] -= (gravity * vecX) / mass;
                accArray[idx + 1] -= (gravity * vecY) / mass;
            }
            if (centripetalOptions) {
                const { leaf, single, others, center: centriCenter, } = centripetalOptions;
                const { x: centriX, y: centriY, centerStrength, } = (centriCenter === null || centriCenter === void 0 ? void 0 : centriCenter(node, nodes, edges, width, height)) || {
                    x: 0,
                    y: 0,
                    centerStrength: 0,
                };
                if (!isNumber(centriX) || !isNumber(centriY))
                    continue;
                const vx = (node.x - centriX) / mass;
                const vy = (node.y - centriY) / mass;
                if (centerStrength) {
                    accArray[idx] -= centerStrength * vx;
                    accArray[idx + 1] -= centerStrength * vy;
                }
                // 孤点
                if (degree === 0) {
                    const singleStrength = single(node);
                    if (!singleStrength)
                        continue;
                    accArray[idx] -= singleStrength * vx;
                    accArray[idx + 1] -= singleStrength * vy;
                    continue;
                }
                // 没有出度或没有入度，都认为是叶子节点
                if (inDegree === 0 || outDegree === 0) {
                    const leafStrength = leaf(node, nodes, edges);
                    if (!leafStrength)
                        continue;
                    accArray[idx] -= leafStrength * vx;
                    accArray[idx + 1] -= leafStrength * vy;
                    continue;
                }
                /** others */
                const othersStrength = others(node);
                if (!othersStrength)
                    continue;
                accArray[idx] -= othersStrength * vx;
                accArray[idx + 1] -= othersStrength * vy;
            }
        }
    }
    /**
     * Attract forces to the top and bottom.
     * @param accArray
     * @returns
     */
    attractToSide(accArray) {
        const { defSideCoe, height, nodes, relatedEdges, currentMinY = 0, currentMaxY = this.height, } = this;
        if (!defSideCoe || typeof defSideCoe !== 'function' || !(nodes === null || nodes === void 0 ? void 0 : nodes.length))
            return;
        nodes.forEach((node, i) => {
            const sideCoe = defSideCoe(node, relatedEdges[node.id] || []);
            if (sideCoe === 0)
                return;
            const targetY = sideCoe < 0 ? currentMinY : currentMaxY;
            const strength = Math.abs(sideCoe);
            accArray[2 * i + 1] -= strength * (node.y - targetY);
        });
    }
    updateVelocity(accArray, velArray, stepInterval) {
        const self = this;
        const { nodes, damping, maxSpeed } = self;
        if (!(nodes === null || nodes === void 0 ? void 0 : nodes.length))
            return;
        nodes.forEach((_, i) => {
            let vx = (velArray[2 * i] + accArray[2 * i] * stepInterval) * damping || 0.01;
            let vy = (velArray[2 * i + 1] + accArray[2 * i + 1] * stepInterval) * damping ||
                0.01;
            const vLength = Math.sqrt(vx * vx + vy * vy);
            if (vLength > maxSpeed) {
                const param2 = maxSpeed / vLength;
                vx = param2 * vx;
                vy = param2 * vy;
            }
            velArray[2 * i] = vx;
            velArray[2 * i + 1] = vy;
        });
    }
    updatePosition(velArray, stepInterval) {
        const self = this;
        const { nodes, distanceThresholdMode, nodeMap } = self;
        if (!(nodes === null || nodes === void 0 ? void 0 : nodes.length)) {
            this.judgingDistance = 0;
            return;
        }
        let sum = 0;
        if (distanceThresholdMode === 'max')
            self.judgingDistance = -Infinity;
        else if (distanceThresholdMode === 'min')
            self.judgingDistance = Infinity;
        let currentMinY = Infinity;
        let currentMaxY = -Infinity;
        nodes.forEach((node, i) => {
            const mappedNode = nodeMap[node.id];
            if (isNumber(node.fx) && isNumber(node.fy)) {
                node.x = node.fx;
                node.y = node.fy;
                mappedNode.x = node.x;
                mappedNode.y = node.y;
                return;
            }
            const distX = velArray[2 * i] * stepInterval;
            const distY = velArray[2 * i + 1] * stepInterval;
            node.x += distX;
            node.y += distY;
            mappedNode.x = node.x;
            mappedNode.y = node.y;
            if (node.y < currentMinY)
                currentMinY = node.y;
            if (node.y > currentMaxY)
                currentMaxY = node.y;
            const distanceMagnitude = Math.sqrt(distX * distX + distY * distY);
            switch (distanceThresholdMode) {
                case 'max':
                    if (self.judgingDistance < distanceMagnitude)
                        self.judgingDistance = distanceMagnitude;
                    break;
                case 'min':
                    if (self.judgingDistance > distanceMagnitude)
                        self.judgingDistance = distanceMagnitude;
                    break;
                default:
                    sum = sum + distanceMagnitude;
                    break;
            }
        });
        this.currentMinY = currentMinY;
        this.currentMaxY = currentMaxY;
        if (!distanceThresholdMode || distanceThresholdMode === 'mean')
            self.judgingDistance = sum / nodes.length;
    }
    stop() {
        if (this.timeInterval && typeof window !== 'undefined') {
            window.clearInterval(this.timeInterval);
        }
    }
    destroy() {
        const self = this;
        self.stop();
        self.tick = null;
        self.nodes = null;
        self.edges = null;
        self.destroyed = true;
    }
    getType() {
        return 'force2';
    }
    getSameTypeLeafMap() {
        const { nodeClusterBy, nodes, edges, nodeMap, degreesMap } = this;
        if (!(nodes === null || nodes === void 0 ? void 0 : nodes.length))
            return;
        // eslint-disable-next-line
        const sameTypeLeafMap = {};
        nodes.forEach((node, i) => {
            const degree = degreesMap[node.id].all;
            if (degree === 1) {
                sameTypeLeafMap[node.id] = getCoreNodeAndRelativeLeafNodes('leaf', node, edges, nodeClusterBy, degreesMap, nodeMap);
            }
        });
        return sameTypeLeafMap;
    }
}
//# sourceMappingURL=index.js.map