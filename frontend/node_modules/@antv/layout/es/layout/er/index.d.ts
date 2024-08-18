/**
 * @fileOverview Force Layout Grid Align layout
 * @author wenyanqi
 */
import { Base } from "../base";
export interface ERLayoutOptions {
    type: "er";
    width?: number;
    height?: number;
    nodeMinGap?: number;
}
export declare class ERLayout extends Base {
    width: number;
    height: number;
    nodeMinGap: number;
    /** 迭代结束的回调函数 */
    onLayoutEnd: () => void;
    constructor(options?: any);
    getDefaultCfg(): {
        width: number;
        height: number;
        nodeMinGap: number;
    };
    /**
     * 执行布局
     */
    execute(): Promise<void>;
    getType(): string;
}
