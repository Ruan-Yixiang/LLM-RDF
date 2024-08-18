import { ICell, INode } from './type';
export default class Grid {
    cells: ICell[][];
    columnNum: number;
    rowNum: number;
    additionColumn: number[];
    additionRow: number[];
    private static MIN_DIST;
    private static DEFAULT_CELL_W;
    private static DEFAULT_CELL_H;
    private CELL_W;
    private CELL_H;
    init(width: number, height: number, gridSize: {
        CELL_W: number;
        CELL_H: number;
    }): void;
    findGridByNodeId(nodeId: string): {
        column: number;
        row: number;
    } | null;
    sqdist(a: any, b: any): number;
    occupyNearest(p: INode): ICell | null;
    insertColumn(columnIndex: number, length: number): void;
    insertRow(rowIndex: number, length: number): void;
    getNodes(): ICell[];
}
