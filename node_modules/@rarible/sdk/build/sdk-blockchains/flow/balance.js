"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlowBalance = void 0;
var tslib_1 = require("tslib");
var bn_1 = require("@rarible/utils/build/bn");
var get_currency_asset_type_1 = require("../../common/get-currency-asset-type");
var converters_1 = require("./common/converters");
var get_flow_currency_from_asset_type_1 = require("./common/get-flow-currency-from-asset-type");
var balance_simple_1 = require("./balance-simple");
var FlowBalance = /** @class */ (function () {
    function FlowBalance(sdk, network, wallet) {
        this.sdk = sdk;
        this.network = network;
        this.wallet = wallet;
        this.getBalance = this.getBalance.bind(this);
    }
    FlowBalance.prototype.getBalance = function (address, currency) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var assetType, flowAddress, flowAsset, balance;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        assetType = (0, get_currency_asset_type_1.getCurrencyAssetType)(currency);
                        if (!this.wallet) return [3 /*break*/, 2];
                        flowAddress = (0, converters_1.parseFlowAddressFromUnionAddress)(address);
                        flowAsset = (0, get_flow_currency_from_asset_type_1.getFlowCurrencyFromAssetType)(assetType);
                        return [4 /*yield*/, this.sdk.wallet.getFungibleBalance(flowAddress, flowAsset)];
                    case 1:
                        balance = _a.sent();
                        return [2 /*return*/, (0, bn_1.toBn)(balance)];
                    case 2: return [2 /*return*/, (0, balance_simple_1.getSimpleFlowFungibleBalance)(this.network, address, assetType)];
                }
            });
        });
    };
    return FlowBalance;
}());
exports.FlowBalance = FlowBalance;
