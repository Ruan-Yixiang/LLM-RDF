export interface GraphOption {
    /**
     * @description Is the graph directed or not
     * @description.zh-CN 这个图是否是有向图
     * @default true
     */
    directed?: boolean;
    /**
     * @description Is this graph contains more than one graph data
     * @description.zh-CN 这个图是否包含多个图
     * @default false
     */
    multigraph?: boolean;
    /**
     * @description Is this graph a compound graph;
     * @description.zh-CN 这个图是否是复合图（包含嵌套节点的图）
     * @default false
     */
    compound?: boolean;
}
export interface DefaultEdgeType<NodeIDType, EdgeType> {
    /**
     * @description the node where this edge start
     * @description.zh-CN 边开始的节点
     */
    v: NodeIDType;
    /**
     * @description the node where this edge end
     * @description.zh-CN 边结束的节点
     */
    w: NodeIDType;
    /**
     * @description The name used to distinguish the multilateral relationship between two nodes
     * @description.zh-CN 用来区分两点之间的多边关系的名称
     */
    name?: string;
    /**
     * @description The value of the edge
     * @description.zh-CN 边的值
     */
    value?: EdgeType;
}
export default class Graph<NodeIDType = string, NodeType = Record<string, any>, EdgeType = Record<string, any>, GraphType = string> {
    private directed;
    private multigraph;
    private compound;
    private GRAPH_NODE;
    /**
     * @description Label for this graph itself
     * @description.zh-CN 图本身的标签（label）
     * @default undefined
     */
    label?: GraphType;
    /**
     * @description Number of nodes in the graph
     * @description.zh-CN 节点的数量
     * @default 0
     */
    private nodeCountNum;
    /**
     * @description Number of edges in the graph
     * @description.zh-CN 节点的数量
     * @default 0
     */
    private edgeCountNum;
    /**
     * @description return node label with its id
     * @description.zh-CN 返回节点的默认的标签
     */
    private defaultNodeLabelFn;
    /**
     * @description return edge label with its id
     * @description.zh-CN 返回边的默认的标签
     */
    private defaultEdgeLabelFn;
    constructor(options?: GraphOption);
    /**
     * @description Map for parent relationship
     * @description.zh-CN 父子关系的映射
     */
    private parentMap?;
    /**
     * @description Map for children relationship
     * @description.zh-CN 子孙关系的映射
     */
    private childrenMap?;
    private nodesLabelMap;
    /**
     * @description Map for edges
     * @description.zh-CN 边的映射
     */
    private inEdgesMap;
    private outEdgesMap;
    /**
     * @description Map for predecessors
     * @description.zh-CN 前驱节点的映射
     */
    private predecessorsMap;
    /**
     * @description Map for successors
     * @description.zh-CN 后继节点的映射
     */
    private successorsMap;
    /**
     * @description Map for edge object
     * @description.zh-CN 边的映射
     */
    private edgesMap;
    /**
     * @description Map for edge label
     * @description.zh-CN 边的标签的映射
     */
    private edgesLabelsMap;
    /**
     * @description Is the graph directed or not
     * @description.zh-CN 这个图是否是有向图
     * @default true
     */
    isDirected: () => boolean;
    /**
     * @description Is this graph contains more than one graph data
     * @description.zh-CN 这个图是否包含多个图
     * @default false
     */
    isMultigraph: () => boolean;
    /**
     * @description Is this graph a compound graph;
     * @description.zh-CN 这个图是否是复合图（包含嵌套节点的图）
     * @default false
     */
    isCompound: () => boolean;
    /**
     * @description Set Graph label (Identity for graph)
     * @description.zh-CN 设置图的标识符
     * @param label
     * @returns
     */
    setGraph: (label?: GraphType | undefined) => this;
    /**
     * @description Get Graph label (Identity for graph)
     * @description.zh-CN 获取图的标识符
     * @returns stirng | undefined
     */
    graph: () => GraphType;
    /**
     * @description Set function that generate default label for node, if param is non-function value then default label will always be this value;
     * @description.zh-CN 设置默认获取节点Label的方法，如果传入不是函数的，那么默认label 的值只会是传入值
     * @param newDefault (node) => label | label
     * @returns this
     */
    setDefaultNodeLabel: (newDefault: any) => this;
    /**
     * @description Count the nodes in graph
     * @description.zh-CN 计算图中所有节点的数量
     * @returns number
     */
    nodeCount: () => number;
    /**
     * @description get node label
     * @description.zh-CN 获取节点的标签
     */
    node: (n: NodeIDType) => NodeType | undefined;
    /**
     * @description Return all nodes in graph
     * @description 返回图中所有节点
     * @returns
     */
    nodes: () => NodeIDType[];
    /**
     * @description Return all source nodes in graph
     * @description 返回图中所有源头节点（入度为0）
     * @returns
     */
    sources: () => NodeIDType[];
    /**
     * @description Return all sink nodes in graph
     * @description 返回图中所有终点节点（出度为0）
     * @returns
     */
    sinks: () => NodeIDType[];
    /**
     * @description Set Node label in graph if node not in graph then create it
     * @description.zh-CN 设置节点的label，如果这个节点不在图中，则在图中创建这个节点
     * @param node
     * @param value
     * @returns
     */
    setNode(node: NodeIDType, value?: NodeType): this;
    /**
     * @description Set nodes or add nodes in batch
     * @description.zh-CN 批量设置或者创建节点
     * @param nodes
     * @param value
     * @returns
     */
    setNodes: (nodes: NodeIDType[], value?: NodeType | undefined) => this;
    /**
     * @description Is the node in graph
     * @description.zh-CN 判断节点是否在图中
     * @param node
     * @returns
     */
    hasNode: (node: NodeIDType) => boolean;
    /**
     * @description if graph is not compound then throw error
     * @description.zh-CN 如果图不是复合图就报错
     */
    private checkCompound;
    /**
     * @description Find node's parent (compond graph only)
     * @description.zh-CN 寻找节点的父节点 (只有复合图可以使用)
     * @param node
     * @returns
     */
    parent: (node: NodeIDType) => NodeIDType | undefined;
    /**
     * @description Remove node from its parent (compond graph only)
     * @description.zh-CN 将节点与其父节点之间的父子关系删除(只有复合图可以使用)
     * @param node
     */
    private removeFromParentsChildList;
    /**
     * @description Set node's parent(default is the graph) (compond graph only)
     * @description.zh-CN 设置节点的父节点，如果没有给定，父节点为这个图 (只有复合图可以使用)
     * @param node
     * @param parent
     * @returns
     */
    setParent: (node: NodeIDType, parent?: NodeIDType | undefined) => this;
    /**
     * @description get graph's or node's children
     * @description.zh-CN 获取图或者节点的字节点
     * @param node
     * @returns
     */
    children: (node?: NodeIDType | undefined) => NodeIDType[] | undefined;
    /**
     * @description get node's predecessors
     * @description.zh-CN 获取节点的所有上游节点
     * @param node
     * @returns
     */
    predecessors: (node: NodeIDType) => NodeIDType[] | undefined;
    /**
     * @description get node's successors
     * @description.zh-CN 获取节点的所有下游节点
     * @param node
     * @returns
     */
    successors: (node: NodeIDType) => NodeIDType[] | undefined;
    /**
     * @description get node's neighbors
     * @description.zh-CN 获取节点的所有邻居节点
     * @param node
     * @returns
     */
    neighbors: (node: NodeIDType) => NodeIDType[] | undefined;
    /**
     * @description Is the node a leaf node
     * @description.zh-CN 判断节点是否为叶子节点
     * @param node
     * @returns
     */
    isLeaf: (node: NodeIDType) => boolean;
    /**
     * @description Using node filter to create a new graph;
     * @description.zh-CN 过滤节点并创建一个新图
     * @param filter
     * @returns
     */
    filterNodes: (filter: (node: NodeIDType) => boolean) => Graph<NodeIDType, NodeType, EdgeType, GraphType>;
    /**
     * @description Remove node from graph
     * @description.zh-CN 将节点从图中移除
     * @param node
     * @returns
     */
    removeNode(node: NodeIDType): this;
    /**
     * @description Set function that generate default label for edge, if param is non-function value then default label will always be this value;
     * @description.zh-CN 设置默认获取边Label的方法，如果传入不是函数的，那么默认label 的值只会是传入值
     * @param newDefault
     * @returns
     */
    setDefaultEdgeLabel: (newDefault: any) => this;
    /**
     * @description Count the edge in graph
     * @description.zh-CN 返回图中边的数量
     * @returns number
     */
    edgeCount: () => number;
    /**
     * @description set edge value, if nodes or edges not exsit then add to graph
     * @description.zh-CN 设置边的属性，如果边或节点不存在，那么将他们加入这个图
     * @param v
     * @param w
     * @param value
     * @param name
     * @returns
     */
    setEdge(v_: NodeIDType, w_: NodeIDType, value?: any, name?: string): this;
    setEdgeObj: (edgeObj: DefaultEdgeType<NodeIDType, EdgeType>, value?: EdgeType | undefined) => this;
    /**
     * @description Add edge using a sorted node array ([a,b,c] => a->b b->c c->a)
     * @description.zh-CN 用一系列节点来定义一群边([a,b,c] => a->b b->c c->a)
     * @param edges
     * @param value
     * @returns
     */
    setPath: (edges: NodeIDType[], value?: any) => this;
    /**
     * @description Get edge between two nodes
     * @description.zh-CN 获得两个节点中的一条边
     * @param v
     * @param w
     * @param name
     * @returns
     */
    edgeFromArgs: (v: NodeIDType, w: NodeIDType, name?: any) => EdgeType | undefined;
    /**
     * @description Get edge between two nodes by edge object
     * @description.zh-CN 从edgeObj获得两个节点中的一条边
     * @param edgeObj
     * @returns
     */
    edge: (edgeObj: {
        v: NodeIDType;
        w: NodeIDType;
        name?: any;
    }) => EdgeType | undefined;
    /**
     * @description Does two nodes has a specific edge
     * @description.zh-CN 两个节点之间是否存在确定的一条边
     * @param v
     * @param w
     * @param name
     * @returns
     */
    hasEdge: (v: NodeIDType, w: NodeIDType, name?: any) => boolean;
    /**
     * @description remove a specific edge
     * @description.zh-CN 删除一条边
     * @param v
     * @param w
     * @param name
     * @returns
     */
    removeEdge(v_: NodeIDType, w_: NodeIDType, name?: any): this;
    /**
     * @description remove a specific edge by edge object
     * @description.zh-CN 删除一条边
     */
    removeEdgeObj: ({ v, w, name }: {
        v: NodeIDType;
        w: NodeIDType;
        name?: any;
    }) => this;
    /**
     * @description get all edges object in graph
     * @description.zh-CN 获得图中所有的边对象
     */
    edges: () => DefaultEdgeType<NodeIDType, EdgeType>[];
    /**
     * @description get edges that target at the node (could be from certain node)
     * @description.zh-CN 获取所有指向节点的边，可以指定来源节点
     * @param v
     * @param u
     * @returns
     */
    inEdges: (v: NodeIDType, u?: NodeIDType | undefined) => DefaultEdgeType<NodeIDType, EdgeType>[] | undefined;
    /**
     * @description get edges that from the node (could target at certain node)
     * @description.zh-CN 获取所有来源于节点的边，可以指定目标节点
     * @param w
     * @param u
     * @returns
     */
    outEdges: (w: NodeIDType, u?: NodeIDType | undefined) => DefaultEdgeType<NodeIDType, EdgeType>[] | undefined;
    /**
     * @description get edges between two nodes
     * @description.zh-CN 获取两个节点间所有的节点
     * @param w
     * @param u
     * @returns
     */
    nodeEdges: (v: NodeIDType, w?: NodeIDType | undefined) => DefaultEdgeType<NodeIDType, EdgeType>[] | undefined;
    static fromJSON: <NodeIDType_1 = string, NodeType_1 = Record<string, any>, EdgeType_1 = Record<string, any>, GraphType_1 = string>(json: {
        options: GraphOption;
        nodes: {
            id: NodeIDType_1;
            value?: NodeType_1 | undefined;
            parent?: NodeIDType_1 | undefined;
        }[];
        edges: {
            v: NodeIDType_1;
            w: NodeIDType_1;
            value?: EdgeType_1 | undefined;
            name?: string | undefined;
        }[];
        value?: GraphType_1 | undefined;
    }) => Graph<NodeIDType_1, NodeType_1, EdgeType_1, GraphType_1>;
    toJSON: () => {
        options: GraphOption;
        nodes: {
            id: NodeIDType;
            value?: NodeType | undefined;
            parent?: NodeIDType | undefined;
        }[];
        edges: {
            v: NodeIDType;
            w: NodeIDType;
            value?: EdgeType | undefined;
            name?: string | undefined;
        }[];
        value?: GraphType | undefined;
    };
    /**
     * @description Count the in edges of node
     * @description.zh-CN 计算节点的入边的数量
     */
    nodeInDegree: (node: NodeIDType) => number;
    /**
     * @description Count the out edges of node
     * @description.zh-CN 计算节点的出边的数量
     */
    nodeOutDegree: (node: NodeIDType) => number;
    /**
     * @description Count the total edges of node
     * @description.zh-CN 计算节点的所有边的数量
     */
    nodeDegree: (node: NodeIDType) => number;
    /**
     * @description Get the source of edge
     * @description.zh-CN 获取边的源节点
     */
    source: (edge: DefaultEdgeType<NodeIDType, EdgeType>) => NodeIDType;
    /**
     * @description Get the target of edge
     * @description.zh-CN 获取边的目标节点
     */
    target: (edge: DefaultEdgeType<NodeIDType, EdgeType>) => NodeIDType;
}
