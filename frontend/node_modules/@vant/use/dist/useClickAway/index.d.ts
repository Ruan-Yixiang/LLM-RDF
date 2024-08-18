import { Ref } from 'vue';
export type UseClickAwayOptions = {
    eventName?: string;
};
export declare function useClickAway(target: Element | Ref<Element | undefined> | Array<Element | Ref<Element | undefined>>, listener: EventListener, options?: UseClickAwayOptions): void;
