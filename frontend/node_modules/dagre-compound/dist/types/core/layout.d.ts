import { RenderGroupNodeInfo, RenderNodeInfo } from './render-info';
import { DeepPartial } from './util';
import { LayoutConfig } from '../interfaces/layout';
export declare function layoutScene(renderNodeInfo: RenderGroupNodeInfo, setting?: DeepPartial<LayoutConfig>): void;
export declare function layoutChildren(renderNodeInfo: RenderGroupNodeInfo, setting?: DeepPartial<LayoutConfig>): void;
export declare function layoutMetaNode(renderNodeInfo: RenderGroupNodeInfo, setting?: DeepPartial<LayoutConfig>): void;
export declare function computeCXPositionOfNodeShape(renderInfo: RenderNodeInfo): number;
