/**
 * @fileOverview force atlas 2
 * @author shiwu.wyy@antfin.com
 */
import { PointTuple, OutNode, Edge, ForceAtlas2LayoutOptions } from "../types";
import { Base } from "../base";
export declare class ForceAtlas2Layout extends Base {
    /** 布局中心 */
    center: PointTuple;
    /** 宽度 */
    width: number;
    /** 高度 */
    height: number;
    nodes: OutNode[];
    edges: Edge[];
    /**
     * the parameter for repulsive forces,
     * it will scale the layout but won't change the layout
     * larger the kr, looser the layout
     * @type  {number}
     */
    kr: number;
    /**
     * the parameter for gravity forces
     * @type  {number}
     */
    kg: number;
    /**
     * modes:
     * 'normal' for normal using
     * 'linlog' for compact clusters.
     * @type  {string}
     */
    mode: 'normal' | 'linlog';
    /**
     * whether preventing the node overlapping
     * @type  {boolean}
     */
    preventOverlap: boolean;
    /**
     * whether active the dissuade hub mode
     * true: grant authorities (nodes with a high indegree)
     * a more central position than hubs (nodes with a high outdegree)
     * @type  {boolean}
     */
    dissuadeHubs: boolean;
    /**
     * whether active the barnes hut optimization on computing repulsive forces
     * @type  {boolean}
     */
    barnesHut: boolean | undefined;
    /**
     * the max iteration number
     * @type  {number}
     */
    maxIteration: number;
    /**
     * control the global velocity
     * defualt: 0.1(gephi)
     * @type  {number}
     */
    ks: number;
    /**
     * the max global velocity
     * @type  {number}
     */
    ksmax: number;
    /**
     * the tolerance for the global swinging
     * @type  {number}
     */
    tao: number;
    /**
     * the function of layout complete listener, display the legend and minimap after layout
     * @type  {function}
     */
    onLayoutEnd: () => void;
    tick: () => void;
    /**
     * activate prune or not.
     * prune the leaves during most iterations, layout the leaves in the last 50 iteraitons.
     * if prune === '', it will be activated when the nodes number > 100
     * note that it will reduce the quality of the layout
     * @type  {boolean}
     */
    prune: boolean | undefined;
    getWidth: (node: any) => number;
    getHeight: (node: any) => number;
    constructor(options?: ForceAtlas2LayoutOptions);
    getDefaultCfg(): {};
    execute(): void;
    updateNodesByForces(sizes: number[]): OutNode[];
    iterate(iteration: number, idMap: {
        [key: string]: number;
    }, edgeEndsIdMap: {
        [key: number]: {
            sourceIdx: number;
            targetIdx: number;
        };
    }, esize: number, degrees: number[], sizes: number[]): OutNode[];
    getAttrForces(iter: number, prevoIter: number, esize: number, idMap: {
        [key: string]: number;
    }, edgeEndsIdMap: {
        [key: number]: {
            sourceIdx: number;
            targetIdx: number;
        };
    }, degrees: number[], sizes: number[], forces: number[]): number[];
    getRepGraForces(iter: number, prevoIter: number, forces: number[], krPrime: number, sizes: number[], degrees: number[]): number[];
    getOptRepGraForces(forces: number[], bodies: any, degrees: number[]): number[];
    updatePos(forces: number[], preForces: number[], sg: number, degrees: number[]): {
        nodes: any;
        sg: number;
    };
}
