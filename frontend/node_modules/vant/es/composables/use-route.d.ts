/**
 * Vue Router support
 */
import { type PropType, type ExtractPropTypes, type ComponentPublicInstance } from 'vue';
import type { RouteLocationRaw } from 'vue-router';
export declare const routeProps: {
    to: PropType<RouteLocationRaw>;
    url: StringConstructor;
    replace: BooleanConstructor;
};
export type RouteProps = ExtractPropTypes<typeof routeProps>;
export declare function route({ to, url, replace, $router: router, }: ComponentPublicInstance<RouteProps>): void;
export declare function useRoute(): () => void;
