import { IModuleParams, IShaderModuleService } from './IShaderModuleService';
export default class ShaderModuleService implements IShaderModuleService {
    private moduleCache;
    private rawContentCache;
    registerBuiltinModules(): void;
    registerModule(moduleName: string, moduleParams: IModuleParams): void;
    destroy(): void;
    getModule(moduleName: string): IModuleParams;
    private processModule;
}
