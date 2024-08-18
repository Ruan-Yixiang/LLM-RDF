import { __assign } from "tslib";
import { registerBehavior, registerCombo, registerEdge, registerNode, Arrow, Marker, Shape } from '@antv/g6-core';
import * as AlgorithmSync from '@antv/algorithm';
import * as AlgorithmAsync from '@antv/algorithm/lib/asyncIndex';
import Graph from './graph/graph';
import TreeGraph from './graph/tree-graph';
import { TreeLayout, Layout, registerLayout } from './layout';
import Global from './global';
import Util from './util';
import Plugin from './plugin';
import './element';
import './behavior';
var Algorithm = __assign(__assign({}, AlgorithmSync), AlgorithmAsync);
var Grid = Plugin.Grid;
var Minimap = Plugin.Minimap;
var Bundling = Plugin.Bundling;
var Menu = Plugin.Menu;
var Fisheye = Plugin.Fisheye;
var ToolBar = Plugin.ToolBar;
var Tooltip = Plugin.Tooltip;
var TimeBar = Plugin.TimeBar;
var ImageMinimap = Plugin.ImageMinimap;
var EdgeFilterLens = Plugin.EdgeFilterLens;
var SnapLine = Plugin.SnapLine;
var Legend = Plugin.Legend;
var Annotation = Plugin.Annotation;
export * from '@antv/g6-core';
export * from './types';
export * from './interface/graph';
export { Graph, TreeGraph, Util, Layout, TreeLayout, registerLayout, Global, Minimap, Grid, Bundling, Menu, Fisheye, Algorithm, ToolBar, Tooltip, TimeBar, ImageMinimap, EdgeFilterLens, SnapLine, Legend, Annotation, Arrow, Marker, Shape };
export default {
  version: Global.version,
  Graph: Graph,
  TreeGraph: TreeGraph,
  Util: Util,
  Layout: Layout,
  TreeLayout: TreeLayout,
  registerLayout: registerLayout,
  Global: Global,
  registerBehavior: registerBehavior,
  registerCombo: registerCombo,
  registerEdge: registerEdge,
  registerNode: registerNode,
  Minimap: Plugin.Minimap,
  Grid: Plugin.Grid,
  Bundling: Plugin.Bundling,
  Menu: Plugin.Menu,
  ToolBar: Plugin.ToolBar,
  Tooltip: Plugin.Tooltip,
  Legend: Plugin.Legend,
  TimeBar: TimeBar,
  SnapLine: SnapLine,
  Fisheye: Fisheye,
  ImageMinimap: ImageMinimap,
  EdgeFilterLens: EdgeFilterLens,
  Annotation: Annotation,
  Algorithm: Algorithm,
  Arrow: Arrow,
  Marker: Marker,
  Shape: Shape
};