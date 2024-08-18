import { Arrow, Marker, Shape } from '@antv/g6-core';
import { ICanvas, IGroup, IShape } from '@antv/g-base';
import * as AlgorithmSync from '@antv/algorithm';
import * as AlgorithmAsync from '@antv/algorithm/lib/asyncIndex';
import Graph from './graph/graph';
import TreeGraph from './graph/tree-graph';
import { TreeLayout, Layout, registerLayout } from './layout';
import Global from './global';
import Util from './util';
import './element';
import './behavior';
type IAlgorithm = typeof AlgorithmSync | typeof AlgorithmAsync;
declare const Algorithm: IAlgorithm;
declare const Grid: typeof import("@antv/g6-plugin").Grid;
declare const Minimap: typeof import("@antv/g6-plugin").Minimap;
declare const Bundling: typeof import("@antv/g6-plugin").Bundling;
declare const Menu: typeof import("@antv/g6-plugin").Menu;
declare const Fisheye: typeof import("@antv/g6-plugin").Fisheye;
declare const ToolBar: typeof import("@antv/g6-plugin").ToolBar;
declare const Tooltip: typeof import("@antv/g6-plugin").Tooltip;
declare const TimeBar: typeof import("@antv/g6-plugin").TimeBar;
declare const ImageMinimap: typeof import("@antv/g6-plugin").ImageMinimap;
declare const EdgeFilterLens: typeof import("@antv/g6-plugin").EdgeFilterLens;
declare const SnapLine: typeof import("@antv/g6-plugin").SnapLine;
declare const Legend: typeof import("@antv/g6-plugin").Legend;
declare const Annotation: typeof import("@antv/g6-plugin").Annotation;
export * from '@antv/g6-core';
export * from './types';
export * from './interface/graph';
export { Graph, TreeGraph, Util, Layout, TreeLayout, registerLayout, Global, Minimap, Grid, Bundling, Menu, Fisheye, Algorithm, ToolBar, Tooltip, TimeBar, ImageMinimap, EdgeFilterLens, SnapLine, Legend, Annotation, Arrow, Marker, Shape, ICanvas, IGroup, IShape, };
declare const _default: {
    version: string;
    Graph: typeof Graph;
    TreeGraph: typeof TreeGraph;
    Util: any;
    Layout: {
        [key: string]: any;
    };
    TreeLayout: typeof TreeLayout;
    registerLayout: (name: string, layoutOverride: any) => void;
    Global: {
        version: string;
        rootContainerClassName: string;
        nodeContainerClassName: string;
        edgeContainerClassName: string;
        comboContainerClassName: string;
        delegateContainerClassName: string;
        defaultLoopPosition: string;
        nodeLabel: {
            style: {
                fill: string;
                fontSize: number;
                textAlign: string;
                textBaseline: string;
            };
            offset: number;
        };
        defaultNode: {
            type: string;
            style: {
                lineWidth: number;
                stroke: any;
                fill: any;
            };
            size: number;
            color: any;
            linkPoints: {
                size: number;
                lineWidth: number;
                fill: any;
                stroke: any;
            };
        };
        nodeStateStyles: {
            active: {
                fill: any;
                stroke: any;
                lineWidth: number;
                shadowColor: any;
                shadowBlur: number;
            };
            selected: {
                fill: any;
                stroke: any;
                lineWidth: number;
                shadowColor: any;
                shadowBlur: number;
                'text-shape': {
                    fontWeight: number;
                };
            };
            highlight: {
                fill: any;
                stroke: any;
                lineWidth: number;
                'text-shape': {
                    fontWeight: number;
                };
            };
            inactive: {
                fill: any;
                stroke: any;
                lineWidth: number;
            };
            disable: {
                fill: any;
                stroke: any;
                lineWidth: number;
            };
        };
        edgeLabel: {
            style: {
                fill: string;
                textAlign: string;
                textBaseline: string;
                fontSize: number;
            };
        };
        defaultEdge: {
            type: string;
            size: number;
            style: {
                stroke: any;
                lineAppendWidth: number;
            };
            color: any;
        };
        edgeStateStyles: {
            active: {
                stroke: any;
                lineWidth: number;
            };
            selected: {
                stroke: any;
                lineWidth: number;
                shadowColor: any;
                shadowBlur: number;
                'text-shape': {
                    fontWeight: number;
                };
            };
            highlight: {
                stroke: any;
                lineWidth: number;
                'text-shape': {
                    fontWeight: number;
                };
            };
            inactive: {
                stroke: any;
                lineWidth: number;
            };
            disable: {
                stroke: any;
                lineWidth: number;
            };
        };
        comboLabel: {
            style: {
                fill: string;
                textBaseline: string;
                fontSize: number;
            };
            refY: number;
            refX: number;
        };
        defaultCombo: {
            type: string;
            style: {
                fill: any;
                lineWidth: number;
                stroke: any;
                r: number;
                width: number;
                height: number;
            };
            size: number[];
            color: any;
            padding: number[];
        };
        comboStateStyles: {
            active: {
                stroke: any;
                lineWidth: number;
                fill: any;
            };
            selected: {
                stroke: any;
                lineWidth: number;
                fill: any;
                shadowColor: any;
                shadowBlur: number;
                'text-shape': {
                    fontWeight: number;
                };
            };
            highlight: {
                stroke: any;
                lineWidth: number;
                fill: any;
                'text-shape': {
                    fontWeight: number;
                };
            };
            inactive: {
                stroke: any;
                fill: any;
                lineWidth: number;
            };
            disable: {
                stroke: any;
                fill: any;
                lineWidth: number;
            };
        };
        delegateStyle: {
            fill: string;
            fillOpacity: number;
            stroke: string;
            strokeOpacity: number;
            lineDash: number[];
        };
        textWaterMarkerConfig: {
            width: number;
            height: number;
            compatible: boolean;
            text: {
                x: number;
                y: number;
                lineHeight: number;
                rotate: number;
                fontSize: number;
                fontFamily: string;
                fill: string;
                baseline: string;
            };
        };
        imageWaterMarkerConfig: {
            width: number;
            height: number;
            compatible: boolean;
            image: {
                x: number;
                y: number;
                width: number;
                height: number;
                rotate: number;
            };
        };
        waterMarkerImage: string;
    };
    registerBehavior: (type: string, behavior: import("@antv/g6-core").BehaviorOption) => void;
    registerCombo: typeof Shape.registerCombo;
    registerEdge: typeof Shape.registerEdge;
    registerNode: typeof Shape.registerNode;
    Minimap: typeof import("@antv/g6-plugin").Minimap;
    Grid: typeof import("@antv/g6-plugin").Grid;
    Bundling: typeof import("@antv/g6-plugin").Bundling;
    Menu: typeof import("@antv/g6-plugin").Menu;
    ToolBar: typeof import("@antv/g6-plugin").ToolBar;
    Tooltip: typeof import("@antv/g6-plugin").Tooltip;
    Legend: typeof import("@antv/g6-plugin").Legend;
    TimeBar: typeof import("@antv/g6-plugin").TimeBar;
    SnapLine: typeof import("@antv/g6-plugin").SnapLine;
    Fisheye: typeof import("@antv/g6-plugin").Fisheye;
    ImageMinimap: typeof import("@antv/g6-plugin").ImageMinimap;
    EdgeFilterLens: typeof import("@antv/g6-plugin").EdgeFilterLens;
    Annotation: typeof import("@antv/g6-plugin").Annotation;
    Algorithm: typeof AlgorithmAsync;
    Arrow: {
        triangle: (width?: number, length?: number, d?: number) => string;
        vee: (width?: number, length?: number, d?: number) => string;
        circle: (r?: number, d?: number) => string;
        rect: (width?: number, length?: number, d?: number) => string;
        diamond: (width?: number, length?: number, d?: number) => string;
        triangleRect: (tWidth?: number, tLength?: number, rWidth?: number, rLength?: number, gap?: number, d?: number) => string;
    };
    Marker: {
        collapse: (x: any, y: any, r: any) => any[][];
        expand: (x: any, y: any, r: any) => any[][];
        upTriangle: (x: any, y: any, r: any) => any[][];
        downTriangle: (x: any, y: any, r: any) => any[][];
    };
    Shape: typeof Shape;
};
export default _default;
