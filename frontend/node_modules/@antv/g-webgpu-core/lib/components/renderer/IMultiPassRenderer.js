"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PassType = void 0;
var PassType;
/**
 * Pass 分两类：
 * 1. 渲染相关 eg. ClearPass、RenderPass、PickingPass、ShadowPass
 * 2. PostProcessing eg. CopyPass、BlurPass
 * 另外考虑到 Pass 之间严格的执行顺序，render 方法必须是异步的
 */
exports.PassType = PassType;
(function (PassType) {
  PassType["Normal"] = "normal";
  PassType["PostProcessing"] = "post-processing";
})(PassType || (exports.PassType = PassType = {}));
//# sourceMappingURL=IMultiPassRenderer.js.map