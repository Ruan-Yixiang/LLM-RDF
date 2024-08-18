[@antv/graphlib](../README.md) / [Exports](../modules.md) / GraphWithEvent

# Class: GraphWithEvent<NodeIDType, NodeType, EdgeType, GraphType\>

## Type parameters

| Name | Type |
| :------ | :------ |
| `NodeIDType` | `string` |
| `NodeType` | `Record`<`string`, `any`\> |
| `EdgeType` | `Record`<`string`, `any`\> |
| `GraphType` | `string` |

## Hierarchy

- [`Graph`](Graph.md)<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

  ↳ **`GraphWithEvent`**

## Table of contents

### Constructors

- [constructor](GraphWithEvent.md#constructor)

### Properties

- [eventPool](GraphWithEvent.md#eventpool)
- [label](GraphWithEvent.md#label)
- [fromJSON](GraphWithEvent.md#fromjson)

### Methods

- [appendEvent](GraphWithEvent.md#appendevent)
- [children](GraphWithEvent.md#children)
- [edge](GraphWithEvent.md#edge)
- [edgeCount](GraphWithEvent.md#edgecount)
- [edgeFromArgs](GraphWithEvent.md#edgefromargs)
- [edges](GraphWithEvent.md#edges)
- [emitEvent](GraphWithEvent.md#emitevent)
- [filterNodes](GraphWithEvent.md#filternodes)
- [graph](GraphWithEvent.md#graph)
- [hasEdge](GraphWithEvent.md#hasedge)
- [hasNode](GraphWithEvent.md#hasnode)
- [inEdges](GraphWithEvent.md#inedges)
- [isCompound](GraphWithEvent.md#iscompound)
- [isDirected](GraphWithEvent.md#isdirected)
- [isLeaf](GraphWithEvent.md#isleaf)
- [isMultigraph](GraphWithEvent.md#ismultigraph)
- [neighbors](GraphWithEvent.md#neighbors)
- [node](GraphWithEvent.md#node)
- [nodeCount](GraphWithEvent.md#nodecount)
- [nodeDegree](GraphWithEvent.md#nodedegree)
- [nodeEdges](GraphWithEvent.md#nodeedges)
- [nodeInDegree](GraphWithEvent.md#nodeindegree)
- [nodeOutDegree](GraphWithEvent.md#nodeoutdegree)
- [nodes](GraphWithEvent.md#nodes)
- [outEdges](GraphWithEvent.md#outedges)
- [parent](GraphWithEvent.md#parent)
- [predecessors](GraphWithEvent.md#predecessors)
- [removeEdge](GraphWithEvent.md#removeedge)
- [removeEdgeObj](GraphWithEvent.md#removeedgeobj)
- [removeEvent](GraphWithEvent.md#removeevent)
- [removeNode](GraphWithEvent.md#removenode)
- [setDefaultEdgeLabel](GraphWithEvent.md#setdefaultedgelabel)
- [setDefaultNodeLabel](GraphWithEvent.md#setdefaultnodelabel)
- [setEdge](GraphWithEvent.md#setedge)
- [setEdgeObj](GraphWithEvent.md#setedgeobj)
- [setGraph](GraphWithEvent.md#setgraph)
- [setNode](GraphWithEvent.md#setnode)
- [setNodes](GraphWithEvent.md#setnodes)
- [setParent](GraphWithEvent.md#setparent)
- [setPath](GraphWithEvent.md#setpath)
- [sinks](GraphWithEvent.md#sinks)
- [source](GraphWithEvent.md#source)
- [sources](GraphWithEvent.md#sources)
- [successors](GraphWithEvent.md#successors)
- [target](GraphWithEvent.md#target)
- [toJSON](GraphWithEvent.md#tojson)

## Constructors

### constructor

• **new GraphWithEvent**<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>(`options?`)

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

#### Inherited from

[Graph](Graph.md).[constructor](Graph.md#constructor)

#### Defined in

[Graph/index.ts:112](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L112)

## Properties

### eventPool

• `Private` **eventPool**: `Record`<`string`, `Function`[]\> = `{}`

**`description`** a pool of event listeners.

**`description.zh-cn`** 事件监听器池。

#### Defined in

Graph/event.ts:15

___

### label

• `Optional` **label**: `GraphType`

**`description`** Label for this graph itself

**`description.zh-cn`** 图本身的标签（label）

**`default`** undefined

#### Inherited from

[Graph](Graph.md).[label](Graph.md#label)

#### Defined in

[Graph/index.ts:80](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L80)

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

#### Inherited from

[Graph](Graph.md).[fromJSON](Graph.md#fromjson)

#### Defined in

[Graph/index.ts:762](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L762)

## Methods

### appendEvent

▸ **appendEvent**(`type`, `callback`): `void`

**`description`** Add an event listener.

**`description.zh-cn`** 添加事件监听器。

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `GraphEventType` |
| `callback` | `Function` |

#### Returns

`void`

#### Defined in

Graph/event.ts:21

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

#### Inherited from

[Graph](Graph.md).[children](Graph.md#children)

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

#### Inherited from

[Graph](Graph.md).[edge](Graph.md#edge)

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

#### Inherited from

[Graph](Graph.md).[edgeCount](Graph.md#edgecount)

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

#### Inherited from

[Graph](Graph.md).[edgeFromArgs](Graph.md#edgefromargs)

#### Defined in

[Graph/index.ts:650](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L650)

___

### edges

▸ **edges**(): `DefaultEdgeType`<`NodeIDType`, `EdgeType`\>[]

**`description`** get all edges object in graph

**`description.zh-cn`** 获得图中所有的边对象

#### Returns

`DefaultEdgeType`<`NodeIDType`, `EdgeType`\>[]

#### Inherited from

[Graph](Graph.md).[edges](Graph.md#edges)

#### Defined in

[Graph/index.ts:716](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L716)

___

### emitEvent

▸ **emitEvent**(`type`, ...`args`): `void`

**`description`** trigger an event.

**`description.zh-cn`** 触发事件。

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `GraphEventType` |
| `...args` | `any`[] |

#### Returns

`void`

#### Defined in

Graph/event.ts:46

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

#### Inherited from

[Graph](Graph.md).[filterNodes](Graph.md#filternodes)

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

#### Inherited from

[Graph](Graph.md).[graph](Graph.md#graph)

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

#### Inherited from

[Graph](Graph.md).[hasEdge](Graph.md#hasedge)

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

#### Inherited from

[Graph](Graph.md).[hasNode](Graph.md#hasnode)

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

#### Inherited from

[Graph](Graph.md).[inEdges](Graph.md#inedges)

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

#### Inherited from

[Graph](Graph.md).[isCompound](Graph.md#iscompound)

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

#### Inherited from

[Graph](Graph.md).[isDirected](Graph.md#isdirected)

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

#### Inherited from

[Graph](Graph.md).[isLeaf](Graph.md#isleaf)

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

#### Inherited from

[Graph](Graph.md).[isMultigraph](Graph.md#ismultigraph)

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

#### Inherited from

[Graph](Graph.md).[neighbors](Graph.md#neighbors)

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

#### Inherited from

[Graph](Graph.md).[node](Graph.md#node)

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

#### Inherited from

[Graph](Graph.md).[nodeCount](Graph.md#nodecount)

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

#### Inherited from

[Graph](Graph.md).[nodeDegree](Graph.md#nodedegree)

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

#### Inherited from

[Graph](Graph.md).[nodeEdges](Graph.md#nodeedges)

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

#### Inherited from

[Graph](Graph.md).[nodeInDegree](Graph.md#nodeindegree)

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

#### Inherited from

[Graph](Graph.md).[nodeOutDegree](Graph.md#nodeoutdegree)

#### Defined in

[Graph/index.ts:784](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L784)

___

### nodes

▸ **nodes**(): `NodeIDType`[]

**`description`** Return all nodes in graph

**`description`** 返回图中所有节点

#### Returns

`NodeIDType`[]

#### Inherited from

[Graph](Graph.md).[nodes](Graph.md#nodes)

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

#### Inherited from

[Graph](Graph.md).[outEdges](Graph.md#outedges)

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

#### Inherited from

[Graph](Graph.md).[parent](Graph.md#parent)

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

#### Inherited from

[Graph](Graph.md).[predecessors](Graph.md#predecessors)

#### Defined in

[Graph/index.ts:432](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L432)

___

### removeEdge

▸ **removeEdge**(`v_`, `w_`, `name?`): [`GraphWithEvent`](GraphWithEvent.md)<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `v_` | `NodeIDType` |
| `w_` | `NodeIDType` |
| `name?` | `any` |

#### Returns

[`GraphWithEvent`](GraphWithEvent.md)<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

#### Overrides

[Graph](Graph.md).[removeEdge](Graph.md#removeedge)

#### Defined in

Graph/event.ts:73

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

#### Inherited from

[Graph](Graph.md).[removeEdgeObj](Graph.md#removeedgeobj)

#### Defined in

[Graph/index.ts:708](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L708)

___

### removeEvent

▸ **removeEvent**(`type`, `callback`): `void`

**`description`** remove an event listener.

**`description.zh-cn`** 移除事件监听器。

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | `GraphEventType` |
| `callback` | `Function` |

#### Returns

`void`

#### Defined in

Graph/event.ts:32

___

### removeNode

▸ **removeNode**(`node`): [`GraphWithEvent`](GraphWithEvent.md)<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `NodeIDType` |

#### Returns

[`GraphWithEvent`](GraphWithEvent.md)<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

#### Overrides

[Graph](Graph.md).[removeNode](Graph.md#removenode)

#### Defined in

Graph/event.ts:61

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

#### Inherited from

[Graph](Graph.md).[setDefaultEdgeLabel](Graph.md#setdefaultedgelabel)

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

#### Inherited from

[Graph](Graph.md).[setDefaultNodeLabel](Graph.md#setdefaultnodelabel)

#### Defined in

[Graph/index.ts:220](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L220)

___

### setEdge

▸ **setEdge**(`v_`, `w_`, `value?`, `name?`): [`GraphWithEvent`](GraphWithEvent.md)<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `v_` | `NodeIDType` |
| `w_` | `NodeIDType` |
| `value?` | `any` |
| `name?` | `string` |

#### Returns

[`GraphWithEvent`](GraphWithEvent.md)<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

#### Overrides

[Graph](Graph.md).[setEdge](Graph.md#setedge)

#### Defined in

Graph/event.ts:67

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

#### Inherited from

[Graph](Graph.md).[setEdgeObj](Graph.md#setedgeobj)

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

#### Inherited from

[Graph](Graph.md).[setGraph](Graph.md#setgraph)

#### Defined in

[Graph/index.ts:202](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L202)

___

### setNode

▸ **setNode**(`node`, `value?`): [`GraphWithEvent`](GraphWithEvent.md)<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `node` | `NodeIDType` |
| `value?` | `NodeType` |

#### Returns

[`GraphWithEvent`](GraphWithEvent.md)<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

#### Overrides

[Graph](Graph.md).[setNode](Graph.md#setnode)

#### Defined in

Graph/event.ts:55

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

#### Inherited from

[Graph](Graph.md).[setNodes](Graph.md#setnodes)

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

#### Inherited from

[Graph](Graph.md).[setParent](Graph.md#setparent)

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

#### Inherited from

[Graph](Graph.md).[setPath](Graph.md#setpath)

#### Defined in

[Graph/index.ts:634](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L634)

___

### sinks

▸ **sinks**(): `NodeIDType`[]

**`description`** Return all sink nodes in graph

**`description`** 返回图中所有终点节点（出度为0）

#### Returns

`NodeIDType`[]

#### Inherited from

[Graph](Graph.md).[sinks](Graph.md#sinks)

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

#### Inherited from

[Graph](Graph.md).[source](Graph.md#source)

#### Defined in

[Graph/index.ts:804](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L804)

___

### sources

▸ **sources**(): `NodeIDType`[]

**`description`** Return all source nodes in graph

**`description`** 返回图中所有源头节点（入度为0）

#### Returns

`NodeIDType`[]

#### Inherited from

[Graph](Graph.md).[sources](Graph.md#sources)

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

#### Inherited from

[Graph](Graph.md).[successors](Graph.md#successors)

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

#### Inherited from

[Graph](Graph.md).[target](Graph.md#target)

#### Defined in

[Graph/index.ts:810](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L810)

___

### toJSON

▸ **toJSON**(): `JSONGraph`<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

#### Returns

`JSONGraph`<`NodeIDType`, `NodeType`, `EdgeType`, `GraphType`\>

#### Inherited from

[Graph](Graph.md).[toJSON](Graph.md#tojson)

#### Defined in

[Graph/index.ts:764](https://github.com/antvis/graphlib/blob/7513e82/src/Graph/index.ts#L764)
