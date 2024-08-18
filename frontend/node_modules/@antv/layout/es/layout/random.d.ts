/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */
import { PointTuple, OutNode, Edge, RandomLayoutOptions } from "./types";
import { Base } from "./base";
/**
 * 随机布局
 */
export declare class RandomLayout extends Base {
    /** 布局中心 */
    center: PointTuple;
    /** 宽度 */
    width: number;
    /** 高度 */
    height: number;
    nodes: OutNode[];
    edges: Edge[];
    /** 迭代结束的回调函数 */
    onLayoutEnd: () => void;
    constructor(options?: RandomLayoutOptions);
    getDefaultCfg(): {
        center: number[];
        width: number;
        height: number;
    };
    /**
     * 执行布局
     */
    execute(): {
        nodes: OutNode[];
        edges: Edge[];
    };
    getType(): string;
}
