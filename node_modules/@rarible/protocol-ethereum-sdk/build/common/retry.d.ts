export declare function retry<T>(num: number, del: number, thunk: () => Promise<T>): Promise<T>;
export declare function delay(num: number): Promise<void>;
