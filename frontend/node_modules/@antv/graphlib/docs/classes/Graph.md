[@antv/graphlib](../README.md) / [Exports](../modules.md) / Graph

# Class: Graph<NodeIDType, NodeType, EdgeType, GraphType\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `NodeIDType` | `string` |
| `NodeType` | `Record`<`string`, `any`\> |
| `EdgeType` | `Record`<`string`, `any`\> |
| `GraphType` | `string` |

## Hierarchy

- **`Graph`**

  ↳ [`GraphWithEvent`](GraphWithEvent.md)

## Table of contents

### Constructors

- [constructor](Graph.md#constructor)

### Properties

- [GRAPH\_NODE](Graph.md#graph_node)
- [childrenMap](Graph.md#childrenmap)
- [compound](Graph.md#compound)
- [defaultEdgeLabelFn](Graph.md#defaultedgelabelfn)
- [defaultNodeLabelFn](Graph.md#defaultnodelabelfn)
- [directed](Graph.md#directed)
- [edgeCountNum](Graph.md#edgecountnum)
- [edgesLabelsMap](Graph.md#edgeslabelsmap)
- [edgesMap](Graph.md#edgesmap)
- [inEdgesMap](Graph.md#inedgesmap)
- [label](Graph.md#label)
- [multigraph](Graph.md#multigraph)
- [nodeCountNum](Graph.md#nodecountnum)
- [nodesLabelMap](Graph.md#nodeslabelmap)
- [outEdgesMap](Graph.md#outedgesmap)
- [parentMap](Graph.md#parentmap)
- [predecessorsMap](Graph.md#predecessorsmap)
- [successorsMap](Graph.md#successorsmap)
- [fromJSON](Graph.md#fromjson)

### Methods

- [checkCompound](Graph.md#checkcompound)
- [children](Graph.md#children)
- [edge](Graph.md#edge)
- [edgeCount](Graph.md#edgecount)
- [edgeFromArgs](Graph.md#edgefromargs)
- [edges](Graph.md#edges)
- [filterNodes](Graph.md#filternodes)
- [graph](Graph.md#graph)
- [hasEdge](Graph.md#hasedge)
- [hasNode](Graph.md#hasnode)
- [inEdges](Graph.md#inedges)
- [isCompound](Graph.md#iscompound)
- [isDirected](Graph.md#isdirected)
- [isLeaf](Graph.md#isleaf)
- [isMultigraph](Graph.md#ismultigraph)
- [neighbors](Graph.md#neighbors)
- [node](Graph.md#node)
- [nodeCount](Graph.md#nodecount)
- [nodeDegree](Graph.md#nodedegree)
- [nodeEdges](Graph.md#nodeedges)
- [nodeInDegree](Graph.md#nodeindegree)
- [nodeOutDegree](Graph.md#nodeoutdegree)
- [nodes](Graph.md#nodes)
- [outEdges](Graph.md#outedges)
- [parent](Graph.md#parent)
- [predecessors](Graph.md#predecessors)
- [removeEdge](Graph.md#removeedge)
- [removeEdgeObj](Graph.md#removeedgeobj)
- [removeFromParentsChildList](Graph.md#removefromparentschildlist)
- [removeNode](Graph.md#removenode)
- [setDefaultEdgeLabel](Graph.md#setdefaultedgelabel)
- [setDefaultNodeLabel](Graph.md#setdefaultnodelabel)
- [setEdge](Graph.md#setedge)
- [setEdgeObj](Graph.md#setedgeobj)
- [setGraph](Graph.md#setgraph)
- [setNode](Graph.md#setnode)
- [setNodes](Graph.md#setnodes)
- [setParent](Graph.md#setparent)
- [setPath](Graph.md#setpath)
- [sinks](Graph.md#sinks)
- [source](Graph.md#source)
- [sources](Graph.md#sources)
- [successors](Graph.md#successors)
- [target](Graph.md#target)
- [toJSON](Graph.md#tojson)

## Constructors

### constructor

• **new Graph**<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>(`options?`)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `NodeIDType` | `string` |
| `NodeType` | `Record`<`string`, `any`\> |
| `EdgeType` | `Record`<`string`, `any`\> |
| `GraphType` | `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `GraphOption` |

#### Defined in

[Graph/index.ts:112](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L112)

## Properties

### GRAPH\_NODE

• `Private` **GRAPH\_NODE**: `NodeIDType`

#### Defined in

[Graph/index.ts:73](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L73)

___

### childrenMap

• `Private` `Optional` **childrenMap**: `Map`<`NodeIDType`, `Map`<`NodeIDType`, `boolean`\>\>

**`description`** Map for children relationship

**`description.zh-cn`** 子孙关系的映射

#### Defined in

[Graph/index.ts:139](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L139)

___

### compound

• `Private` **compound**: `boolean` = `false`

#### Defined in

[Graph/index.ts:71](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L71)

___

### defaultEdgeLabelFn

• `Private` **defaultEdgeLabelFn**: (`v`: `NodeIDType`, `w`: `NodeIDType`, `name?`: `string`) => `undefined` \| `EdgeType`

#### Type declaration

▸ (`v`, `w`, `name?`): `undefined` \| `EdgeType`

**`description`** return edge label with its id

**`description.zh-cn`** 返回边的默认的标签

##### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `NodeIDType` |
| `w` | `NodeIDType` |
| `name?` | `string` |

##### Returns

`undefined` \| `EdgeType`

#### Defined in

[Graph/index.ts:106](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L106)

___

### defaultNodeLabelFn

• `Private` **defaultNodeLabelFn**: (`v`: `NodeIDType`) => `undefined` \| `NodeType`

#### Type declaration

▸ (`v`): `undefined` \| `NodeType`

**`description`** return node label with its id

**`description.zh-cn`** 返回节点的默认的标签

##### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `NodeIDType` |

##### Returns

`undefined` \| `NodeType`

#### Defined in

[Graph/index.ts:100](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L100)

___

### directed

• `Private` **directed**: `boolean` = `true`

#### Defined in

[Graph/index.ts:67](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L67)

___

### edgeCountNum

• `Private` **edgeCountNum**: `number` = `0`

**`description`** Number of edges in the graph

**`description.zh-cn`** 节点的数量

**`default`** 0

#### Defined in

[Graph/index.ts:94](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L94)

___

### edgesLabelsMap

• `Private` **edgesLabelsMap**: `Map`<`string`, `undefined` \| `EdgeType`\>

**`description`** Map for edge label

**`description.zh-cn`** 边的标签的映射

#### Defined in

[Graph/index.ts:173](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L173)

___

### edgesMap

• `Private` **edgesMap**: `Map`<`string`, `DefaultEdgeType`<`NodeIDType`, `EdgeType`\>\>

**`description`** Map for edge object

**`description.zh-cn`** 边的映射

#### Defined in

[Graph/index.ts:167](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L167)

___

### inEdgesMap

• `Private` **inEdgesMap**: `Map`<`NodeIDType`, `Map`<`string`, `DefaultEdgeType`<`NodeIDType`, `EdgeType`\>\>\>

**`description`** Map for edges

**`description.zh-cn`** 边的映射

#### Defined in

[Graph/index.ts:147](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L147)

___

### label

• `Optional` **label**: `GraphType`

**`description`** Label for this graph itself

**`description.zh-cn`** 图本身的标签（label）

**`default`** undefined

#### Defined in

[Graph/index.ts:80](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L80)

___

### multigraph

• `Private` **multigraph**: `boolean` = `false`

#### Defined in

[Graph/index.ts:69](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L69)

___

### nodeCountNum

• `Private` **nodeCountNum**: `number` = `0`

**`description`** Number of nodes in the graph

**`description.zh-cn`** 节点的数量

**`default`** 0

#### Defined in

[Graph/index.ts:87](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L87)

___

### nodesLabelMap

• `Private` **nodesLabelMap**: `Map`<`NodeIDType`, `undefined` \| `NodeType`\>

#### Defined in

[Graph/index.ts:141](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L141)

___

### outEdgesMap

• `Private` **outEdgesMap**: `Map`<`NodeIDType`, `Map`<`string`, `DefaultEdgeType`<`NodeIDType`, `EdgeType`\>\>\>

#### Defined in

[Graph/index.ts:149](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L149)

___

### parentMap

• `Private` `Optional` **parentMap**: `Map`<`NodeIDType`, `NodeIDType`\>

**`description`** Map for parent relationship

**`description.zh-cn`** 父子关系的映射

#### Defined in

[Graph/index.ts:133](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L133)

___

### predecessorsMap

• `Private` **predecessorsMap**: `Map`<`NodeIDType`, `Map`<`NodeIDType`, `number`\>\>

**`description`** Map for predecessors

**`description.zh-cn`** 前驱节点的映射

#### Defined in

[Graph/index.ts:155](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L155)

___

### successorsMap

• `Private` **successorsMap**: `Map`<`NodeIDType`, `Map`<`NodeIDType`, `number`\>\>

**`description`** Map for successors

**`description.zh-cn`** 后继节点的映射

#### Defined in

[Graph/index.ts:161](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L161)

___

### fromJSON

▪ `Static` **fromJSON**: <NodeIDType, NodeType, EdgeType, GraphType\>(`json`: `JSONGraph`<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>) => [`Graph`](Graph.md)<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\> = `read`

#### Type declaration

▸ <`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>(`json`): [`Graph`](Graph.md)<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

**`description`** read a graph from JSON.

**`description.zh-cn`** 从 JSON 读取图。

##### Type parameters

| Name | Type |
| :------ | :------ |
| `NodeIDType` | `string` |
| `NodeType` | `Record`<`string`, `any`\> |
| `EdgeType` | `Record`<`string`, `any`\> |
| `GraphType` | `string` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `json` | `JSONGraph`<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\> |

##### Returns

[`Graph`](Graph.md)<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

#### Defined in

[Graph/index.ts:762](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L762)

## Methods

### checkCompound

▸ `Private` **checkCompound**(): `void`

**`description`** if graph is not compound then throw error

**`description.zh-cn`** 如果图不是复合图就报错

#### Returns

`void`

#### Defined in

[Graph/index.ts:335](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L335)

___

### children

▸ **children**(`node?`): `undefined` \| `NodeIDType`[]

**`description`** get graph's or node's children

**`description.zh-cn`** 获取图或者节点的字节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `node?` | `NodeIDType` |

#### Returns

`undefined` \| `NodeIDType`[]

#### Defined in

[Graph/index.ts:408](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L408)

___

### edge

▸ **edge**(`edgeObj`): `undefined` \| `EdgeType`

**`description`** Get edge between two nodes by edge object

**`description.zh-cn`** 从edgeObj获得两个节点中的一条边

#### Parameters

| Name | Type |
| :------ | :------ |
| `edgeObj` | `Object` |
| `edgeObj.name?` | `any` |
| `edgeObj.v` | `NodeIDType` |
| `edgeObj.w` | `NodeIDType` |

#### Returns

`undefined` \| `EdgeType`

#### Defined in

[Graph/index.ts:660](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L660)

___

### edgeCount

▸ **edgeCount**(): `number`

**`description`** Count the edge in graph

**`description.zh-cn`** 返回图中边的数量

#### Returns

`number`

number

#### Defined in

[Graph/index.ts:579](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L579)

___

### edgeFromArgs

▸ **edgeFromArgs**(`v`, `w`, `name?`): `undefined` \| `EdgeType`

**`description`** Get edge between two nodes

**`description.zh-cn`** 获得两个节点中的一条边

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `NodeIDType` |
| `w` | `NodeIDType` |
| `name?` | `any` |

#### Returns

`undefined` \| `EdgeType`

#### Defined in

[Graph/index.ts:650](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L650)

___

### edges

▸ **edges**(): `DefaultEdgeType`<`NodeIDType`, `EdgeType`\>[]

**`description`** get all edges object in graph

**`description.zh-cn`** 获得图中所有的边对象

#### Returns

`DefaultEdgeType`<`NodeIDType`, `EdgeType`\>[]

#### Defined in

[Graph/index.ts:716](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L716)

___

### filterNodes

▸ **filterNodes**(`filter`): [`Graph`](Graph.md)<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

**`description`** Using node filter to create a new graph;

**`description.zh-cn`** 过滤节点并创建一个新图

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | (`node`: `NodeIDType`) => `boolean` |

#### Returns

[`Graph`](Graph.md)<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

#### Defined in

[Graph/index.ts:480](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L480)

___

### graph

▸ **graph**(): `GraphType`

**`description`** Get Graph label (Identity for graph)

**`description.zh-cn`** 获取图的标识符

#### Returns

`GraphType`

stirng | undefined

#### Defined in

[Graph/index.ts:212](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L212)

___

### hasEdge

▸ **hasEdge**(`v`, `w`, `name?`): `boolean`

**`description`** Does two nodes has a specific edge

**`description.zh-cn`** 两个节点之间是否存在确定的一条边

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `NodeIDType` |
| `w` | `NodeIDType` |
| `name?` | `any` |

#### Returns

`boolean`

#### Defined in

[Graph/index.ts:672](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L672)

___

### hasNode

▸ **hasNode**(`node`): `boolean`

**`description`** Is the node in graph

**`description.zh-cn`** 判断节点是否在图中

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `NodeIDType` |

#### Returns

`boolean`

#### Defined in

[Graph/index.ts:329](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L329)

___

### inEdges

▸ **inEdges**(`v`, `u?`): `undefined` \| `DefaultEdgeType`<`NodeIDType`, `EdgeType`\>[]

**`description`** get edges that target at the node (could be from certain node)

**`description.zh-cn`** 获取所有指向节点的边，可以指定来源节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `NodeIDType` |
| `u?` | `NodeIDType` |

#### Returns

`undefined` \| `DefaultEdgeType`<`NodeIDType`, `EdgeType`\>[]

#### Defined in

[Graph/index.ts:725](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L725)

___

### isCompound

▸ **isCompound**(): `boolean`

**`description`** Is this graph a compound graph;

**`description.zh-cn`** 这个图是否是复合图（包含嵌套节点的图）

**`default`** false

#### Returns

`boolean`

#### Defined in

[Graph/index.ts:194](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L194)

___

### isDirected

▸ **isDirected**(): `boolean`

**`description`** Is the graph directed or not

**`description.zh-cn`** 这个图是否是有向图

**`default`** true

#### Returns

`boolean`

#### Defined in

[Graph/index.ts:180](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L180)

___

### isLeaf

▸ **isLeaf**(`node`): `boolean`

**`description`** Is the node a leaf node

**`description.zh-cn`** 判断节点是否为叶子节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `NodeIDType` |

#### Returns

`boolean`

#### Defined in

[Graph/index.ts:467](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L467)

___

### isMultigraph

▸ **isMultigraph**(): `boolean`

**`description`** Is this graph contains more than one graph data

**`description.zh-cn`** 这个图是否包含多个图

**`default`** false

#### Returns

`boolean`

#### Defined in

[Graph/index.ts:187](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L187)

___

### neighbors

▸ **neighbors**(`node`): `undefined` \| `NodeIDType`[]

**`description`** get node's neighbors

**`description.zh-cn`** 获取节点的所有邻居节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `NodeIDType` |

#### Returns

`undefined` \| `NodeIDType`[]

#### Defined in

[Graph/index.ts:454](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L454)

___

### node

▸ **node**(`n`): `undefined` \| `NodeType`

**`description`** get node label

**`description.zh-cn`** 获取节点的标签

#### Parameters

| Name | Type |
| :------ | :------ |
| `n` | `NodeIDType` |

#### Returns

`undefined` \| `NodeType`

#### Defined in

[Graph/index.ts:240](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L240)

___

### nodeCount

▸ **nodeCount**(): `number`

**`description`** Count the nodes in graph

**`description.zh-cn`** 计算图中所有节点的数量

#### Returns

`number`

number

#### Defined in

[Graph/index.ts:234](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L234)

___

### nodeDegree

▸ **nodeDegree**(`node`): `number`

**`description`** Count the total edges of node

**`description.zh-cn`** 计算节点的所有边的数量

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `NodeIDType` |

#### Returns

`number`

#### Defined in

[Graph/index.ts:796](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L796)

___

### nodeEdges

▸ **nodeEdges**(`v`, `w?`): `undefined` \| `DefaultEdgeType`<`NodeIDType`, `EdgeType`\>[]

**`description`** get edges between two nodes

**`description.zh-cn`** 获取两个节点间所有的节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `v` | `NodeIDType` |
| `w?` | `NodeIDType` |

#### Returns

`undefined` \| `DefaultEdgeType`<`NodeIDType`, `EdgeType`\>[]

#### Defined in

[Graph/index.ts:755](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L755)

___

### nodeInDegree

▸ **nodeInDegree**(`node`): `number`

**`description`** Count the in edges of node

**`description.zh-cn`** 计算节点的入边的数量

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `NodeIDType` |

#### Returns

`number`

#### Defined in

[Graph/index.ts:772](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L772)

___

### nodeOutDegree

▸ **nodeOutDegree**(`node`): `number`

**`description`** Count the out edges of node

**`description.zh-cn`** 计算节点的出边的数量

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `NodeIDType` |

#### Returns

`number`

#### Defined in

[Graph/index.ts:784](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L784)

___

### nodes

▸ **nodes**(): `NodeIDType`[]

**`description`** Return all nodes in graph

**`description`** 返回图中所有节点

#### Returns

`NodeIDType`[]

#### Defined in

[Graph/index.ts:247](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L247)

___

### outEdges

▸ **outEdges**(`w`, `u?`): `undefined` \| `DefaultEdgeType`<`NodeIDType`, `EdgeType`\>[]

**`description`** get edges that from the node (could target at certain node)

**`description.zh-cn`** 获取所有来源于节点的边，可以指定目标节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `w` | `NodeIDType` |
| `u?` | `NodeIDType` |

#### Returns

`undefined` \| `DefaultEdgeType`<`NodeIDType`, `EdgeType`\>[]

#### Defined in

[Graph/index.ts:740](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L740)

___

### parent

▸ **parent**(`node`): `undefined` \| `NodeIDType`

**`description`** Find node's parent (compond graph only)

**`description.zh-cn`** 寻找节点的父节点 (只有复合图可以使用)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `NodeIDType` |

#### Returns

`undefined` \| `NodeIDType`

#### Defined in

[Graph/index.ts:347](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L347)

___

### predecessors

▸ **predecessors**(`node`): `undefined` \| `NodeIDType`[]

**`description`** get node's predecessors

**`description.zh-cn`** 获取节点的所有上游节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `NodeIDType` |

#### Returns

`undefined` \| `NodeIDType`[]

#### Defined in

[Graph/index.ts:432](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L432)

___

### removeEdge

▸ **removeEdge**(`v_`, `w_`, `name?`): [`Graph`](Graph.md)<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

**`description`** remove a specific edge

**`description.zh-cn`** 删除一条边

#### Parameters

| Name | Type |
| :------ | :------ |
| `v_` | `NodeIDType` |
| `w_` | `NodeIDType` |
| `name?` | `any` |

#### Returns

[`Graph`](Graph.md)<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

#### Defined in

[Graph/index.ts:684](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L684)

___

### removeEdgeObj

▸ **removeEdgeObj**(`__namedParameters`): `this`

**`description`** remove a specific edge by edge object

**`description.zh-cn`** 删除一条边

#### Parameters

| Name | Type |
| :------ | :------ |
| `__namedParameters` | `Object` |
| `__namedParameters.name?` | `any` |
| `__namedParameters.v` | `NodeIDType` |
| `__namedParameters.w` | `NodeIDType` |

#### Returns

`this`

#### Defined in

[Graph/index.ts:708](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L708)

___

### removeFromParentsChildList

▸ `Private` **removeFromParentsChildList**(`node`): `void`

**`description`** Remove node from its parent (compond graph only)

**`description.zh-cn`** 将节点与其父节点之间的父子关系删除(只有复合图可以使用)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `NodeIDType` |

#### Returns

`void`

#### Defined in

[Graph/index.ts:361](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L361)

___

### removeNode

▸ **removeNode**(`node`): [`Graph`](Graph.md)<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

**`description`** Remove node from graph

**`description.zh-cn`** 将节点从图中移除

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `NodeIDType` |

#### Returns

[`Graph`](Graph.md)<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

#### Defined in

[Graph/index.ts:527](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L527)

___

### setDefaultEdgeLabel

▸ **setDefaultEdgeLabel**(`newDefault`): `this`

**`description`** Set function that generate default label for edge, if param is non-function value then default label will always be this value;

**`description.zh-cn`** 设置默认获取边Label的方法，如果传入不是函数的，那么默认label 的值只会是传入值

#### Parameters

| Name | Type |
| :------ | :------ |
| `newDefault` | `any` |

#### Returns

`this`

#### Defined in

[Graph/index.ts:565](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L565)

___

### setDefaultNodeLabel

▸ **setDefaultNodeLabel**(`newDefault`): `this`

**`description`** Set function that generate default label for node, if param is non-function value then default label will always be this value;

**`description.zh-cn`** 设置默认获取节点Label的方法，如果传入不是函数的，那么默认label 的值只会是传入值

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `newDefault` | `any` | (node) => label \| label |

#### Returns

`this`

this

#### Defined in

[Graph/index.ts:220](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L220)

___

### setEdge

▸ **setEdge**(`v_`, `w_`, `value?`, `name?`): [`Graph`](Graph.md)<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

**`description`** set edge value, if nodes or edges not exsit then add to graph

**`description.zh-cn`** 设置边的属性，如果边或节点不存在，那么将他们加入这个图

#### Parameters

| Name | Type |
| :------ | :------ |
| `v_` | `NodeIDType` |
| `w_` | `NodeIDType` |
| `value?` | `any` |
| `name?` | `string` |

#### Returns

[`Graph`](Graph.md)<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

#### Defined in

[Graph/index.ts:590](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L590)

___

### setEdgeObj

▸ **setEdgeObj**(`edgeObj`, `value?`): `this`

#### Parameters

| Name | Type |
| :------ | :------ |
| `edgeObj` | `DefaultEdgeType`<`NodeIDType`, `EdgeType`\> |
| `value?` | `EdgeType` |

#### Returns

`this`

#### Defined in

[Graph/index.ts:623](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L623)

___

### setGraph

▸ **setGraph**(`label?`): `this`

**`description`** Set Graph label (Identity for graph)

**`description.zh-cn`** 设置图的标识符

#### Parameters

| Name | Type |
| :------ | :------ |
| `label?` | `GraphType` |

#### Returns

`this`

#### Defined in

[Graph/index.ts:202](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L202)

___

### setNode

▸ **setNode**(`node`, `value?`): [`Graph`](Graph.md)<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

**`description`** Set Node label in graph if node not in graph then create it

**`description.zh-cn`** 设置节点的label，如果这个节点不在图中，则在图中创建这个节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `NodeIDType` |
| `value?` | `NodeType` |

#### Returns

[`Graph`](Graph.md)<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

#### Defined in

[Graph/index.ts:270](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L270)

___

### setNodes

▸ **setNodes**(`nodes`, `value?`): `this`

**`description`** Set nodes or add nodes in batch

**`description.zh-cn`** 批量设置或者创建节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `nodes` | `NodeIDType`[] |
| `value?` | `NodeType` |

#### Returns

`this`

#### Defined in

[Graph/index.ts:318](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L318)

___

### setParent

▸ **setParent**(`node`, `parent?`): `this`

**`description`** Set node's parent(default is the graph) (compond graph only)

**`description.zh-cn`** 设置节点的父节点，如果没有给定，父节点为这个图 (只有复合图可以使用)

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `NodeIDType` |
| `parent?` | `NodeIDType` |

#### Returns

`this`

#### Defined in

[Graph/index.ts:373](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L373)

___

### setPath

▸ **setPath**(`edges`, `value?`): `this`

**`description`** Add edge using a sorted node array ([a,b,c] => a->b b->c c->a)

**`description.zh-cn`** 用一系列节点来定义一群边([a,b,c] => a->b b->c c->a)

#### Parameters

| Name | Type |
| :------ | :------ |
| `edges` | `NodeIDType`[] |
| `value?` | `any` |

#### Returns

`this`

#### Defined in

[Graph/index.ts:634](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L634)

___

### sinks

▸ **sinks**(): `NodeIDType`[]

**`description`** Return all sink nodes in graph

**`description`** 返回图中所有终点节点（出度为0）

#### Returns

`NodeIDType`[]

#### Defined in

[Graph/index.ts:261](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L261)

___

### source

▸ **source**(`edge`): `NodeIDType`

**`description`** Get the source of edge

**`description.zh-cn`** 获取边的源节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `edge` | `DefaultEdgeType`<`NodeIDType`, `EdgeType`\> |

#### Returns

`NodeIDType`

#### Defined in

[Graph/index.ts:804](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L804)

___

### sources

▸ **sources**(): `NodeIDType`[]

**`description`** Return all source nodes in graph

**`description`** 返回图中所有源头节点（入度为0）

#### Returns

`NodeIDType`[]

#### Defined in

[Graph/index.ts:254](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L254)

___

### successors

▸ **successors**(`node`): `undefined` \| `NodeIDType`[]

**`description`** get node's successors

**`description.zh-cn`** 获取节点的所有下游节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `NodeIDType` |

#### Returns

`undefined` \| `NodeIDType`[]

#### Defined in

[Graph/index.ts:443](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L443)

___

### target

▸ **target**(`edge`): `NodeIDType`

**`description`** Get the target of edge

**`description.zh-cn`** 获取边的目标节点

#### Parameters

| Name | Type |
| :------ | :------ |
| `edge` | `DefaultEdgeType`<`NodeIDType`, `EdgeType`\> |

#### Returns

`NodeIDType`

#### Defined in

[Graph/index.ts:810](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L810)

___

### toJSON

▸ **toJSON**(): `JSONGraph`<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

#### Returns

`JSONGraph`<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

#### Defined in

[Graph/index.ts:764](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L764)
