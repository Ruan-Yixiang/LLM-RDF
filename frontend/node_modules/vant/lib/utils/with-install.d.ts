import type { App, Component } from 'vue';
type EventShim = {
    new (...args: any[]): {
        $props: {
            onClick?: (...args: any[]) => void;
        };
    };
};
export type WithInstall<T> = T & {
    install(app: App): void;
} & EventShim;
export declare function withInstall<T extends Component>(options: T): WithInstall<T>;
export {};
