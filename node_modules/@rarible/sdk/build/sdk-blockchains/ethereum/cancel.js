"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumCancel = void 0;
var tslib_1 = require("tslib");
var action_1 = require("@rarible/action");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var common_1 = require("./common");
var EthereumCancel = /** @class */ (function () {
    function EthereumCancel(sdk, network) {
        var _this = this;
        this.sdk = sdk;
        this.network = network;
        this.cancel = action_1.Action.create({
            id: "send-tx",
            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var _a, blockchain, orderId, order, cancelTx;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!request.orderId) {
                                throw new Error("OrderId has not been specified");
                            }
                            _a = tslib_1.__read(request.orderId.split(":"), 2), blockchain = _a[0], orderId = _a[1];
                            if (!(0, common_1.isEVMBlockchain)(blockchain)) {
                                throw new Error("Not an ethereum order");
                            }
                            return [4 /*yield*/, this.sdk.apis.order.getOrderByHash({
                                    hash: orderId,
                                })];
                        case 1:
                            order = _b.sent();
                            return [4 /*yield*/, this.sdk.order.cancel(order)];
                        case 2:
                            cancelTx = _b.sent();
                            return [2 /*return*/, new sdk_transaction_1.BlockchainEthereumTransaction(cancelTx, this.network)];
                    }
                });
            }); },
        });
    }
    return EthereumCancel;
}());
exports.EthereumCancel = EthereumCancel;
