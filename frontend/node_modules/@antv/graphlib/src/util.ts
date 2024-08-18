import { GraphEnum } from './Graph/enum';
import { DefaultEdgeType } from './Graph';

/**
 * @description add one to key's value in map
 * @description.zh-CN 在 map 中 key 的值加 1
 * @param map
 * @param key
 */
export function incrementOrInitEntry(map: Map<any, any>, key: any) {
  const val = map.get(key) || 0;
  map.set(key, val + 1);
}

/**
 * @description minus one from key's value in map, is value is 0, delete the key
 * @description.zh-CN 在 map 中 key 的值减 1，如果值为 0，则删除 key
 */
export function decrementOrRemoveEntry(map: Map<any, number>, key: any) {
  let val = map.get(key);
  if (val !== undefined) {
    val = val - 1;
    if (val > 0) {
      map.set(key, val);
    } else {
      map.delete(key);
    }
  }
}

/**
 * @description convert edge to string id
 * @description.zh-CN 转换边为字符串 id
 */
export function edgeArgsToId<NodeType>(
  isDirected: boolean,
  v_: NodeType,
  w_: NodeType,
  name?: any,
) {
  let v = String(v_);
  let w = String(w_);
  if (!isDirected && v > w) {
    let tmp = v;
    v = w;
    w = tmp;
  }

  return (
    v +
    GraphEnum.EDGE_KEY_DELIM +
    w +
    GraphEnum.EDGE_KEY_DELIM +
    (name === undefined ? GraphEnum.DEFAULT_EDGE_NAME : name)
  );
}

/**
 * @description convert edge arguments to edge object
 * @description.zh-CN 转换边参数为边对象
 */
export function edgeArgsToObj<NodeType>(
  isDirected: boolean,
  v: NodeType,
  w: NodeType,
  name?: string,
) {
  const strV = String(v);
  const strW = String(w);
  const edgeObj: DefaultEdgeType<NodeType, any> = { v: v, w: w };
  if (!isDirected && strV > strW) {
    let tmp = edgeObj.v;
    edgeObj.v = edgeObj.w;
    edgeObj.w = tmp;
  }

  if (name !== undefined) {
    edgeObj.name = name;
  }
  return edgeObj;
}

/**
 * @description convert edge object to string id
 * @description.zh-CN 转换边对象为字符串 id
 */
export function edgeObjToId(isDirected: boolean, edgeObj: { v: any; w: any; name?: any }) {
  return edgeArgsToId(isDirected, edgeObj.v, edgeObj.w, edgeObj.name);
}

export function isFunction(obj: any) {
  return typeof obj === 'function';
}
