"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nonImplementedAction = exports.notImplemented = void 0;
var tslib_1 = require("tslib");
var action_1 = require("@rarible/action");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function notImplemented() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    throw new Error("Not implemented");
}
exports.notImplemented = notImplemented;
exports.nonImplementedAction = action_1.Action.create({
    id: "non-implemented",
    run: function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
        return [2 /*return*/, notImplemented()];
    }); }); },
});
