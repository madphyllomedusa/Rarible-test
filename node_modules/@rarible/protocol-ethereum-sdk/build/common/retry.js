"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.delay = exports.retry = void 0;
function retry(num, del, thunk) {
    return thunk().catch(function (error) {
        if (num === 0) {
            throw error;
        }
        return delay(del).then(function () { return retry(num - 1, del, thunk); });
    });
}
exports.retry = retry;
function delay(num) {
    return new Promise(function (r) { return setTimeout(r, num); });
}
exports.delay = delay;
