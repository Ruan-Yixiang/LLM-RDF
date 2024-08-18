"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _tslib = require("tslib");
var _gCanvas = require("@antv/g-canvas");
var _gSvg = require("@antv/g-svg");
var _matrixUtil = require("@antv/matrix-util");
var _util = require("@antv/util");
var _g6Core = require("@antv/g6-core");
var _global = _interopRequireDefault(require("../global"));
var _controller = require("./controller");
var _domUtil = require("@antv/dom-util");
var _image = require("../util/image");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var transform = _matrixUtil.ext.transform;
var SVG = 'svg';
var Graph = /** @class */function (_super) {
  (0, _tslib.__extends)(Graph, _super);
  function Graph(cfg) {
    var _this = _super.call(this, cfg) || this;
    var defaultNode = _this.get('defaultNode');
    if (!defaultNode) {
      _this.set('defaultNode', {
        type: 'circle'
      });
    }
    if (!defaultNode.type) {
      defaultNode.type = 'circle';
      _this.set('defaultNode', defaultNode);
    }
    _this.destroyed = false;
    return _this;
  }
  Graph.prototype.initLayoutController = function () {
    var layoutController = new _controller.LayoutController(this);
    this.set({
      layoutController: layoutController
    });
  };
  Graph.prototype.initEventController = function () {
    var eventController = new _controller.EventController(this);
    this.set({
      eventController: eventController
    });
  };
  Graph.prototype.initCanvas = function () {
    var container = this.get('container');
    if (typeof container === 'string') {
      container = document.getElementById(container);
      this.set('container', container);
    }
    if (!container) {
      throw new Error('invalid container');
    }
    var clientWidth = container.clientWidth,
      clientHeight = container.clientHeight;
    var width = this.get('width') || clientWidth;
    var height = this.get('height') || clientHeight;
    if (!this.get('width') && !this.get('height')) {
      this.set('width', clientWidth);
      this.set('height', clientHeight);
    }
    var renderer = this.get('renderer');
    var canvas;
    if (renderer === SVG) {
      canvas = new _gSvg.Canvas({
        container: container,
        width: width,
        height: height
      });
    } else {
      var canvasCfg = {
        container: container,
        width: width,
        height: height
      };
      var pixelRatio = this.get('pixelRatio');
      if (pixelRatio) {
        canvasCfg.pixelRatio = pixelRatio;
        window.devicePixelRatio = pixelRatio;
      }
      canvas = new _gCanvas.Canvas(canvasCfg);
    }
    this.set('canvas', canvas);
  };
  Graph.prototype.initPlugins = function () {
    var self = this;
    (0, _util.each)(self.get('plugins'), function (plugin) {
      if (!plugin.destroyed && plugin.initPlugin) {
        plugin.initPlugin(self);
      }
    });
  };
  /**
  * 增加图片下载水印功能
  */
  Graph.prototype.downloadImageWatermark = function (watermarker, context, width, height) {
    return (0, _tslib.__awaiter)(this, void 0, void 0, function () {
      var watermarkStr, watermarkbase64, img;
      return (0, _tslib.__generator)(this, function (_a) {
        switch (_a.label) {
          case 0:
            watermarkStr = watermarker.style.backgroundImage;
            watermarkbase64 = watermarkStr.slice(5, watermarkStr.length - 2);
            img = new Image();
            img.src = watermarkbase64;
            return [4 /*yield*/, new Promise(function (resolve) {
              img.onload = function () {
                var pat = context.createPattern(img, "repeat");
                context.rect(0, 0, width, height);
                context.fillStyle = pat;
                context.fill();
                resolve('');
              };
            })];
          case 1:
            _a.sent();
            return [2 /*return*/];
        }
      });
    });
  };
  /**
   * 用于生成图片 (异步callback)
   * @param {String} type 图片类型，可选值："image/png" | "image/jpeg" | "image/webp" | "image/bmp"
   * @param {string} backgroundColor 图片背景色
   * @return {string} 图片 dataURL
   */
  Graph.prototype.asyncToDataUrl = function (type, backgroundColor, callback, widths, heights, vCanvasEl) {
    var _this = this;
    var watermarker = document.querySelector('.g6-graph-watermarker');
    var canvas = this.get('canvas');
    var renderer = canvas.getRenderer();
    var canvasDom = vCanvasEl || canvas.get('el');
    var dataURL = '';
    if (!type) type = 'image/png';
    setTimeout(function () {
      return (0, _tslib.__awaiter)(_this, void 0, void 0, function () {
        var cloneNode, svgDocType, svgDoc, svgData, imageData, context, width, height, compositeOperation, pixelRatio;
        return (0, _tslib.__generator)(this, function (_a) {
          switch (_a.label) {
            case 0:
              if (!(renderer === 'svg')) return [3 /*break*/, 1];
              cloneNode = canvasDom.cloneNode(true);
              svgDocType = document.implementation.createDocumentType('svg', '-//W3C//DTD SVG 1.1//EN', 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd');
              svgDoc = document.implementation.createDocument('http://www.w3.org/2000/svg', 'svg', svgDocType);
              svgDoc.replaceChild(cloneNode, svgDoc.documentElement);
              svgData = new XMLSerializer().serializeToString(svgDoc);
              dataURL = "data:image/svg+xml;charset=utf8,".concat(encodeURIComponent(svgData));
              return [3 /*break*/, 4];
            case 1:
              imageData = void 0;
              context = canvasDom.getContext('2d');
              width = widths || this.get('width');
              height = heights || this.get('height');
              compositeOperation = void 0;
              if (!watermarker) return [3 /*break*/, 3];
              return [4 /*yield*/, this.downloadImageWatermark(watermarker, context, width, height)];
            case 2:
              _a.sent();
              _a.label = 3;
            case 3:
              if (backgroundColor) {
                pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
                try {
                  imageData = context.getImageData(0, 0, width * pixelRatio, height * pixelRatio);
                  compositeOperation = context.globalCompositeOperation;
                  context.globalCompositeOperation = 'destination-over';
                  context.fillStyle = backgroundColor;
                  context.fillRect(0, 0, width, height);
                } catch (error) {
                  console.error('Download image failed. Out of memory at ImageData creation');
                }
              }
              dataURL = canvasDom.toDataURL(type);
              if (backgroundColor) {
                context.clearRect(0, 0, width, height);
                context.putImageData(imageData, 0, 0);
                context.globalCompositeOperation = compositeOperation;
              }
              _a.label = 4;
            case 4:
              if (callback) callback(dataURL);
              return [2 /*return*/];
          }
        });
      });
    }, 16);
  };
  /**
   * 返回可见区域的图的 dataUrl，用于生成图片
   * @param {String} type 图片类型，可选值："image/png" | "image/jpeg" | "image/webp" | "image/bmp"
   * @param {string} backgroundColor 图片背景色
   * @return {string} 图片 dataURL
   */
  Graph.prototype.toDataURL = function (type, backgroundColor) {
    var canvas = this.get('canvas');
    var renderer = canvas.getRenderer();
    var canvasDom = canvas.get('el');
    if (!type) type = 'image/png';
    var dataURL = '';
    if (renderer === 'svg') {
      var cloneNode = canvasDom.cloneNode(true);
      var svgDocType = document.implementation.createDocumentType('svg', '-//W3C//DTD SVG 1.1//EN', 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd');
      var svgDoc = document.implementation.createDocument('http://www.w3.org/2000/svg', 'svg', svgDocType);
      svgDoc.replaceChild(cloneNode, svgDoc.documentElement);
      var svgData = new XMLSerializer().serializeToString(svgDoc);
      dataURL = "data:image/svg+xml;charset=utf8,".concat(encodeURIComponent(svgData));
    } else {
      var imageData = void 0;
      var context = canvasDom.getContext('2d');
      var width = Math.max(this.get('width'), 500);
      var height = Math.max(this.get('height'), 500);
      var compositeOperation = void 0;
      if (backgroundColor) {
        var pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;
        try {
          imageData = context.getImageData(0, 0, width * pixelRatio, height * pixelRatio);
          compositeOperation = context.globalCompositeOperation;
          context.globalCompositeOperation = 'destination-over';
          context.fillStyle = backgroundColor;
          context.fillRect(0, 0, width, height);
        } catch (error) {
          console.error('Download image failed. Out of memory at ImageData creation');
        }
      }
      dataURL = canvasDom.toDataURL(type);
      if (backgroundColor) {
        context.clearRect(0, 0, width, height);
        context.putImageData(imageData, 0, 0);
        context.globalCompositeOperation = compositeOperation;
      }
    }
    return dataURL;
  };
  /**
   * 返回整个图（包括超出可见区域的部分）的 dataUrl，用于生成图片
   * @param {Function} callback 异步生成 dataUrl 完成后的回调函数，在这里处理生成的 dataUrl 字符串
   * @param {String} type 图片类型，可选值："image/png" | "image/jpeg" | "image/webp" | "image/bmp"
   * @param {Object} imageConfig 图片配置项，包括背景色和上下左右的 padding
   */
  Graph.prototype.toFullDataURL = function (callback, type, imageConfig) {
    var bbox = this.get('group').getCanvasBBox();
    var height = bbox.height;
    var width = bbox.width;
    var renderer = this.get('renderer');
    var vContainerDOM = (0, _domUtil.createDom)('<div id="virtual-image"></div>');
    var backgroundColor = imageConfig ? imageConfig.backgroundColor : undefined;
    var padding = imageConfig ? imageConfig.padding : undefined;
    if (!padding) padding = [0, 0, 0, 0];else if ((0, _util.isNumber)(padding)) padding = [padding, padding, padding, padding];
    var vHeight = height + padding[0] + padding[2];
    var vWidth = width + padding[1] + padding[3];
    var canvasOptions = {
      container: vContainerDOM,
      height: vHeight,
      width: vWidth,
      quickHit: true
    };
    var vCanvas = renderer === 'svg' ? new _gSvg.Canvas(canvasOptions) : new _gCanvas.Canvas(canvasOptions);
    var group = this.get('group');
    var vGroup = group.clone();
    var matrix = (0, _util.clone)(vGroup.getMatrix());
    if (!matrix) matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    var centerX = (bbox.maxX + bbox.minX) / 2;
    var centerY = (bbox.maxY + bbox.minY) / 2;
    matrix = transform(matrix, [['t', -centerX, -centerY], ['t', width / 2 + padding[3], height / 2 + padding[0]]]);
    vGroup.resetMatrix();
    vGroup.setMatrix(matrix);
    vCanvas.add(vGroup);
    var vCanvasEl = vCanvas.get('el');
    var dataURL = '';
    if (!type) type = 'image/png';
    setTimeout(function () {
      if (renderer === 'svg') {
        var cloneNode = vCanvasEl.cloneNode(true);
        var svgDocType = document.implementation.createDocumentType('svg', '-//W3C//DTD SVG 1.1//EN', 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd');
        var svgDoc = document.implementation.createDocument('http://www.w3.org/2000/svg', 'svg', svgDocType);
        svgDoc.replaceChild(cloneNode, svgDoc.documentElement);
        var svgData = new XMLSerializer().serializeToString(svgDoc);
        dataURL = "data:image/svg+xml;charset=utf8,".concat(encodeURIComponent(svgData));
      } else {
        var imageData = void 0;
        var context = vCanvasEl.getContext('2d');
        var compositeOperation = void 0;
        if (backgroundColor) {
          var pixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
          try {
            imageData = context.getImageData(0, 0, vWidth * pixelRatio, vHeight * pixelRatio);
            compositeOperation = context.globalCompositeOperation;
            context.globalCompositeOperation = 'destination-over';
            context.fillStyle = backgroundColor;
            context.fillRect(0, 0, vWidth, vHeight);
          } catch (error) {
            console.error('Download image failed. Out of memory at ImageData creation');
          }
        }
        dataURL = vCanvasEl.toDataURL(type);
        if (backgroundColor) {
          context.clearRect(0, 0, vWidth, vHeight);
          context.putImageData(imageData, 0, 0);
          context.globalCompositeOperation = compositeOperation;
        }
      }
      if (callback) callback(dataURL);
    }, 16);
  };
  /**
   * 导出包含全图的图片
   * @param {String} name 图片的名称
   * @param {String} type 图片类型，可选值："image/png" | "image/jpeg" | "image/webp" | "image/bmp"
   * @param {Object} imageConfig 图片配置项，包括背景色和上下左右的 padding
   */
  Graph.prototype.downloadFullImage = function (name, type, imageConfig) {
    var _this = this;
    var bbox = this.get('group').getCanvasBBox();
    var height = bbox.height;
    var width = bbox.width;
    var renderer = this.get('renderer');
    var vContainerDOM = (0, _domUtil.createDom)('<div id="virtual-image"></div>');
    var watermarker = document.querySelector('.g6-graph-watermarker');
    var backgroundColor = imageConfig ? imageConfig.backgroundColor : undefined;
    var padding = imageConfig ? imageConfig.padding : undefined;
    if (!padding) padding = [0, 0, 0, 0];else if ((0, _util.isNumber)(padding)) padding = [padding, padding, padding, padding];
    var vHeight = height + padding[0] + padding[2];
    var vWidth = width + padding[1] + padding[3];
    if (watermarker) {
      var _a = this.get('graphWaterMarker').cfg || {},
        wmWidth = _a.width,
        wmHeight = _a.height;
      vHeight = Math.ceil(vHeight / wmHeight) * wmHeight;
      vWidth = Math.ceil(vWidth / wmWidth) * wmWidth;
    }
    var canvasOptions = {
      container: vContainerDOM,
      height: vHeight,
      width: vWidth
    };
    var vCanvas = renderer === 'svg' ? new _gSvg.Canvas(canvasOptions) : new _gCanvas.Canvas(canvasOptions);
    var group = this.get('group');
    // clone group and clone image shape's clip
    var vGroup = (0, _image.cloneGElement)(group);
    var matrix = (0, _util.clone)(vGroup.getMatrix());
    if (!matrix) matrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    var centerX = (bbox.maxX + bbox.minX) / 2;
    var centerY = (bbox.maxY + bbox.minY) / 2;
    matrix = transform(matrix, [['t', -centerX, -centerY], ['t', width / 2 + padding[3], height / 2 + padding[0]]]);
    vGroup.resetMatrix();
    vGroup.setMatrix(matrix);
    vCanvas.add(vGroup);
    var vCanvasEl = vCanvas.get('el');
    if (!type) type = 'image/png';
    this.asyncToDataUrl(type, backgroundColor, function (dataURL) {
      var link = document.createElement('a');
      var fileName = (name || 'graph') + (renderer === 'svg' ? '.svg' : ".".concat(type.split('/')[1]));
      _this.dataURLToImage(dataURL, renderer, link, fileName);
      var e = document.createEvent('MouseEvents');
      e.initEvent('click', false, false);
      link.dispatchEvent(e);
    }, vWidth, vHeight, vCanvasEl);
  };
  /**
   * 画布导出图片，图片仅包含画布可见区域部分内容
   * @param {String} name 图片的名称
   * @param {String} type 图片类型，可选值："image/png" | "image/jpeg" | "image/webp" | "image/bmp"
   * @param {string} backgroundColor 图片背景色
   */
  Graph.prototype.downloadImage = function (name, type, backgroundColor) {
    var _this = this;
    var self = this;
    self.stopAnimate();
    var canvas = self.get('canvas');
    var renderer = canvas.getRenderer();
    if (!type) type = 'image/png';
    var fileName = (name || 'graph') + (renderer === 'svg' ? '.svg' : type.split('/')[1]);
    var link = document.createElement('a');
    self.asyncToDataUrl(type, backgroundColor, function (dataURL) {
      _this.dataURLToImage(dataURL, renderer, link, fileName);
      var e = document.createEvent('MouseEvents');
      e.initEvent('click', false, false);
      link.dispatchEvent(e);
    });
  };
  Graph.prototype.dataURLToImage = function (dataURL, renderer, link, fileName) {
    if (!dataURL || dataURL === 'data:') {
      console.error('Download image failed. The graph is too large or there is invalid attribute values in graph items');
      return;
    }
    if (typeof window !== 'undefined') {
      if (window.Blob && window.URL && renderer !== 'svg') {
        var arr = dataURL.split(',');
        var mime = '';
        if (arr && arr.length > 0) {
          var match = arr[0].match(/:(.*?);/);
          // eslint-disable-next-line prefer-destructuring
          if (match && match.length >= 2) mime = match[1];
        }
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        var blobObj_1 = new Blob([u8arr], {
          type: mime
        });
        if (window.navigator.msSaveBlob) {
          window.navigator.msSaveBlob(blobObj_1, fileName);
        } else {
          link.addEventListener('click', function () {
            link.download = fileName;
            link.href = window.URL.createObjectURL(blobObj_1);
          });
        }
      } else {
        link.addEventListener('click', function () {
          link.download = fileName;
          link.href = dataURL;
        });
      }
    }
  };
  /**
   * 添加插件
   * @param {object} plugin 插件实例
   */
  Graph.prototype.addPlugin = function (plugin) {
    var self = this;
    if (plugin.destroyed) {
      return;
    }
    self.get('plugins').push(plugin);
    plugin.initPlugin(self);
  };
  /**
   * 添加插件
   * @param {object} plugin 插件实例
   */
  Graph.prototype.removePlugin = function (plugin) {
    var plugins = this.get('plugins');
    var index = plugins.indexOf(plugin);
    if (index >= 0) {
      plugin.destroyPlugin();
      plugins.splice(index, 1);
    }
  };
  /**
   * 设置图片水印
   * @param {string} imgURL 图片水印的url地址
   * @param {WaterMarkerConfig} config 文本水印的配置项
   */
  Graph.prototype.setImageWaterMarker = function (imgURL, config) {
    if (imgURL === void 0) {
      imgURL = _global.default.waterMarkerImage;
    }
    var container = this.get('container');
    if ((0, _util.isString)(container)) {
      container = document.getElementById(container);
    }
    if (!container.style.position) {
      container.style.position = 'relative';
    }
    var canvas = this.get('graphWaterMarker');
    var waterMarkerConfig = (0, _util.deepMix)({}, _global.default.imageWaterMarkerConfig, config);
    var width = waterMarkerConfig.width,
      height = waterMarkerConfig.height,
      compatible = waterMarkerConfig.compatible,
      image = waterMarkerConfig.image;
    if (!imgURL) {
      var dom = compatible ? container : document.querySelector('.g6-graph-watermarker');
      if (dom) dom.style.cssText = undefined;
      if (canvas) canvas.clear();
      return;
    }
    if (!canvas) {
      var canvasCfg = {
        container: container,
        width: width,
        height: height,
        capture: false
      };
      var pixelRatio = this.get('pixelRatio');
      if (pixelRatio) {
        canvasCfg.pixelRatio = pixelRatio;
        window.devicePixelRatio = pixelRatio;
      }
      canvas = new _gCanvas.Canvas(canvasCfg);
      this.set('graphWaterMarker', canvas);
    } else {
      canvas.clear();
    }
    canvas.get('el').style.display = 'none';
    var ctx = canvas.get('context');
    var rotate = image.rotate,
      x = image.x,
      y = image.y;
    // 旋转20度
    ctx.rotate(-rotate * Math.PI / 180);
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imgURL;
    img.onload = function () {
      ctx.drawImage(img, x, y, image.width, image.height);
      // 恢复旋转角度
      ctx.rotate(rotate * Math.PI / 180);
      // 默认按照现代浏览器处理
      if (!compatible) {
        var box = document.querySelector('.g6-graph-watermarker');
        if (!box) {
          box = document.createElement('div');
          box.className = 'g6-graph-watermarker';
        }
        box.className = 'g6-graph-watermarker';
        if (!canvas.destroyed) {
          box.style.cssText = "background-image: url(".concat(canvas.get('el').toDataURL('image/png'), ");background-repeat:repeat;position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;z-index:-1;");
          container.appendChild(box);
        }
      } else {
        // 当需要兼容不支持 pointer-events属性的浏览器时，将 compatible 设置为 true
        container.style.cssText = "background-image: url(".concat(canvas.get('el').toDataURL('image/png'), ");background-repeat:repeat;");
      }
    };
  };
  /**
   * 设置文本水印
   * @param {string[]} texts 水印的文本内容
   * @param {WaterMarkerConfig} config 文本水印的配置项
   */
  Graph.prototype.setTextWaterMarker = function (texts, config) {
    var container = this.get('container');
    if ((0, _util.isString)(container)) {
      container = document.getElementById(container);
    }
    if (!container.style.position) {
      container.style.position = 'relative';
    }
    var canvas = this.get('graphWaterMarker');
    var waterMarkerConfig = (0, _util.deepMix)({}, _global.default.textWaterMarkerConfig, config);
    var width = waterMarkerConfig.width,
      height = waterMarkerConfig.height,
      compatible = waterMarkerConfig.compatible,
      text = waterMarkerConfig.text;
    if (!(texts === null || texts === void 0 ? void 0 : texts.length)) {
      var dom = compatible ? container : document.querySelector('.g6-graph-watermarker');
      if (dom) dom.style.cssText = undefined;
      if (canvas) canvas.clear();
      return;
    }
    if (!canvas) {
      var canvasCfg = {
        container: container,
        width: width,
        height: height,
        capture: false
      };
      var pixelRatio = this.get('pixelRatio');
      if (pixelRatio) {
        canvasCfg.pixelRatio = pixelRatio;
        window.devicePixelRatio = pixelRatio;
      }
      canvas = new _gCanvas.Canvas(canvasCfg);
      this.set('graphWaterMarker', canvas);
    } else {
      canvas.clear();
    }
    canvas.get('el').style.display = 'none';
    var ctx = canvas.get('context');
    var rotate = text.rotate,
      fill = text.fill,
      fontFamily = text.fontFamily,
      fontSize = text.fontSize,
      baseline = text.baseline,
      x = text.x,
      y = text.y,
      lineHeight = text.lineHeight;
    // 旋转20度
    ctx.rotate(-rotate * Math.PI / 180);
    // 设置文字样式
    ctx.font = "".concat(fontSize, "px ").concat(fontFamily);
    // 设置文字颜色
    ctx.fillStyle = fill;
    ctx.textBaseline = baseline;
    var displayTexts = (0, _util.isString)(texts) ? [texts] : texts;
    for (var i = displayTexts.length - 1; i >= 0; i--) {
      // 将文字绘制到画布
      ctx.fillText(displayTexts[i], x, y + i * lineHeight);
    }
    // 恢复旋转角度
    ctx.rotate(rotate * Math.PI / 180);
    // 默认按照现代浏览器处理
    if (!compatible) {
      var box = document.querySelector('.g6-graph-watermarker');
      if (!box) {
        box = document.createElement('div');
        box.className = 'g6-graph-watermarker';
      }
      box.style.cssText = "background-image: url(".concat(canvas.get('el').toDataURL('image/png'), ");background-repeat:repeat;position:absolute;top:0;bottom:0;left:0;right:0;pointer-events:none;z-index:99;");
      container.appendChild(box);
    } else {
      // 当需要兼容不支持 pointer-events属性的浏览器时，将 compatible 设置为 true
      container.style.cssText = "background-image: url(".concat(canvas.get('el').toDataURL('image/png'), ");background-repeat:repeat;");
    }
  };
  /**
   * 销毁画布
   */
  Graph.prototype.destroy = function () {
    var _a, _b, _c, _d;
    (0, _util.each)(this.get('plugins'), function (plugin) {
      plugin.destroyPlugin();
    });
    // destroy tooltip doms, removed when upgrade G6 4.0
    var tooltipDOMs = this.get('tooltips');
    if (tooltipDOMs) {
      for (var i = 0; i < tooltipDOMs.length; i++) {
        var container = tooltipDOMs[i];
        if (!container) continue;
        var parent_1 = container.parentElement;
        if (!parent_1) continue;
        parent_1.removeChild(container);
      }
    }
    (_a = this.get('eventController')) === null || _a === void 0 ? void 0 : _a.destroy();
    (_b = this.get('layoutController')) === null || _b === void 0 ? void 0 : _b.destroy();
    // this.get('eventController').destroy();
    // this.get('itemController').destroy();
    // this.get('modeController').destroy();
    // this.get('viewController').destroy();
    // this.get('stateController').destroy();
    // this.get('canvas').destroy();
    (_c = this.get('graphWaterMarker')) === null || _c === void 0 ? void 0 : _c.destroy();
    (_d = document.querySelector('.g6-graph-watermarker')) === null || _d === void 0 ? void 0 : _d.remove();
    _super.prototype.destroy.call(this);
  };
  return Graph;
}(_g6Core.AbstractGraph);
var _default = Graph;
exports.default = _default;