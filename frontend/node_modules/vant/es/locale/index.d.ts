type Message = Record<string, any>;
export declare const Locale: {
    messages(): Message;
    use(newLang: string, newMessages?: Message): void;
    add(newMessages?: Message): void;
};
export declare const useCurrentLang: () => import("vue").Ref<string>;
export default Locale;
