import { IEdge, IMysqlNode } from './type';
declare function layout(nodes: IMysqlNode[], edges: IEdge[]): {
    nodes: IMysqlNode[];
    edges: IEdge[];
};
export default layout;
