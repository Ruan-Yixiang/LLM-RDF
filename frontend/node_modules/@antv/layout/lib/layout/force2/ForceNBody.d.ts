import { NodeMap } from '..';
interface Node {
    x: number;
    y: number;
}
export declare function forceNBody(nodes: Node[], nodeMap: NodeMap, factor: number, coulombDisScale2: number, accArray: number[]): number[];
export {};
