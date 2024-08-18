import { IConfig, IConfigService } from './IConfigService';
export declare class ConfigService implements IConfigService {
    private config;
    get(): Partial<IConfig>;
    set(config: Partial<IConfig>): void;
}
