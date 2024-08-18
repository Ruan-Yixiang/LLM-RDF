[@antv/graphlib](../README.md) / [Exports](../modules.md) / essence

# Namespace: essence

**`file`** To get graph essencial information.

**`file.zh-cn`** 获取图的基本信息

## Table of contents

### Functions

- [hasSelfLoop](essence.md#hasselfloop)
- [isGraph](essence.md#isgraph)
- [isNullGraph](essence.md#isnullgraph)
- [isSimpleGraph](essence.md#issimplegraph)

## Functions

### hasSelfLoop

▸ **hasSelfLoop**(`graph`): `boolean`

**`description`** Check if the graph contains Self loops.

**`description.zh-cn`** 检查图是否包含自环。

#### Parameters

| Name | Type |
| :------ | :------ |
| `graph` | [`Graph`](../classes/Graph.md)<`string`, `Record`<`string`, `any`\>, `Record`<`string`, `any`\>, `string`\> |

#### Returns

`boolean`

#### Defined in

[essence/index.ts:57](https://github.com/antvis/graphlib/blob/7513e82/src/essence/index.ts#L57)

___

### isGraph

▸ **isGraph**(`obj`): `boolean`

**`description`** Check if the object is a graph.

**`description.zh-cn`** 检查对象是否为图。

#### Parameters

| Name | Type |
| :------ | :------ |
| `obj` | `any` |

#### Returns

`boolean`

#### Defined in

[essence/index.ts:13](https://github.com/antvis/graphlib/blob/7513e82/src/essence/index.ts#L13)

___

### isNullGraph

▸ **isNullGraph**(`graph`): `boolean`

**`description`** Check if the graph is a null graph.

**`description.zh-cn`** 检查图是否为空图。

#### Parameters

| Name | Type |
| :------ | :------ |
| `graph` | [`Graph`](../classes/Graph.md)<`string`, `Record`<`string`, `any`\>, `Record`<`string`, `any`\>, `string`\> |

#### Returns

`boolean`

#### Defined in

[essence/index.ts:49](https://github.com/antvis/graphlib/blob/7513e82/src/essence/index.ts#L49)

___

### isSimpleGraph

▸ **isSimpleGraph**(`graph`): `boolean`

**`description`** Check if the graph is a simple graph.

**`description.zh-cn`** 检查图是否为简单图。

#### Parameters

| Name | Type |
| :------ | :------ |
| `graph` | [`Graph`](../classes/Graph.md)<`any`, `any`, `any`, `any`\> |

#### Returns

`boolean`

#### Defined in

[essence/index.ts:21](https://github.com/antvis/graphlib/blob/7513e82/src/essence/index.ts#L21)
