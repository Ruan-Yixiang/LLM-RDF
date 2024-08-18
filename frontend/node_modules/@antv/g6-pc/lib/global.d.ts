declare const _default: {
    version: string;
    rootContainerClassName: string;
    nodeContainerClassName: string;
    edgeContainerClassName: string;
    comboContainerClassName: string;
    delegateContainerClassName: string;
    defaultLoopPosition: string;
    nodeLabel: {
        style: {
            fill: string;
            fontSize: number;
            textAlign: string;
            textBaseline: string;
        };
        offset: number;
    };
    defaultNode: {
        type: string;
        style: {
            lineWidth: number;
            stroke: any;
            fill: any;
        };
        size: number;
        color: any;
        linkPoints: {
            size: number;
            lineWidth: number;
            fill: any;
            stroke: any;
        };
    };
    nodeStateStyles: {
        active: {
            fill: any;
            stroke: any;
            lineWidth: number;
            shadowColor: any;
            shadowBlur: number;
        };
        selected: {
            fill: any;
            stroke: any;
            lineWidth: number;
            shadowColor: any;
            shadowBlur: number;
            'text-shape': {
                fontWeight: number;
            };
        };
        highlight: {
            fill: any;
            stroke: any;
            lineWidth: number;
            'text-shape': {
                fontWeight: number;
            };
        };
        inactive: {
            fill: any;
            stroke: any;
            lineWidth: number;
        };
        disable: {
            fill: any;
            stroke: any;
            lineWidth: number;
        };
    };
    edgeLabel: {
        style: {
            fill: string;
            textAlign: string;
            textBaseline: string;
            fontSize: number;
        };
    };
    defaultEdge: {
        type: string;
        size: number;
        style: {
            stroke: any;
            lineAppendWidth: number;
        };
        color: any;
    };
    edgeStateStyles: {
        active: {
            stroke: any;
            lineWidth: number;
        };
        selected: {
            stroke: any;
            lineWidth: number;
            shadowColor: any;
            shadowBlur: number;
            'text-shape': {
                fontWeight: number;
            };
        };
        highlight: {
            stroke: any;
            lineWidth: number;
            'text-shape': {
                fontWeight: number;
            };
        };
        inactive: {
            stroke: any;
            lineWidth: number;
        };
        disable: {
            stroke: any;
            lineWidth: number;
        };
    };
    comboLabel: {
        style: {
            fill: string;
            textBaseline: string;
            fontSize: number;
        };
        refY: number;
        refX: number;
    };
    defaultCombo: {
        type: string;
        style: {
            fill: any;
            lineWidth: number;
            stroke: any;
            r: number;
            width: number;
            height: number;
        };
        size: number[];
        color: any;
        padding: number[];
    };
    comboStateStyles: {
        active: {
            stroke: any;
            lineWidth: number;
            fill: any;
        };
        selected: {
            stroke: any;
            lineWidth: number;
            fill: any;
            shadowColor: any;
            shadowBlur: number;
            'text-shape': {
                fontWeight: number;
            };
        };
        highlight: {
            stroke: any;
            lineWidth: number;
            fill: any;
            'text-shape': {
                fontWeight: number;
            };
        };
        inactive: {
            stroke: any;
            fill: any;
            lineWidth: number;
        };
        disable: {
            stroke: any;
            fill: any;
            lineWidth: number;
        };
    };
    delegateStyle: {
        fill: string;
        fillOpacity: number;
        stroke: string;
        strokeOpacity: number;
        lineDash: number[];
    };
    textWaterMarkerConfig: {
        width: number;
        height: number;
        compatible: boolean;
        text: {
            x: number;
            y: number;
            lineHeight: number;
            rotate: number;
            fontSize: number;
            fontFamily: string;
            fill: string;
            baseline: string;
        };
    };
    imageWaterMarkerConfig: {
        width: number;
        height: number;
        compatible: boolean;
        image: {
            x: number;
            y: number;
            width: number;
            height: number;
            rotate: number;
        };
    };
    waterMarkerImage: string;
};
export default _default;
