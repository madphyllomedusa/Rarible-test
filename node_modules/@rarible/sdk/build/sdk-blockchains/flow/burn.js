"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowBurn = void 0;
var tslib_1 = require("tslib");
var action_1 = require("@rarible/action");
var types_1 = require("@rarible/types");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var converters_1 = require("./common/converters");
var FlowBurn = /** @class */ (function () {
    function FlowBurn(sdk, network) {
        this.sdk = sdk;
        this.network = network;
        this.burn = this.burn.bind(this);
    }
    FlowBurn.prototype.burn = function (prepare) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, itemId, contract;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                if (!prepare.itemId) {
                    throw new Error("ItemId has not been specified");
                }
                _a = (0, converters_1.parseFlowItemIdFromUnionItemId)(prepare.itemId), itemId = _a.itemId, contract = _a.contract;
                return [2 /*return*/, {
                        multiple: false,
                        maxAmount: (0, types_1.toBigNumber)("1"),
                        submit: action_1.Action.create({
                            id: "burn",
                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var tx;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, this.sdk.nft.burn(contract, parseInt(itemId))];
                                        case 1:
                                            tx = _a.sent();
                                            return [2 /*return*/, new sdk_transaction_1.BlockchainFlowTransaction(tx, this.network)];
                                    }
                                });
                            }); },
                        }),
                    }];
            });
        });
    };
    return FlowBurn;
}());
exports.FlowBurn = FlowBurn;
