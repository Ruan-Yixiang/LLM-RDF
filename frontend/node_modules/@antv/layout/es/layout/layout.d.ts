import { Base } from "./base";
import { Model, ILayout, Node } from "./types";
interface DagreNodeData extends Node {
    layer?: number;
}
export declare class Layout {
    readonly layoutInstance: Base;
    constructor(options: ILayout.LayoutOptions);
    layout(data: Model): Model;
    updateCfg(cfg: ILayout.LayoutOptions): void;
    init(data: Model): void;
    /**
     * correcting the layers on the node data
     * if min(layer) <= 0, layers should begin from abs(min(layer)) + 1
     * @param nodes
     * @returns
     */
    correctLayers(nodes: DagreNodeData[] | undefined): void;
    execute(): void;
    getDefaultCfg(): {};
    destroy(): void;
}
export declare const Layouts: {
    [key: string]: any;
};
export {};
