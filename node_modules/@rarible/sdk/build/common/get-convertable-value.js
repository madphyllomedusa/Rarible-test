"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommonConvertableValue = void 0;
var tslib_1 = require("tslib");
var bignumber_js_1 = tslib_1.__importDefault(require("bignumber.js"));
function getCommonConvertableValue(getBalance, walletAddress, valueWithFee, from, to) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var wrappedTokenBalance, fromBalance;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getBalance(walletAddress, to)];
                case 1:
                    wrappedTokenBalance = _a.sent();
                    if (new bignumber_js_1.default(wrappedTokenBalance).gte(valueWithFee)) {
                        return [2 /*return*/, undefined];
                    }
                    return [4 /*yield*/, getBalance(walletAddress, from)];
                case 2:
                    fromBalance = _a.sent();
                    if (new bignumber_js_1.default(fromBalance).plus(wrappedTokenBalance).gte(valueWithFee)) {
                        return [2 /*return*/, {
                                type: "convertable",
                                currency: from,
                                value: new bignumber_js_1.default(valueWithFee).minus(wrappedTokenBalance),
                            }];
                    }
                    return [2 /*return*/, {
                            type: "insufficient",
                            currency: from,
                            value: new bignumber_js_1.default(valueWithFee).minus(fromBalance),
                        }];
            }
        });
    });
}
exports.getCommonConvertableValue = getCommonConvertableValue;
