# Dagre Compound

A multi-level compound graph layout library based on dagre.

## 📦 Installation
```bash
$ npm i dagre-compound
```

## 🔨 Usage
```ts
import { buildGraph, HierarchyGraphNodeInfo } from 'dagre-compound';

const data = {
    nodes: [
      { id: '0-1'},
      { id: '0-2'},
      { id: '1-1'},
      { id: '1-2'},
    ],
    edges: [
      { v: '0-1', w: '0-2' },
      { v: '0-2', w: '1-1' },
      { v: '1-1', w: '1-2' }
    ],
    compound: {
      GROUP0: ['0-1', '0-2']
    }
}
const renderInfo: HierarchyGraphNodeInfo = buildGraph(data);
```
