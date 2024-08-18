import { ScrollElement } from '../utils';
export declare function scrollLeftTo(scroller: HTMLElement, to: number, duration: number): () => void;
export declare function scrollTopTo(scroller: ScrollElement, to: number, duration: number, callback: () => void): () => void;
