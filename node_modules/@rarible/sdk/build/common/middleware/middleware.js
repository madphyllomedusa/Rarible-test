"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Middlewarer = void 0;
var tslib_1 = require("tslib");
var action_1 = require("@rarible/action");
var utils_1 = require("./utils");
var SKIP_MIDDLEWARE = Symbol("SKIP_MIDDLEWARE");
var Middlewarer = /** @class */ (function () {
    function Middlewarer() {
        this.middlewares = [];
    }
    /**
     * Add middleware to chain
     */
    Middlewarer.prototype.use = function (middleware) {
        this.middlewares.push(middleware);
        return this;
    };
    /**
     * Call method with middlewares chain
     *
     * @param callable - original method for call
     * @param ...args - callable arguments
     */
    Middlewarer.prototype.call = function (callable) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var wrappedCallable, callbacks, _a, _b, mid, cb, e_1_1, res, callbacks_1, callbacks_1_1, mid, result;
            var e_1, _c, _d, e_2, _e;
            return tslib_1.__generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        wrappedCallable = callable;
                        callbacks = [];
                        _f.label = 1;
                    case 1:
                        _f.trys.push([1, 6, 7, 8]);
                        _a = tslib_1.__values(this.middlewares), _b = _a.next();
                        _f.label = 2;
                    case 2:
                        if (!!_b.done) return [3 /*break*/, 5];
                        mid = _b.value;
                        cb = undefined;
                        return [4 /*yield*/, mid(wrappedCallable, args)];
                    case 3:
                        (_d = tslib_1.__read.apply(void 0, [_f.sent(), 2]), wrappedCallable = _d[0], cb = _d[1]);
                        if (cb) {
                            callbacks.push(cb);
                        }
                        _f.label = 4;
                    case 4:
                        _b = _a.next();
                        return [3 /*break*/, 2];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        e_1_1 = _f.sent();
                        e_1 = { error: e_1_1 };
                        return [3 /*break*/, 8];
                    case 7:
                        try {
                            if (_b && !_b.done && (_c = _a.return)) _c.call(_a);
                        }
                        finally { if (e_1) throw e_1.error; }
                        return [7 /*endfinally*/];
                    case 8:
                        res = (0, utils_1.toPromise)(wrappedCallable.apply(void 0, tslib_1.__spreadArray([], tslib_1.__read(args), false)));
                        try {
                            for (callbacks_1 = tslib_1.__values(callbacks), callbacks_1_1 = callbacks_1.next(); !callbacks_1_1.done; callbacks_1_1 = callbacks_1.next()) {
                                mid = callbacks_1_1.value;
                                res = (0, utils_1.toPromise)(mid(res));
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (callbacks_1_1 && !callbacks_1_1.done && (_e = callbacks_1.return)) _e.call(callbacks_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        return [4 /*yield*/, res
                            // wrapping submit methods
                        ];
                    case 9:
                        result = _f.sent();
                        // wrapping submit methods
                        if (typeof (result === null || result === void 0 ? void 0 : result.submit) === "function") {
                            result.submit = this.wrap(result.submit, { methodName: callable.name + ".submit" });
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Wrap function to execute with middlewares in future
     * @example
     * 	function fn(i: number) { ... }
     * 	const wrappedFn = middlewarer.wrap(fn)
     * 	fn(10)
     *
     * @param callable
     * @param meta metadata for new method
     */
    Middlewarer.prototype.wrap = function (callable, meta) {
        var e_3, _a;
        var _this = this;
        if (meta === void 0) { meta = {}; }
        if (callable.hasOwnProperty(SKIP_MIDDLEWARE)) {
            return callable;
        }
        var fnName = (meta === null || meta === void 0 ? void 0 : meta.methodName) || callable.name || "anonymous";
        if (isAction(callable)) {
            var _loop_1 = function (step) {
                var originRun = step.run;
                step.run = function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    return _this.call.apply(_this, tslib_1.__spreadArray([originRun], tslib_1.__read(args), false));
                };
                Object.defineProperty(originRun, "name", { value: fnName + "." + step.id, writable: false });
            };
            try {
                // @ts-ignore
                for (var _b = tslib_1.__values(callable.steps), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var step = _c.value;
                    _loop_1(step);
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return callable;
        }
        else {
            Object.defineProperty(callable, "name", { value: fnName, writable: false });
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _this.call.apply(_this, tslib_1.__spreadArray([callable], tslib_1.__read(args), false));
            };
        }
    };
    /**
     * Wrap all methods in object
     *
     * @param object
     * @param meta metadata for new method
     */
    Middlewarer.prototype.wrapObjectMethods = function (object, meta) {
        for (var prop in object) {
            if (object.hasOwnProperty(prop) && typeof object[prop] === "function") {
                object[prop] = this.wrap(object[prop], {
                    methodName: (meta.namespace ? meta.namespace + "." : "") + prop,
                });
            }
        }
    };
    Middlewarer.skipMiddleware = function (something) {
        return Object.defineProperty(something, SKIP_MIDDLEWARE, { value: true, writable: false });
    };
    return Middlewarer;
}());
exports.Middlewarer = Middlewarer;
function isAction(fn) {
    return fn instanceof action_1.Action;
}
