import { Base } from './base';
import { Combo, DagreCompoundLayoutOptions, OutNode, PointTuple } from './types';
import { DeepPartial, LayoutConfig } from 'dagre-compound';
interface IPoint {
    x: number;
    y: number;
    anchorIndex?: number;
    [key: string]: number | undefined;
}
interface Edge {
    source: string;
    target: string;
    type?: string;
    startPoint?: IPoint;
    endPoint?: IPoint;
    controlPoints?: IPoint[];
    sourceAnchor?: number;
    targetAnchor?: number;
    layoutOrder?: number;
    [key: string]: unknown;
}
type ComboType = Combo & {
    x?: number;
    y?: number;
    label?: string;
    type: string;
    size?: number | number[] | undefined;
    fixSize?: number[];
    fixCollapseSize?: number[];
    inEdges?: Edge[];
    outEdges?: Edge[];
    padding?: number[];
    collapsed?: boolean;
    offsetX?: number;
    offsetY?: number;
    [key: string]: unknown;
};
type Node = OutNode & {
    label?: string;
    width?: number;
    height?: number;
    type?: string;
    anchorPoints?: [number, number][];
    layoutOrder?: number;
};
type ModelType = {
    nodes?: Node[];
    edges?: Edge[];
    comboEdges?: Edge[];
    combos?: ComboType[];
    hiddenNodes?: Node[];
    hiddenEdges?: Edge[];
    hiddenCombos?: ComboType[];
};
export declare class DagreCompoundLayout extends Base {
    /** layout 方向, 可选 TB, BT, LR, RL */
    rankdir: 'TB' | 'BT' | 'LR' | 'RL';
    /** 节点对齐方式，可选 UL, UR, DL, DR */
    align: undefined | 'UL' | 'UR' | 'DL' | 'DR';
    /** 布局的起始（左上角）位置 */
    begin: PointTuple | undefined;
    /** 节点大小 */
    nodeSize: number | number[] | undefined;
    /** 节点水平间距(px) */
    nodesep: number;
    /** 边水平间距(px) */
    edgesep: number;
    /** 每一层节点之间间距 */
    ranksep: number;
    /** 是否保留布局连线的控制点 */
    controlPoints: boolean;
    /** 是否保留使用布局计算的锚点 */
    anchorPoint: boolean;
    /** 全局布局配置，优先级最高 */
    settings?: DeepPartial<LayoutConfig>;
    nodes: Node[];
    edges: Edge[];
    combos: ComboType[];
    /** 当前生命周期内布局配置信息 */
    private graphSettings;
    /** 迭代结束的回调函数 */
    onLayoutEnd: () => void;
    constructor(options?: DagreCompoundLayoutOptions);
    getDefaultCfg(): {
        rankdir: string;
        align: undefined;
        begin: undefined;
        nodeSize: undefined;
        nodesep: number;
        ranksep: number;
        controlPoints: boolean;
        anchorPoint: boolean;
    };
    init(data: ModelType): void;
    execute(): {
        nodes: Node[];
        edges: Edge[];
    } | undefined;
    /**
     * combo 模式下查找节点完整路径
     * @param nodeId
     * @private
     */
    private getNodePath;
    /** 准备 dagre-compound 布局参数 */
    private getLayoutConfig;
    /** 更新节点与边位置 */
    private updatePosition;
    private getBegin;
    private updateNodePosition;
    private updateEdgePosition;
    getType(): string;
    /**
     * 确保布局使用的数据与用户输入数据顺序一致
     * 通过 layoutOrder 排序 节点 与 边
     * @param list
     * @private
     */
    private getDataByOrder;
}
export {};
