import { DefaultEdgeType } from './Graph';
/**
 * @description add one to key's value in map
 * @description.zh-CN 在 map 中 key 的值加 1
 * @param map
 * @param key
 */
export declare function incrementOrInitEntry(map: Map<any, any>, key: any): void;
/**
 * @description minus one from key's value in map, is value is 0, delete the key
 * @description.zh-CN 在 map 中 key 的值减 1，如果值为 0，则删除 key
 */
export declare function decrementOrRemoveEntry(map: Map<any, number>, key: any): void;
/**
 * @description convert edge to string id
 * @description.zh-CN 转换边为字符串 id
 */
export declare function edgeArgsToId<NodeType>(isDirected: boolean, v_: NodeType, w_: NodeType, name?: any): string;
/**
 * @description convert edge arguments to edge object
 * @description.zh-CN 转换边参数为边对象
 */
export declare function edgeArgsToObj<NodeType>(isDirected: boolean, v: NodeType, w: NodeType, name?: string): DefaultEdgeType<NodeType, any>;
/**
 * @description convert edge object to string id
 * @description.zh-CN 转换边对象为字符串 id
 */
export declare function edgeObjToId(isDirected: boolean, edgeObj: {
    v: any;
    w: any;
    name?: any;
}): string;
export declare function isFunction(obj: any): boolean;
