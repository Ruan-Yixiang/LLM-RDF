export type CurrentTime = {
    days: number;
    hours: number;
    total: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
};
export type UseCountDownOptions = {
    time: number;
    millisecond?: boolean;
    onChange?: (current: CurrentTime) => void;
    onFinish?: () => void;
};
export declare function useCountDown(options: UseCountDownOptions): {
    start: () => void;
    pause: () => void;
    reset: (totalTime?: number) => void;
    current: import("vue").ComputedRef<CurrentTime>;
};
