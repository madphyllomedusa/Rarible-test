export declare class DebugLogger {
    private readonly enabled;
    constructor(enabled: boolean);
    log(...args: any[]): void;
    error(...args: any[]): void;
}
