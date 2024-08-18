"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AST_TOKEN_TYPES = exports.AST_NODE_TYPES = void 0;
Object.defineProperty(exports, "Component", {
  enumerable: true,
  get: function get() {
    return _ComponentManager.Component;
  }
});
Object.defineProperty(exports, "ComponentManager", {
  enumerable: true,
  get: function get() {
    return _ComponentManager.ComponentManager;
  }
});
Object.defineProperty(exports, "ConfigService", {
  enumerable: true,
  get: function get() {
    return _ConfigService.ConfigService;
  }
});
exports.Target = exports.STORAGE_CLASS = exports.DefineValuePlaceholder = void 0;
Object.defineProperty(exports, "createEntity", {
  enumerable: true,
  get: function get() {
    return _Entity.createEntity;
  }
});
Object.defineProperty(exports, "gl", {
  enumerable: true,
  get: function get() {
    return _gl.gl;
  }
});
Object.defineProperty(exports, "isSafari", {
  enumerable: true,
  get: function get() {
    return _isSafari.isSafari;
  }
});
var _ComponentManager = require("./ComponentManager");
var _gl = require("./components/renderer/gl");
var _Entity = require("./Entity");
var _ConfigService = require("./services/config/ConfigService");
var _isSafari = require("./utils/isSafari");
var AST_TOKEN_TYPES;
exports.AST_TOKEN_TYPES = AST_TOKEN_TYPES;
(function (AST_TOKEN_TYPES) {
  AST_TOKEN_TYPES["Void"] = "Void";
  AST_TOKEN_TYPES["Boolean"] = "Boolean";
  AST_TOKEN_TYPES["Float"] = "Float";
  AST_TOKEN_TYPES["Uint32"] = "Uint32";
  AST_TOKEN_TYPES["Int32"] = "Int32";
  AST_TOKEN_TYPES["Vector"] = "Vector";
  AST_TOKEN_TYPES["Vector2Float"] = "vec2<f32>";
  AST_TOKEN_TYPES["Vector3Float"] = "vec3<f32>";
  AST_TOKEN_TYPES["Vector4Float"] = "vec4<f32>";
  AST_TOKEN_TYPES["Vector2Boolean"] = "vec2<bool>";
  AST_TOKEN_TYPES["Vector3Boolean"] = "vec3<bool>";
  AST_TOKEN_TYPES["Vector4Boolean"] = "vec4<bool>";
  AST_TOKEN_TYPES["Vector2Uint"] = "vec2<u32>";
  AST_TOKEN_TYPES["Vector3Uint"] = "vec3<u32>";
  AST_TOKEN_TYPES["Vector4Uint"] = "vec4<u32>";
  AST_TOKEN_TYPES["Vector2Int"] = "vec2<i32>";
  AST_TOKEN_TYPES["Vector3Int"] = "vec3<i32>";
  AST_TOKEN_TYPES["Vector4Int"] = "vec4<i32>";
  AST_TOKEN_TYPES["Matrix"] = "Matrix";
  AST_TOKEN_TYPES["Matrix3x3Float"] = "mat3x3<f32>";
  AST_TOKEN_TYPES["Matrix4x4Float"] = "mat4x4<i32>";
  AST_TOKEN_TYPES["Struct"] = "Struct";
  AST_TOKEN_TYPES["FloatArray"] = "Float[]";
  AST_TOKEN_TYPES["Vector4FloatArray"] = "vec4<f32>[]";
})(AST_TOKEN_TYPES || (exports.AST_TOKEN_TYPES = AST_TOKEN_TYPES = {}));
var AST_NODE_TYPES;
exports.AST_NODE_TYPES = AST_NODE_TYPES;
(function (AST_NODE_TYPES) {
  AST_NODE_TYPES["Program"] = "Program";
  AST_NODE_TYPES["Identifier"] = "Identifier";
  AST_NODE_TYPES["VariableDeclaration"] = "VariableDeclaration";
  AST_NODE_TYPES["BlockStatement"] = "BlockStatement";
  AST_NODE_TYPES["ReturnStatement"] = "ReturnStatement";
  AST_NODE_TYPES["FunctionDeclaration"] = "FunctionDeclaration";
  AST_NODE_TYPES["VariableDeclarator"] = "VariableDeclarator";
  AST_NODE_TYPES["AssignmentExpression"] = "AssignmentExpression";
  AST_NODE_TYPES["LogicalExpression"] = "LogicalExpression";
  AST_NODE_TYPES["BinaryExpression"] = "BinaryExpression";
  AST_NODE_TYPES["ArrayExpression"] = "ArrayExpression";
  AST_NODE_TYPES["UnaryExpression"] = "UnaryExpression";
  AST_NODE_TYPES["UpdateExpression"] = "UpdateExpression";
  AST_NODE_TYPES["FunctionExpression"] = "FunctionExpression";
  AST_NODE_TYPES["MemberExpression"] = "MemberExpression";
  AST_NODE_TYPES["ConditionalExpression"] = "ConditionalExpression";
  AST_NODE_TYPES["ExpressionStatement"] = "ExpressionStatement";
  AST_NODE_TYPES["CallExpression"] = "CallExpression";
  AST_NODE_TYPES["NumThreadStatement"] = "NumThreadStatement";
  AST_NODE_TYPES["StorageStatement"] = "StorageStatement";
  AST_NODE_TYPES["DoWhileStatement"] = "DoWhileStatement";
  AST_NODE_TYPES["WhileStatement"] = "WhileStatement";
  AST_NODE_TYPES["ForStatement"] = "ForStatement";
  AST_NODE_TYPES["BreakStatement"] = "BreakStatement";
  AST_NODE_TYPES["ContinueStatement"] = "ContinueStatement";
  AST_NODE_TYPES["IfStatement"] = "IfStatement";
  AST_NODE_TYPES["ImportedFunctionStatement"] = "ImportedFunctionStatement";
})(AST_NODE_TYPES || (exports.AST_NODE_TYPES = AST_NODE_TYPES = {}));
var STORAGE_CLASS;
exports.STORAGE_CLASS = STORAGE_CLASS;
(function (STORAGE_CLASS) {
  STORAGE_CLASS["Input"] = "Input";
  STORAGE_CLASS["Output"] = "Output";
  STORAGE_CLASS["Uniform"] = "Uniform";
  STORAGE_CLASS["Workgroup"] = "Workgroup";
  STORAGE_CLASS["UniformConstant"] = "UniformConstant";
  STORAGE_CLASS["Image"] = "Image";
  STORAGE_CLASS["StorageBuffer"] = "StorageBuffer";
  STORAGE_CLASS["Private"] = "Private";
  STORAGE_CLASS["Function"] = "Function";
})(STORAGE_CLASS || (exports.STORAGE_CLASS = STORAGE_CLASS = {}));
/**
 * 根据目标平台生成 Shader 代码
 * * WebGL GLSL 1.0
 * * WebGPU Chrome/Edge GLSL 4.5 & WGSL @see https://gpuweb.github.io/gpuweb/wgsl.html
 * * Safari WHLSL (maybe deprecated)
 */
var Target;
exports.Target = Target;
(function (Target) {
  Target["GLSL100"] = "GLSL100";
  Target["GLSL450"] = "GLSL450";
  Target["WGSL"] = "WGSL";
})(Target || (exports.Target = Target = {}));
var DefineValuePlaceholder = '__DefineValuePlaceholder__';
exports.DefineValuePlaceholder = DefineValuePlaceholder;
//# sourceMappingURL=index.js.map