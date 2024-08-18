/**
 * @fileOverview MDS layout
 * @author shiwu.wyy@antfin.com
 */
import { Matrix as MLMatrix, SingularValueDecomposition } from "ml-matrix";
import { floydWarshall, getAdjMatrix, scaleMatrix } from "../util";
import { Base } from "./base";
/**
 * mds 布局
 */
export class MDSLayout extends Base {
    constructor(options) {
        super();
        /** 布局中心 */
        this.center = [0, 0];
        /** 边长度 */
        this.linkDistance = 50;
        this.nodes = [];
        this.edges = [];
        /** 迭代结束的回调函数 */
        this.onLayoutEnd = () => { };
        this.updateCfg(options);
    }
    getDefaultCfg() {
        return {
            center: [0, 0],
            linkDistance: 50
        };
    }
    /**
     * 执行布局
     */
    execute() {
        const self = this;
        const { nodes, edges = [] } = self;
        const center = self.center;
        if (!nodes || nodes.length === 0) {
            if (self.onLayoutEnd)
                self.onLayoutEnd();
            return;
        }
        if (nodes.length === 1) {
            nodes[0].x = center[0];
            nodes[0].y = center[1];
            if (self.onLayoutEnd)
                self.onLayoutEnd();
            return;
        }
        const linkDistance = self.linkDistance;
        // the graph-theoretic distance (shortest path distance) matrix
        const adjMatrix = getAdjMatrix({ nodes, edges }, false);
        const distances = floydWarshall(adjMatrix);
        self.handleInfinity(distances);
        // scale the ideal edge length acoording to linkDistance
        const scaledD = scaleMatrix(distances, linkDistance);
        self.scaledDistances = scaledD;
        // get positions by MDS
        const positions = self.runMDS();
        self.positions = positions;
        positions.forEach((p, i) => {
            nodes[i].x = p[0] + center[0];
            nodes[i].y = p[1] + center[1];
        });
        if (self.onLayoutEnd)
            self.onLayoutEnd();
        return {
            nodes,
            edges
        };
    }
    /**
     * mds 算法
     * @return {array} positions 计算后的节点位置数组
     */
    runMDS() {
        const self = this;
        const dimension = 2;
        const distances = self.scaledDistances;
        // square distances
        const M = MLMatrix.mul(MLMatrix.pow(distances, 2), -0.5);
        // double centre the rows/columns
        const rowMeans = M.mean("row");
        const colMeans = M.mean("column");
        const totalMean = M.mean();
        M.add(totalMean)
            .subRowVector(rowMeans)
            .subColumnVector(colMeans);
        // take the SVD of the double centred matrix, and return the
        // points from it
        const ret = new SingularValueDecomposition(M);
        const eigenValues = MLMatrix.sqrt(ret.diagonalMatrix).diagonal();
        return ret.leftSingularVectors.toJSON().map((row) => {
            return MLMatrix.mul([row], [eigenValues])
                .toJSON()[0]
                .splice(0, dimension);
        });
    }
    handleInfinity(distances) {
        let maxDistance = -999999;
        distances.forEach((row) => {
            row.forEach((value) => {
                if (value === Infinity) {
                    return;
                }
                if (maxDistance < value) {
                    maxDistance = value;
                }
            });
        });
        distances.forEach((row, i) => {
            row.forEach((value, j) => {
                if (value === Infinity) {
                    distances[i][j] = maxDistance;
                }
            });
        });
    }
    getType() {
        return "mds";
    }
}
//# sourceMappingURL=mds.js.map