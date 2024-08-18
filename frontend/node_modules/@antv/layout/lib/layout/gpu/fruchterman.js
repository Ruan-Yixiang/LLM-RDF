"use strict";
// @ts-nocheck
/**
 * @fileOverview fruchterman layout
 * @author shiwu.wyy@antfin.com
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FruchtermanGPULayout = void 0;
var base_1 = require("../base");
var util_1 = require("../../util");
// @ts-ignore
var g_webgpu_1 = require("@antv/g-webgpu");
// compile at runtime in dev mode
var gpu_1 = require("../../util/gpu");
// use compiled bundle in prod mode
var fruchtermanShader_1 = require("./fruchtermanShader");
var constants_1 = require("../constants");
/**
 * fruchterman 布局
 */
var FruchtermanGPULayout = /** @class */ (function (_super) {
    __extends(FruchtermanGPULayout, _super);
    function FruchtermanGPULayout(options) {
        var _this = _super.call(this) || this;
        /** 停止迭代的最大迭代数 */
        _this.maxIteration = 1000;
        /** 重力大小，影响图的紧凑程度 */
        _this.gravity = 10;
        /** 速度 */
        _this.speed = 1;
        /** 是否产生聚类力 */
        _this.clustering = false;
        /** 根据哪个字段聚类 */
        _this.clusterField = "cluster";
        /** 聚类力大小 */
        _this.clusterGravity = 10;
        /** 是否启用web worker。前提是在web worker里执行布局，否则无效	*/
        _this.workerEnabled = false;
        _this.nodes = [];
        _this.edges = [];
        _this.width = 300;
        _this.height = 300;
        _this.nodeMap = {};
        _this.nodeIdxMap = {};
        _this.updateCfg(options);
        return _this;
    }
    FruchtermanGPULayout.prototype.getDefaultCfg = function () {
        return {
            maxIteration: 1000,
            gravity: 10,
            speed: 1,
            clustering: false,
            clusterGravity: 10
        };
    };
    /**
     * 执行布局
     */
    FruchtermanGPULayout.prototype.execute = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, nodes, center, nodeMap, nodeIdxMap;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        nodes = self.nodes;
                        if (!nodes || nodes.length === 0) {
                            if (self.onLayoutEnd)
                                self.onLayoutEnd();
                            return [2 /*return*/];
                        }
                        if (!self.width && typeof window !== "undefined") {
                            self.width = window.innerWidth;
                        }
                        if (!self.height && typeof window !== "undefined") {
                            self.height = window.innerHeight;
                        }
                        if (!self.center) {
                            self.center = [self.width / 2, self.height / 2];
                        }
                        center = self.center;
                        if (nodes.length === 1) {
                            nodes[0].x = center[0];
                            nodes[0].y = center[1];
                            if (self.onLayoutEnd)
                                self.onLayoutEnd();
                            return [2 /*return*/];
                        }
                        nodeMap = {};
                        nodeIdxMap = {};
                        nodes.forEach(function (node, i) {
                            if (!(0, util_1.isNumber)(node.x))
                                node.x = Math.random() * _this.width;
                            if (!(0, util_1.isNumber)(node.y))
                                node.y = Math.random() * _this.height;
                            nodeMap[node.id] = node;
                            nodeIdxMap[node.id] = i;
                        });
                        self.nodeMap = nodeMap;
                        self.nodeIdxMap = nodeIdxMap;
                        // layout
                        return [4 /*yield*/, self.run()];
                    case 1:
                        // layout
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FruchtermanGPULayout.prototype.executeWithWorker = function (canvas, ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var self, nodes, center, nodeMap, nodeIdxMap;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        nodes = self.nodes;
                        center = self.center;
                        if (!nodes || nodes.length === 0) {
                            return [2 /*return*/];
                        }
                        if (nodes.length === 1) {
                            nodes[0].x = center[0];
                            nodes[0].y = center[1];
                            return [2 /*return*/];
                        }
                        nodeMap = {};
                        nodeIdxMap = {};
                        nodes.forEach(function (node, i) {
                            if (!(0, util_1.isNumber)(node.x))
                                node.x = Math.random() * _this.width;
                            if (!(0, util_1.isNumber)(node.y))
                                node.y = Math.random() * _this.height;
                            nodeMap[node.id] = node;
                            nodeIdxMap[node.id] = i;
                        });
                        self.nodeMap = nodeMap;
                        self.nodeIdxMap = nodeIdxMap;
                        // layout
                        return [4 /*yield*/, self.run(canvas, ctx)];
                    case 1:
                        // layout
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FruchtermanGPULayout.prototype.run = function (canvas, ctx) {
        return __awaiter(this, void 0, void 0, function () {
            var self, nodes, edges, maxIteration, center, area, maxDisplace, k2, k, speed, clustering, _a, attributeArray, clusterCount, numParticles, _b, maxEdgePerVetex, nodesEdgesArray, workerEnabled, world, onLayoutEnd, clusterCenters, i, kernelFruchterman, kernelCluster, execute;
            var _this = this;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        self = this;
                        nodes = self.nodes;
                        edges = self.edges;
                        maxIteration = self.maxIteration;
                        center = self.center;
                        area = self.height * self.width;
                        maxDisplace = Math.sqrt(area) / 10;
                        k2 = area / (nodes.length + 1);
                        k = Math.sqrt(k2);
                        speed = self.speed;
                        clustering = self.clustering;
                        _a = (0, gpu_1.attributesToTextureData)([self.clusterField], nodes), attributeArray = _a.array, clusterCount = _a.count;
                        // pushing the fx and fy
                        nodes.forEach(function (node, i) {
                            var fx = 0;
                            var fy = 0;
                            if ((0, util_1.isNumber)(node.fx) && (0, util_1.isNumber)(node.fy)) {
                                fx = node.fx || 0.001;
                                fy = node.fy || 0.001;
                            }
                            attributeArray[4 * i + 1] = fx;
                            attributeArray[4 * i + 2] = fy;
                        });
                        numParticles = nodes.length;
                        _b = (0, gpu_1.buildTextureData)(nodes, edges), maxEdgePerVetex = _b.maxEdgePerVetex, nodesEdgesArray = _b.array;
                        workerEnabled = self.workerEnabled;
                        if (workerEnabled) {
                            world = g_webgpu_1.World.create({
                                canvas: canvas,
                                engineOptions: {
                                    supportCompute: true
                                }
                            });
                        }
                        else {
                            world = g_webgpu_1.World.create({
                                engineOptions: {
                                    supportCompute: true
                                }
                            });
                        }
                        onLayoutEnd = self.onLayoutEnd;
                        clusterCenters = [];
                        for (i = 0; i < clusterCount; i++) {
                            clusterCenters.push(0, 0, 0, 0);
                        }
                        kernelFruchterman = world
                            .createKernel(fruchtermanShader_1.fruchtermanBundle)
                            .setDispatch([numParticles, 1, 1])
                            .setBinding({
                            u_Data: nodesEdgesArray,
                            u_K: k,
                            u_K2: k2,
                            u_Gravity: self.gravity,
                            u_ClusterGravity: self.clusterGravity || self.gravity || 1,
                            u_Speed: speed,
                            u_MaxDisplace: maxDisplace,
                            u_Clustering: clustering ? 1 : 0,
                            u_Center: center,
                            u_AttributeArray: attributeArray,
                            u_ClusterCenters: clusterCenters,
                            MAX_EDGE_PER_VERTEX: maxEdgePerVetex,
                            VERTEX_COUNT: numParticles
                        });
                        if (clustering) {
                            kernelCluster = world
                                .createKernel(fruchtermanShader_1.clusterBundle)
                                .setDispatch([clusterCount, 1, 1])
                                .setBinding({
                                u_Data: nodesEdgesArray,
                                u_NodeAttributes: attributeArray,
                                u_ClusterCenters: clusterCenters,
                                VERTEX_COUNT: numParticles,
                                CLUSTER_COUNT: clusterCount
                            });
                        }
                        execute = function () { return __awaiter(_this, void 0, void 0, function () {
                            var i, finalParticleData;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        i = 0;
                                        _a.label = 1;
                                    case 1:
                                        if (!(i < maxIteration)) return [3 /*break*/, 6];
                                        // eslint-disable-next-line no-await-in-loop
                                        return [4 /*yield*/, kernelFruchterman.execute()];
                                    case 2:
                                        // eslint-disable-next-line no-await-in-loop
                                        _a.sent();
                                        if (!clustering) return [3 /*break*/, 4];
                                        kernelCluster.setBinding({
                                            u_Data: kernelFruchterman
                                        });
                                        // eslint-disable-next-line no-await-in-loop
                                        return [4 /*yield*/, kernelCluster.execute()];
                                    case 3:
                                        // eslint-disable-next-line no-await-in-loop
                                        _a.sent();
                                        kernelFruchterman.setBinding({
                                            u_ClusterCenters: kernelCluster
                                        });
                                        _a.label = 4;
                                    case 4:
                                        kernelFruchterman.setBinding({
                                            u_MaxDisplace: maxDisplace *= 0.99
                                        });
                                        _a.label = 5;
                                    case 5:
                                        i++;
                                        return [3 /*break*/, 1];
                                    case 6: return [4 /*yield*/, kernelFruchterman.getOutput()];
                                    case 7:
                                        finalParticleData = _a.sent();
                                        if (canvas) {
                                            // 传递数据给主线程
                                            ctx.postMessage({
                                                type: constants_1.LAYOUT_MESSAGE.GPUEND,
                                                vertexEdgeData: finalParticleData
                                                // edgeIndexBufferData,
                                            });
                                        }
                                        else {
                                            nodes.forEach(function (node, i) {
                                                var x = finalParticleData[4 * i];
                                                var y = finalParticleData[4 * i + 1];
                                                node.x = x;
                                                node.y = y;
                                            });
                                        }
                                        if (onLayoutEnd)
                                            onLayoutEnd();
                                        return [2 /*return*/];
                                }
                            });
                        }); };
                        return [4 /*yield*/, execute()];
                    case 1:
                        _c.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    FruchtermanGPULayout.prototype.getType = function () {
        return "fruchterman-gpu";
    };
    return FruchtermanGPULayout;
}(base_1.Base));
exports.FruchtermanGPULayout = FruchtermanGPULayout;
//# sourceMappingURL=fruchterman.js.map