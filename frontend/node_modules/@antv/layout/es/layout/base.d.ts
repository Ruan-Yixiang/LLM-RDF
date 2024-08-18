import { Node, Edge, Combo, Model, PointTuple } from './types';
export declare class Base {
    nodes: Node[] | null;
    edges: Edge[] | null;
    combos: Combo[] | null;
    comboEdges: Edge[] | null;
    hiddenNodes: Node[] | null;
    hiddenEdges: Edge[] | null;
    hiddenCombos: Combo[] | null;
    vedges: Edge[] | null;
    positions: PointTuple[] | null;
    destroyed: boolean;
    onLayoutEnd: () => void;
    layout(data: Model): Model;
    init(data: Model): void;
    execute(reloadData?: boolean): any;
    executeWithWorker(): void;
    getDefaultCfg(): {};
    updateCfg(cfg: any): void;
    getType(): string;
    destroy(): void;
}
