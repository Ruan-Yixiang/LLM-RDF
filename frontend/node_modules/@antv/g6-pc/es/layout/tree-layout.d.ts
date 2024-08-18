import { TreeGraphData } from '@antv/g6-core';
import { TreeLayoutConfig } from '../types';
declare class TreeLayout {
    type: string;
    radial: boolean;
    data: TreeGraphData;
    config: any;
    private layoutMethod;
    constructor(cfg: TreeLayoutConfig);
    init(data: TreeGraphData): void;
    execute(): any;
    layout(data: any): any;
}
export default TreeLayout;
