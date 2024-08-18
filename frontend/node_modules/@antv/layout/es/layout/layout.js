import { getLayoutByName } from "../registy";
import { GridLayout } from "./grid";
import { RandomLayout } from "./random";
import { Force2Layout } from "./force2";
import { GForceLayout } from "./gForce";
import { ForceLayout } from "./force";
import { CircularLayout } from "./circular";
import { DagreLayout } from "./dagre";
import { RadialLayout } from "./radial";
import { ConcentricLayout } from "./concentric";
import { MDSLayout } from "./mds";
import { FruchtermanLayout } from "./fruchterman";
import { FruchtermanGPULayout } from "./gpu/fruchterman";
import { GForceGPULayout } from "./gpu/gForce";
import { ComboForceLayout } from "./comboForce";
import { ComboCombinedLayout } from "./comboCombined";
import { ForceAtlas2Layout } from "./forceAtlas2";
import { ERLayout } from "./er";
import { DagreCompoundLayout } from "./dagreCompound";
import { isString } from "../util";
export class Layout {
    constructor(options) {
        const layoutClass = getLayoutByName(options.type);
        this.layoutInstance = new layoutClass(options);
    }
    layout(data) {
        return this.layoutInstance.layout(data);
    }
    updateCfg(cfg) {
        this.layoutInstance.updateCfg(cfg);
    }
    init(data) {
        this.correctLayers(data.nodes);
        this.layoutInstance.init(data);
    }
    /**
     * correcting the layers on the node data
     * if min(layer) <= 0, layers should begin from abs(min(layer)) + 1
     * @param nodes
     * @returns
     */
    correctLayers(nodes) {
        if (!(nodes === null || nodes === void 0 ? void 0 : nodes.length))
            return;
        let minLayer = Infinity;
        const hasLayerNodes = [];
        nodes.forEach((node) => {
            if (isString(node.layer)) {
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
            const layerOffset = Math.abs(minLayer) + 1;
            // @ts-ignore
            hasLayerNodes.forEach((node) => node.layer += layerOffset);
        }
    }
    execute() {
        this.layoutInstance.execute();
    }
    getDefaultCfg() {
        return this.layoutInstance.getDefaultCfg();
    }
    destroy() {
        return this.layoutInstance.destroy();
    }
}
// FIXME
// FOR G6
// tslint:disable-next-line
export const Layouts = {
    force: ForceLayout,
    fruchterman: FruchtermanLayout,
    forceAtlas2: ForceAtlas2Layout,
    gForce: GForceLayout,
    force2: Force2Layout,
    dagre: DagreLayout,
    dagreCompound: DagreCompoundLayout,
    circular: CircularLayout,
    radial: RadialLayout,
    concentric: ConcentricLayout,
    grid: GridLayout,
    mds: MDSLayout,
    comboForce: ComboForceLayout,
    comboCombined: ComboCombinedLayout,
    random: RandomLayout,
    'gForce-gpu': GForceGPULayout,
    'fruchterman-gpu': FruchtermanGPULayout,
    er: ERLayout,
};
//# sourceMappingURL=layout.js.map