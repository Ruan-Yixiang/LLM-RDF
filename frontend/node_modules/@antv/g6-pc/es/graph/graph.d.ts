import { IGraph, DataUrlType } from '../interface/graph';
import { AbstractGraph, GraphOptions } from '@antv/g6-core';
import { WaterMarkerConfig } from '../types';
import { PluginBase } from '@antv/g6-plugin';
export default class Graph extends AbstractGraph implements IGraph {
    destroyed: boolean;
    constructor(cfg: GraphOptions);
    protected initLayoutController(): void;
    protected initEventController(): void;
    protected initCanvas(): void;
    protected initPlugins(): void;
    /**
    * 增加图片下载水印功能
    */
    protected downloadImageWatermark(watermarker: HTMLElement, context: CanvasRenderingContext2D, width: number, height: number): Promise<void>;
    /**
     * 用于生成图片 (异步callback)
     * @param {String} type 图片类型，可选值："image/png" | "image/jpeg" | "image/webp" | "image/bmp"
     * @param {string} backgroundColor 图片背景色
     * @return {string} 图片 dataURL
     */
    protected asyncToDataUrl(type?: DataUrlType, backgroundColor?: string, callback?: Function, widths?: number, heights?: number, vCanvasEl?: any): void;
    /**
     * 返回可见区域的图的 dataUrl，用于生成图片
     * @param {String} type 图片类型，可选值："image/png" | "image/jpeg" | "image/webp" | "image/bmp"
     * @param {string} backgroundColor 图片背景色
     * @return {string} 图片 dataURL
     */
    toDataURL(type?: DataUrlType, backgroundColor?: string): string;
    /**
     * 返回整个图（包括超出可见区域的部分）的 dataUrl，用于生成图片
     * @param {Function} callback 异步生成 dataUrl 完成后的回调函数，在这里处理生成的 dataUrl 字符串
     * @param {String} type 图片类型，可选值："image/png" | "image/jpeg" | "image/webp" | "image/bmp"
     * @param {Object} imageConfig 图片配置项，包括背景色和上下左右的 padding
     */
    toFullDataURL(callback: (res: string) => any, type?: DataUrlType, imageConfig?: {
        backgroundColor?: string;
        padding?: number | number[];
    }): void;
    /**
     * 导出包含全图的图片
     * @param {String} name 图片的名称
     * @param {String} type 图片类型，可选值："image/png" | "image/jpeg" | "image/webp" | "image/bmp"
     * @param {Object} imageConfig 图片配置项，包括背景色和上下左右的 padding
     */
    downloadFullImage(name?: string, type?: DataUrlType, imageConfig?: {
        backgroundColor?: string;
        padding?: number | number[];
    }): void;
    /**
     * 画布导出图片，图片仅包含画布可见区域部分内容
     * @param {String} name 图片的名称
     * @param {String} type 图片类型，可选值："image/png" | "image/jpeg" | "image/webp" | "image/bmp"
     * @param {string} backgroundColor 图片背景色
     */
    downloadImage(name?: string, type?: DataUrlType, backgroundColor?: string): void;
    private dataURLToImage;
    /**
     * 添加插件
     * @param {object} plugin 插件实例
     */
    addPlugin(plugin: PluginBase): void;
    /**
     * 添加插件
     * @param {object} plugin 插件实例
     */
    removePlugin(plugin: PluginBase): void;
    /**
     * 设置图片水印
     * @param {string} imgURL 图片水印的url地址
     * @param {WaterMarkerConfig} config 文本水印的配置项
     */
    setImageWaterMarker(imgURL?: string | undefined, config?: WaterMarkerConfig): void;
    /**
     * 设置文本水印
     * @param {string[]} texts 水印的文本内容
     * @param {WaterMarkerConfig} config 文本水印的配置项
     */
    setTextWaterMarker(texts: string[] | string | undefined, config?: WaterMarkerConfig): void;
    /**
     * 销毁画布
     */
    destroy(): void;
}
