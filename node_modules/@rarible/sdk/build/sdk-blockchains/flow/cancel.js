"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowCancel = void 0;
var tslib_1 = require("tslib");
var action_1 = require("@rarible/action");
var sdk_transaction_1 = require("@rarible/sdk-transaction");
var converters_1 = require("./common/converters");
var FlowCancel = /** @class */ (function () {
    function FlowCancel(sdk, apis, network) {
        var _this = this;
        this.sdk = sdk;
        this.apis = apis;
        this.network = network;
        this.cancel = action_1.Action.create({
            id: "send-tx",
            run: function (request) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var parsed, order, _a, tx, tx;
                return tslib_1.__generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            if (!request.orderId) {
                                throw new Error("OrderId has not been specified");
                            }
                            parsed = (0, converters_1.parseOrderId)(request.orderId);
                            return [4 /*yield*/, this.apis.order.getOrderById({
                                    id: request.orderId,
                                })];
                        case 1:
                            order = _b.sent();
                            _a = order.make.type["@type"];
                            switch (_a) {
                                case "FLOW_NFT": return [3 /*break*/, 2];
                                case "FLOW_FT": return [3 /*break*/, 4];
                            }
                            return [3 /*break*/, 6];
                        case 2:
                            if (order.take.type["@type"] !== "FLOW_FT") {
                                throw new Error("Invalid Flow order, make asset is not a Flow asset");
                            }
                            return [4 /*yield*/, this.sdk.order.cancelOrder((0, converters_1.getFlowCollection)(order.make.type.contract), parsed)];
                        case 3:
                            tx = _b.sent();
                            return [2 /*return*/, new sdk_transaction_1.BlockchainFlowTransaction(tx, this.network)];
                        case 4:
                            if (order.take.type["@type"] !== "FLOW_NFT") {
                                throw new Error("Invalid Flow bid order, take asset is not a Flow asset");
                            }
                            return [4 /*yield*/, this.sdk.order.cancelBid((0, converters_1.getFlowCollection)(order.take.type.contract), parsed)];
                        case 5:
                            tx = _b.sent();
                            return [2 /*return*/, new sdk_transaction_1.BlockchainFlowTransaction(tx, this.network)];
                        case 6: throw new Error("Not an Flow order");
                    }
                });
            }); },
        });
        this.cancel = this.cancel.bind(this);
    }
    return FlowCancel;
}());
exports.FlowCancel = FlowCancel;
