[@antv/graphlib](../README.md) / [Exports](../modules.md) / algorithm

# Namespace: algorithm

## Table of contents

### Functions

- [components](algorithm.md#components)
- [dfs](algorithm.md#dfs)
- [dijkstra](algorithm.md#dijkstra)
- [dijkstraAll](algorithm.md#dijkstraall)
- [findCycles](algorithm.md#findcycles)
- [floydWarshall](algorithm.md#floydwarshall)
- [isAcyclic](algorithm.md#isacyclic)
- [postorder](algorithm.md#postorder)
- [preorder](algorithm.md#preorder)
- [prim](algorithm.md#prim)
- [tarjan](algorithm.md#tarjan)
- [topsort](algorithm.md#topsort)

## Functions

### components

▸ **components**<`NodeIDType`\>(`graph`): `NodeIDType`[][]

#### Type parameters

| Name |
| :------ |
| `NodeIDType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `graph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `Record`<`string`, `any`\>, `Record`<`string`, `any`\>, `string`\> |

#### Returns

`NodeIDType`[][]

#### Defined in

[algorithm/components.ts:3](https://github.com/antvis/graphlib/blob/7513e82/src/algorithm/components.ts#L3)

___

### dfs

▸ **dfs**<`NodeIDType`\>(`graph`, `node`, `order`): `NodeIDType`[]

**`description`** DFS traversal.

**`description.zh-cn`** DFS 遍历。

#### Type parameters

| Name | Type |
| :------ | :------ |
| `NodeIDType` | `any` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `graph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `any`, `any`\> |
| `node` | `NodeIDType` \| `NodeIDType`[] |
| `order` | ``"pre"`` \| ``"post"`` |

#### Returns

`NodeIDType`[]

#### Defined in

[algorithm/dfs.ts:33](https://github.com/antvis/graphlib/blob/7513e82/src/algorithm/dfs.ts#L33)

___

### dijkstra

▸ **dijkstra**<`NodeIDType`, `EdgeType`\>(`graph`, `source`, `weightFn?`, `edgeFn?`): `Record`<`string`, `Entry`<`NodeIDType`\>\>

**`description`** Dijkstra's algorithm for single-source shortest paths.

**`description`** https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm

**`description.zh-cn`** Dijkstra 算法用于单源最短路径。

#### Type parameters

| Name |
| :------ |
| `NodeIDType` |
| `EdgeType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `graph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `string`\> |
| `source` | `NodeIDType` |
| `weightFn?` | (`node`: `DefaultEdgeType`<`NodeIDType`, `EdgeType`\>) => `number` |
| `edgeFn?` | (`node`: `NodeIDType`) => `DefaultEdgeType`<`NodeIDType`, `EdgeType`\>[] |

#### Returns

`Record`<`string`, `Entry`<`NodeIDType`\>\>

#### Defined in

[algorithm/dijkstra.ts:11](https://github.com/antvis/graphlib/blob/7513e82/src/algorithm/dijkstra.ts#L11)

___

### dijkstraAll

▸ **dijkstraAll**<`NodeType`, `EdgeType`\>(`graph`, `weightFn?`, `edgeFn?`): `Record`<`any`, `Record`<`string`, `Entry`<`unknown`\>\>\>

#### Type parameters

| Name |
| :------ |
| `NodeType` |
| `EdgeType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `graph` | [`Graph`](../classes/Graph.md)<`NodeType`, `any`, `EdgeType`, `string`\> |
| `weightFn?` | (`node`: `DefaultEdgeType`<`NodeType`, `EdgeType`\>) => `number` |
| `edgeFn?` | (`node`: `NodeType`) => `DefaultEdgeType`<`NodeType`, `EdgeType`\>[] |

#### Returns

`Record`<`any`, `Record`<`string`, `Entry`<`unknown`\>\>\>

#### Defined in

[algorithm/dijkstra-all.ts:4](https://github.com/antvis/graphlib/blob/7513e82/src/algorithm/dijkstra-all.ts#L4)

___

### findCycles

▸ **findCycles**<`NodeType`\>(`graph`): `NodeType`[][]

#### Type parameters

| Name |
| :------ |
| `NodeType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `graph` | [`Graph`](../classes/Graph.md)<`NodeType`, `Record`<`string`, `any`\>, `Record`<`string`, `any`\>, `string`\> |

#### Returns

`NodeType`[][]

#### Defined in

[algorithm/find-cycles.ts:4](https://github.com/antvis/graphlib/blob/7513e82/src/algorithm/find-cycles.ts#L4)

___

### floydWarshall

▸ **floydWarshall**<`NodeIDType`, `EdgeType`\>(`graph`, `weightFn?`, `edgeFn?`): `Record`<`string`, `Record`<`string`, `Entry`<`NodeIDType`\>\>\>

#### Type parameters

| Name |
| :------ |
| `NodeIDType` |
| `EdgeType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `graph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `any`, `EdgeType`, `string`\> |
| `weightFn?` | (`node`: `DefaultEdgeType`<`NodeIDType`, `EdgeType`\>) => `number` |
| `edgeFn?` | (`node`: `NodeIDType`) => `DefaultEdgeType`<`NodeIDType`, `EdgeType`\>[] |

#### Returns

`Record`<`string`, `Record`<`string`, `Entry`<`NodeIDType`\>\>\>

#### Defined in

[algorithm/floyd-warshall.ts:5](https://github.com/antvis/graphlib/blob/7513e82/src/algorithm/floyd-warshall.ts#L5)

___

### isAcyclic

▸ **isAcyclic**(`graph`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `graph` | [`Graph`](../classes/Graph.md)<`string`, `Record`<`string`, `any`\>, `Record`<`string`, `any`\>, `string`\> |

#### Returns

`boolean`

#### Defined in

[algorithm/is-acyclic.ts:4](https://github.com/antvis/graphlib/blob/7513e82/src/algorithm/is-acyclic.ts#L4)

___

### postorder

▸ **postorder**<`NodeType`\>(`graph`, `nodes`): `NodeType`[]

#### Type parameters

| Name |
| :------ |
| `NodeType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `graph` | [`Graph`](../classes/Graph.md)<`NodeType`, `any`, `any`, `any`\> |
| `nodes` | `NodeType` \| `NodeType`[] |

#### Returns

`NodeType`[]

#### Defined in

[algorithm/postorder.ts:4](https://github.com/antvis/graphlib/blob/7513e82/src/algorithm/postorder.ts#L4)

___

### preorder

▸ **preorder**<`NodeType`\>(`graph`, `nodes`): `NodeType`[]

#### Type parameters

| Name |
| :------ |
| `NodeType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `graph` | [`Graph`](../classes/Graph.md)<`NodeType`, `any`, `any`, `any`\> |
| `nodes` | `NodeType` \| `NodeType`[] |

#### Returns

`NodeType`[]

#### Defined in

[algorithm/preorder.ts:4](https://github.com/antvis/graphlib/blob/7513e82/src/algorithm/preorder.ts#L4)

___

### prim

▸ **prim**<`NodeIdType`, `NodeType`, `EdgeType`\>(`graph`, `weightFn`): [`Graph`](../classes/Graph.md)<`NodeIdType`, `NodeType`, `EdgeType`, `string`\>

#### Type parameters

| Name |
| :------ |
| `NodeIdType` |
| `NodeType` |
| `EdgeType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `graph` | [`Graph`](../classes/Graph.md)<`NodeIdType`, `NodeType`, `EdgeType`, `string`\> |
| `weightFn` | (`node`: `DefaultEdgeType`<`NodeIdType`, `EdgeType`\>) => `number` |

#### Returns

[`Graph`](../classes/Graph.md)<`NodeIdType`, `NodeType`, `EdgeType`, `string`\>

#### Defined in

[algorithm/prim.ts:4](https://github.com/antvis/graphlib/blob/7513e82/src/algorithm/prim.ts#L4)

___

### tarjan

▸ **tarjan**<`NodeIDType`\>(`graph`): `NodeIDType`[][]

**`description`** Tarjan's algorithm for finding the strongly connected components of a graph.

**`description`** https://en.wikipedia.org/wiki/Tarjan%27s_strongly_connected_components_algorithm

**`description.zh-cn`** Tarjan 算法用于找到图的强连通子图。

#### Type parameters

| Name |
| :------ |
| `NodeIDType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `graph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `Record`<`string`, `any`\>, `Record`<`string`, `any`\>, `string`\> |

#### Returns

`NodeIDType`[][]

#### Defined in

[algorithm/tarjan.ts:16](https://github.com/antvis/graphlib/blob/7513e82/src/algorithm/tarjan.ts#L16)

___

### topsort

▸ **topsort**<`NodeIDType`\>(`graph`): `NodeIDType`[]

#### Type parameters

| Name |
| :------ |
| `NodeIDType` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `graph` | [`Graph`](../classes/Graph.md)<`NodeIDType`, `Record`<`string`, `any`\>, `Record`<`string`, `any`\>, `string`\> |

#### Returns

`NodeIDType`[]

#### Defined in

[algorithm/topsort.ts:5](https://github.com/antvis/graphlib/blob/7513e82/src/algorithm/topsort.ts#L5)
