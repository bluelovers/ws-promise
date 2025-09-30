export declare function promiseDelay<T>(ms: number, value: T): Promise<T>;
export declare function promiseDelayReject(ms: number, value: unknown): Promise<unknown>;
export default promiseDelay;
