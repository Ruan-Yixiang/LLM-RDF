/**
 * @file To get graph essencial information.
 * @file.zh-CN 获取图的基本信息
 * @module essence
 */
import Graph from '../Graph';
/**
 * @description Check if the object is a graph.
 * @description.zh-CN 检查对象是否为图。
 */
export declare function isGraph(obj: any): boolean;
/**
 * @description Check if the graph is a simple graph.
 * @description.zh-CN 检查图是否为简单图。
 */
export declare function isSimpleGraph(graph: Graph<any, any, any, any>): boolean;
/**
 * @description Check if the graph is a null graph.
 * @description.zh-CN 检查图是否为空图。
 */
export declare function isNullGraph(graph: Graph): boolean;
/**
 * @description Check if the graph contains Self loops.
 * @description.zh-CN 检查图是否包含自环。
 */
export declare function hasSelfLoop(graph: Graph): boolean;
