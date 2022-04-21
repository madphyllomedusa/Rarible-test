"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPromise = void 0;
/**
 * Promisified value
 *
 * @param val - any value
 * @return val if it already promise, or Promise.resole(val)
 */
function toPromise(val) {
    if (val.then !== undefined) {
        return val;
    }
    else {
        return Promise.resolve(val);
    }
}
exports.toPromise = toPromise;
