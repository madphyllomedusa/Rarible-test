"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logTime = void 0;
var tslib_1 = require("tslib");
function logTime(task, f) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var start, now;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    start = new Date();
                    console.log("".concat(start, ": '").concat(task, "'"));
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, , 3, 4]);
                    return [4 /*yield*/, f()];
                case 2: return [2 /*return*/, _a.sent()];
                case 3:
                    now = new Date();
                    console.log("".concat(now, ": finished '").concat(task, "' in ").concat(now.getTime() - start.getTime(), "ms"));
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.logTime = logTime;
