"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowTransfer = void 0;
var tslib_1 = require("tslib");
var action_1 = require("@rarible/action");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var big_number_1 = require("@rarible/types/build/big-number");
var converters_1 = require("./common/converters");
var FlowTransfer = /** @class */ (function () {
    function FlowTransfer(sdk, network) {
        this.sdk = sdk;
        this.network = network;
        this.transfer = this.transfer.bind(this);
    }
    FlowTransfer.prototype.transfer = function (prepare) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, itemId, contract;
            var _this = this;
            return tslib_1.__generator(this, function (_b) {
                _a = (0, converters_1.parseFlowItemIdFromUnionItemId)(prepare.itemId), itemId = _a.itemId, contract = _a.contract;
                return [2 /*return*/, {
                        multiple: false,
                        maxAmount: (0, big_number_1.toBigNumber)("1"),
                        submit: action_1.Action.create({
                            id: "transfer",
                            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                                var toAddress, tx;
                                return tslib_1.__generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            toAddress = (0, converters_1.parseFlowAddressFromUnionAddress)(request.to);
                                            return [4 /*yield*/, this.sdk.nft.transfer(contract, parseInt(itemId), toAddress)];
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
    return FlowTransfer;
}());
exports.FlowTransfer = FlowTransfer;
