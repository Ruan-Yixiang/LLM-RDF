import { TreeGraphData } from '@antv/g6-core';
/**
 * 将 number | Function 类型的参数转换为 return number 的 Function
 * @param  {number | Function}  value 需要被转换的值
 * @param  {number}  defaultV 返回函数的默认返回值
 * @return {Function} 转换后的函数
 */
export declare const proccessToFunc: (value: number | Function, defaultV?: number) => (d?: any) => number;
/**
 * 将节点和边数据转换为 GPU 可读的数组。并返回 maxEdgePerVetex，每个节点上最多的边数
 * @param  {NodeConfig[]}  nodes 需要被转换的值
 * @param  {EdgeConfig[]}  edges 返回函数的默认返回值
 * @return {Object} 转换后的数组及 maxEdgePerVetex 组成的对象
 */
export declare const buildTextureData: (nodes: any, edges: any) => {
    array: Float32Array;
    maxEdgePerVetex: number;
};
/**
 * 将节点和边数据转换为 GPU 可读的数组，每条边带有一个属性。并返回 maxEdgePerVetex，每个节点上最多的边数
 * @param  {NodeConfig[]}  nodes 节点数组
 * @param  {EdgeConfig[]}  edges 边数组
 * @param  {Function}  attrs 读取边属性的函数
 * @return {Object} 转换后的数组及 maxEdgePerVetex 组成的对象
 */
export declare const buildTextureDataWithOneEdgeAttr: (nodes: any, edges: any, attrs: Function) => {
    array: Float32Array;
    maxEdgePerVetex: number;
};
/**
 * 将节点和边数据转换为 GPU 可读的数组，每条边带有一个以上属性。并返回 maxEdgePerVetex，每个节点上最多的边数
 * @param  {NodeConfig[]}  nodes 节点数组
 * @param  {EdgeConfig[]}  edges 边数组
 * @param  {Function}  attrs 读取边属性的函数
 * @return {Object} 转换后的数组及 maxEdgePerVetex 组成的对象
 */
export declare const buildTextureDataWithTwoEdgeAttr: (nodes: any, edges: any, attrs1: Function, attrs2: Function) => {
    array: Float32Array;
    maxEdgePerVetex: number;
};
/**
 * transform the extended attributes of nodes or edges to a texture array
 * @param  {string[]}  attributeNames attributes' name to be read from items and put into output array
 * @param  {ModelConfig[]}  items the items to be read
 * @return {Float32Array} the attributes' value array to be read by GPU
 */
export declare const attributesToTextureData: (attributeNames: string[], items: any) => {
    array: Float32Array;
    count: number;
};
/**
 * transform the number array format of extended attributes of nodes or edges to a texture array
 * @param  {string[]}  attributeNames attributes' name to be read from items and put into output array
 * @return {Float32Array} the attributes' value array to be read by GPU
 */
export declare const arrayToTextureData: (valueArrays: number[][]) => Float32Array;
export type TreeGraphDataWithPosition = TreeGraphData & {
    x: number;
    y: number;
    children?: TreeGraphDataWithPosition[];
};
/**
 *
 * @param data Tree graph data
 * @param layout
 */
export declare const radialLayout: (data: TreeGraphDataWithPosition, layout?: string) => TreeGraphDataWithPosition;
