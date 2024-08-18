import { INode, IEdgeInfo } from './type';
export default function layout(data: {
    nodes: INode[];
    edges: IEdgeInfo[];
}, options: any): {
    nodes: INode[];
    edges: IEdgeInfo[];
} | undefined;
