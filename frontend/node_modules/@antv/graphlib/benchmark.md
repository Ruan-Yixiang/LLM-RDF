# Benchmark record

### new version

```bash
               nodes(100,0.2):  3,455,637.08 ops/sec ± 0.62% ( 93 run(s) sampled)
             sources(100,0.2):    380,584.82 ops/sec ± 4.04% ( 84 run(s) sampled)
               sinks(100,0.2):    416,618.15 ops/sec ± 0.62% ( 91 run(s) sampled)
     filterNodes all(100,0.2):        262.51 ops/sec ± 2.02% ( 79 run(s) sampled)
    filterNodes none(100,0.2):     34,697.67 ops/sec ± 6.46% ( 82 run(s) sampled)
             setNode(100,0.2): 46,252,085.90 ops/sec ± 1.29% ( 85 run(s) sampled)
                node(100,0.2): 50,819,416.29 ops/sec ± 1.59% ( 88 run(s) sampled)
    set + removeNode(100,0.2):    488,374.01 ops/sec ± 1.61% ( 91 run(s) sampled)
        predecessors(100,0.2):  8,139,116.64 ops/sec ± 0.84% ( 91 run(s) sampled)
          successors(100,0.2):  8,110,283.00 ops/sec ± 0.71% ( 90 run(s) sampled)
           neighbors(100,0.2):    363,678.88 ops/sec ± 0.48% ( 96 run(s) sampled)
               edges(100,0.2):    199,206.43 ops/sec ± 1.37% ( 91 run(s) sampled)
             setPath(100,0.2):  1,622,795.00 ops/sec ± 3.60% ( 82 run(s) sampled)
             setEdge(100,0.2):  6,483,052.39 ops/sec ± 1.47% ( 86 run(s) sampled)
                edge(100,0.2): 16,076,181.10 ops/sec ± 0.66% ( 91 run(s) sampled)
    set + removeEdge(100,0.2):     91,624.25 ops/sec ± 1.78% ( 86 run(s) sampled)
             inEdges(100,0.2):  4,401,227.16 ops/sec ± 0.89% ( 93 run(s) sampled)
            outEdges(100,0.2):  4,466,930.43 ops/sec ± 0.81% ( 92 run(s) sampled)
           nodeEdges(100,0.2):  1,322,920.39 ops/sec ± 1.40% ( 94 run(s) sampled)
          components(100,0.2):      6,114.45 ops/sec ± 1.66% ( 88 run(s) sampled)
         dijkstraAll(100,0.2):         45.83 ops/sec ± 2.46% ( 60 run(s) sampled)
```

### graphlib version

```bash
               nodes(100,0.2):    353,396.95 ops/sec ± 0.38% ( 95 run(s) sampled)
             sources(100,0.2):     10,521.67 ops/sec ± 3.56% ( 87 run(s) sampled)
               sinks(100,0.2):     10,959.91 ops/sec ± 0.86% ( 89 run(s) sampled)
     filterNodes all(100,0.2):        153.71 ops/sec ± 3.14% ( 77 run(s) sampled)
    filterNodes none(100,0.2):      2,519.81 ops/sec ± 1.17% ( 90 run(s) sampled)
             setNode(100,0.2): 12,312,125.13 ops/sec ± 2.02% ( 89 run(s) sampled)
                node(100,0.2): 28,205,461.65 ops/sec ± 2.44% ( 89 run(s) sampled)
    set + removeNode(100,0.2):  1,272,331.16 ops/sec ± 1.49% ( 87 run(s) sampled)
        predecessors(100,0.2):  1,307,177.14 ops/sec ± 1.29% ( 85 run(s) sampled)
          successors(100,0.2):  1,485,256.81 ops/sec ± 0.92% ( 87 run(s) sampled)
           neighbors(100,0.2):    250,082.05 ops/sec ± 0.78% ( 95 run(s) sampled)
               edges(100,0.2):      4,594.50 ops/sec ± 1.58% ( 86 run(s) sampled)
             setPath(100,0.2):  1,056,189.24 ops/sec ± 1.37% ( 93 run(s) sampled)
             setEdge(100,0.2):  4,483,547.20 ops/sec ± 0.99% ( 88 run(s) sampled)
                edge(100,0.2):  3,254,316.17 ops/sec ± 1.46% ( 84 run(s) sampled)
    set + removeEdge(100,0.2):    557,579.88 ops/sec ± 3.08% ( 84 run(s) sampled)
             inEdges(100,0.2):    710,823.70 ops/sec ± 0.38% ( 89 run(s) sampled)
            outEdges(100,0.2):    690,512.54 ops/sec ± 1.06% ( 94 run(s) sampled)
           nodeEdges(100,0.2):    309,098.91 ops/sec ± 1.79% ( 88 run(s) sampled)
          components(100,0.2):      1,729.79 ops/sec ± 0.50% ( 93 run(s) sampled)
         dijkstraAll(100,0.2):         30.83 ops/sec ± 3.04% ( 55 run(s) sampled)
```
