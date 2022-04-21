/**
 * Promisified value
 *
 * @param val - any value
 * @return val if it already promise, or Promise.resole(val)
 */
export declare function toPromise(val: any): Promise<any>;
