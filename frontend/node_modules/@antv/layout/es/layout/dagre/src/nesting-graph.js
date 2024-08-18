import { addBorderNode, addDummyNode } from "./util";
/*
 * A nesting graph creates dummy nodes for the tops and bottoms of subgraphs,
 * adds appropriate edges to ensure that all cluster nodes are placed between
 * these boundries, and ensures that the graph is connected.
 *
 * In addition we ensure, through the use of the minlen property, that nodes
 * and subgraph border nodes to not end up on the same rank.
 *
 * Preconditions:
 *
 *    1. Input graph is a DAG
 *    2. Nodes in the input graph has a minlen attribute
 *
 * Postconditions:
 *
 *    1. Input graph is connected.
 *    2. Dummy nodes are added for the tops and bottoms of subgraphs.
 *    3. The minlen attribute for nodes is adjusted to ensure nodes do not
 *       get placed on the same rank as subgraph border nodes.
 *
 * The nesting graph idea comes from Sander, "Layout of Compound Directed
 * Graphs."
 */
const run = (g) => {
    var _a;
    const root = addDummyNode(g, "root", {}, "_root");
    const depths = treeDepths(g);
    let maxDepth = Math.max(...Object.values(depths));
    if (Math.abs(maxDepth) === Infinity) {
        maxDepth = 1;
    }
    const height = maxDepth - 1; // Note: depths is an Object not an array
    const nodeSep = 2 * height + 1;
    g.graph().nestingRoot = root;
    // Multiply minlen by nodeSep to align nodes on non-border ranks.
    g.edges().forEach((e) => {
        g.edge(e).minlen *= nodeSep;
    });
    // Calculate a weight that is sufficient to keep subgraphs vertically compact
    const weight = sumWeights(g) + 1;
    // Create border nodes and link them up
    (_a = g.children()) === null || _a === void 0 ? void 0 : _a.forEach((child) => {
        dfs(g, root, nodeSep, weight, height, depths, child);
    });
    // Save the multiplier for node layers for later removal of empty border
    // layers.
    g.graph().nodeRankFactor = nodeSep;
};
const dfs = (g, root, nodeSep, weight, height, depths, v) => {
    const children = g.children(v);
    if (!(children === null || children === void 0 ? void 0 : children.length)) {
        if (v !== root) {
            g.setEdge(root, v, { weight: 0, minlen: nodeSep });
        }
        return;
    }
    const top = addBorderNode(g, "_bt");
    const bottom = addBorderNode(g, "_bb");
    const label = g.node(v);
    g.setParent(top, v);
    label.borderTop = top;
    g.setParent(bottom, v);
    label.borderBottom = bottom;
    children === null || children === void 0 ? void 0 : children.forEach((child) => {
        dfs(g, root, nodeSep, weight, height, depths, child);
        const childNode = g.node(child);
        const childTop = childNode.borderTop ? childNode.borderTop : child;
        const childBottom = childNode.borderBottom ? childNode.borderBottom : child;
        const thisWeight = childNode.borderTop ? weight : 2 * weight;
        const minlen = childTop !== childBottom ? 1 : height - depths[v] + 1;
        g.setEdge(top, childTop, {
            minlen,
            weight: thisWeight,
            nestingEdge: true,
        });
        g.setEdge(childBottom, bottom, {
            minlen,
            weight: thisWeight,
            nestingEdge: true,
        });
    });
    if (!g.parent(v)) {
        g.setEdge(root, top, { weight: 0, minlen: height + depths[v] });
    }
};
const treeDepths = (g) => {
    var _a;
    const depths = {};
    const dfs = (v, depth) => {
        const children = g.children(v);
        children === null || children === void 0 ? void 0 : children.forEach((child) => dfs(child, depth + 1));
        depths[v] = depth;
    };
    (_a = g.children()) === null || _a === void 0 ? void 0 : _a.forEach((v) => dfs(v, 1));
    return depths;
};
const sumWeights = (g) => {
    let result = 0;
    g.edges().forEach((e) => {
        result += g.edge(e).weight;
    });
    return result;
};
const cleanup = (g) => {
    const graphLabel = g.graph();
    graphLabel.nestingRoot && g.removeNode(graphLabel.nestingRoot);
    delete graphLabel.nestingRoot;
    g.edges().forEach((e) => {
        const edge = g.edge(e);
        if (edge.nestingEdge) {
            g.removeEdgeObj(e);
        }
    });
};
export default { run, cleanup };
//# sourceMappingURL=nesting-graph.js.map