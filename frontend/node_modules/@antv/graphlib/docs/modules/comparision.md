[@antv/graphlib](../README.md) / [Exports](../modules.md) / comparision

# Namespace: comparision

## Table of contents

### Functions

- [containAllSameEdges](comparision.md#containallsameedges)
- [containAllSameNodes](comparision.md#containallsamenodes)
- [containSameEdges](comparision.md#containsameedges)
- [containSameNodes](comparision.md#containsamenodes)
- [getSameEdges](comparision.md#getsameedges)
- [getSameNodes](comparision.md#getsamenodes)
- [isGraphComplement](comparision.md#isgraphcomplement)
- [isGraphContainsAnother](comparision.md#isgraphcontainsanother)
- [isGraphOptionSame](comparision.md#isgraphoptionsame)
- [isGraphSame](comparision.md#isgraphsame)

## Functions

### containAllSameEdges

▸ **containAllSameEdges**<`NodeIDType`, `EdgeType`\>(`aGraph`, `bGraph`): `boolean`

**`description`** Check if a graph contains all edges in another graph.

**`description.zh-cn`** 检查一个图是否包含另一个图的所有边。

#### Type parameters

| Name | Type |
| :------ | :------ |
| `NodeIDType` | `any` |
| `EdgeType` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `aGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `any`\> |
| `bGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `any`\> |

#### Returns

`boolean`

#### Defined in

[comparision/contain.ts:102](https://github.com/antvis/graphlib/blob/7513e82/src/comparision/contain.ts#L102)

___

### containAllSameNodes

▸ **containAllSameNodes**<`NodeIDType`\>(`aGraph`, `bGraph`): `boolean`

**`description`** Check if a graph contains all nodes in another graph.

**`description.zh-cn`** 检查一个图是否包含另一个图的所有节点。

#### Type parameters

| Name | Type |
| :------ | :------ |
| `NodeIDType` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `aGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `any`, `any`\> |
| `bGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `any`, `any`\> |

#### Returns

`boolean`

#### Defined in

[comparision/contain.ts:90](https://github.com/antvis/graphlib/blob/7513e82/src/comparision/contain.ts#L90)

___

### containSameEdges

▸ **containSameEdges**<`NodeIDType`\>(`aGraph`, `bGraph`): `boolean`

**`description`** Check if two graphs are contains the same edges.

**`description.zh-cn`** 检查两个图是否包含相同的边。

#### Type parameters

| Name | Type |
| :------ | :------ |
| `NodeIDType` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `aGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `any`, `string`\> |
| `bGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `any`, `string`\> |

#### Returns

`boolean`

#### Defined in

[comparision/contain.ts:31](https://github.com/antvis/graphlib/blob/7513e82/src/comparision/contain.ts#L31)

___

### containSameNodes

▸ **containSameNodes**<`NodeIDType`\>(`aGraph`, `bGraph`): `boolean`

**`description`** Check if two graphs are contains the same nodes.

**`description.zh-cn`** 检查两个图是否包含相同的节点。

#### Type parameters

| Name | Type |
| :------ | :------ |
| `NodeIDType` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `aGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `Record`<`string`, `any`\>, `Record`<`string`, `any`\>, `string`\> |
| `bGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `Record`<`string`, `any`\>, `Record`<`string`, `any`\>, `string`\> |

#### Returns

`boolean`

#### Defined in

[comparision/contain.ts:13](https://github.com/antvis/graphlib/blob/7513e82/src/comparision/contain.ts#L13)

___

### getSameEdges

▸ **getSameEdges**<`NodeIDType`, `EdgeType`\>(`aGraph`, `bGraph`): `DefaultEdgeType`<`NodeIDType`, `EdgeType`\>[]

**`description`** get same edges in two graphs.

**`description.zh-cn`** 获取两个图中相同的边。

#### Type parameters

| Name | Type |
| :------ | :------ |
| `NodeIDType` | `any` |
| `EdgeType` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `aGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `any`\> |
| `bGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `any`\> |

#### Returns

`DefaultEdgeType`<`NodeIDType`, `EdgeType`\>[]

#### Defined in

[comparision/contain.ts:62](https://github.com/antvis/graphlib/blob/7513e82/src/comparision/contain.ts#L62)

___

### getSameNodes

▸ **getSameNodes**<`NodeIDType`\>(`aGraph`, `bGraph`): `NodeIDType`[]

**`description`** get same nodes in two graphs.

**`description.zh-cn`** 获取两个图中相同的节点。

#### Type parameters

| Name | Type |
| :------ | :------ |
| `NodeIDType` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `aGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `Record`<`string`, `any`\>, `Record`<`string`, `any`\>, `string`\> |
| `bGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `Record`<`string`, `any`\>, `Record`<`string`, `any`\>, `string`\> |

#### Returns

`NodeIDType`[]

#### Defined in

[comparision/contain.ts:49](https://github.com/antvis/graphlib/blob/7513e82/src/comparision/contain.ts#L49)

___

### isGraphComplement

▸ **isGraphComplement**<`NodeIDType`, `EdgeType`\>(`originGraph`, `targetGraph`): `boolean`

**`description`** Check if one graph is the complement of another graph.

**`description.zh-cn`** 检查一个图是否是另一个图的补图。

#### Type parameters

| Name | Type |
| :------ | :------ |
| `NodeIDType` | `any` |
| `EdgeType` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `originGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `any`\> |
| `targetGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `any`\> |

#### Returns

`boolean`

#### Defined in

[comparision/complement.ts:9](https://github.com/antvis/graphlib/blob/7513e82/src/comparision/complement.ts#L9)

___

### isGraphContainsAnother

▸ **isGraphContainsAnother**<`NodeIDType`, `EdgeType`\>(`originGraph`, `targetGraph`): `boolean`

**`description`** Check if one graph is the subgraph of another graph.

**`description.zh-cn`** 检查一个图是否是另一个图的子图。

#### Type parameters

| Name | Type |
| :------ | :------ |
| `NodeIDType` | `any` |
| `EdgeType` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `originGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `any`\> |
| `targetGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `any`\> |

#### Returns

`boolean`

#### Defined in

[comparision/contain.ts:131](https://github.com/antvis/graphlib/blob/7513e82/src/comparision/contain.ts#L131)

___

### isGraphOptionSame

▸ **isGraphOptionSame**<`NodeIDType`, `EdgeType`\>(`aGraph`, `bGraph`): `boolean`

**`description`** Check if two graphs'option are the same.

**`description.zh-cn`** 检查两个图的选项是否相同。

#### Type parameters

| Name | Type |
| :------ | :------ |
| `NodeIDType` | `any` |
| `EdgeType` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `aGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `any`\> |
| `bGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `any`\> |

#### Returns

`boolean`

#### Defined in

[comparision/contain.ts:75](https://github.com/antvis/graphlib/blob/7513e82/src/comparision/contain.ts#L75)

___

### isGraphSame

▸ **isGraphSame**<`NodeIDType`, `EdgeType`\>(`aGraph`, `bGraph`): `boolean`

**`description`** Check if two graphs are the same.

**`description.zh-cn`** 检查两个图是否相同。

#### Type parameters

| Name | Type |
| :------ | :------ |
| `NodeIDType` | `any` |
| `EdgeType` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `aGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `any`\> |
| `bGraph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `any`\> |

#### Returns

`boolean`

#### Defined in

[comparision/contain.ts:114](https://github.com/antvis/graphlib/blob/7513e82/src/comparision/contain.ts#L114)
