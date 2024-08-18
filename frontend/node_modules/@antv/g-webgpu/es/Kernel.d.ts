import { IConfigService, IRendererService, KernelBundle } from '@antv/g-webgpu-core';
export declare class Kernel {
    private readonly engine;
    private readonly configService;
    private model;
    private dirty;
    private compiledBundle;
    private initPromise;
    constructor(engine: IRendererService, configService: IConfigService);
    init(): void;
    setBundle(bundle: KernelBundle): void;
    setDispatch(dispatch: [number, number, number]): this;
    setMaxIteration(maxIteration: number): this;
    setBinding(name: string | Record<string, number | number[] | Float32Array | Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array>, data?: number | number[] | Float32Array | Uint8Array | Uint16Array | Uint32Array | Int8Array | Int16Array | Int32Array | Kernel): this;
    execute(iteration?: number): Promise<this>;
    /**
     * read output from GPUBuffer
     */
    getOutput(): Promise<Int8Array | Uint8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array>;
    private compile;
}
