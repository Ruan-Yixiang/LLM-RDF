import type { UploaderMaxSize, UploaderResultType, UploaderFileListItem } from './types';
declare const name: string, bem: (el?: import("../utils").Mods | undefined, mods?: import("../utils").Mods | undefined) => import("../utils").Mods, t: (path: string, ...args: unknown[]) => any;
export { name, bem, t };
export declare function readFileContent(file: File, resultType: UploaderResultType): Promise<string | void>;
export declare function isOversize(items: UploaderFileListItem | UploaderFileListItem[], maxSize: UploaderMaxSize): boolean;
export declare function filterFiles(items: UploaderFileListItem[], maxSize: UploaderMaxSize): {
    valid: UploaderFileListItem[];
    invalid: UploaderFileListItem[];
};
export declare const isImageUrl: (url: string) => boolean;
export declare function isImageFile(item: UploaderFileListItem): boolean;
