/**
 * @fileOverview Force Layout Grid Align layout
 * @author wenyanqi
 */
import { Base } from "../base";
import layout from './core';
export class ERLayout extends Base {
    constructor(options) {
        super();
        this.width = 300;
        this.height = 300;
        this.nodeMinGap = 50;
        /** 迭代结束的回调函数 */
        this.onLayoutEnd = () => { };
        if (options) {
            this.updateCfg(options);
        }
    }
    getDefaultCfg() {
        return {
            width: 300,
            height: 300,
            nodeMinGap: 50,
        };
    }
    /**
     * 执行布局
     */
    execute() {
        const self = this;
        const nodes = self.nodes;
        const edges = self.edges;
        // 节点初始化，size初始化
        nodes === null || nodes === void 0 ? void 0 : nodes.forEach((node) => {
            if (!node.size) {
                node.size = [50, 50];
            }
        });
        return layout({
            nodes, edges,
        }, {
            width: this.width,
            height: this.height,
            nodeMinGap: this.nodeMinGap,
        }).then(() => {
            if (self.onLayoutEnd)
                self.onLayoutEnd();
        });
    }
    getType() {
        return "er";
    }
}
//# sourceMappingURL=index.js.map