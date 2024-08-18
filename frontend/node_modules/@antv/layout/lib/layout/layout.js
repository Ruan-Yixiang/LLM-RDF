"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layouts = exports.Layout = void 0;
var registy_1 = require("../registy");
var grid_1 = require("./grid");
var random_1 = require("./random");
var force2_1 = require("./force2");
var gForce_1 = require("./gForce");
var force_1 = require("./force");
var circular_1 = require("./circular");
var dagre_1 = require("./dagre");
var radial_1 = require("./radial");
var concentric_1 = require("./concentric");
var mds_1 = require("./mds");
var fruchterman_1 = require("./fruchterman");
var fruchterman_2 = require("./gpu/fruchterman");
var gForce_2 = require("./gpu/gForce");
var comboForce_1 = require("./comboForce");
var comboCombined_1 = require("./comboCombined");
var forceAtlas2_1 = require("./forceAtlas2");
var er_1 = require("./er");
var dagreCompound_1 = require("./dagreCompound");
var util_1 = require("../util");
var Layout = /** @class */ (function () {
    function Layout(options) {
        var layoutClass = (0, registy_1.getLayoutByName)(options.type);
        this.layoutInstance = new layoutClass(options);
    }
    Layout.prototype.layout = function (data) {
        return this.layoutInstance.layout(data);
    };
    Layout.prototype.updateCfg = function (cfg) {
        this.layoutInstance.updateCfg(cfg);
    };
    Layout.prototype.init = function (data) {
        this.correctLayers(data.nodes);
        this.layoutInstance.init(data);
    };
    /**
     * correcting the layers on the node data
     * if min(layer) <= 0, layers should begin from abs(min(layer)) + 1
     * @param nodes
     * @returns
     */
    Layout.prototype.correctLayers = function (nodes) {
        if (!(nodes === null || nodes === void 0 ? void 0 : nodes.length))
            return;
        var minLayer = Infinity;
        var hasLayerNodes = [];
        nodes.forEach(function (node) {
            if ((0, util_1.isString)(node.layer)) {
                node.layer = parseInt(node.layer, 10);
            }
            // keep node.layer === undefined for TS problem
            if (node.layer === undefined || isNaN(node.layer))
                return;
            hasLayerNodes.push(node);
            if (node.layer < minLayer)
                minLayer = node.layer;
        });
        if (minLayer <= 0) {
            var layerOffset_1 = Math.abs(minLayer) + 1;
            // @ts-ignore
            hasLayerNodes.forEach(function (node) { return node.layer += layerOffset_1; });
        }
    };
    Layout.prototype.execute = function () {
        this.layoutInstance.execute();
    };
    Layout.prototype.getDefaultCfg = function () {
        return this.layoutInstance.getDefaultCfg();
    };
    Layout.prototype.destroy = function () {
        return this.layoutInstance.destroy();
    };
    return Layout;
}());
exports.Layout = Layout;
// FIXME
// FOR G6
// tslint:disable-next-line
exports.Layouts = {
    force: force_1.ForceLayout,
    fruchterman: fruchterman_1.FruchtermanLayout,
    forceAtlas2: forceAtlas2_1.ForceAtlas2Layout,
    gForce: gForce_1.GForceLayout,
    force2: force2_1.Force2Layout,
    dagre: dagre_1.DagreLayout,
    dagreCompound: dagreCompound_1.DagreCompoundLayout,
    circular: circular_1.CircularLayout,
    radial: radial_1.RadialLayout,
    concentric: concentric_1.ConcentricLayout,
    grid: grid_1.GridLayout,
    mds: mds_1.MDSLayout,
    comboForce: comboForce_1.ComboForceLayout,
    comboCombined: comboCombined_1.ComboCombinedLayout,
    random: random_1.RandomLayout,
    'gForce-gpu': gForce_2.GForceGPULayout,
    'fruchterman-gpu': fruchterman_2.FruchtermanGPULayout,
    er: er_1.ERLayout,
};
//# sourceMappingURL=layout.js.map