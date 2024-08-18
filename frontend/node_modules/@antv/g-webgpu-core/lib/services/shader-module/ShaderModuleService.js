"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));
var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));
var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));
var _uniq2 = _interopRequireDefault(require("lodash/uniq"));
var _shaderModule = require("../../utils/shader-module");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
var precisionRegExp = /precision\s+(high|low|medium)p\s+float/;
var globalDefaultprecision = '#ifdef GL_FRAGMENT_PRECISION_HIGH\n precision highp float;\n #else\n precision mediump float;\n#endif\n';
var includeRegExp = /#pragma include (["^+"]?["\ "[a-zA-Z_0-9](.*)"]*?)/g;
var ShaderModuleService = /*#__PURE__*/function () {
  function ShaderModuleService() {
    (0, _classCallCheck2.default)(this, ShaderModuleService);
    this.moduleCache = {};
    this.rawContentCache = {};
  }
  (0, _createClass2.default)(ShaderModuleService, [{
    key: "registerBuiltinModules",
    value: function registerBuiltinModules() {
      this.destroy();
    }
  }, {
    key: "registerModule",
    value: function registerModule(moduleName, moduleParams) {
      // prevent registering the same module multiple times
      if (this.rawContentCache[moduleName]) {
        return;
      }
      var _moduleParams$vs = moduleParams.vs,
        vs = _moduleParams$vs === void 0 ? '' : _moduleParams$vs,
        _moduleParams$fs = moduleParams.fs,
        fs = _moduleParams$fs === void 0 ? '' : _moduleParams$fs,
        declaredUniforms = moduleParams.uniforms;
      var _extractUniforms = (0, _shaderModule.extractUniforms)(vs),
        extractedVS = _extractUniforms.content,
        vsUniforms = _extractUniforms.uniforms;
      var _extractUniforms2 = (0, _shaderModule.extractUniforms)(fs),
        extractedFS = _extractUniforms2.content,
        fsUniforms = _extractUniforms2.uniforms;
      this.rawContentCache[moduleName] = {
        fs: extractedFS,
        uniforms: _objectSpread(_objectSpread(_objectSpread({}, vsUniforms), fsUniforms), declaredUniforms),
        vs: extractedVS
      };
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.moduleCache = {};
      this.rawContentCache = {};
    }
  }, {
    key: "getModule",
    value: function getModule(moduleName) {
      var _this = this;
      if (this.moduleCache[moduleName]) {
        return this.moduleCache[moduleName];
      }
      var rawVS = this.rawContentCache[moduleName].vs || '';
      var rawFS = this.rawContentCache[moduleName].fs || '';
      var _this$processModule = this.processModule(rawVS, [], 'vs'),
        vs = _this$processModule.content,
        vsIncludeList = _this$processModule.includeList;
      var _this$processModule2 = this.processModule(rawFS, [], 'fs'),
        fs = _this$processModule2.content,
        fsIncludeList = _this$processModule2.includeList;
      var compiledFs = fs;
      // TODO: extract uniforms and their default values from GLSL
      var uniforms = (0, _uniq2.default)(vsIncludeList.concat(fsIncludeList).concat(moduleName)).reduce(function (prev, cur) {
        return _objectSpread(_objectSpread({}, prev), _this.rawContentCache[cur].uniforms);
      }, {});

      /**
       * set default precision for fragment shader
       * https://stackoverflow.com/questions/28540290/why-it-is-necessary-to-set-precision-for-the-fragment-shader
       */
      if (!precisionRegExp.test(fs)) {
        compiledFs = globalDefaultprecision + fs;
      }
      this.moduleCache[moduleName] = {
        fs: compiledFs.trim(),
        uniforms: uniforms,
        vs: vs.trim()
      };
      return this.moduleCache[moduleName];
    }
  }, {
    key: "processModule",
    value: function processModule(rawContent, includeList, type) {
      var _this2 = this;
      var compiled = rawContent.replace(includeRegExp, function (_, strMatch) {
        var includeOpt = strMatch.split(' ');
        var includeName = includeOpt[0].replace(/"/g, '');
        if (includeList.indexOf(includeName) > -1) {
          return '';
        }
        var txt = _this2.rawContentCache[includeName][type];
        includeList.push(includeName);
        var _this2$processModule = _this2.processModule(txt || '', includeList, type),
          content = _this2$processModule.content;
        return content;
      });
      return {
        content: compiled,
        includeList: includeList
      };
    }
  }]);
  return ShaderModuleService;
}();
exports.default = ShaderModuleService;
//# sourceMappingURL=ShaderModuleService.js.map