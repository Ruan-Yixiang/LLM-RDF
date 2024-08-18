import { IConfig, KernelBundle } from '@antv/g-webgpu-core';
import { WebGLEngine } from '@antv/g-webgpu-engine';
import { Kernel } from './Kernel';
export declare class World {
    static create(config?: Partial<IConfig>): World;
    engine: WebGLEngine;
    private readonly configService;
    setConfig(config: Partial<IConfig>): void;
    setEngine(engine: WebGLEngine): void;
    createEntity(): number;
    createKernel(precompiledBundle: KernelBundle | string): Kernel;
    destroy(): void;
}
