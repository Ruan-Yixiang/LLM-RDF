import { DeepPartial } from './util';
import { LayoutConfig } from '../interfaces/layout';
export declare const LAYOUT_CONFIG: LayoutConfig;
export declare function mergeConfig(config?: DeepPartial<LayoutConfig>, source?: LayoutConfig): LayoutConfig;
