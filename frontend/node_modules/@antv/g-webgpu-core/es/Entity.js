export var EMPTY = -1;
var entitySequence = 1;

/**
 * 类似关系型数据库的主键
 * TODO: 自动生成，考虑序列化
 */
export function createEntity() {
  return entitySequence++;
}
//# sourceMappingURL=Entity.js.map