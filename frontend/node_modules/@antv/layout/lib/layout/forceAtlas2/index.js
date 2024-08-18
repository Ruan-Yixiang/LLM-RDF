"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForceAtlas2Layout = void 0;
var base_1 = require("../base");
var util_1 = require("../../util");
var body_1 = __importDefault(require("./body"));
var quad_1 = __importDefault(require("./quad"));
var quadTree_1 = __importDefault(require("./quadTree"));
var ForceAtlas2Layout = /** @class */ (function (_super) {
    __extends(ForceAtlas2Layout, _super);
    function ForceAtlas2Layout(options) {
        var _this = _super.call(this) || this;
        /** 布局中心 */
        _this.center = [0, 0];
        /** 宽度 */
        _this.width = 300;
        /** 高度 */
        _this.height = 300;
        _this.nodes = [];
        _this.edges = [];
        /**
         * the parameter for repulsive forces,
         * it will scale the layout but won't change the layout
         * larger the kr, looser the layout
         * @type  {number}
         */
        _this.kr = 5;
        /**
         * the parameter for gravity forces
         * @type  {number}
         */
        _this.kg = 1;
        /**
         * modes:
         * 'normal' for normal using
         * 'linlog' for compact clusters.
         * @type  {string}
         */
        _this.mode = 'normal';
        /**
         * whether preventing the node overlapping
         * @type  {boolean}
         */
        _this.preventOverlap = false;
        /**
         * whether active the dissuade hub mode
         * true: grant authorities (nodes with a high indegree)
         * a more central position than hubs (nodes with a high outdegree)
         * @type  {boolean}
         */
        _this.dissuadeHubs = false;
        /**
         * whether active the barnes hut optimization on computing repulsive forces
         * @type  {boolean}
         */
        _this.barnesHut = undefined;
        /**
         * the max iteration number
         * @type  {number}
         */
        _this.maxIteration = 0;
        /**
         * control the global velocity
         * defualt: 0.1(gephi)
         * @type  {number}
         */
        _this.ks = 0.1;
        /**
         * the max global velocity
         * @type  {number}
         */
        _this.ksmax = 10;
        /**
         * the tolerance for the global swinging
         * @type  {number}
         */
        _this.tao = 0.1;
        /**
         * the function of layout complete listener, display the legend and minimap after layout
         * @type  {function}
         */
        _this.onLayoutEnd = function () { };
        /**
         * activate prune or not.
         * prune the leaves during most iterations, layout the leaves in the last 50 iteraitons.
         * if prune === '', it will be activated when the nodes number > 100
         * note that it will reduce the quality of the layout
         * @type  {boolean}
         */
        _this.prune = undefined;
        _this.updateCfg(options);
        return _this;
    }
    ForceAtlas2Layout.prototype.getDefaultCfg = function () {
        return {};
    };
    // execute the layout
    ForceAtlas2Layout.prototype.execute = function () {
        var self = this;
        var nodes = self.nodes, onLayoutEnd = self.onLayoutEnd, prune = self.prune;
        var maxIteration = self.maxIteration;
        if (!self.width && typeof window !== "undefined") {
            self.width = window.innerWidth;
        }
        if (!self.height && typeof window !== "undefined") {
            self.height = window.innerHeight;
        }
        // the whidth of each nodes
        var sizes = [];
        var nodeNum = nodes.length;
        for (var i = 0; i < nodeNum; i += 1) {
            var node = nodes[i];
            var nodeWidth = 10;
            var nodeHeight = 10;
            if ((0, util_1.isNumber)(node.size)) {
                nodeWidth = node.size;
                nodeHeight = node.size;
            }
            if ((0, util_1.isArray)(node.size)) {
                if (!isNaN(node.size[0]))
                    nodeWidth = node.size[0];
                if (!isNaN(node.size[1]))
                    nodeHeight = node.size[1];
            }
            else if ((0, util_1.isObject)(node.size)) {
                nodeWidth = node.size.width;
                nodeHeight = node.size.height;
            }
            if (self.getWidth && !isNaN(self.getWidth(node)))
                nodeHeight = self.getWidth(node);
            if (self.getHeight && !isNaN(self.getHeight(node)))
                nodeWidth = self.getHeight(node);
            var maxSize = Math.max(nodeWidth, nodeHeight);
            sizes.push(maxSize);
        }
        if (self.barnesHut === undefined && nodeNum > 250)
            self.barnesHut = true;
        if (self.prune === undefined && nodeNum > 100)
            self.prune = true;
        if (this.maxIteration === 0 && !self.prune) {
            maxIteration = 250;
            if (nodeNum <= 200 && nodeNum > 100)
                maxIteration = 1000;
            else if (nodeNum > 200)
                maxIteration = 1200;
            this.maxIteration = maxIteration;
        }
        else if (this.maxIteration === 0 && prune) {
            maxIteration = 100;
            if (nodeNum <= 200 && nodeNum > 100)
                maxIteration = 500;
            else if (nodeNum > 200)
                maxIteration = 950;
            this.maxIteration = maxIteration;
        }
        if (!self.kr) {
            self.kr = 50;
            if (nodeNum > 100 && nodeNum <= 500)
                self.kr = 20;
            else if (nodeNum > 500)
                self.kr = 1;
        }
        if (!self.kg) {
            self.kg = 20;
            if (nodeNum > 100 && nodeNum <= 500)
                self.kg = 10;
            else if (nodeNum > 500)
                self.kg = 1;
        }
        this.nodes = self.updateNodesByForces(sizes);
        onLayoutEnd();
    };
    ForceAtlas2Layout.prototype.updateNodesByForces = function (sizes) {
        var self = this;
        var edges = self.edges, maxIteration = self.maxIteration;
        var nodes = self.nodes;
        var nonLoopEdges = edges.filter(function (edge) {
            var source = (0, util_1.getEdgeTerminal)(edge, 'source');
            var target = (0, util_1.getEdgeTerminal)(edge, 'target');
            return source !== target;
        });
        var size = nodes.length;
        var esize = nonLoopEdges.length;
        var degrees = [];
        var idMap = {};
        var edgeEndsIdMap = {};
        // tslint:disable-next-line
        var Es = [];
        for (var i = 0; i < size; i += 1) {
            idMap[nodes[i].id] = i;
            degrees[i] = 0;
            if (nodes[i].x === undefined || isNaN(nodes[i].x)) {
                nodes[i].x = Math.random() * 1000;
            }
            if (nodes[i].y === undefined || isNaN(nodes[i].y)) {
                nodes[i].y = Math.random() * 1000;
            }
            Es.push({ x: nodes[i].x, y: nodes[i].y });
        }
        for (var i = 0; i < esize; i += 1) {
            var node1 = void 0;
            var node2 = void 0;
            var sIdx = 0;
            var tIdx = 0;
            for (var j = 0; j < size; j += 1) {
                var source = (0, util_1.getEdgeTerminal)(nonLoopEdges[i], 'source');
                var target = (0, util_1.getEdgeTerminal)(nonLoopEdges[i], 'target');
                if (nodes[j].id === source) {
                    node1 = nodes[j];
                    sIdx = j;
                }
                else if (nodes[j].id === target) {
                    node2 = nodes[j];
                    tIdx = j;
                }
                edgeEndsIdMap[i] = { sourceIdx: sIdx, targetIdx: tIdx };
            }
            if (node1)
                degrees[idMap[node1.id]] += 1;
            if (node2)
                degrees[idMap[node2.id]] += 1;
        }
        var iteration = maxIteration;
        nodes = this.iterate(iteration, idMap, edgeEndsIdMap, esize, degrees, sizes);
        // if prune, place the leaves around their parents, and then re-layout for several iterations.
        if (self.prune) {
            for (var j = 0; j < esize; j += 1) {
                if (degrees[edgeEndsIdMap[j].sourceIdx] <= 1) {
                    nodes[edgeEndsIdMap[j].sourceIdx].x = nodes[edgeEndsIdMap[j].targetIdx].x;
                    nodes[edgeEndsIdMap[j].sourceIdx].y = nodes[edgeEndsIdMap[j].targetIdx].y;
                }
                else if (degrees[edgeEndsIdMap[j].targetIdx] <= 1) {
                    nodes[edgeEndsIdMap[j].targetIdx].x = nodes[edgeEndsIdMap[j].sourceIdx].x;
                    nodes[edgeEndsIdMap[j].targetIdx].y = nodes[edgeEndsIdMap[j].sourceIdx].y;
                }
            }
            self.prune = false;
            self.barnesHut = false;
            iteration = 100;
            nodes = this.iterate(iteration, idMap, edgeEndsIdMap, esize, degrees, sizes);
        }
        return nodes;
    };
    ForceAtlas2Layout.prototype.iterate = function (iteration, idMap, edgeEndsIdMap, esize, degrees, sizes) {
        var self = this;
        var nodes = self.nodes;
        var kr = self.kr, preventOverlap = self.preventOverlap;
        var barnesHut = self.barnesHut;
        var nodeNum = nodes.length;
        var sg = 0;
        var krPrime = 100;
        var iter = iteration;
        var prevoIter = 50;
        var forces = [];
        var preForces = [];
        var bodies = [];
        for (var i = 0; i < nodeNum; i += 1) {
            forces[2 * i] = 0;
            forces[2 * i + 1] = 0;
            if (barnesHut) {
                var params = {
                    id: i,
                    rx: nodes[i].x,
                    ry: nodes[i].y,
                    mass: 1,
                    g: kr,
                    degree: degrees[i]
                };
                bodies[i] = new body_1.default(params);
            }
        }
        while (iter > 0) {
            for (var i = 0; i < nodeNum; i += 1) {
                preForces[2 * i] = forces[2 * i];
                preForces[2 * i + 1] = forces[2 * i + 1];
                forces[2 * i] = 0;
                forces[2 * i + 1] = 0;
            }
            // attractive forces, existing on every actual edge
            forces = this.getAttrForces(iter, prevoIter, esize, idMap, edgeEndsIdMap, degrees, sizes, forces);
            // repulsive forces and Gravity, existing on every node pair
            // if preventOverlap, using the no-optimized method in the last prevoIter instead.
            if (barnesHut && ((preventOverlap && iter > prevoIter) || !preventOverlap)) {
                forces = this.getOptRepGraForces(forces, bodies, degrees);
            }
            else {
                forces = this.getRepGraForces(iter, prevoIter, forces, krPrime, sizes, degrees);
            }
            // update the positions
            var res = this.updatePos(forces, preForces, sg, degrees);
            nodes = res.nodes;
            sg = res.sg;
            iter--;
            if (self.tick)
                self.tick();
        }
        return nodes;
    };
    ForceAtlas2Layout.prototype.getAttrForces = function (iter, prevoIter, esize, idMap, edgeEndsIdMap, degrees, sizes, forces) {
        var self = this;
        var nodes = self.nodes, preventOverlap = self.preventOverlap, dissuadeHubs = self.dissuadeHubs, mode = self.mode, prune = self.prune;
        for (var i = 0; i < esize; i += 1) {
            var sourceNode = nodes[edgeEndsIdMap[i].sourceIdx];
            var sourceIdx = edgeEndsIdMap[i].sourceIdx;
            var targetNode = nodes[edgeEndsIdMap[i].targetIdx];
            var targetIdx = edgeEndsIdMap[i].targetIdx;
            if (prune && (degrees[sourceIdx] <= 1 || degrees[targetIdx] <= 1))
                continue;
            var dir = [targetNode.x - sourceNode.x, targetNode.y - sourceNode.y];
            var eucliDis = Math.hypot(dir[0], dir[1]);
            eucliDis = eucliDis < 0.0001 ? 0.0001 : eucliDis;
            dir[0] = dir[0] / eucliDis;
            dir[1] = dir[1] / eucliDis;
            if (preventOverlap && iter < prevoIter)
                eucliDis = eucliDis - sizes[sourceIdx] - sizes[targetIdx];
            var Fa1 = eucliDis; // tslint:disable-line
            var Fa2 = Fa1; // tslint:disable-line
            if (mode === 'linlog') {
                Fa1 = Math.log(1 + eucliDis);
                Fa2 = Fa1;
            }
            if (dissuadeHubs) {
                Fa1 = eucliDis / degrees[sourceIdx];
                Fa2 = eucliDis / degrees[targetIdx];
            }
            if (preventOverlap && iter < prevoIter && eucliDis <= 0) {
                Fa1 = 0;
                Fa2 = 0;
            }
            else if (preventOverlap && iter < prevoIter && eucliDis > 0) {
                Fa1 = eucliDis;
                Fa2 = eucliDis;
            }
            forces[2 * idMap[sourceNode.id]] += Fa1 * dir[0];
            forces[2 * idMap[targetNode.id]] -= Fa2 * dir[0];
            forces[2 * idMap[sourceNode.id] + 1] += Fa1 * dir[1];
            forces[2 * idMap[targetNode.id] + 1] -= Fa2 * dir[1];
        }
        return forces;
    };
    ForceAtlas2Layout.prototype.getRepGraForces = function (iter, prevoIter, forces, krPrime, sizes, degrees) {
        var self = this;
        var nodes = self.nodes, preventOverlap = self.preventOverlap, kr = self.kr, kg = self.kg, center = self.center, prune = self.prune;
        var nodeNum = nodes.length;
        for (var i = 0; i < nodeNum; i += 1) {
            for (var j = i + 1; j < nodeNum; j += 1) {
                if (prune && (degrees[i] <= 1 || degrees[j] <= 1))
                    continue;
                var dir_1 = [nodes[j].x - nodes[i].x, nodes[j].y - nodes[i].y];
                var eucliDis_1 = Math.hypot(dir_1[0], dir_1[1]);
                eucliDis_1 = eucliDis_1 < 0.0001 ? 0.0001 : eucliDis_1;
                dir_1[0] = dir_1[0] / eucliDis_1;
                dir_1[1] = dir_1[1] / eucliDis_1;
                if (preventOverlap && iter < prevoIter)
                    eucliDis_1 = eucliDis_1 - sizes[i] - sizes[j];
                var Fr = kr * (degrees[i] + 1) * (degrees[j] + 1) / eucliDis_1; // tslint:disable-line
                if (preventOverlap && iter < prevoIter && eucliDis_1 < 0) {
                    Fr = krPrime * (degrees[i] + 1) * (degrees[j] + 1);
                }
                else if (preventOverlap && iter < prevoIter && eucliDis_1 === 0) {
                    Fr = 0;
                }
                else if (preventOverlap && iter < prevoIter && eucliDis_1 > 0) {
                    Fr = kr * (degrees[i] + 1) * (degrees[j] + 1) / eucliDis_1;
                }
                forces[2 * i] -= Fr * dir_1[0];
                forces[2 * j] += Fr * dir_1[0];
                forces[2 * i + 1] -= Fr * dir_1[1];
                forces[2 * j + 1] += Fr * dir_1[1];
            }
            // gravity
            var dir = [nodes[i].x - center[0], nodes[i].y - center[1]];
            var eucliDis = Math.hypot(dir[0], dir[1]);
            dir[0] = dir[0] / eucliDis;
            dir[1] = dir[1] / eucliDis;
            var Fg = kg * (degrees[i] + 1); // tslint:disable-line
            forces[2 * i] -= Fg * dir[0];
            forces[2 * i + 1] -= Fg * dir[1];
        }
        return forces;
    };
    ForceAtlas2Layout.prototype.getOptRepGraForces = function (forces, bodies, degrees) {
        var self = this;
        var nodes = self.nodes, kg = self.kg, center = self.center, prune = self.prune;
        var nodeNum = nodes.length;
        var minx = 9e10;
        var maxx = -9e10;
        var miny = 9e10;
        var maxy = -9e10;
        for (var i = 0; i < nodeNum; i += 1) {
            if (prune && (degrees[i] <= 1))
                continue;
            bodies[i].setPos(nodes[i].x, nodes[i].y);
            if (nodes[i].x >= maxx)
                maxx = nodes[i].x;
            if (nodes[i].x <= minx)
                minx = nodes[i].x;
            if (nodes[i].y >= maxy)
                maxy = nodes[i].y;
            if (nodes[i].y <= miny)
                miny = nodes[i].y;
        }
        var width = Math.max(maxx - minx, maxy - miny);
        var quadParams = {
            xmid: (maxx + minx) / 2,
            ymid: (maxy + miny) / 2,
            length: width,
            massCenter: center,
            mass: nodeNum
        };
        var quad = new quad_1.default(quadParams);
        var quadTree = new quadTree_1.default(quad);
        // build the tree, insert the nodes(quads) into the tree
        for (var i = 0; i < nodeNum; i += 1) {
            if (prune && (degrees[i] <= 1))
                continue;
            if (bodies[i].in(quad))
                quadTree.insert(bodies[i]);
        }
        // update the repulsive forces and the gravity.
        for (var i = 0; i < nodeNum; i += 1) {
            if (prune && (degrees[i] <= 1))
                continue;
            bodies[i].resetForce();
            quadTree.updateForce(bodies[i]);
            forces[2 * i] -= bodies[i].fx;
            forces[2 * i + 1] -= bodies[i].fy;
            // gravity
            var dir = [nodes[i].x - center[0], nodes[i].y - center[1]];
            var eucliDis = Math.hypot(dir[0], dir[1]);
            eucliDis = eucliDis < 0.0001 ? 0.0001 : eucliDis;
            dir[0] = dir[0] / eucliDis;
            dir[1] = dir[1] / eucliDis;
            var Fg = kg * (degrees[i] + 1); // tslint:disable-line
            forces[2 * i] -= Fg * dir[0];
            forces[2 * i + 1] -= Fg * dir[1];
        }
        return forces;
    };
    ForceAtlas2Layout.prototype.updatePos = function (forces, preForces, sg, degrees) {
        var self = this;
        var nodes = self.nodes, ks = self.ks, tao = self.tao, prune = self.prune, ksmax = self.ksmax;
        var nodeNum = nodes.length;
        var swgns = [];
        var trans = [];
        // swg(G) and tra(G)
        var swgG = 0;
        var traG = 0;
        for (var i = 0; i < nodeNum; i += 1) {
            if (prune && (degrees[i] <= 1))
                continue;
            var minus = [forces[2 * i] - preForces[2 * i],
                forces[2 * i + 1] - preForces[2 * i + 1]
            ];
            var minusNorm = Math.hypot(minus[0], minus[1]);
            var add = [forces[2 * i] + preForces[2 * i],
                forces[2 * i + 1] + preForces[2 * i + 1]
            ];
            var addNorm = Math.hypot(add[0], add[1]);
            swgns[i] = minusNorm;
            trans[i] = addNorm / 2;
            swgG += (degrees[i] + 1) * swgns[i];
            traG += (degrees[i] + 1) * trans[i];
        }
        var preSG = sg;
        sg = tao * traG / swgG; // tslint:disable-line
        if (preSG !== 0) {
            sg = sg > (1.5 * preSG) ? (1.5 * preSG) : sg; // tslint:disable-line
        }
        // update the node positions
        for (var i = 0; i < nodeNum; i += 1) {
            if (prune && (degrees[i] <= 1))
                continue;
            if ((0, util_1.isNumber)(nodes[i].fx) && (0, util_1.isNumber)(nodes[i].fy))
                continue;
            var sn = ks * sg / (1 + sg * Math.sqrt(swgns[i]));
            var absForce = Math.hypot(forces[2 * i], forces[2 * i + 1]);
            absForce = absForce < 0.0001 ? 0.0001 : absForce;
            var max = ksmax / absForce;
            sn = sn > max ? max : sn;
            var dnx = sn * forces[2 * i];
            var dny = sn * forces[2 * i + 1];
            nodes[i].x += dnx;
            nodes[i].y += dny;
        }
        return { nodes: nodes, sg: sg };
    };
    return ForceAtlas2Layout;
}(base_1.Base));
exports.ForceAtlas2Layout = ForceAtlas2Layout;
//# sourceMappingURL=index.js.map