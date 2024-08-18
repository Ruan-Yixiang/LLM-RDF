export class Base {
    constructor() {
        this.nodes = [];
        this.edges = [];
        this.combos = [];
        this.comboEdges = [];
        this.hiddenNodes = [];
        this.hiddenEdges = [];
        this.hiddenCombos = [];
        // temp edges e.g. the edge generated for releated collapsed combo
        this.vedges = [];
        this.positions = [];
        this.destroyed = false;
        this.onLayoutEnd = () => { };
    }
    layout(data) {
        this.init(data);
        return this.execute(true);
    }
    init(data) {
        this.nodes = data.nodes || [];
        this.edges = data.edges || [];
        this.combos = data.combos || [];
        this.comboEdges = data.comboEdges || [];
        this.hiddenNodes = data.hiddenNodes || [];
        this.hiddenEdges = data.hiddenEdges || [];
        this.hiddenCombos = data.hiddenCombos || [];
        this.vedges = data.vedges || [];
    }
    execute(reloadData) { }
    executeWithWorker() { }
    getDefaultCfg() {
        return {};
    }
    updateCfg(cfg) {
        if (cfg) {
            Object.assign(this, cfg);
        }
    }
    getType() {
        return 'base';
    }
    destroy() {
        this.nodes = null;
        this.edges = null;
        this.combos = null;
        this.positions = null;
        this.destroyed = true;
    }
}
//# sourceMappingURL=base.js.map