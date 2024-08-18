/**
 * @fileOverview concentric layout
 * @author shiwu.wyy@antfin.com
 * this algorithm refers to <cytoscape.js> - https://github.com/cytoscape/cytoscape.js/
 */
import { OutNode, Edge, PointTuple, Size, ConcentricLayoutOptions } from "./types";
import { Base } from "./base";
type INode = OutNode & {
    degree: number;
    size: number | PointTuple | Size;
};
/**
 * 同心圆布局
 */
export declare class ConcentricLayout extends Base {
    /** 布局中心 */
    center: PointTuple;
    nodeSize: number | PointTuple;
    /** min spacing between outside of nodes (used for radius adjustment) */
    minNodeSpacing: number;
    /** same as minNodeSpacing. min spacing between outside of nodes (used for radius adjustment) */
    nodeSpacing: number | number[] | ((d?: unknown) => number) | undefined;
    /** prevents node overlap, may overflow boundingBox if not enough space */
    preventOverlap: boolean;
    /** how many radians should be between the first and last node (defaults to full circle) */
    sweep: number | undefined;
    /** whether levels have an equal radial distance betwen them, may cause bounding box overflow */
    equidistant: boolean;
    /** where nodes start in radians */
    startAngle: number;
    /** whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false) */
    clockwise: boolean;
    /** the letiation of concentric values in each level */
    maxLevelDiff: undefined | number;
    /** 根据 sortBy 指定的属性进行排布，数值高的放在中心，如果是 sortBy 则会计算节点度数，度数最高的放在中心 */
    sortBy: string;
    nodes: INode[];
    edges: Edge[];
    width: number;
    height: number;
    /** 迭代结束的回调函数 */
    onLayoutEnd: () => void;
    private maxValueNode;
    private counterclockwise;
    constructor(options?: ConcentricLayoutOptions);
    getDefaultCfg(): {
        nodeSize: number;
        minNodeSpacing: number;
        nodeSpacing: number;
        preventOverlap: boolean;
        sweep: undefined;
        equidistant: boolean;
        startAngle: number;
        clockwise: boolean;
        maxLevelDiff: undefined;
        sortBy: string;
    };
    /**
     * 执行布局
     */
    execute(): {
        nodes: INode[];
        edges: Edge[];
    } | undefined;
    getType(): string;
}
export {};
