/**
 * @fileOverview random layout
 * @author shiwu.wyy@antfin.com
 */
import { Base } from "./base";
/**
 * 随机布局
 */
export class RandomLayout extends Base {
    constructor(options) {
        super();
        /** 布局中心 */
        this.center = [0, 0];
        /** 宽度 */
        this.width = 300;
        /** 高度 */
        this.height = 300;
        this.nodes = [];
        this.edges = [];
        /** 迭代结束的回调函数 */
        this.onLayoutEnd = () => { };
        this.updateCfg(options);
    }
    getDefaultCfg() {
        return {
            center: [0, 0],
            width: 300,
            height: 300
        };
    }
    /**
     * 执行布局
     */
    execute() {
        const self = this;
        const nodes = self.nodes;
        const layoutScale = 0.9;
        const center = self.center;
        if (!self.width && typeof window !== "undefined") {
            self.width = window.innerWidth;
        }
        if (!self.height && typeof window !== "undefined") {
            self.height = window.innerHeight;
        }
        if (nodes) {
            nodes.forEach((node) => {
                node.x = (Math.random() - 0.5) * layoutScale * self.width + center[0];
                node.y = (Math.random() - 0.5) * layoutScale * self.height + center[1];
            });
        }
        if (self.onLayoutEnd)
            self.onLayoutEnd();
        return {
            nodes,
            edges: this.edges
        };
    }
    getType() {
        return "random";
    }
}
//# sourceMappingURL=random.js.map