"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EMPTY = void 0;
exports.createEntity = createEntity;
var EMPTY = -1;
exports.EMPTY = EMPTY;
var entitySequence = 1;

/**
 * 类似关系型数据库的主键
 * TODO: 自动生成，考虑序列化
 */
function createEntity() {
  return entitySequence++;
}
//# sourceMappingURL=Entity.js.map