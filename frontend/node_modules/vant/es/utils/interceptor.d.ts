export type Interceptor = (...args: any[]) => Promise<boolean> | boolean | undefined | void;
export declare function callInterceptor(interceptor: Interceptor | undefined, { args, done, canceled, }: {
    args?: unknown[];
    done: () => void;
    canceled?: () => void;
}): void;
