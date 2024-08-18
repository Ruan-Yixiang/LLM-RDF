declare module 'dagre' {
    namespace graphlib {
        interface GraphOptions {
            compound?: boolean;
            name?: string;
            rankdir?: string;
            type?: string | number;
            ranksep?: number;
            nodesep?: number;
            edgesep?: number;
            align?: string;
        }
        interface EdgeObject {
            v: string;
            w: string;
            name?: string;
        }
        class Graph<N, E> {
            constructor(opt?: Object);
            setNode(name: string, value?: N): void;
            hasNode(name: string): boolean;
            setEdge(fromName: string, toName: string, value?: E): void;
            hasEdge(fromName: string, toName: string): boolean;
            edge(fromName: string, toName: string): E;
            edge(edgeObject: EdgeObject): E;
            removeEdge(v: string, w: string): void;
            nodes(): string[];
            node(name: string): N;
            removeNode(name: string): void;
            setGraph(graphOptions: GraphOptions): void;
            graph(): GraphOptions;
            nodeCount(): number;
            neighbors(name: string): string[];
            successors(name: string): string[];
            predecessors(name: string): string[];
            edges(): EdgeObject[];
            outEdges(name: string): E[];
            inEdges(name: string): E[];
            sources(): string[];
            removeNode(name: string): Graph<N, E>;
            setParent(name: string, parentName: string): void;
        }
    }
    function layout(graph: graphlib.Graph<any, any>): void;
}
