import { type ComponentInstance } from '../utils';
import type { NotifyMessage, NotifyOptions } from './types';
export declare const closeNotify: () => void;
export declare function showNotify(options: NotifyMessage | NotifyOptions): ComponentInstance | undefined;
export declare const setNotifyDefaultOptions: (options: NotifyOptions) => NotifyOptions;
export declare const resetNotifyDefaultOptions: () => void;
