import { Component } from 'vue';
export declare function usePopupState(): {
    open: (props: Record<string, any>) => void;
    close: () => void;
    state: {
        [x: string]: any;
        show: boolean;
    };
    toggle: (show: boolean) => void;
};
export declare function mountComponent(RootComponent: Component): {
    instance: import("vue").ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import("vue").ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string, {}>, {}, {}>;
    unmount(): void;
};
