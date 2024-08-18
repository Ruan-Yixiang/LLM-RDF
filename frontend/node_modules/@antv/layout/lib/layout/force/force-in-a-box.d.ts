interface INode {
    id: string;
    x: number;
    y: number;
    vx: number;
    vy: number;
    cluster: any;
}
export default function forceInABox(): {
    (alpha: number): any | undefined;
    initialize(_: any): void;
    template: (x: any) => string | any;
    groupBy: (x: any) => ((d: INode) => any) | any;
    enableGrouping: (x: any) => boolean | any;
    strength: (x: any) => number | any;
    centerX: (_: any) => number | any;
    centerY: (_: any) => number | any;
    nodes: (_: any) => INode[] | any;
    links: (_: any) => any[] | any;
    forceNodeSize: (_: any) => ((d: any) => number) | any;
    nodeSize: (_: any) => ((d: any) => number) | any;
    forceCharge: (_: any) => ((d: any) => number) | any;
    forceLinkDistance: (_: any) => ((d: any) => number) | any;
    forceLinkStrength: (_: any) => ((d: any) => number) | any;
    offset: (_: any) => number[] | any;
    getFocis: () => any;
};
export {};
